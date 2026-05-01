# Sprint 8 Collaboration Plan v1 (RU, 4 Developers, Rotation-Friendly)

## 1. Назначение

- Этот файл описывает, как 4 разработчика совместно реализуют Sprint 8.
- Основная декомпозиция задач и контрактов находится в:
- `sprint-8-admin-plan-and-workflow.ru.md`
- Текущий файл дополняет её правилами взаимодействия, ownership и handoff.

## 2. Принципы командной работы

- Без деления по “уровню” разработчика: каждый участвует в разных частях спринта.
- У каждой задачи есть primary owner и support owner.
- Support owner обязан:
- участвовать в ревью;
- понимать бизнес-логику задачи;
- уметь продолжить задачу при необходимости.
- Для технически коротких задач (например, A0) support owner может не назначаться.
- Минимум один cross-domain переход на человека за спринт:
- users <-> payments <-> posts.
- Никаких длинных “монолитных” PR: только инкрементальные поставки.
- Collaboration-файл не заменяет основной план: source of truth по контрактам и DoD остается в `sprint-8-admin-plan-and-workflow.ru.md`.
- Для всех задач обязательно соблюдение nullable-правил из раздела `5.9` основного плана:
- TypeScript-модели отражают nullable-поля схемы;
- UI-рендеринг использует fallback для nullable значений (отсутствие fallback считается багом).

## 3. Роли (обезличенно)

- Dev-1
- Dev-2
- Dev-3
- Dev-4

## 4. Ownership по задачам A0–A7 (баланс по сложности)

| Задача                                         | Сложность | Primary | Support | Цель по обучению/ротации                                     |
| ---------------------------------------------- | --------- | ------- | ------- | ------------------------------------------------------------ |
| A0 Baseline quality-gates                      | 1 point   | Dev-4   | —       | Результат фиксируется в общем status update для всей команды |
| A1 GraphQL base + admin auth                   | 3 points  | Dev-1   | Dev-2   | Dev-2 получает контекст по auth/header contracts             |
| A2 Users list orchestration                    | 3 points  | Dev-2   | Dev-3   | Dev-3 подключается к users-контексту                         |
| A3 Delete/Ban/Unban flows                      | 2 points  | Dev-4   | Dev-3   | Dev-3 получает контекст модальных/mutation flows             |
| A4 User details + tabs                         | 3 points  | Dev-3   | Dev-1   | Dev-1 получает контекст details/followers/payments-by-user   |
| A5 Global payments list                        | 2 points  | Dev-1   | Dev-4   | Dev-4 закрепляет payments-контекст                           |
| A6.1 Posts list + infinite/search              | 2 points  | Dev-4   | Dev-1   | Dev-4 закрепляет posts list контракт и cursor behavior       |
| A6.2 Subscription lifecycle + dedupe/reconnect | 2 points  | Dev-2   | Dev-4   | Dev-4 закрепляет realtime/subscription-контекст              |
| A7 Stabilization + smoke                       | 2 points  | Dev-3   | Dev-2   | Финальная кросс-проверка end-to-end                          |

### 4.1 Баланс нагрузки (целевое распределение)

- Dev-1: `A1 (3) + A5 (2) = 5 points`
- Dev-2: `A2 (3) + A6.2 (2) = 5 points`
- Dev-3: `A4 (3) + A7 (2) = 5 points`
- Dev-4: `A0 (1) + A3 (2) + A6.1 (2) = 5 points`

## 5. Фазы и параллелизм

### Блокирующее правило

- A1 (`GraphQL base + admin auth`) является блокирующей задачей для API wiring.
- До завершения A1 (код + проверка + доступность контракта для команды) в A2/A3/A4/A5/A6 разрешена только подготовка UI-каркасов и локального state без интеграции с API/subscription.

### Phase 0 (старт)

- A0 выполняется первым.
- Выход из фазы:
- baseline quality-gates зафиксирован;
- baseline-артефакт: [sprint-8-a0-baseline-quality-gates.ru.md](sprint-8-a0-baseline-quality-gates.ru.md);
- договоренности по контрактам подтверждены командой.

