#!/bin/bash
# Wrapper for VHS recording -- simulates typing + output
# Usage: demo-wrapper.sh [install|bonjour]
SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

case "${1:-install}" in
  install)
    bash "$SCRIPT_DIR/demo-output.sh" install
    ;;
  bonjour)
    bash "$SCRIPT_DIR/demo-output.sh" bonjour
    ;;
esac
