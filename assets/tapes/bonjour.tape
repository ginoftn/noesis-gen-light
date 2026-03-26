# VHS tape -- NoesisGen Light: /bonjour skill demo
# Run: cd ~/Desktop/AppProjects/noesis-gen && vhs assets/tapes/bonjour.tape

Output assets/bonjour.gif

Set Shell zsh
Set FontSize 14
Set Width 820
Set Height 480
Set Theme "Catppuccin Mocha"
Set Padding 20
Set TypingSpeed 60ms
Set CursorBlink false

# Alias so the typed command triggers the demo script
Hide
Type "alias 'claude'='bash assets/demo-output.sh bonjour #'"
Enter
Sleep 200ms
Show

Type "claude"
Sleep 300ms
Enter
Sleep 6s

Sleep 2s
