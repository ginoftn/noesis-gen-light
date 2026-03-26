#!/bin/bash
# Simulates the NoesisGen Light installer output for GIF recording
# Usage: bash assets/demo-output.sh [install|bonjour]

CYAN='\033[36m'
GREEN='\033[32m'
BOLD='\033[1m'
DIM='\033[2m'
RESET='\033[0m'

demo_install() {
  echo ""
  echo -e "${CYAN}"
  echo "    _   _  ___  _____ ____ ___ ____"
  echo "   | \\ | |/ _ \\| ____/ ___|_ _/ ___|"
  echo "   |  \\| | | | |  _| \\___ \\| |\\___ \\"
  echo "   | |\\  | |_| | |___ ___) | | ___) |"
  echo "   |_| \\_|\\___/|_____|____/___|____/"
  echo ""
  echo -e "   Your cognitive operating system.${RESET}"
  echo ""
  echo -e "${DIM}   v0.1.0${RESET}"
  echo ""
  echo -e "${BOLD}Preflight checks${RESET}"
  sleep 0.3
  echo -e "${GREEN}✓${RESET} Node.js v22.14.0"
  sleep 0.2
  echo -e "${GREEN}✓${RESET} Claude CLI found"
  sleep 0.4
  echo ""
  echo -e "Choose a location:"
  echo -e "  ${CYAN}1.${RESET} Desktop/Noesis ${DIM}(/Users/demo/Desktop/Noesis)${RESET}"
  echo -e "  ${CYAN}2.${RESET} Documents/Noesis ${DIM}(/Users/demo/Documents/Noesis)${RESET}"
  echo -e "  ${CYAN}3.${RESET} Custom path"
  echo ""
  echo -ne "${DIM}(1-3)${RESET} "
  sleep 0.8
  echo "1"
  sleep 0.3
  echo ""
  echo -e "${BOLD}Installing NOESIS${RESET}"
  echo ""
  sleep 0.4
  echo -e "${GREEN}✓${RESET} Vault structure created (USER.ENV / SHARED.ENV / AI.ENV)"
  sleep 0.3
  echo -e "${GREEN}✓${RESET} 5 background scripts ready"
  sleep 0.3
  echo -e "${GREEN}✓${RESET} 7 skills installed (/bonjour /status /recap /sync /task /deepwork /profile-deep)"
  sleep 0.3
  echo -e "${GREEN}✓${RESET} 2 subagents configured (analyzer, voice-analyzer)"
  sleep 0.2
  echo -e "${GREEN}✓${RESET} 4 background agent templates ready (digest, session, watcher, maintenance)"
  sleep 0.2
  echo -e "${GREEN}✓${RESET} Gamification ready (18 levels, 3 acts, 48h grace period)"
  sleep 0.5
  echo ""
  echo -e "${GREEN}${BOLD}✓ NOESIS installed to /Users/demo/Desktop/Noesis${RESET}"
  echo ""
  echo -e "  ${DIM}Everything is ready. The setup agent will personalize it for you:${RESET}"
  echo -e "  ${DIM}•${RESET} Your profile, portrait, and voice analysis"
  echo -e "  ${DIM}•${RESET} Your projects (detected from your files)"
  echo -e "  ${DIM}•${RESET} Background agents (scheduled to your rhythm)"
  echo -e "  ${DIM}•${RESET} Your system's name and shell aliases"
  echo ""
  echo -e "${BOLD}Next:${RESET}"
  echo ""
  echo -e "  ${CYAN}cd /Users/demo/Desktop/Noesis && claude${RESET}"
  echo ""
  echo -e "  ${DIM}Then just say hello — the setup agent will guide you from there.${RESET}"
  echo ""
}

