# api-mocking

A fault-injection proxy: test how your app behaves when its API is slow, returns errors, or times out.

Stack: pnpm monorepo, Fastify proxy, Next.js dashboard, Postgres.

## Quick Start

```bash
pnpm install
pnpm dev     # proxy on :4000, dashboard on :3000
pnpm test
pnpm lint
```

## Project Layout

See the tree in [AGENTS.md](AGENTS.md).

## Working with AI agents

- `AGENTS.md`: shared instructions for any AI agent
- `CLAUDE.md`: Claude Code specific rules
- `.claude/`: shared settings, skills, subagents and rules
- `docs/decisions/`: why we made key decisions
