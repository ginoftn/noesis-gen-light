---
name: profile-deep
description: Enrich profile, portrait, and voice-dna by analyzing the user's writing and work patterns.
user-invocable: true
disable-model-invocation: false
argument-hint: "[focus] -- no argument = full analysis, 'voice' = voice-dna only, 'patterns' = patterns only"
---

# Profile Deep -- Enrich your cognitive profile

Analyze the user's files and writing to deepen the profile, portrait, and voice-dna. Can be run as many times as wanted — each pass adds depth.

## What you do

### Step 1: Scan for material

Scan the user's project directories for text content:
- Look for .md, .txt files modified in the last 90 days
- Prioritize: long files (>500 words), creative writing, personal notes
- Identify 5-10 candidate files across different projects
- Show the list to the user: "I found these files. OK to analyze the style? I'll read how you write, not what you write."

### Step 2: Voice analysis (via subagent)

Launch the voice-analyzer subagent (`subagents/voice-analyzer-CLAUDE.md`) with the approved file list.

The subagent analyzes:
- Sentence length, register, recurring tics, rhythm, narrative voice
- Patterns across files (not just within one)
- What's absent from the writing

Update `vault/USER.ENV/voice-dna.md` Part 2 with the results. If Part 2 already exists, enrich it (don't overwrite — add new observations, confirm or revise existing ones).

### Step 3: Pattern analysis

From the file scan + conversation history + daily notes, identify:
- **Work patterns:** When does the user work? In bursts or steadily? Morning or night?
- **Project patterns:** How many projects started vs finished? Common themes?
- **Behavioral patterns:** Does the user start more than finish? Organize instead of do? Theorize instead of act?

Update `vault/USER.ENV/portrait.md` with new observations. Show changes to the user before writing.

### Step 4: Red threads

Look across all detected projects for recurring themes — the deep connections:
- Shared motifs, characters, ideas
- Complementary projects (one explores what another avoids)
- Evolution over time (what the user returns to)

Update `vault/USER.ENV/voice-dna.md` Part 3 (Red threads). Show to user before writing.

### Step 5: Profile summary

If `vault/USER.ENV/profil.md` has empty sections or thin content, propose enrichments based on everything analyzed. Show diff to user before writing.

## Modes

### `/profile-deep` (full analysis)
Runs all 5 steps.

### `/profile-deep voice` (voice only)
Runs steps 1-2 only. Quick voice-dna enrichment.

### `/profile-deep patterns` (patterns only)
Runs steps 3-4 only. No file reading, just analysis from existing data.

## Rules

- **Always ask before reading files.** Show the list, get approval.
- **Analyze style, not content.** "Uses em dashes heavily" not "writes about loss."
- **Show changes before writing.** The user validates every edit to USER.ENV.
- **Additive, not destructive.** Each pass enriches, never overwrites previous analysis.
- **Write in the user's primary language.**
- This is the ONLY skill that writes to USER.ENV (besides the initial setup).
