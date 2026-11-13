# 0001: Choose the stack

- Status: Accepted
- Date: 2026-11-13

## Context

Users need to test how their app handles slow, failing or timing-out APIs. We need a proxy between their app and their real server that injects faults.

## Decision

- Node.js reverse proxy with **Fastify** + `@fastify/http-proxy`; faults applied in hooks (delay, 500/503, timeout).
- Dashboard in **Next.js** with Auth.js login.
- **Postgres** with Prisma for users, projects, rules and request logs.
- **pnpm** workspaces monorepo: `apps/proxy`, `apps/web`.
- Toxiproxy is not used (HTTP-level faults are enough for MVP).

## Consequences

- One Fastify server hosts both the proxy path and the control API.
- The proxy only sees network behavior; app crashes are seen by the user and correlated via logs.
- The proxy identifies projects by a project key in the URL, not by login.
