# Contributing Guide

This document covers the permanent contribution rules for this repository.
Sprint-specific task decomposition and ownership plans live in `docs/`.

## Table of Contents

- [Branch Strategy](#branch-strategy)
- [Package Manager](#package-manager)
- [Development Workflow](#development-workflow)
- [Architecture Rules](#architecture-rules)
- [Code Standards](#code-standards)
- [Quality Gates](#quality-gates)
- [Pull Request Process](#pull-request-process)
- [Release Boundary](#release-boundary)

---

## Branch Strategy

```
main        — production-ready, protected
develop     — integration branch for features
feature/*   — individual feature branches, cut from develop
```

- Branch from `develop`, merge back to `develop`.
- Only release-ready code goes to `main` via PR from `develop`.
- Direct pushes to `main` are prohibited.

---

## Package Manager

**pnpm only.** Version is locked in `packageManager` field in `package.json`.

```bash
# Install pnpm if not present
npm install -g pnpm@10.11.1

# Install dependencies
pnpm install
```

Do not run `npm install` or `yarn` in the repo root — it creates conflicting lock files and breaks CI (`pnpm install --frozen-lockfile`).

---

## Development Workflow

```bash
# 1. Cut branch from develop
git checkout develop && git pull
git checkout -b feature/your-feature-name

# 2. Install dependencies (if not done)
pnpm install

# 3. Start dev server
pnpm dev

# 4. After changes — run local quality check
pnpm verify

# 5. Open PR to develop
```

### GraphQL type generation

After adding or modifying `.graphql` operation files, regenerate types:

```bash
pnpm codegen
```

Commit the generated files alongside the operation changes.

---

## Architecture Rules

Full invariants are in `.ai/policy.md` — read it before any significant change.

### Layer structure (FSD)

```
app/        Routing, layout composition only. No business logic.
features/   Orchestration, hooks, state transitions, side effects.
entities/   Domain data contracts and UI primitives.
shared/     Utilities, UI kit, API layer. No imports from upper layers.
widgets/    Composite UI blocks assembled from features and entities.
```

### Dependency direction

```
app → features → entities → shared
```

Enforced automatically by ESLint `import/no-restricted-paths`. Cross-imports between unrelated modules require an explicit ownership contract.

### Key invariants

- UI components are presentation-only — no business logic, no network calls.
- All GraphQL operations live in `shared/api/graphql/operations/` — no inline queries in UI.
- Nullable GraphQL fields must have explicit UI fallbacks — missing fallback is a bug.
- Shared flows (e.g. moderation) are reused via public API export, never duplicated.
- `loginAdmin` is called without `Authorization` header. All other admin GraphQL operations use `Authorization: Basic base64(email:password)`.

### Prohibited patterns

See `.ai/anti-patterns.md` for the full list. Key ones:

- Business logic in UI/presentation components
- Inline GraphQL query/mutation/subscription strings in UI
- Importing `shared` from `entities` or `features` (upward direction)
- Adding `any` to mask a type contract
- PR without quality gate evidence

---

## Code Standards

### Naming conventions

See `.ai/naming-conventions.md` — mandatory for all new and renamed files.

| Entity | Style | Example |
|---|---|---|
| Folders | `kebab-case` | `user-profile/` |
| React components | `PascalCase` | `UserCard.tsx` |
| Hooks | `camelCase` | `useAuth.ts` |
| Utilities / helpers | `camelCase` | `formatDate.ts` |
| CSS Modules | `camelCase` | `userCard.module.css` |
| Test files | Tested file name + `.test` | `UserCard.test.tsx` |

Next.js App Router convention files (`page.tsx`, `layout.tsx`, route groups, dynamic segments) keep their framework names.

### TypeScript

- `strict: true` is enforced — no exceptions.
- No `any` in production code.
- Nullable fields from GraphQL schema must be reflected in TypeScript models.

### Formatting

Prettier and ESLint run automatically on commit via Husky + lint-staged.

To run manually:

```bash
pnpm format        # fix formatting
pnpm lint:fix      # fix lint issues
pnpm lint:styles:fix  # fix style lint issues
```

---

## Quality Gates

Every PR must pass the full CI gate:

```bash
pnpm run ci:check
```

Which consists of:

| Check | Command |
|---|---|
| ESLint (zero warnings) | `pnpm lint:ci` |
| Stylelint (zero warnings) | `pnpm lint:styles:ci` |
| TypeScript | `pnpm typecheck` |
| Prettier | `pnpm format:check` |
| Production build | `pnpm build` |

Run `pnpm verify` locally for a fast pre-PR check (skips build).

### Manual verification

For every PR, verify the flows touched by the change:

- Auth flow (login/logout)
- Users flow (list, search, sort, moderation)
- User details (tabs, pagination, null-safe rendering)
- Payments flow
- Posts realtime flow (if subscriptions are touched)

For changes in shared, auth, or realtime layers — also run cross-flow smoke to confirm neighboring features are not broken.

---

## Pull Request Process

### Before opening a PR

- [ ] `pnpm verify` is green locally
- [ ] `pnpm run ci:check` is green
- [ ] No new `any` in production code
- [ ] No FSD boundary violations
- [ ] Naming conventions followed (`.ai/naming-conventions.md`)
- [ ] If architecture changed — `.ai/policy.md` updated and version bumped
- [ ] If locked behavior changed — `.ai/contracts/*` updated

### PR size and scope

- One PR = one clear risk domain.
- Keep PRs small and incremental — prefer reviewability over batching.
- If a PR changes shared code, explicitly describe the impact on adjacent flows.

### PR description

Use the PR template (`.github/pull_request_template.md`). Required sections:

- **Summary** — what changed and why
- **Scope** — in scope / out of scope
- **Stack impact checklist** — Next.js, React, GraphQL invariants
- **Mandatory checklist** — quality gates, no `any`, no boundary violations
- **Verification evidence** — commands run + manual scenarios checked
- **Risks and rollback** — what could break and how to revert

### Review

- At least one approval required before merge.
- Reviewer checks architecture boundaries, stack invariants, and PR evidence.
- See `.ai/playbooks/pr-review.md` for the full review checklist.

---

## Release Boundary

Certain governance files are **protected from appearing in PRs targeting `main`**:

```
.ai/**
.github/**
AGENTS.md
CONTRIBUTING.md
scripts/check-main-release-boundary.mjs
```

A PR to `main` that touches these files will fail the `release-boundary` CI check.

To bypass in approved infra cases only — add the label `infra-exception` to the PR.
