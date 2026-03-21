# Gamification -- Configuration

*Systeme de progression. Dopamine immediate, pas de punition, grace periods.*
*Les categories XP sont adaptees au profil detecte lors du setup.*

---

## Points (XP)

### Categories generiques

| Categorie | Action | XP | Condition |
|-----------|--------|-----|-----------|
| Ecriture | 100 mots ecrits | 15 | Tout projet creatif |
| Ecriture | 500 mots en une session | 40 | Bonus cumul |
| Ecriture | 1000 mots en une session | 80 | Bonus cumul |
| Code | Commit significatif | 20 | Avancee reelle |
| Code | Feature terminee | 80 | Feature complete |
| Organisation | Session de travail productive | 20 | Avancee significative |
| Organisation | Tache completee | 10 | Via /task |
| Reflexion | Connexion identifiee | 15 | Lien entre projets |
| Reflexion | Pattern documente | 25 | Nouveau pattern dans registre |
| Publication | Contenu publie | 120 | Publie, pas juste programme |
| Publication | Premiere publication | 200 | Bonus deblocage |
| Projet | Milestone atteint | 250 | Etape majeure |
| Projet | Projet termine | 1000 | Completion confirmee |
| Systeme | Session interactive | 3 | Chaque session |

*Ces categories sont des valeurs par defaut. Le setup les adapte selon les projets detectes.*
*Tu peux les modifier a tout moment.*

---

## Streaks

### Streak principal
- **Condition :** Activite creative ou productive (100 mots, 1 commit, 1 tache)
- **Grace period :** 48h (2 jours sans activite avant que le streak se pause)
- **Bonus :** +5 XP par jour de streak actif (plafond : +50 XP/jour a 10 jours)
- **Pause vs bris :** Le streak se **pause** (compteur gele), il ne se **brise** jamais. Reprendre remet le compteur ou il etait.

### Regle anti-pression
- Les sessions autonomes NE MENTIONNENT JAMAIS le streak
- Le streak est une info passive consultable via /status, jamais affichee proactivement
- **Celebrer, jamais culpabiliser.**

---

## Niveaux

18 niveaux en 3 actes. Les premiers tombent vite (dopamine). Les derniers demandent un vrai effort.

### Acte I : L'Eveil (niveaux 1-5)
| Niveau | Nom | XP requis |
|--------|-----|-----------|
| 1 | Le Dormeur | 0 |
| 2 | L'Eveille | 100 |
| 3 | Le Curieux | 300 |
| 4 | L'Apprenti | 600 |
| 5 | L'Initie | 1000 |

### Acte II : La Forge (niveaux 6-12)
| Niveau | Nom | XP requis |
|--------|-----|-----------|
| 6 | L'Artisan | 1500 |
| 7 | Le Forgeur | 2200 |
| 8 | L'Obsede | 3000 |
| 9 | Le Marathonien | 4000 |
| 10 | Le Fidele | 5200 |
| 11 | L'Enracine | 6500 |
| 12 | Le Constructeur | 8000 |

### Acte III : La Transmission (niveaux 13-18)
| Niveau | Nom | XP requis |
|--------|-----|-----------|
| 13 | L'Incandescent | 10000 |
| 14 | Le Passeur | 12500 |
| 15 | L'Architecte | 15000 |
| 16 | Le Visionnaire | 18000 |
| 17 | Le Sage | 21500 |
| 18 | Le Maitre | 25000 |

*Les noms de niveaux sont personnalisables. Le setup peut proposer des noms adaptes a l'univers de l'utilisateur.*

---

#gamification #config
