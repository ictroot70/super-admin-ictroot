# PR Review Playbook

## Goal

Проверить корректность, устойчивость и совместимость изменений.

## Review order

1. Корректность поведения относительно заявленного scope.
2. Архитектурные границы и dependency direction.
3. Stack rules:
- Next.js App Router boundaries,
- React presentation/orchestration separation,
- GraphQL operation placement and mapping.
4. Data contract / null-safety / error handling.
5. Риски для смежных флоу.
6. Достаточность quality-gates и manual evidence.

## Reviewer checklist

- Нет критичных регрессий.
- Нет новых anti-patterns.
- Код читаемый и поддерживаемый.
- PR доказательно проверен.

## Verdict options

- Approve
- Request changes (с конкретным списком)
