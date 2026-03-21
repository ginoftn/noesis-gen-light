#!/bin/bash
# NOESIS Maintenance
# Monthly: log rotation + vault git commit
# LaunchAgent: 1st of month at 6am

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
VAULT_DIR="$(dirname "$SCRIPT_DIR")/vault"
LOG_DIR="$VAULT_DIR/AI.ENV/logs"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

DATE=$(date +%Y-%m-%d)
LOG_FILE="$LOG_DIR/maintenance-${DATE}.log"

mkdir -p "$LOG_DIR"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

log "=== Starting monthly maintenance ==="

# 1. Log rotation: compress logs older than 30 days
log "Rotating logs older than 30 days..."
ROTATED=0
find "$LOG_DIR" -name "*.log" -mtime +30 -not -name "maintenance-*" 2>/dev/null | while read -r f; do
    gzip "$f" 2>/dev/null && ROTATED=$((ROTATED + 1))
done
log "Rotated $ROTATED log file(s)."

# Remove compressed logs older than 90 days
REMOVED=$(find "$LOG_DIR" -name "*.log.gz" -mtime +90 2>/dev/null | wc -l | tr -d ' ')
find "$LOG_DIR" -name "*.log.gz" -mtime +90 -delete 2>/dev/null
log "Removed $REMOVED archived log(s) older than 90 days."

# 2. Vault git commit (if .git exists)
if [ -d "$ROOT_DIR/.git" ]; then
    log "Git vault commit..."
    cd "$ROOT_DIR"
    git add -A 2>/dev/null
    CHANGES=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
    if [ "$CHANGES" -gt 0 ]; then
        git commit -m "vault: monthly auto-commit $DATE" 2>/dev/null
        log "Committed $CHANGES change(s)."
    else
        log "No changes to commit."
    fi
else
    log "No .git in vault root, skipping commit."
fi

# 3. Archive old daily notes (>60 days)
ARCHIVE_DIR="$VAULT_DIR/SHARED.ENV/daily-notes/archive"
OLD_NOTES=$(find "$VAULT_DIR/SHARED.ENV/daily-notes" -maxdepth 1 -name "*.md" -mtime +60 -not -name "template-*" 2>/dev/null | wc -l | tr -d ' ')
if [ "$OLD_NOTES" -gt 0 ]; then
    mkdir -p "$ARCHIVE_DIR"
    find "$VAULT_DIR/SHARED.ENV/daily-notes" -maxdepth 1 -name "*.md" -mtime +60 -not -name "template-*" -exec mv {} "$ARCHIVE_DIR/" \; 2>/dev/null
    log "Archived $OLD_NOTES daily note(s) older than 60 days."
fi

log "=== Monthly maintenance complete ==="
