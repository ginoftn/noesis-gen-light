#!/bin/bash
# NOESIS Inbox Watcher
# Triggered by WatchPaths when captures/ changes.
# Sorts new files: ideas → captures, tasks → pending.md

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
VAULT_DIR="$(dirname "$SCRIPT_DIR")/vault"
LOG_DIR="$VAULT_DIR/AI.ENV/logs"
CAPTURES_DIR="$VAULT_DIR/SHARED.ENV/captures"
PENDING="$VAULT_DIR/SHARED.ENV/queue/pending.md"

DATE=$(date +%Y-%m-%d)
LOG_FILE="$LOG_DIR/inbox-watcher-${DATE}.log"

mkdir -p "$LOG_DIR"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# Anti-bounce: WatchPaths can trigger in bursts
LOCK_FILE="$LOG_DIR/.inbox-watcher.lock"
if [ -f "$LOCK_FILE" ]; then
    LOCK_AGE=$(( $(date +%s) - $(stat -f %m "$LOCK_FILE" 2>/dev/null || stat -c %Y "$LOCK_FILE" 2>/dev/null || echo 0) ))
    if [ "$LOCK_AGE" -lt 30 ]; then
        exit 0
    fi
fi
touch "$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"' EXIT

sleep 2  # Wait for writes to stabilize

log "=== Inbox watcher triggered ==="

# Count new files in captures/ (modified in last 5 minutes)
NEW_FILES=$(find "$CAPTURES_DIR" -name "*.md" -mmin -5 2>/dev/null | wc -l | tr -d ' ')

if [ "$NEW_FILES" -gt 0 ]; then
    log "Found $NEW_FILES new file(s) in captures/"

    # List new files
    find "$CAPTURES_DIR" -name "*.md" -mmin -5 2>/dev/null | while read -r f; do
        BASENAME=$(basename "$f")
        log "  New: $BASENAME"

        # Simple task detection: if filename starts with "task-" or contains task markers
        if echo "$BASENAME" | grep -qi "^task"; then
            log "  → Detected as task, checking for task lines"
            TASK_LINES=$(grep "^- \[" "$f" 2>/dev/null || echo "")
            if [ -n "$TASK_LINES" ]; then
                echo "" >> "$PENDING"
                echo "$TASK_LINES" >> "$PENDING"
                log "  → Appended to pending.md"
            fi
        fi
    done
else
    log "No new files detected."
fi

log "=== Inbox watcher complete ==="
