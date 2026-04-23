# Policy

Policy version: 2.1
Last updated: 2026-04-22

## Purpose

Этот документ фиксирует инженерные правила, которые защищают целостность проекта при:

- параллельной работе нескольких разработчиков;
- инкрементальной поставке фич;
- будущих изменениях требований.

## Technology baseline (must preserve)

- Framework: `Next.js` (App Router).
- UI runtime: `React`.
- Language: `TypeScript` (`strict`).
- Data/API: `GraphQL`.
- GraphQL client stack: `@apollo/client` + `graphql-ws`.

Любые отклонения от этого baseline считаются архитектурным изменением и требуют явного решения в PR.

## Decision hierarchy

1. `policy.md` (архитектурные и процессные инварианты).
2. `quality-gates.md` (что обязательно должно быть green).
3. playbooks (как именно выполнять типовые задачи).
4. contracts (зафиксированное продуктовое поведение и трассировка UC).

## Architecture invariants

- UI presentation-only: без бизнес-правил, без orchestration, без сетевых side effects.
- Orchestration, coordination и state transitions живут в hooks/model уровне `features/**`.
- Data contract и UI rendering разделены.
- Общие потоки (например moderation flow) не дублируются, а переиспользуются через public API export.

### Next.js boundaries

- Роутинг, layout-композиция и route-level orchestration остаются в `app/**`.
- Feature-логика не должна утекать в layout/page beyond composition responsibilities.
- Client-only поведение добавляется осознанно, а не по умолчанию.

### Dependency direction

Допустимые импорты:

- `app` -> `features`, `entities`, `shared`
- `features` -> `entities`, `shared`
- `entities` -> `shared`
- `shared` -> `shared`

Запрещенные импорты:

- `shared` -> `entities|features|app`
- `entities` -> `features|app`
- `features` -> `app`
- cross-import несвязанных модулей без явного ownership-контракта

## Data and API invariants

- Источник truth для типов и nullability: backend GraphQL schema.
- Все GraphQL operations хранятся централизованно в `shared/api/graphql/operations/**`.
- Inline query/mutation/subscription в UI запрещены.
- Nullable поля рендерятся только через fallback-safe логику.

## Auth and security invariants (super-admin)

- `loginAdmin` вызывается без Basic auth.
- Все остальные admin GraphQL операции выполняются с `Authorization: Basic base64(email:password)`.
- Админские credentials не должны утекать в публичные логи и debug output.

## Parallel delivery invariants

- Любая задача имеет owner и обозримую write-зону.
- Изменения в shared-коде требуют явного описания impact для смежных флоу.
- Handoff-контракт обязателен для блокирующих интеграционных изменений.
- Один PR = один понятный риск-домен.

## Product integrity invariants

- Критические пользовательские сценарии фиксируются в lock-контракте.
- Если меняется lock-поведение, PR обязан обновить contracts и evidence.
- Временные компромиссы допустимы только с явной фиксацией: причина, срок, owner.

## Change management

Любой существенный change должен содержать:

- цель и границы;
- риск и rollback-подход;
- список проверок;
- impact на смежные флоу.

## Documentation invariants

- Правила процесса не прячутся в личных договоренностях команды.
- Источник правил должен оставаться в `.ai/*` и быть актуальным после merge.
- Если правило устарело, оно обновляется в этом репозитории, а не в устной форме.