### Phase 1 (foundation)

- Основной фокус: A1.
- Параллельно допускается подготовка UI-каркасов A2/A4/A6 без API wiring и без подключения GraphQL/subscription.

### Phase 2 (users core)

- A2 и A3 выполняются последовательно с частичным overlap.
- Критично: единый shared action contract для удаления/блокировки/разблокировки.

### Phase 3 (details + payments)

- A4 и A5 могут идти параллельно после стабилизации A2/A3 контрактов.
- Критично: единое форматирование дат/статусов/денежных значений.

### Phase 4 (posts realtime + stabilization)

- A6.1 и A6.2 стартуют после готовности GraphQL foundation и базовых admin screen contracts.
- Перед стартом A6.1/A6.2 обязателен короткий технический brief Dev-2 и Dev-4 с Dev-1 по subscription lifecycle, reconnect и dedupe-политике.
- A7 финализирует весь спринт и закрывает cross-flow regressions.

## 6. Handoff-контракты между задачами

- A1 -> A2/A3/A4/A5/A6:
- единый Apollo GraphQL client (`@apollo/client`);
- единый способ передачи Basic auth;
- `graphql-ws` transport для subscription (`postAdded`);
- типизированные базовые wrappers/query helpers.
- A1 -> A2/A3/A4/A5/A6 (обязательный integration artifact от Dev-1):
- в PR A1 фиксируются точные пути к entrypoint-ам Apollo client, auth helper и wrappers (query/mutation/subscription);
- в PR A1 фиксируются примеры импорта для команд A2/A3/A4/A5/A6;
- формат auth фиксируется явно: `Authorization: Basic base64(email:password)`, при этом `loginAdmin` вызывается без Basic header;
- в PR A1 фиксируется единый websocket setup на `graphql-ws` для `postAdded` (без альтернативных GraphQL-клиентов в рамках Sprint 8);
- без этого artifact выход из Phase 1 не считается завершенным.
- A2 -> A3:
- источник `userId/userName/userBan` для action menu;
- единый механизм обновления списка после mutation.
- A3 -> A6:
- общий ban flow/ban reason logic для переиспользования в posts.
- ban modal из posts обязан использовать тот же компонент/хук, что и users-ban flow (A3), без дублирования.
- до старта A6 в PR A3 должен быть зафиксирован FSD-совместимый public API export для переиспользуемого ban flow (тот же путь импорта для users/posts).
- A6.1 -> A6.2:
- стабильный posts-list контракт (`cursor`, `search`, append policy) перед подключением realtime.
- A6.2 -> A7:
- стабильная политика dedupe/reconnect/fallback и ее интеграция в общий smoke.
- A4 -> A5:
- консистентное отображение payment сущностей в деталях и глобальном списке.
- обязательная предварительная синхронизация форматов `amount/currency/date` до начала рендеринга таблиц.
- явное разделение data-source:
- `A4 (details/payments tab)` -> `getPaymentsByUser` / `SubscriptionByPaymentModel`
- `A5 (global payments)` -> `getPayments` / `SubscriptionPaymentsModel`
- источник суммы/даты/метода различается:
- в `A4` значения берутся из вложенного `SubscriptionByPaymentModel.payments[]` с nullable-safe fallback;
- в `A5` значения берутся из верхнеуровневых полей `SubscriptionPaymentsModel`.

## 7. Синхронизация команды

- Daily sync (короткий):
- что завершено;
- какие блокеры;
- какие контракты изменились.
- Перед merge каждого PR:
- owner + support owner совместно проверяют checklist задачи.
- Перед входом в A7:
- общий integration sync по A1..A6.

## 8. PR и ветки (командный режим)

