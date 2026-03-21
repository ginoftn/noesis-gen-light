#!/bin/bash
# NOESIS Notify -- Cross-platform notification
# Usage: noesis-notify.sh "Title" "Message"

TITLE="${1:-NOESIS}"
MESSAGE="${2:-Notification}"

if command -v osascript &>/dev/null; then
    # macOS
    osascript -e "display notification \"$MESSAGE\" with title \"$TITLE\""
elif command -v notify-send &>/dev/null; then
    # Linux (libnotify)
    notify-send "$TITLE" "$MESSAGE"
fi
# Silent fallback if neither available