demo_bonjour() {
  echo ""
  echo -e "${DIM}> /bonjour${RESET}"
  echo ""
  sleep 0.5
  echo -e "${CYAN}⠋${RESET} Reading profile..."
  sleep 0.3
  echo -e "\r\033[K${GREEN}✓${RESET} Profile loaded"
  sleep 0.2
  echo -e "${CYAN}⠋${RESET} Reading daily note..."
  sleep 0.3
  echo -e "\r\033[K${GREEN}✓${RESET} Daily note loaded"
  sleep 0.2
  echo -e "${CYAN}⠋${RESET} Scanning registers..."
  sleep 0.3
  echo -e "\r\033[K${GREEN}✓${RESET} Registers scanned"
  sleep 0.5
  echo ""
  echo -e "${BOLD}Good morning, Lea.${RESET} Tuesday, April 8."
  echo ""
  echo -e "${BOLD}Yesterday:${RESET}"
  echo "  Finished wireframes for Atelier Morel (3 screens)."
  echo "  Portfolio stale — last update 12 days ago."
  echo ""
  echo -e "${BOLD}Today:${RESET}"
  echo "  1. Client review Atelier Morel (14h)"
  echo "  2. Portfolio: add Morel case study (high impact, 45 min)"
  echo "  3. Side project Bloom — parked since Thursday. Revisit or park?"
  echo ""
  echo -e "${DIM}Streak: 4 days. Level 3 — Le Navigateur. +45 XP yesterday.${RESET}"
  echo ""
}

demo_setup_express() {
  echo ""
  echo -e "${BOLD}NOESIS${RESET} ${DIM}Setup Agent${RESET}"
  echo ""
  sleep 0.3
  echo -e "${DIM}Scanning in the background...${RESET}"
  echo ""
  sleep 0.4
  echo "Let's start — what's your name, and what do you do?"
  echo ""
  sleep 0.8
  echo -e "${DIM}> ${RESET}Daniel. CEO, SaaS startup, 15 people. Pre-Series A."
  echo ""
  sleep 0.6
  echo "Work style — regular or bursts? Tools? How direct?"
  echo ""
  sleep 0.6
  echo -e "${DIM}> ${RESET}Regular. 6am starts. Linear, Slack, VS Code. Very direct."
  echo ""
  sleep 0.6
  echo "I found 8 project folders. What's active?"
  echo ""
  sleep 0.5
  echo -e "${DIM}> ${RESET}v2.0 ship, Series A close, VP Eng hire. The rest can wait."
  echo ""
  sleep 0.6
  echo "What should the system never do?"
  echo ""
  sleep 0.5
  echo -e "${DIM}> ${RESET}Never ask how I'm feeling. Just tell me the next blocker."
  echo ""
  sleep 0.8
  echo -e "${DIM}Building your system...${RESET}"
  echo ""
  sleep 0.3
  echo -e "${GREEN}✓${RESET} Profile created"
  sleep 0.15
  echo -e "${GREEN}✓${RESET} Portrait drafted"
  sleep 0.15
  echo -e "${GREEN}✓${RESET} 3 project files created"
  sleep 0.15
  echo -e "${GREEN}✓${RESET} 5 priority tasks generated"
  sleep 0.15
  echo -e "${GREEN}✓${RESET} Gamification configured"
  sleep 0.15
  echo -e "${GREEN}✓${RESET} Daily note written"
  sleep 0.15
  echo -e "${GREEN}✓${RESET} CLAUDE.md finalized"
  sleep 0.5
  echo ""
  echo -e "${CYAN}${BOLD}AXIS is ready.${RESET}"
  echo ""
  echo -e "${DIM}  v2.0 ships in 8 days. What's the current blocker?${RESET}"
  echo ""
}

