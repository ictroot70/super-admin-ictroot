# Super Admin — ICTRoot

Internal super-admin panel for managing users, payments, and posts via GraphQL API.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| UI Runtime | React 19 |
| API | GraphQL — `@apollo/client` + `graphql-ws` |
| Styling | Tailwind CSS v4 + SCSS Modules |
| Forms | React Hook Form + Zod |
| State | Zustand |
| Package Manager | pnpm 10 |
| CI/CD | GitHub Actions + Jenkins → Docker → Kubernetes |
| Monitoring | Sentry |

## Prerequisites

- Node.js >= 20
- pnpm 10.11.1 (`npm install -g pnpm@10.11.1`)

**pnpm only.** Do not use `npm install` or `yarn` — it will create conflicting lock files and break CI.

## Getting Started

```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment
cp .env.example .env.local
# Fill in the values in .env.local

# 3. Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_BASE_API_URL` | Base REST API URL |
| `NEXT_PUBLIC_GRAPHQL_HTTP_URL` | GraphQL HTTP endpoint |
| `NEXT_PUBLIC_GRAPHQL_WS_URL` | GraphQL WebSocket endpoint (subscriptions) |

See `.env.example` for the full list.

## Available Scripts

```bash
pnpm dev              # Start development server
pnpm build            # Production build
pnpm start            # Start production server
pnpm typecheck        # TypeScript check (tsc --noEmit)
pnpm lint             # ESLint
pnpm lint:styles      # Stylelint
pnpm format           # Prettier (write)
pnpm format:check     # Prettier (check only)
pnpm verify           # lint + lint:styles + typecheck + format:check
pnpm run ci:check     # Full CI gate (verify + build, --max-warnings 0)
pnpm codegen          # Generate GraphQL types from schema
pnpm codegen:watch    # Watch mode for codegen
```

## Project Structure

```
app/                        # Next.js App Router — routing and layout composition only
  (super-admin)/            # Route group: admin panel pages
features/                   # Feature modules (orchestration, hooks, model)
  admin/
entities/                   # Domain entities (data contracts, UI primitives)
  admin/
shared/                     # Shared utilities, UI kit, API layer
  api/graphql/operations/   # All GraphQL queries, mutations, subscriptions
  lib/                      # Utilities and helpers
  ui/                       # Shared UI components
widgets/                    # Composite UI blocks (header, sidebar)
public/                     # Static assets
```

Dependency direction (enforced by ESLint `import/no-restricted-paths`):

```
app → features → entities → shared
```

Cross-imports between unrelated modules are prohibited.

## Architecture Rules

This project follows a strict architecture policy. Before making changes, read:

- `.ai/policy.md` — architecture invariants (source of truth)
- `.ai/quality-gates.md` — what must be green before merge
- `.ai/anti-patterns.md` — prohibited patterns
- `.ai/naming-conventions.md` — file and folder naming rules
- `.ai/playbooks/` — how to implement features, debug, review PRs

## GraphQL

All GraphQL operations are centralized in `shared/api/graphql/operations/`:

```
operations/
  queries/        # get-*.graphql
  mutations/      # verb-based names (e.g. ban-user.graphql)
  subscriptions/  # event-based names (e.g. post-added.graphql)
```

Inline GraphQL strings in UI or feature files are prohibited.

Generate typed operations after schema changes:

```bash
pnpm codegen
```

## Auth Rules

- `loginAdmin` — called **without** `Authorization` header.
- All other admin GraphQL operations — called **with** `Authorization: Basic base64(email:password)`.

## Sprint Documentation

Sprint planning files, task decomposition, and handoff contracts are in `docs/`:

| File | Description |
|---|---|
| `docs/sprint-8-admin-plan-and-workflow.ru.md` | Main plan: scope, GraphQL contracts, task breakdown, DoD |
| `docs/sprint-8-collaboration-plan-and-ownership.ru.md` | Team ownership, phases, handoff contracts |
| `docs/sprint-8-a0-baseline-quality-gates.ru.md` | Baseline quality gate status at sprint start |
| `docs/sprint-8-a1-integration-artifact.ru.md` | A1 handoff: Apollo entrypoints, auth contract |
| `docs/sprint-8-a6-1-handoff-a6-2.ru.md` | A6.1→A6.2 handoff: cursor state, dedupe policy |

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- Branch and PR workflow
- Quality gate requirements
- Code review checklist

## Deployment

The app is containerized and deployed to Kubernetes via Jenkins CI/CD:

1. Jenkins builds a Docker image on push to `main`
2. Image is pushed to DockerHub (`dockerforict/super-admin`)
3. Kubernetes deployment is updated via `kubectl apply`

For environment and CI/CD details see `.ai/cloud.md`.
