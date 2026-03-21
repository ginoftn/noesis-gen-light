---
name: task
description: Add a task to the NOESIS task queue (pending.md) in Obsidian Tasks format.
user-invocable: true
disable-model-invocation: false
argument-hint: "[task description] -- e.g. /task Finish chapter 3 #project/novel"
---

# Task -- Add to queue

Add a task to `vault/SHARED.ENV/queue/pending.md`.

## What you do

1. Take the description from $ARGUMENTS
2. Ask for priority if not obvious (⏫ high, 🔼 medium, 🔽 low)
3. Add the task in Obsidian Tasks format under "## A faire" / "## To do":
   ```
   - [ ] Task description 📅 YYYY-MM-DD ⏫ #project-tag
   ```
4. Confirm the addition
5. If the task is linked to a project, add a #project tag

## Obsidian Tasks format

- `- [ ]` = to do
- `- [x]` = done
- `📅 YYYY-MM-DD` = due date
- `⏫` = high priority
- `🔼` = medium priority
- `🔽` = low priority
- `✅ YYYY-MM-DD` = completion date

## Examples

`/task Reread chapter 3` →
`- [ ] Reread chapter 3 📅 2026-03-25 🔼`

`/task Publish article on Substack` →
`- [ ] Publish article on Substack 📅 2026-03-28 ⏫ #substack`

## Note

Tasks will be picked up by the auto session if the user doesn't handle them first.
