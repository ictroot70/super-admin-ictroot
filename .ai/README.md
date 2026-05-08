# .ai

Эта папка хранит постоянные инженерные правила проекта (не только под текущий спринт).

## Canonical docs

- Канонические инварианты архитектуры и процесса: `./policy.md`
- Канонические quality-gates и уровни проверок: `./quality-gates.md`
- Запрещенные паттерны: `./anti-patterns.md`
- Процессовые инструкции:
- `./playbooks/feature.md`
- `./playbooks/refactor.md`
- `./playbooks/debug.md`
- `./playbooks/pre-review.md`
- `./playbooks/pr-review.md`
- `./playbooks/future.md`
- Контракт целостности требований:
- `./contracts/product-requirements-lock.json`
- `./contracts/taskshifter-traceability-lock.json`
- Cloud/CI/CD и окружения: `./cloud.md`

## How to use

1. Сначала сверяемся с `policy.md`.
2. Затем проверяем `quality-gates.md`.
3. Для конкретной работы открываем соответствующий playbook.
4. Если меняется поведение продукта, обновляем contracts.

## Priority

Если есть конфликт формулировок между документами, приоритет у `policy.md`.
