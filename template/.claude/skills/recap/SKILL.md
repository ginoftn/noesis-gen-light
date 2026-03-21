---
name: recap
description: End-of-session summary. Updates daily note with what was done, decisions, and next steps.
user-invocable: true
disable-model-invocation: false
argument-hint: "[write] -- no argument = display only, 'write' = write to daily note"
---

# Recap -- Session summary

Generate a structured summary of the current session.

## What you do

1. **Read current time** with `date "+%H:%M"` — MANDATORY
2. **Determine time of day:** morning (05-11h), afternoon (12-17h), evening (18-22h), night (23-04h)
3. Analyze the current conversation (everything that happened in this session)
4. Read today's daily note to see what's already documented
5. Count existing sessions of the same time-of-day to number this one (#2, #3...)

## Recap format

```
## Interactive session [time of day] [#N if multiple]

**Duration:** estimate
**Energy:** [1-line observation]

---

### What was done

[Numbered list of concrete actions, not intentions]

---

### Decisions made

[Decisions validated during session, if any]

---

### Emerging ideas

[Ideas, leads, connections that appeared — even unvalidated]

---

### Emotional state

[1-2 lines on energy/tone of the session]

---

### Top 3 for tomorrow

1. [Concrete action #1]
2. [Concrete action #2]
3. [Concrete action #3]
```

## Modes

### `/recap` (display mode)
- Generate and display the recap in chat
- Touch no files
- User can review, adjust, then ask `/recap write`

### `/recap write` (write mode)
- Generate the recap AND append to today's daily note
- If daily note doesn't exist, create it from template
- Confirm with file path

## Style

- Factual, compact, no filler
- Action verbs ("Created", "Fixed", "Decided", not "We discussed...")
- Documents what HAPPENED, not what was PLANNED
- Top 3: concrete actions, not vague directions
- Write in the user's primary language
