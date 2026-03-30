# Gamification -- Configuration

*Progression system. Immediate dopamine, no punishment, grace periods.*
*XP categories are adapted to the user's profile during setup.*

---

## Points (XP)

### Categories generiques

| Category | Action | XP | Condition |
|----------|--------|-----|-----------|
| Writing | 100 words written | 15 | Any creative project |
| Writing | 500 words in one session | 40 | Cumulative bonus |
| Writing | 1000 words in one session | 80 | Cumulative bonus |
| Code | Significant commit | 20 | Real progress |
| Code | Feature finished | 80 | Complete feature |
| Organization | Productive work session | 20 | Significant progress |
| Organization | Task completed | 10 | Via /task |
| Reflection | Connection identified | 15 | Link between projects |
| Reflection | Pattern documented | 25 | New pattern in register |
| Publication | Content published | 120 | Published, not just scheduled |
| Publication | First publication | 200 | First-time bonus |
| Project | Milestone reached | 250 | Major milestone |
| Project | Project completed | 1000 | Confirmed completion |
| System | Interactive session | 3 | Each session |

*These are default categories. Setup adapts them to detected projects. You can modify them anytime.*

---

## Streaks

### Main streak
- **Condition:** Creative or productive activity (100 words, 1 commit, 1 task)
- **Grace period:** 48h (2 days without activity before the streak pauses)
- **Bonus:** +5 XP per active streak day (cap: +50 XP/day at 10 days)
- **Pause vs break:** The streak **pauses** (counter frozen), it never **breaks**. Resuming restores the counter where it was.

### Anti-pressure rule
- Autonomous sessions NEVER mention the streak
- The streak is passive info viewable via /status, never displayed proactively
- **Celebrate, never guilt.**

---

## Levels

18 levels in 3 acts. Early levels come fast (dopamine). Later ones require real effort.

### Act 1 — Awakening (lv. 1-5)
| Level | Name | XP required |
|-------|------|-------------|
| 1 | Sleeper | 0 |
| 2 | Spark | 100 |
| 3 | Explorer | 300 |
| 4 | Apprentice | 600 |
| 5 | Initiate | 1000 |

### Act 2 — Building (lv. 6-12)
| Level | Name | XP required |
|-------|------|-------------|
| 6 | Maker | 1500 |
| 7 | Builder | 2200 |
| 8 | Shaper | 3000 |
| 9 | Architect | 4000 |
| 10 | Adept | 5200 |
| 11 | Mentor | 6500 |
| 12 | Guide | 8000 |

### Act 3 — Mastery (lv. 13-18)
| Level | Name | XP required |
|-------|------|-------------|
| 13 | Pioneer | 10000 |
| 14 | Weaver | 12500 |
| 15 | Strategist | 15000 |
| 16 | Guardian | 18000 |
| 17 | Founder | 21500 |
| 18 | Sovereign | 25000 |

*Level names are customizable. The setup agent proposes names adapted to the user's world.*

---

#gamification #config
