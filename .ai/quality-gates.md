# Quality Gates

## Goal

Качество проверяется на трех уровнях: локально, в PR, перед merge/release.

## Current mandatory gates (active)

Для каждого PR обязательно green:

- `pnpm run ci:check`

Эквивалентный состав (если запускать по шагам):

- `pnpm lint:ci` — ESLint с `--max-warnings 0`
- `pnpm lint:styles:ci` — Stylelint с `--max-warnings 0`
- `pnpm typecheck` — `tsc --noEmit` (включает `strict: true`)
- `pnpm format:check` — Prettier по **code-scope** (без churn по документации и произвольным метаданным): glob `**/*.{js,mjs,cjs,jsx,ts,tsx,css,scss,graphql}` плюс корневой `package.json` (для `prettier-plugin-packagejson`). Не входят: `*.md`, произвольные `*.json` / `*.yml` / `*.yaml` (их форматирование — вручную или отдельным opt-in скриптом при необходимости).
- `pnpm build` — `next build`

Локальный быстрый цикл перед PR — `pnpm verify` (всё, кроме `build`).

## Known limitations (окружение)

- В **ограниченном sandbox** (например агент без `bind`/сетевых прав) `pnpm run ci:check` может падать на шаге `next build` с системными ошибками вроде `Operation not permitted` (привязка порта / Turbopack). Это ограничение среды, а не регрессия репозитория. В CI и на машине разработчика с нормальными правами тот же `ci:check` должен быть зелёным; при сомнении прогонять `ci:check` вне sandbox или с повышенными правами.

## CI composition change log

- 2026-04-23 — `ci:check` расширен до strict-состава (`lint:ci + lint:styles:ci + typecheck + format:check + build`).
  Ранее: `eslint && tsc --noEmit && next build`. Причина: завершение Phase 2 best-practice конфигурации; перевод `perfectionist/sort-imports` и `react/jsx-curly-brace-presence` в `error`, подключение `import/no-restricted-paths` для FSD boundaries и code-only `format:check`.
  Совместимость: A0 baseline из `sprint-8-a0-baseline-quality-gates.ru.md` расширен; смена состояния `ci:check` задокументирована как осознанный change.

## Stack-specific checks (Next.js + React + GraphQL)

В каждом значимом PR дополнительно проверяется:

- Next.js App Router boundaries не нарушены;
- React UI остается presentation-only, orchestration вынесен;
- GraphQL операции не инлайнены в UI;
- auth header rules соблюдены;
- nullable и error paths не ломают рендер;
- FSD dependency direction (shared <- entities <- features <- app) защищён правилом `import/no-restricted-paths` (см. `eslint.config.mjs`).

## PR evidence standard

В PR обязательно фиксируются:

- какие команды запускались;
- статус команд;
- что проверено вручную по затронутому флоу;
- известные внешние ограничения (если есть).

## Manual verification baseline

Перед merge по любому затронутому admin-флоу проверяются:

- auth flow;
- users flow (list/search/sort/moderation);
- details flow (tabs/pagination/null-safe rendering);
- payments flow;
- posts realtime flow (если затронут).

## Risk-based expansion (production style)

Если change затрагивает shared data flow, auth или realtime, добавляются:

- targeted regression checks;
- негативные сценарии (reject/error/empty/null);
- cross-flow smoke (чтобы убедиться, что соседние фичи не сломаны).

## Gate policy for external blockers

- Внешний инфраструктурный fail (например сетевое ограничение sandbox) не считается code regression.
- PR обязан показать доказательство, что в нормальной среде gates проходят.
- Для `next/font/google` внешний блокер закрыт переходом на `@fontsource-variable/*` (см. `app/layout.tsx`). Новых external-only блокеров в baseline нет.

## Definition of Done for merge

- mandatory gates green;
- ручная проверка критических сценариев выполнена;
- нет незакрытых high-risk замечаний в review;
- lock-контракт не нарушен или обновлен осознанно.
