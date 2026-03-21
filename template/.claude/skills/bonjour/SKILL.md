---
name: bonjour
description: First session of the day. Checks time, loads adapted context, presents the daily brief.
user-invocable: true
disable-model-invocation: false
argument-hint: ""
---

# Bonjour -- First interactive session of the day

This skill is for the FIRST session only. For subsequent sessions, use `/sync`.

## Step 1: Check current time

Run `date "+%Y-%m-%d %H:%M %A"` — MANDATORY, before anything else.

Determine the moment:
- 05h-11h59: `morning` — energetic greeting
- 12h-17h59: `afternoon` — casual greeting
- 18h-22h59: `evening` — focused, lighter context load
- 23h-04h59: `night` — minimal, complicit

## Step 2: Load context (adapted to time)

### Always (any time of day)

1. Today's daily note: `vault/SHARED.ENV/daily-notes/YYYY-MM-DD.md`
2. Today's digest: `vault/AI.ENV/outputs/digest-latest.md` (if available)
3. Active objectives: `vault/SHARED.ENV/registres/projets-actifs.md`

### Morning or afternoon (before 18h) — full load

4. Momentum: `vault/SHARED.ENV/registres/momentum.md`
5. Annual + quarterly objectives: `vault/USER.ENV/objectifs/annuel.md` + `trimestriel.md`
6. Today's agent outputs: `vault/AI.ENV/outputs/` (files from today)

### Evening or night (18h+) — light load

4. Momentum: "Current focus" section only
5. Agent outputs only if new since last session
6. DO NOT reload projets-actifs or annual objectives — too heavy for evening

## Step 3: Check autonomous sessions

If autonomous sessions (digest, auto session) have already run today:
- Mention in 1 line what they produced
- If no output visible, note it (not an anomaly if before scheduled time)

## Step 4: Display the brief

Format adapted to the moment, in the user's primary language:

```
## [Greeting] -- [day] [date], [time]

### Today
- [remaining schedule, key events]
- [autonomous sessions if already run]

### Active projects [EVENING: replace with "Tonight"]
- [hot projects, 1 line each]
- [XP streak if relevant]

### What brings you here?
```

**Evening/night:** reduce "Active projects" to the strict minimum. No full panorama.

## Step 5: Ask for invisible context

Always end by asking what happened in spaces the system can't see (other tools, reflections, conversations, reading). Integrated in "What brings you here?" — no need for a separate question unless the day has been long.

## Rules

- **NEVER invoke this skill if an interactive session already happened today.** Use `/sync` instead.
- USER.ENV files (profil, portrait, voice-dna) are loaded by CLAUDE.md at boot — don't re-read here.
- Compact. Every line carries information. No filler.
- Tone adapts to the moment: energetic morning, focused evening, complicit night.
- Communicate in the user's primary language.
