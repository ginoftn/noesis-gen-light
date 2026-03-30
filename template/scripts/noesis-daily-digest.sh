#!/bin/bash
# NOESIS Daily Digest
# Compiles yesterday, prepares today, generates tasks, sends notification.
# LaunchAgent: runs at user-configured time each morning.

unset CLAUDECODE
set -e

CLAUDE_BIN="$HOME/.local/bin/claude"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
VAULT_DIR="$(dirname "$SCRIPT_DIR")/vault"
LOG_DIR="$(dirname "$SCRIPT_DIR")/vault/AI.ENV/logs"
OUTPUT_DIR="$(dirname "$SCRIPT_DIR")/vault/AI.ENV/outputs"
NOTIFY_SCRIPT="$SCRIPT_DIR/noesis-notify.sh"

DATE=$(date +%Y-%m-%d)
YESTERDAY=$(date -v-1d +%Y-%m-%d 2>/dev/null || date -d "yesterday" +%Y-%m-%d)
LOG_FILE="$LOG_DIR/digest-${DATE}.log"

mkdir -p "$LOG_DIR" "$OUTPUT_DIR"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

log "=== Starting daily digest ==="

# Gather context
DAILY_NOTE="$VAULT_DIR/SHARED.ENV/daily-notes/${YESTERDAY}.md"
OBJECTIVES="$VAULT_DIR/SHARED.ENV/registres/projets-actifs.md"
MOMENTUM="$VAULT_DIR/SHARED.ENV/registres/momentum.md"
PENDING="$VAULT_DIR/SHARED.ENV/queue/pending.md"
CAPTURES_DIR="$VAULT_DIR/SHARED.ENV/captures"

YESTERDAY_CONTEXT=""
if [ -f "$DAILY_NOTE" ]; then
    YESTERDAY_CONTEXT=$(head -80 "$DAILY_NOTE" 2>/dev/null || echo "")
fi

OBJECTIVES_CONTEXT=""
if [ -f "$OBJECTIVES" ]; then
    OBJECTIVES_CONTEXT=$(head -60 "$OBJECTIVES" 2>/dev/null || echo "")
fi

MOMENTUM_CONTEXT=""
if [ -f "$MOMENTUM" ]; then
    MOMENTUM_CONTEXT=$(head -40 "$MOMENTUM" 2>/dev/null || echo "")
fi

PENDING_CONTEXT=""
if [ -f "$PENDING" ]; then
    PENDING_CONTEXT=$(cat "$PENDING" 2>/dev/null || echo "")
fi

# Recent captures (last 3 days)
RECENT_CAPTURES=""
if [ -d "$CAPTURES_DIR" ]; then
    RECENT_CAPTURES=$(find "$CAPTURES_DIR" -name "*.md" -mtime -3 -exec basename {} \; 2>/dev/null | head -10)
fi

# Write context to temp files (avoids bash substitution bugs on multiline content)
TMPDIR=$(mktemp -d)
echo "$YESTERDAY_CONTEXT" > "$TMPDIR/yesterday.txt"
echo "$OBJECTIVES_CONTEXT" > "$TMPDIR/objectives.txt"
echo "$MOMENTUM_CONTEXT" > "$TMPDIR/momentum.txt"
echo "$PENDING_CONTEXT" > "$TMPDIR/pending.txt"
echo "$RECENT_CAPTURES" > "$TMPDIR/captures.txt"

PROMPT="You are the NOESIS daily digest agent. Generate today's brief.

Read the following context files before generating:
- Yesterday's daily note: $TMPDIR/yesterday.txt
- Active objectives: $TMPDIR/objectives.txt
- Momentum: $TMPDIR/momentum.txt
- Pending tasks: $TMPDIR/pending.txt
- Recent captures: $TMPDIR/captures.txt

INSTRUCTIONS:
1. Read the user's profil.md and voice-dna.md Part 1 to know their language and tone.
2. Write a daily digest in their primary language with these sections:
   - **Yesterday summary** (2-3 lines max)
   - **Today's focus** (based on objectives and momentum)
   - **Tasks for today** (generate 2-4 concrete tasks, add to pending.md if not already there)
   - **Signal** (any pattern worth noting — burst, stagnation, new project started)
3. Save the digest to: vault/AI.ENV/outputs/digest-${DATE}.md (use today's date)
4. Also save a copy to: vault/AI.ENV/outputs/digest-latest.md (overwrite)
5. If there are new tasks, add them to vault/SHARED.ENV/queue/pending.md
6. Keep it under 30 lines. Compact. Every line carries information."

# Cleanup temp files after Claude finishes (trap ensures cleanup on error too)
trap 'rm -rf "$TMPDIR"' EXIT

# Run Claude
cd "$(dirname "$SCRIPT_DIR")"
"$CLAUDE_BIN" -p "$PROMPT" --max-turns 3 >> "$LOG_FILE" 2>&1
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    log "Digest generated successfully."
    # Send notification
    if [ -f "$NOTIFY_SCRIPT" ]; then
        bash "$NOTIFY_SCRIPT" "NOESIS" "Your daily brief is ready."
    fi
else
    log "ERROR: Claude exited with code $EXIT_CODE"
fi

log "=== Daily digest complete ==="
