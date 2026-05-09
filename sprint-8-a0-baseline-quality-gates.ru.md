# Sprint 8 — A0 Baseline & Quality Gates (RU)

## Контекст

- Дата и время фиксации: `2026-04-22 06:55:50 +04 (+0400)`
- Ветка: `bugfix`
- Commit: `6bc42e8`
- Владелец A0: `Dev-4`

## Канонический gate

- Source of truth для A0: `pnpm run ci:check`

## Baseline result

- `PASS` в стандартной среде выполнения (доступна сеть для загрузки зависимостей runtime).
- Проверка включает: `eslint && tsc --noEmit && next build`.

## Environment note

- В sandbox-only окружении зафиксирован `FAIL` на этапе `next build`.
- Причина: `next/font/google` не может загрузить `Geist` и `Geist Mono` из `https://fonts.googleapis.com/...`.
- Классификация: внешний инфраструктурный фактор окружения (ограничение сети), а не code regression в репозитории.

## Known blockers (external only)

- `External-only blocker`: сетевое ограничение sandbox-окружения для `next/font/google`.
- Политика: blocker фиксируется в baseline-репорте, но A0 считается выполненной при зеленом `pnpm run ci:check` в нормальной среде.

## Team status update (Jira/чат)

`A0 закрыта: baseline quality-gate зафиксирован. Канонический gate (pnpm run ci:check) — PASS. В sandbox-only окружении есть внешний инфраструктурный блокер (недоступность fonts.googleapis.com для next/font/google), классифицирован как external-only и не как регрессия кода.`

## A0 AC checklist

- [x] Зафиксирован baseline-статус.
- [x] Прогнан канонический quality-gate `pnpm run ci:check`.
- [x] Статус и блокеры подготовлены для публикации команде.
