# AGENTS.md

Instructions for any AI coding agent (Claude Code, Codex, Cursor, Copilot, Gemini, etc.) working in this repository.

## Project Overview

`claude-practice` is a small practice project for learning how to work with AI coding agents.

## Repository Structure

```
claude-practice/
├── AGENTS.md   # Instructions for all AI agents (this file)
├── CLAUDE.md   # Extra rules for Claude Code
└── README.md   # Project overview for humans
```

Update this tree when you add new folders or important files.

## Setup & Commands

No tech stack yet. When one is added, list the commands here, for example:

```bash
# install dependencies
# run the app
# run tests
# run linter
```

## Most Important Rule

**Always ask before doing anything.** Never act on your own. Get the user's permission before every change, small or big: editing files, creating files, running commands, commits, everything. Do only what was asked. If you think something extra is needed, suggest it and wait for a "yes".

## Rules for Agents

1. **Keep it simple.** Write clean, readable code. Don't over-engineer.
2. **Stay in scope.** Change only what the task asks for.
3. **Read first.** Look at existing code before editing it.
4. **Follow existing style.** Match the naming, formatting, and patterns already used.
5. **No secrets.** Never add API keys, passwords, or `.env` files to the repo.
6. **Verify your work.** Run the code, tests, or linter after making changes.
7. **Ask when unclear.** If the task is ambiguous, ask before making big changes.
8. **Git safety.** Don't commit or push unless asked. Never force-push to `main`.
9. **Keep docs updated.** If you change structure or commands, update this file and `README.md`.

## Commit Messages

Use short, clear messages in this format:

```
type: short description
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

Example: `docs: add setup commands to AGENTS.md`

## Communication

- The user may write in Roman Urdu or English. Reply in the same language.
- Keep explanations short and simple.
