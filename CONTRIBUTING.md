# Гайд по вкладу в Sprint 8 (Суперадминка)

Этот документ описывает, как команда стартует и поставляет Sprint 8 для GraphQL-суперадминки.

## Область действия

- Source of truth по бизнес-флоу и декомпозиции: `sprint-8-admin-plan-and-workflow.ru.md`.
- Source of truth по командному взаимодействию и ownership: `Sprint 8 Collaboration Plan v1`.
- Этот файл фиксирует стартовые контракты, соглашения по репозиторию и правила поставки.

## Базовый стек

- Next.js App Router.
- GraphQL client stack: `@apollo/client` + `graphql-ws`.
- В рамках Sprint 8 альтернативные GraphQL-клиенты не используются.

## Структура репозитория (Sprint 8)

- Роуты: `app/(super-admin)/...`
  - `login`, `users`, `users/[userId]`, `payments`, `posts`
- Фичи: `features/admin/...`
  - `auth`, `users`, `delete-user`, `ban-user`, `unban-user`, `user-details`, `payments`, `fetch-posts`, `subscribe-posts`
- Сущности: `entities/admin/...`
  - `user`, `payment`, `post`
- GraphQL-слой: `shared/api/graphql/...`
  - `operations/queries`, `operations/mutations`, `operations/subscriptions`
- Общие хелперы: `shared/lib/...`, `shared/ui/...`

## Жесткий gate: сначала A1, потом API wiring

Пока A1 не завершена, в остальных задачах допускаются только UI-каркасы и локальный state.

### Что A1 обязана предоставить как integration artifact

- Стабильный entrypoint Apollo client.
- Стабильный entrypoint auth helper.
- Стабильный entrypoint wrappers/helpers для query/mutation/subscription.
- Примеры импортов для A2/A3/A4/A5/A6.
- Явное правило авторизации:
  - `loginAdmin` вызывается без Basic header.
  - все остальные GraphQL-операции идут с `Authorization: Basic base64(email:password)`.
- Настройка `graphql-ws` для `postAdded`.

Без этих пунктов Phase 1 не считается завершенной.

## Правила для GraphQL-операций

- Каждый файл операции хранится в `shared/api/graphql/operations/...`.
- Именование:
  - query: `get-*.graphql`
  - mutation: `*.graphql` с глаголом действия (пример: `ban-user.graphql`)
  - subscription: event-based имя (пример: `post-added.graphql`)
- Feature-хуки должны использовать типизированные операции, а не inline raw query-строки в UI-файлах.

## Переиспользование и границы слоев

- Ban flow должен быть переиспользуемым единым путем между users и posts.
- Ban modal в posts должен использовать тот же компонент/хук, что и ban flow в users.
- Для переиспользуемых контрактов обязателен Public API export.
- Не допускаются нарушения границ слоев.

## Nullable safety (обязательно)

- TypeScript-модели должны отражать nullable-поля GraphQL-схемы.
- UI-рендеринг обязан использовать безопасные fallback для nullable-данных.
- Отсутствие fallback для nullable-значений считается багом.

## Консистентность форматирования

- Общие форматтеры должны быть централизованы в `shared/lib/format`.
- Форматирование `amount/currency/date` должно быть единым между:
  - payments tab в деталях пользователя (`A4`)
  - глобальным списком платежей (`A5`)

## Definition of Ready для задачи

Перед началом задачи:

- Опубликован и стабилен upstream handoff-контракт.
- Доступен требуемый public API import path.
- Задокументирован query/mutation/subscription-контракт.
- Проверены nullable-допущения.

## PR-стратегия

- Только небольшие инкрементальные PR.
- Рекомендуемый порядок:
  - A1 -> A2 -> A3 -> A4 -> A5 -> A6.1 -> A6.2 -> A7
- Объединенные PR (`A2+A3`, `A4+A5`) допустимы, только если не страдает reviewability.

## Quality gates перед merge

Нужно прогнать минимум один из вариантов:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- или единый чек: `pnpm run ci:check`

## Командный процесс

- Daily sync: что сделано, какие блокеры, какие контракты изменились.
- Перед merge: owner + support owner совместно проходят checklist задачи.
- Перед A7: общий integration sync по A1..A6.

## Быстрый старт для нового участника

1. Прочитать этот файл и документы по плану спринта.
2. Подтянуть актуальную ветку и установить зависимости.
3. Проверить, смержен ли A1 integration artifact.
4. Если не смержен — работать только с UI-каркасом и локальным state.
5. Если смержен — использовать только опубликованные GraphQL entrypoints и контракты.