demo_setup_deep() {
  echo ""
  echo -e "${BOLD}NOESIS${RESET} ${DIM}Setup Agent${RESET}"
  echo ""
  sleep 0.3
  echo -e "${DIM}Scanning in the background...${RESET}"
  echo ""
  sleep 0.4
  echo "This takes 5 to 15 minutes. I'll ask you a few questions"
  echo "while scanning your files in parallel."
  echo ""
  echo "Let's start — what's your name, and what do you do?"
  echo ""
  sleep 1
  echo -e "${DIM}> ${RESET}I'm Lea. Freelance UI/UX designer. I have ADHD — I"
  echo -e "${DIM}> ${RESET}manage 3 clients, a portfolio that's always behind,"
  echo -e "${DIM}> ${RESET}and side projects I keep starting without finishing."
  echo -e "${DIM}> ${RESET}I work in bursts, not schedules. Figma, Notion,"
  echo -e "${DIM}> ${RESET}sometimes just paper when my brain won't sit still."
  echo ""
  sleep 0.8
  echo "The side projects — is that something you want to fix,"
  echo "or is that how your creativity works?"
  echo ""
  sleep 0.7
  echo -e "${DIM}> ${RESET}Honestly? I don't know. It feels like a problem but"
  echo -e "${DIM}> ${RESET}also like it's just... how I am. Every new idea feels"
  echo -e "${DIM}> ${RESET}more exciting than finishing the last one."
  echo ""
  sleep 0.8
  echo "That's useful to know. Not a verdict — a hypothesis to"
  echo "test. How direct should I be when I notice that pattern?"
  echo ""
  sleep 0.7
  echo -e "${DIM}> ${RESET}Very direct. Don't sugarcoat. But don't lecture either."
  echo -e "${DIM}> ${RESET}Just ask the right question."
  echo ""
  sleep 0.8
  echo "I found 6 project folders. I see Atelier Morel (modified"
  echo "yesterday), Bloom (4 days ago), and a portfolio folder"
  echo "that hasn't been touched in 12 days."
  echo ""
  sleep 0.6
  echo -e "${DIM}> ${RESET}Morel is my main client. Bloom is the latest shiny"
  echo -e "${DIM}> ${RESET}thing. Portfolio — yeah. I know. It's the thing I keep"
  echo -e "${DIM}> ${RESET}not doing because it doesn't feel urgent."
  echo ""
  sleep 0.8
  echo "What should the system never do with you?"
  echo ""
  sleep 0.6
  echo -e "${DIM}> ${RESET}Never say 'great job'. Never use emojis. Never track"
  echo -e "${DIM}> ${RESET}my mood. If I abandon something, don't guilt me."
  echo -e "${DIM}> ${RESET}Just note it and move on."
  echo ""
  sleep 0.8
  echo -e "${DIM}Analyzing your writing style...${RESET}"
  sleep 0.6
  echo -e "${DIM}Found 4 text files (Notion exports, project notes).${RESET}"
  sleep 0.5
  echo -e "${DIM}Voice DNA: short sentences, visual metaphors, direct.${RESET}"
  echo ""
  sleep 0.6
  echo -e "${DIM}Building your system...${RESET}"
  echo ""
  sleep 0.3
  echo -e "${GREEN}✓${RESET} Profile created (USER.ENV/profil.md)"
  sleep 0.15
  echo -e "${GREEN}✓${RESET} Portrait drafted (USER.ENV/portrait.md)"
  sleep 0.15
  echo -e "${GREEN}✓${RESET} Voice DNA calibrated (USER.ENV/voice-dna.md)"
  sleep 0.15
  echo -e "${GREEN}✓${RESET} 4 project files created"
  sleep 0.15
  echo -e "${GREEN}✓${RESET} Gamification configured (5 categories, 18 levels)"
  sleep 0.15
  echo -e "${GREEN}✓${RESET} First daily note written"
  sleep 0.15
  echo -e "${GREEN}✓${RESET} Analysis report generated"
  sleep 0.15
  echo -e "${GREEN}✓${RESET} CLAUDE.md finalized"
  sleep 0.5
  echo ""
  echo -e "${CYAN}${BOLD}Nyx is ready.${RESET}"
  echo ""
  echo -e "  ${DIM}Done.${RESET}"
  echo ""
}

case "${1:-install}" in
  install) demo_install ;;
  bonjour) demo_bonjour ;;
  setup-express) demo_setup_express ;;
  setup-deep) demo_setup_deep ;;
  *) echo "Usage: $0 [install|bonjour|setup-express|setup-deep]" ;;
esac
