---
name: deepwork
description: Deep work mode. Loads full project context, structures in pomodoros, auto-recap at the end.
user-invocable: true
disable-model-invocation: false
argument-hint: "<PROJECT> [DURATION in minutes, default 60]"
---

# Deep Work -- Immersive session

Start an immersive creative work session. Everything loaded, everything ready, minimize interruptions.

## Prerequisites

$ARGUMENTS must contain at least a project name. If absent, ask.
Duration is optional (default 60 minutes).

## Phase 1: Context loading (silent)

Read everything without displaying details, just a loading message:

1. Project file: `vault/SHARED.ENV/registres/projets/<PROJECT>.md`
2. Latest daily note: `vault/SHARED.ENV/daily-notes/`
3. Momentum: `vault/SHARED.ENV/registres/momentum.md`
4. Voice-dna (project-relevant parts): `vault/USER.ENV/voice-dna.md`
5. XP tracker: `vault/SHARED.ENV/gamification/xp-tracker.md`

## Phase 2: Briefing (compact)

```
+======================================================+
|  DEEP WORK -- PROJECT (Xmin)                         |
+======================================================+
|  CONTEXT                                              |
|  Last activity: [date + what]                         |
|  State: [completion + next step]                      |
|  Estimated energy: [based on time + momentum]         |
|                                                       |
|  SESSION PLAN                                         |
|  P1  [00:00-00:25]  [micro-objective 1]              |
|  --  [5min break]                                     |
|  P2  [00:30-00:55]  [micro-objective 2]              |
|  [+ more if duration > 60min]                         |
|                                                       |
|  Ready? (or adjust the plan)                          |
+======================================================+
```

Pomodoro structure:
- 30min → 1x25 + 5min break
- 60min → 2x25 + 10min breaks
- 90min → 3x25 + 15min breaks
- 120min → 4x25 + breaks + long break

## Phase 3: Work (focus)

- Stay on the project. Don't suggest digressions.
- If the user drifts, gently refocus: "Save that for after? Pomodoro is running."
- No /status, no /sync during deep work.
- Note off-topic ideas in an internal buffer for the recap.

## Phase 4: Auto-recap (at the end)

When the session ends (user says "stop" or time is up):

```
+======================================================+
|  END DEEP WORK -- PROJECT                            |
+======================================================+
|  Actual duration: Xmin                                |
|  Pomodoros completed: X/Y                             |
|  XP earned: +XX                                       |
|                                                       |
|  WHAT WAS DONE                                        |
|  [factual list]                                       |
|                                                       |
|  BUFFERED IDEAS (off-topic)                           |
|  - [idea 1 -- save to captures?]                      |
|  - [idea 2]                                           |
|                                                       |
|  NEXT DEEP WORK SUGGESTED                             |
|  -> [next logical step + suggested duration]          |
+======================================================+
```

1. Update `vault/SHARED.ENV/gamification/xp-tracker.md` with earned XP
2. Write the recap to today's daily note (same format as `/recap write`)
3. Offer to save buffered ideas to `vault/SHARED.ENV/captures/`

## Style

- Compact briefing, no filler
- During work: maximum focus, creation-oriented responses
- Recap: factual, celebratory if productive, neutral otherwise
- Never guilt-trip if deep work is shorter than planned
- Communicate in the user's primary language