- Jira-first для каждой рабочей ветки.
- Рекомендуемая последовательность PR:
- PR-1: A1
- PR-2: A2
- PR-3: A3
- PR-4: A4
- PR-5: A5
- PR-6: A6.1
- PR-7: A6.2
- PR-8: A7
- Допускаются объединенные PR (`A2+A3`, `A4+A5`) только если это ускоряет интеграцию и не ухудшает reviewability.

### 8.1 Review policy для task PR и финального PR

- Для task PR (A1..A7) Main Reviewer участвует выборочно по рискам/доступности и не является обязательным апрувером.
- Для финального интеграционного PR (`Delivery -> develop`) назначаются 2 обязательных ревьюера:
- `Main Reviewer` (обязательный sign-off);
- `Integration Reviewer` (второй разработчик команды).
- Финальный merge запрещен без апрува Main Reviewer.

## 9. Общий checklist перед финальным merge

- Все UC из основного плана покрыты.
- Нет расхождений по GraphQL-контрактам между модулями.
- Cursor-based поведение `getPosts` проверено.
- `postAdded` realtime стабилен и не создает дубли.
- Ban flow из posts (A6) проверен совместно с users-ban flow (A3), использует единый code path и тот же modal component/hook.
- Public API export для общего ban flow проверен (единый import path для users/posts, без boundary violation).
- Nullable-правила из `5.9` основного плана соблюдены во всех затронутых моделях и UI.
- Все quality-gates прогнаны командой:
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- либо едино: `pnpm run ci:check`.
- Финальный PR имеет 2 обязательных approvals, включая Main Reviewer.

## 10. Персональные критерии готовности (mini-DoD по owner)

- Общий DoD по задачам A1..A7 остается в основном плане (раздел `9`).
- Этот раздел фиксирует персональные ожидания от владельцев задач в рамках collaboration-процесса.

### Dev-1 (A1, A5)

- A1 считается готовой, когда:
- GraphQL foundation доступен команде через единый entrypoint;
- integration artifact (пути, импорты, auth-формат) опубликован в PR;
- реализован стек `@apollo/client` + `graphql-ws` и он используется как единственный approved client stack Sprint 8;
- `loginAdmin` работает без Basic auth, остальные операции работают с Basic auth.
- A5 считается готовой, когда:
- global payments list использует `getPayments`;
- реализованы поиск, сортировки и `pageSize=6` по контракту;
- формат отображения `amount/currency/date` синхронизирован с A4.

### Dev-2 (A2, A6.2)

- A2 считается готовой, когда:
- users list реализует search/sort/pagination;
- фильтр блокировки реализован как часть users list (`Not selected/Blocked/Not blocked`);
- состояние списка корректно обновляется после действий из A3.
- A6.2 считается готовой, когда:
- подключен `postAdded` subscription lifecycle;
- есть dedupe по `post.id`, reconnect и fallback на refetch;
- поведение согласовано с контрактом A6.1.

### Dev-3 (A4, A7)

- A4 считается готовой, когда:
- профиль и вкладки `Followers/Following/Payments` работают независимо по пагинации/сортировке;
- payments-tab использует `getPaymentsByUser` и `SubscriptionByPaymentModel` (не `getPayments`);
- nullable-значения на вкладках обрабатываются безопасно (fallback без runtime ошибок).
- A7 считается готовой, когда:
- выполнен end-to-end smoke по users + payments + posts;
- подтверждены cross-flow проверки (включая ban flow users/posts);
- зафиксирован итоговый статус quality-gates.

### Dev-4 (A0, A3, A6.1)

- A0 считается готовой, когда baseline quality-gates зафиксирован и опубликован команде.
- A3 считается готовой, когда:
- delete/ban/unban модальные сценарии закрывают `Yes/No/close`;
- ошибки/reject сценарии не ломают UI;
- ban flow подготовлен к переиспользованию в posts без дублирования компонента/хука.
- A6.1 считается готовой, когда:
- posts list использует cursor-based pagination через `endCursorPostId`;
- infinite scroll и search стабильны;
- контракт передачи данных для A6.2 (append policy/cursor state) зафиксирован.
