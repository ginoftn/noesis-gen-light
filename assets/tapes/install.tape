# VHS tape -- NoesisGen Light: install demo
# Pre-req: /tmp/vhs-bin/npx must exist (creates demo output)
# Run: cd ~/Desktop/AppProjects/noesis-gen && vhs assets/tapes/install.tape

Output assets/install.gif

Set Shell zsh
Set FontSize 14
Set Width 820
Set Height 540
Set Theme "Catppuccin Mocha"
Set Padding 20
Set TypingSpeed 0
Set CursorBlink false

Type "export PATH=/tmp/vhs-bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin && clear"
Enter
Sleep 500ms

Set TypingSpeed 60ms

Type "npx get-noesisgen-light"
Sleep 400ms
Enter
Sleep 12s
Sleep 3s
