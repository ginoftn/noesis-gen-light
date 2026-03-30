#!/bin/bash
# NOESIS Auto Session
# Autonomous analysis, connections, deep work on pending tasks.
# LaunchAgent: runs once daily at user-configured time.

unset CLAUDECODE
set -e

CLAUDE_BIN="$HOME/.local/bin/claude"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
VAULT_DIR="$(dirname "$SCRIPT_DIR")/vault"
LOG_DIR="$VAULT_DIR/AI.ENV/logs"
OUTPUT_DIR="$VAULT_DIR/AI.ENV/outputs"

DATE=$(date +%Y-%m-%d)
LOG_FILE="$LOG_DIR/session-auto-${DATE}.log"

mkdir -p "$LOG_DIR" "$OUTPUT_DIR"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

log "=== Starting auto session ==="

PROMPT=$(cat <<PROMPT_EOF
You are the NOESIS autonomous session agent. Work in the background.

INSTRUCTIONS:
1. Read the user profil.md, voice-dna.md, and CLAUDE.local.md for context and rules.
2. Read today's digest (vault/AI.ENV/outputs/digest-latest.md) for today's focus.
3. Read pending tasks (vault/SHARED.ENV/queue/pending.md).
4. Read momentum (vault/SHARED.ENV/registres/momentum.md).
5. Read active projects (vault/SHARED.ENV/registres/projets-actifs.md).

DO (pick 2-3 from this list based on what is most useful today):
- Complete pending tasks that do not require user input
- Update momentum.md with current observations
- Identify connections between active projects
- Flag patterns (stagnation, burst activity, new directions)
- Prepare material for the next session (analysis, suggestions)
- Update project files if status has changed

DO NOT:
- Modify USER.ENV files (read-only)
- Make decisions on behalf of the user
- Create new projects or objectives
- Use affirmative language for proposals (this could be -- not -- this is)

Write outputs to vault/AI.ENV/outputs/ with descriptive filenames.
Update the daily note (vault/SHARED.ENV/daily-notes/YYYY-MM-DD.md) with a session summary.
Mark completed tasks in pending.md with [x] and completion date.
Write in the user primary language.
Keep total output concise. Quality over quantity.
PROMPT_EOF
)

cd "$(dirname "$SCRIPT_DIR")"
"$CLAUDE_BIN" -p "$PROMPT" --max-turns 5 >> "$LOG_FILE" 2>&1
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    log "Auto session completed successfully."
else
    log "ERROR: Claude exited with code $EXIT_CODE"
fi

log "=== Auto session complete ==="
