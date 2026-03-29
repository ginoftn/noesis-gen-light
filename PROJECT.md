# NoesisGen Light -- PROJECT.md

*Point d'entree pour les agents et sessions de travail.*

## Qu'est-ce que NoesisGen Light

Starter kit open source (MIT) pour construire son propre OS cognitif sur Claude Code. Extrait de NOESIS.

- **Package npm** : `get-noesisgen-light` (v0.1.0, pas encore publie sur npm)
- **Installation locale** : `npx ~/Desktop/AppProjects/noesis-gen`
- **Installation npm (apres publication)** : `npx get-noesisgen-light`

## Structure

```
noesis-gen/
├── bin/index.js          -- CLI d'installation (point d'entree npx)
├── template/             -- Fichiers copies chez l'utilisateur
│   ├── CLAUDE.md         -- CLAUDE.md setup (guide la conversation initiale)
│   ├── CLAUDE-final.md.template  -- CLAUDE.md final (apres calibration)
│   ├── .claude/          -- Skills
│   ├── vault/            -- Structure vault de base
│   ├── scripts/          -- Scripts bash
│   ├── subagents/        -- Agents specialises
│   └── launchagents/     -- Plist templates
├── assets/               -- Banner ASCII, visuels
├── package.json          -- Config npm
├── README.md             -- Documentation publique
└── LICENSE               -- MIT
```

## Flow utilisateur

1. `npx get-noesisgen-light` → banner ASCII
2. Scan du vault/environnement existant
3. Conversation de calibration (Express ~5min / Deep ~15min)
4. Generation voice-dna personnalise
5. 7 skills installes dans `.claude/skills/`
6. Banner final + prochaines etapes

## Repo

- **Local** : `~/Desktop/AppProjects/noesis-gen/`
- **GitHub** : pas encore pousse (repo `ginoftn/noesis-gen` reference dans package.json)

## Test

```bash
cd ~/Documents/NoesisGenTest2 && npx ~/Desktop/AppProjects/noesis-gen
```

## Deadline

Presentation Tiff : 8 avril 2026

## Regles

- **Jamais partager** : architecture interne NOESIS (agents perso, skills perso, vault structure perso, prompts, CLAUDE.md de Gino)
- **Le template est generique** : adapte au profil de l'utilisateur, pas une copie de NOESIS
- L'acronyme public utilise **External** (pas Executive)

#NoesisGen #projet
