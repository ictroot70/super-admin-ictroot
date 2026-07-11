# Feature Playbook

## Goal

Добавить новую функциональность без деградации архитектуры и соседних флоу.

## Steps

1. Зафиксировать scope, out-of-scope и критерий готовности.
2. Определить слой размещения (app/features/entities/shared).
3. Для Next.js проверить route/layout границы и client/server решение.
4. Для GraphQL зафиксировать operations + mapping + nullability.
5. Сформировать ownership состояния и side-effects.
6. Проверить риски для существующих lock-сценариев.
7. Реализовать через переиспользуемые public API, без дублирования.
8. Прогнать quality-gates.
9. Выполнить targeted manual smoke.

## Checklist

- Scope не расползся.
- Границы слоев соблюдены.
- Нет anti-patterns.
- Stack invariants (Next.js/React/GraphQL) соблюдены.
- PR содержит evidence и impact.
