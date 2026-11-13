# AGENTS.md

Instructions for any AI coding agent (Claude Code, Codex, Cursor, Copilot, Gemini, etc.) working in this repository.

## Project Overview

`api-mocking` is a fault-injection proxy for testing app resilience. A user's app talks to our proxy instead of its real API; the proxy injects delays, random 500/503 errors and timeouts, and logs every request. A dashboard shows logs and stats.

Flow: `user's app -> Node.js proxy (faults) -> user's real server`

**Stack:** pnpm workspaces monorepo, `apps/proxy` (Node.js + Fastify, `@fastify/http-proxy`), `apps/web` (Next.js dashboard, Auth.js login), Postgres + Prisma. See `docs/decisions/`.

## Repository Structure

```
api-mocking/
├── AGENTS.md, CLAUDE.md, README.md
├── package.json, pnpm-workspace.yaml
├── apps/
│   ├── proxy/         # Fastify fault-injection proxy + control API
│   └── web/           # Next.js dashboard
├── packages/          # shared code (types) when needed
├── .claude/           # settings.json, skills/, agents/, rules/
└── docs/decisions/    # ADRs
```

Update this tree when you add new folders or important files.

## Setup & Commands

Use **pnpm** (not npm). Run from the repo root:

```bash
pnpm install        # install dependencies
pnpm dev            # run proxy (port 4000) and dashboard together
pnpm test           # run all tests
pnpm lint           # run linters
```

## Rules for Agents

1. **Keep it simple.** Clean, readable code. Don't over-engineer.
2. **Stay in scope.** Change only what the task asks for.
3. **Read first.** Look at existing code before editing it.
4. **Follow existing style.** Match naming, formatting and patterns already used.
5. **No secrets.** Never commit API keys, passwords or `.env` files.
6. **Verify your work.** Run tests/linter after changes.
7. **Ask when unclear.** Ask before big or ambiguous changes.
8. **Git safety.** Don't commit or push unless asked. Never force-push to `main`.
9. **Keep docs updated.** If structure or commands change, update this file and `README.md`.
10. **Record big decisions** as an ADR in `docs/decisions/`.
11. **Next.js is a new version.** Read `apps/web/AGENTS.md` before writing dashboard code.

## Commit Messages

Short and clear, format: `type(scope): summary` (e.g. `feat(proxy): add delay fault`).
