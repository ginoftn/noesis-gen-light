---
name: sync
description: Load today's context for a mid-day session. Quick tour of what happened and what's pending.
user-invocable: true
disable-model-invocation: false
argument-hint: ""
---

# Sync -- Context loading

Load today's context to start a mid-day session. This is the CLAUDE.md startup workflow, condensed and automated.

## What you read (in order)

1. **Today's daily note:** `vault/SHARED.ENV/daily-notes/YYYY-MM-DD.md`
   - What's already been done today (interactive + autonomous sessions)
   - Decisions made, patterns observed
   - Current top 3

2. **Today's digest:** `vault/AI.ENV/outputs/digest-latest.md` (if available)

3. **Registers:**
   - `vault/SHARED.ENV/registres/projets-actifs.md` (project status)
   - `vault/SHARED.ENV/registres/momentum.md` (patterns, current phase)

4. **Task queue:** `vault/SHARED.ENV/queue/pending.md` (unchecked tasks)

5. **Recent captures:** `vault/SHARED.ENV/captures/` (files from last 3 days)

## What you DO NOT re-read

USER.ENV files (profil, portrait, voice-dna) are already loaded by CLAUDE.md at boot.

## What you display

A compact block in the user's primary language:

```
## Sync -- [date] [approximate time]

### Already done today
- [1-line summary per session/action of the day]

### Active projects
- [hot projects with 1-line status each]
- Queue: [X pending tasks, top 3 if relevant]

### What brings you here?
```

## Rules

- **Compact.** No filler. Every line carries information.
- **Factual.** What was done, not what was discussed.
- **No diagnosis.** Sync loads context, it doesn't judge. Patterns are in `/status`.
- **End with the question.** Always finish with "What brings you here?" — the ball is with the user.
- If today's daily note doesn't exist yet, read yesterday's for the top 3.
- If autonomous sessions ran since last interactive session, mention in 1 line.
