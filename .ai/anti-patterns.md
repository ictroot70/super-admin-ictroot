# Anti-patterns

Запрещено:

- Бизнес-логика в UI/presentation компонентах.
- Inline GraphQL-операции в UI слоях.
- Дублирование одного и того же доменного flow в разных местах.
- Нарушение dependency direction (`shared -> features`, `entities -> features` и т.д.).
- Добавление `any`, маскирующего контракт.
- Игнорирование nullable-данных без fallback.
- Смешивание orchestration и rendering в одном компоненте.
- PR без evidence по quality-gates.
- Невидимые breaking changes в shared слоях без описания impact.
- Молчаливое отклонение от policy без фиксации причины и плана исправления.
