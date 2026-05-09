# Pre-Review Playbook

## Goal

Подготовить PR так, чтобы review был быстрым и полезным.

## Before opening PR

1. Убедиться, что изменения собраны в один логический риск-домен.
2. Убрать шум (случайные правки, временные логи, мертвый код).
3. Проверить stack-границы: Next.js App Router, React presentation layer, GraphQL contract layer.
4. Запустить mandatory quality-gates.
5. Проверить affected сценарии вручную.
6. Подготовить краткий PR summary.

## PR description must include

- что изменено;
- зачем изменено;
- какие риски;
- какие проверки пройдены;
- impact на contracts (если есть).
