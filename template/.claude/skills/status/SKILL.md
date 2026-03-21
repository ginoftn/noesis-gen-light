---
name: status
description: Dashboard showing project status, momentum, pending tasks, XP level, and agent health.
user-invocable: true
disable-model-invocation: false
argument-hint: "[project] -- no argument = full dashboard, with project name = detailed project view"
---

# Status -- NOESIS Dashboard

Display an ASCII dashboard of the cognitive system state.

## What you read

1. `vault/SHARED.ENV/gamification/xp-tracker.md` (level, XP, streaks)
2. `vault/SHARED.ENV/gamification/config.md` (level thresholds)
3. `vault/SHARED.ENV/registres/projets-actifs.md` (project status)
4. `vault/SHARED.ENV/registres/momentum.md` (patterns, current phase)
5. `vault/SHARED.ENV/queue/pending.md` (pending tasks)
6. Latest daily note in `vault/SHARED.ENV/daily-notes/`
7. Agent logs in `vault/AI.ENV/logs/`

## `/status` (full dashboard)

```
╔══════════════════════════════════════════╗
║  NOESIS -- YYYY-MM-DD                   ║
╠══════════════════════════════════════════╣
║  XP: XXX  Lv.X Title  [visual]         ║
║  [==========..........] XX% → Next      ║
║  Streak: Xd                             ║
╠══════════════════════════════════════════╣
║  ACTIVE PROJECTS                        ║
║  ● PROJ1  [###-------] short status     ║
║  ● PROJ2  [#####-----] short status     ║
║  ○ PROJ3   dormant description          ║
╠══════════════════════════════════════════╣
║  MOMENTUM: [qualifier]  [↑→↓]          ║
║  7d: ██ ░░ ██ ██ ░░ ░░ ██  (X/7 active)║
║  Last creative activity: PROJ DD/MM     ║
╠══════════════════════════════════════════╣
║  QUEUE: X task(s) pending               ║
║  [brief list if < 3 tasks]             ║
╠══════════════════════════════════════════╣
║  AGENTS                                 ║
║  [✓|✗|⏳] Digest     [DD/MM] [status]  ║
║  [✓|✗|⏳] Auto sess. [DD/MM] [status]  ║
║  [✓|✗|⏳] Inbox      [DD/MM] [status]  ║
║  [✓|✗|⏳] Maintenance[DD/MM] [status]  ║
╚══════════════════════════════════════════╝
```

### Display rules

- `●` = project with recent activity (<7d), `○` = dormant
- Progress bars from real data (chapters, articles, milestones)
- Sort: priority first, then by recent activity
- If a pattern is detected (burst, silence >7d on priority, dispersion), show an alert line
- **Agents:** check current time before marking absent. `⏳` = not yet (before scheduled time), `✓` = OK, `✗` = error or missed

## `/status PROJECT` (project focus)

Read the project file in `vault/SHARED.ENV/registres/projets/` and display: status, completion, last activity, next suggested step, connections to other projects.

## Style

- ASCII box drawing (╔═╗║╚═╝)
- Progress bars: `[###-------]`
- Factual, zero filler. Data speaks.
- If an alert signal exists, show it without guilt-tripping
- Communicate in the user's primary language
