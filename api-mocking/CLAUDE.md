# CLAUDE.md

@AGENTS.md

Claude Code specific rules. Shared project info and rules are in `AGENTS.md` (imported above).

## Claude Code Workflow

- For big or unclear tasks, use **plan mode** first and wait for approval before implementing.
- Permissions are enforced in `.claude/settings.json`, not here. Don't ask for permission on allowed actions; never attempt denied ones.
- Use skills in `.claude/skills/` and subagents in `.claude/agents/` when a task matches them.
- Use `/clear` between unrelated tasks to keep context clean.
- Before saying a task is done, run the test and lint commands listed in `AGENTS.md`.

## Communication

- The user writes in **Roman Urdu**. Always reply in Roman Urdu (Latin script, never Devanagari/Hindi script).
- Code, file names and technical terms stay in English.
- Keep explanations short and simple.
