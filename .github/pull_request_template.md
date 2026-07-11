## Summary

- Jira:
- What changed:
- Why now:

## Scope

### In scope

-

### Out of scope

-

## Stack impact (Next.js + React + GraphQL)

- [ ] App Router boundaries are respected (`app` stays routing/composition layer)
- [ ] UI remains presentation-only; orchestration is in hooks/model
- [ ] GraphQL operations are centralized in `shared/api/graphql/operations/**`
- [ ] No inline GraphQL query/mutation/subscription in UI files
- [ ] Auth rule is preserved (`loginAdmin` without Basic, other admin ops with Basic)
- [ ] Nullable data is handled with explicit UI fallbacks

## Architecture impact

- [ ] No architecture boundary changes
- [ ] Architecture boundary changes (requires `.ai/policy.md` update)

If architecture change is checked:

- add label `policy-change`
- fill `Contract change` section
- update policy version metadata

## Contract change

- What changed:
- Why:
- Impact/Migration:
- Policy version updated:

## Mandatory checklist

- [ ] `pnpm verify` is green locally (lint, lint:styles, typecheck, format:check)
- [ ] `pnpm run ci:check` is green (strict lint:ci + lint:styles:ci + typecheck + format:check + build)
- [ ] No new `any` in production code
- [ ] No FSD boundary violations (`import/no-restricted-paths` passes)
- [ ] Manual verification scenarios are listed
- [ ] Risks and rollback strategy are documented
- [ ] `.ai/contracts/*` reviewed for impacted locked behavior

## Verification evidence

### Automated

- `pnpm verify`:
- `pnpm run ci:check`:
- Additional commands and results:

### Manual

- Scenario 1:
- Scenario 2:

## Risks and Rollback

- Risks:
- Rollback plan:
