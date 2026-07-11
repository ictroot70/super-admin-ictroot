# Cloud & Delivery Notes

## Purpose

Фиксирует правила работы с окружениями, CI/CD и эксплуатационными рисками.

## Environment principles

- Dev, CI и production должны иметь предсказуемое поведение.
- Environment-specific ограничения документируются явно, не скрываются в PR.
- Секреты не хранятся в репозитории.

## Repository workflow baseline (.github)

- PR template: `.github/pull_request_template.md`
- Code ownership: `.github/CODEOWNERS`
- Release boundary: `.github/workflows/release-boundary.yml`
- Secret scan: `.github/workflows/secret-scan.yml`
- Unit tests: `.github/workflows/unit-tests.yml`

## Deployment expectations

- Каждый change должен иметь понятный rollback-путь.
- Для рискованных изменений нужен staged rollout.
- Ошибки после деплоя должны быть диагностируемыми (логи/метрики/trace).

## CI/CD hygiene

- CI-команды и критерии green определены в `quality-gates.md`.
- Инфраструктурный fail отделяется от code regression.
- Любой нестабильный pipeline шаг требует owner и плана стабилизации.

## Operational checklist

Перед релизом:

- quality-gates green;
- критичные сценарии проверены;
- rollback понятен команде;
- impact на внешние сервисы оценен.
