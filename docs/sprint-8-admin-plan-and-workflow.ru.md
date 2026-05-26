# SuperAdmin GraphQL Implementation Plan v1 (RU, Main Decomposition, Users + Payments + Posts)

## 1. Цель

- Полностью реализовать блок `GraphQL суперадминка: Список пользователей`.
- Полностью реализовать блок `GraphQL суперадминка: Блокировка/разблокировка пользователей, просмотр платежей`.
- Полностью реализовать блок `GraphQL суперадминка: Просмотр всех постов` (включая realtime через subscription).

## 2. Scope и границы

- В scope:
- UC-1..UC-6 по users admin;
- UC-1..UC-3 по ban/unban/payments admin;
- UC-1 по posts admin (infinite scroll + realtime `postAdded`);
- интеграция по GraphQL endpoint и GraphQL subscription endpoint;
- модальные сценарии confirm/cancel/close для delete/ban/unban;
- стабилизация тестами и `pnpm run ci:check`.
- Вне scope:
- рефакторинг несвязанных модулей проекта;
- изменения backend-контрактов;
- редизайн существующих UI-kit компонентов;
- изменения публичной части приложения, не требуемые UC суперадминки.

## 2.1 Основание плана (Source of Truth)

- План основан на ТЗ Sprint 8 и GraphQL introspection schema.
- Дата фиксации основания: `10.04.2026`.

### Референсы

- ТЗ: `ДЗ 8` (UC по users/ban/payments/posts для суперадмина).
- Swagger root: `https://inctagram.work/api/v1/swagger`.
- GraphQL HTTP endpoint: `https://inctagram.work/api/v1/graphql`.
- GraphQL WS endpoint: `ws://inctagram.work/api/v1/graphql`.
- Для Sprint 8 frontend-клиент GraphQL фиксируется явно: `@apollo/client` + `graphql-ws` (для `postAdded` subscription).
- GraphQL auth rules:
- `loginAdmin` без Basic auth;
- остальные query/mutation/subscription с `Authorization: Basic base64(email:password)`.
- Figma: использовать утвержденные экраны admin flow (users/payments/posts).

### Ключевые инварианты из требований

- Логин админа выполняется через `loginAdmin(email, password)` с учетными данными:
- `admin@gmail.com`
- `admin`
- Users list:
- таблица + контекстные действия delete/ban/unban;
- пагинация по `8` записей;
- поиск по `username`;
- сортировки по `userName` и `createdAt`;
- фильтр блокировки `ALL | BLOCKED | UNBLOCKED`.
- Delete user:
- confirm modal с текстом `Are you sure you want to delete __username__?`;
- поддержка `Yes / No / close`.
- Ban user:
- confirm modal `Are you sure you want to ban __Username__?`;
- причина блокировки обязательна;
- `Another reason` поддерживается как свободный текст.
- Unban user:
- confirm modal `Are you sure want to un-ban __Username__?`;
- поддержка `Yes / No / close`.
- More information:
- профиль пользователя (фото, username, id, link/date);
- вкладки `Payments`, `Followers`, `Following` с пагинацией.
- Payments list:
- таблица по всем пользователям;
- пагинация по `6` записей;
- поиск по `username`;
- сортировка по `username`, `date`, `amount`, `paymentMethod`.
- Posts list:
- infinite scroll;
- поиск по `username`;
- realtime добавление новых постов без reload;
- ban пользователя из контекста карточки поста.
- В учебном контуре ban/delete для аккаунтов студентов недопустимы; UI обязан корректно обрабатывать backend reject.

### Правило приоритета источников

- API-контракт и типы: GraphQL schema/Swagger.
- Бизнес-поведение UC: ТЗ.
- Визуальные состояния и layout: Figma.
- При конфликте фиксируется `Change note` в этом документе.

## 3. Базовые правила

- Канонический quality-gate: `pnpm run ci:check`.
- Перед feature-изменениями фиксируется baseline quality-gates.
- Зафиксированный baseline A0: [sprint-8-a0-baseline-quality-gates.ru.md](sprint-8-a0-baseline-quality-gates.ru.md).
- Архитектурные инварианты:
- presentation-only UI;
- orchestration и side effects только в hooks/model/controllers;
- data-fetching отделён от rendering.
- FSD dependency boundaries не нарушать.

## 4. Архитектура (FSD)

- `features/admin/auth/*`:
- login form/use-case;
- storage состояния админ-сессии (basic credentials/session flag).
- `features/admin/users/*`:
- list orchestration: pagination/search/sort/filter;
- actions: remove/ban/unban + modal orchestration.
- `features/admin/user-details/*`:
- getUser profile;
- tabs: payments/followers/following with independent paging/sort state.
- `features/admin/payments/*`:
- global payments list orchestration.
- `features/admin/posts/*`:
- posts infinite query + search;
- realtime subscription lifecycle (`postAdded`);
- dedupe/merge realtime with paged list;
- ban action from post card.
- `shared/api/graphql/*`:
- base GraphQL client/query helper;
- auth header composition;
- typed operation wrappers.

## 5. GraphQL контракты (lock)

### 5.1 Query

- `getUser(userId: Int!): User!`
- `getUsers(pageSize: Int = 10, pageNumber: Int = 1, sortBy: String = "createdAt", sortDirection: SortDirection = desc, searchTerm: String, statusFilter: UserBlockStatus = ALL): UsersPaginationModel!`
- `getFollowers(pageSize: Int = 10, pageNumber: Int = 1, sortBy: String = "createdAt", sortDirection: SortDirection = desc, userId: Int!): FollowPaginationModel!`
- `getFollowing(pageSize: Int = 10, pageNumber: Int = 1, sortBy: String = "createdAt", sortDirection: SortDirection = desc, userId: Int!): FollowPaginationModel!`
- `getPaymentsByUser(userId: Int!, pageSize: Int, pageNumber: Int, sortBy: String, sortDirection: SortDirection): PaymentPaginationModel!`
- `getPayments(pageSize: Int, pageNumber: Int, sortBy: String, sortDirection: SortDirection, searchTerm: String): PaymentsPaginationModel!`
- `getPostsByUser(userId: Int!, endCursorId: Int): PostsByUserModel!`
- `getPosts(endCursorPostId: Int, searchTerm: String, pageSize: Int, sortBy: String, sortDirection: SortDirection): PostsPaginationModel!`
- `getPostsByUser` зафиксирован как доступный API-контракт, но отдельная UI-вкладка `Posts` в `More information` не входит в UC Sprint 8 и не является обязательной задачей A0-A7.

### 5.2 Mutation

- `loginAdmin(email: String!, password: String!): LoginAdmin!`
- `banUser(banReason: String!, userId: Int!): Boolean!`
- `unbanUser(userId: Int!): Boolean!`
- `removeUser(userId: Int!): Boolean!`

### 5.3 Subscription

- `postAdded: Post!`

### 5.4 Enum/параметры

- `SortDirection = asc | desc`
- `UserBlockStatus = ALL | BLOCKED | UNBLOCKED`
- `PaymentMethod = STRIPE | PAYPAL | CREDIT_CARD`
- `CurrencyType = USD | EUR`
- `SubscriptionType = MONTHLY | DAY | WEEKLY`

### 5.5 Contract decisions (UI vs API defaults)

- По ТЗ users list page size = `8`, поэтому клиент передает `pageSize=8` явно (не `10`).
- По ТЗ payments list page size = `6`, поэтому клиент передает `pageSize=6` явно.
- `banReason` — строка, не enum. `Another reason` реализуется без дополнительной трансформации, с валидацией на непустое значение.

### 5.6 Детализация контрактов и полей (полный lock по присланным данным)

- Scalars: `Int`, `String`, `Boolean`, `DateTime`.
- `loginAdmin(email: String!, password: String!): LoginAdmin!`.
- `LoginAdmin`: `logged: Boolean!`.
- `loginAdmin` credentials для тестового входа: `admin@gmail.com` / `admin`.
- `banUser(banReason: String!, userId: Int!): Boolean!`.
- `unbanUser(userId: Int!): Boolean!`.
- `removeUser(userId: Int!): Boolean!`.
- `getUsers(pageSize: Int = 10, pageNumber: Int = 1, sortBy: String = "createdAt", sortDirection: SortDirection = desc, searchTerm: String, statusFilter: UserBlockStatus = ALL): UsersPaginationModel!`.
- `UsersPaginationModel`: `users: [User!]!`, `pagination: PaginationModel!`.
- `PaginationModel`: `pagesCount`, `page`, `pageSize`, `totalCount` (все `Int!`).
- `getUser(userId: Int!): User!`.
- `User`: `id`, `userName`, `email`, `createdAt`, `profile`, `userBan`.
- `Profile`: `id`, `userName`, `firstName`, `lastName`, `city`, `country`, `region`, `dateOfBirth`, `aboutMe`, `createdAt`, `avatars`.
- `Avatar`: `url`, `width`, `height`, `fileSize`.
- `UserBan`: `reason: String!`, `createdAt: DateTime!`.
- `getFollowers(pageSize: Int = 10, pageNumber: Int = 1, sortBy: String = "createdAt", sortDirection: SortDirection = desc, userId: Int!): FollowPaginationModel!`.
- `getFollowing(pageSize: Int = 10, pageNumber: Int = 1, sortBy: String = "createdAt", sortDirection: SortDirection = desc, userId: Int!): FollowPaginationModel!`.
- `FollowPaginationModel`: `pagesCount`, `page`, `pageSize`, `totalCount`, `items: [Follow!]!`.
- `Follow`: `id`, `userId`, `userName`, `firstName`, `lastName`, `createdAt`.
- `getPayments(pageSize: Int = 10, pageNumber: Int = 1, sortBy: String = "createdAt", sortDirection: SortDirection = desc, searchTerm: String): PaymentsPaginationModel!`.
- `PaymentsPaginationModel`: `pagesCount`, `page`, `pageSize`, `totalCount`, `items: [SubscriptionPaymentsModel!]!`.
- `SubscriptionPaymentsModel`: `id`, `userId`, `paymentMethod: PaymentMethod!`, `amount`, `currency`, `createdAt`, `endDate`, `type: SubscriptionType!`, `userName: String!`, `avatars: [Avatar!]`.
- `getPaymentsByUser(userId: Int!, pageSize: Int = 10, pageNumber: Int = 1, sortBy: String = "createdAt", sortDirection: SortDirection = desc): PaymentPaginationModel!`.
- `PaymentPaginationModel`: `pagesCount`, `page`, `pageSize`, `totalCount`, `items: [SubscriptionByPaymentModel!]!`.
- `SubscriptionByPaymentModel`: `id: String!`, `businessAccountId: Int!`, `status: StatusSubscriptionType!`, `dateOfPayment`, `startDate`, `endDate`, `type: SubscriptionType!`, `price: Int!`, `paymentType: PaymentMethod`, `payments: [Payment!]!`.
- `Payment`: `id`, `userId`, `paymentMethod`, `amount`, `currency`, `createdAt`, `endDate`, `type`.
- `getPostsByUser(userId: Int!, endCursorId: Int): PostsByUserModel!`.
- `PostsByUserModel`: `pagesCount`, `pageSize`, `totalCount`, `items: [ImagePost!]`.
- `ImagePost`: `id`, `createdAt`, `url`, `width`, `height`, `fileSize`.
- `getPosts(endCursorPostId: Int, searchTerm: String, pageSize: Int = 10, sortBy: String = "createdAt", sortDirection: SortDirection = desc): PostsPaginationModel!`.
- `PostsPaginationModel`: `pagesCount: Int!`, `pageSize: Int!`, `totalCount: Int!`, `items: [Post!]!`. Поле `page` отсутствует — cursor-based пагинация через `endCursorPostId`, не offset/pageNumber.
- `Post`: `images`, `id`, `ownerId`, `description`, `createdAt`, `updatedAt`, `postOwner`, `userBan`.
- `PostOwnerModel`: `id`, `userName`, `firstName`, `lastName`, `avatars`.
- `postAdded: Post!` (payload соответствует структуре `Post`).
- `SortDirection`: `asc`, `desc`.
- `UserBlockStatus`: `ALL`, `BLOCKED`, `UNBLOCKED`.
- `StatusSubscriptionType`: `PENDING`, `ACTIVE`, `FINISHED`, `DELETED`.
- `SubscriptionType`: `MONTHLY`, `DAY`, `WEEKLY`.
- `PaymentMethod`: `STRIPE`, `PAYPAL`, `CREDIT_CARD`.
- `CurrencyType`: `USD`, `EUR`.

### 5.7 Задел на будущее (вынесено отдельно, не блокирует текущий этап)

- Поля `Profile` (`city/country/region/dateOfBirth/aboutMe`) сохраняются в типах полностью, даже если на первом проходе часть не отрисовывается.
- Поля `ImagePost` (`width/height/fileSize`) храним в модели для будущей оптимизации рендеринга/превью.
- Для `SubscriptionByPaymentModel` сохраняем `payments: [Payment!]!` как полноценный источник для drill-down истории платежей в деталях пользователя.
- Поля `SubscriptionByPaymentModel.status` (`PENDING/ACTIVE/FINISHED/DELETED`) сохраняем и в UI-model, даже если в текущем экране не показываем отдельный status badge.
- В глобальном `Payments list` заранее храним `currency` и `avatars`, чтобы не менять контракт при добавлении расширенной таблицы.

### 5.8 Change note 2026-04-11

- В документ добавлен полный контрактный слой по присланным операциям и типам Sprint 8.
- Потенциально избыточные для текущего UI поля вынесены в отдельный раздел `Задел на будущее`, без изменения базового scope.

### 5.9 Nullable safety и mapping-контракт (обязательный)

- Источник truth по nullability: GraphQL introspection schema. Если поле в схеме без `!`, оно считается nullable даже если в этом документе у поля не указан маркер nullable явно.
- TypeScript-модели обязаны отражать nullable-поля через `| null` (и при необходимости `| undefined` на уровне view-model), UI-рендер обязан иметь fallback (`—`, `N/A`, placeholder-avatar и т.д.).
- Критичная nullable-карта для Sprint 8:
- `SubscriptionPaymentsModel` (`getPayments`): nullable `id`, `userId`, `amount`, `currency`, `createdAt`, `endDate`; non-null `paymentMethod`, `type`, `userName`.
- `Payment` (внутри `SubscriptionByPaymentModel.payments`): все поля nullable (`id`, `userId`, `paymentMethod`, `amount`, `currency`, `createdAt`, `endDate`, `type`).
- `Follow`: `userName`, `firstName`, `lastName` требуют fallback-рендеринга.
- `Profile`: `firstName`, `lastName`, `city`, `country`, `region`, `dateOfBirth`, `aboutMe`, `avatars` требуют fallback-рендеринга; `createdAt` ожидается как non-null по схеме.
- `PostOwnerModel`: `firstName`, `lastName` nullable; `avatars` может отсутствовать целиком (null list).
- Mapping-контракт A4/A5 для платежей:
- `A4` (`getPaymentsByUser` / `SubscriptionByPaymentModel`): дата/сумма/метод для строки берутся из вложенного `payments[]`; если `payments` пуст или значения отсутствуют, рендерится fallback без runtime-ошибки.
- `A5` (`getPayments` / `SubscriptionPaymentsModel`): дата/сумма/метод берутся только из верхнеуровневых полей `createdAt/amount/paymentMethod`.
- Форматирование `amount/currency/date` обязано быть консистентным между A4 и A5, несмотря на разный source shape.

## 6. Обязательные технические требования

### 6.1 Auth и сессия админа

- `loginAdmin` вызывается без Basic auth.
- После `logged=true` клиент формирует Basic auth для всех остальных GraphQL операций.
- При `logged=false` показывать user-friendly ошибку без перехода на admin dashboard.
- Logout/сброс admin-сессии должен очищать клиентские credentials.

### 6.2 Users list orchestration

- Параметры списка хранятся в одном orchestrator state:
- `pageNumber`, `pageSize`, `searchTerm`, `sortBy`, `sortDirection`, `statusFilter`.
- Фильтр блокировки является частью users list (A2), а не частью ban/unban flow (A3):
- `Not selected` -> `ALL`
- `Blocked` -> `BLOCKED`
- `Not blocked` -> `UNBLOCKED`
- При изменении `search/sort/filter/pageSize` сбрасывать `pageNumber = 1`.
- Дебаунс поиска по `username` обязателен.
- Контекстное меню действий зависит от `userBan`:
- `Ban in the system` только для неблокированных;
- `Un-ban` только для блокированных.

### 6.3 Delete/Ban/Unban flow

- Все действия подтверждаются modal.
- После успешной операции список синхронизируется без полного hard reload.
- `No` и `close` не меняют данные.
- Ошибки (в т.ч. запрет на учебные аккаунты) отображаются в деградированном, но стабильном UI состоянии.

### 6.4 User details

- Профиль грузится через `getUser(userId)`.
- Вкладки:
- `Followers` -> `getFollowers`;
- `Following` -> `getFollowing`;
- `Payments` -> только `getPaymentsByUser` (модель `SubscriptionByPaymentModel`), не `getPayments`.
- Для `Payments` tab обязательна безопасная обработка вложенного `payments[]` (в т.ч. пустого/частично-null), источник суммы/даты/метода берется из вложенных элементов.
- Каждая вкладка имеет собственную пагинацию/сортировку и не сбрасывает состояние соседних вкладок.

### 6.5 Payments list (global)

- Данные через `getPayments`.
- Поддержка поиска по `username`.
- Поддержка сортировки по `userName`, `createdAt/date`, `amount`, `paymentMethod`.
- Пагинация по `6` элементов.

### 6.6 Posts list + realtime

- Базовый список через `getPosts` с infinite scroll. Пагинация cursor-based: нет `pageNumber`, вместо него `endCursorPostId: Int` (ID последнего загруженного поста). Первый запрос — без `endCursorPostId`. Каждый следующий — передаёт `id` последнего элемента предыдущей страницы.
- Режим realtime:
- открывается subscription `postAdded`;
- новые посты вставляются в начало списка;
- dedupe по `post.id` обязателен (race между HTTP и WS).
- При обрыве WS подписки:
- корректный cleanup;
- безопасный reconnect;
- fallback: refetch первой страницы.
- Из карточки поста доступен ban flow владельца с переиспользованием `banUser`.

### 6.7 Error handling и устойчивость

- Ошибки GraphQL/transport не должны вызывать runtime crash.
- Ошибки мутаций не должны оставлять UI в partial-loading состоянии.
- При неизвестной ошибке показывать безопасное сообщение `Something went wrong`.

## 7. Декомпозиция задач (основной backlog, без привязки к исполнителю)

| ID  | Задача                                                                                                       | Оценка     |
| --- | ------------------------------------------------------------------------------------------------------------ | ---------- |
| A0  | Baseline quality-gates + фиксация стартового состояния                                                       | 0.25-0.5 д |
| A1  | Apollo GraphQL base client (`@apollo/client` + `graphql-ws`) + admin auth flow (`loginAdmin` + Basic header) | 1 д        |
| A2  | Users list (`getUsers`) + search/sort/filter/pagination + table wiring                                       | 1.5-2 д    |
| A3  | Delete/Ban/Unban orchestration + modals + error matrix                                                       | 1-1.5 д    |
| A4  | More information page: `getUser` + tabs `Followers/Following/Payments`                                       | 1.5-2 д    |
| A5  | Payments list (global) + sort/search/pagination                                                              | 1-1.5 д    |
| A6  | Posts list infinite + `postAdded` subscription + dedupe + ban from post card                                 | 1.5-2 д    |
| A7  | Тесты + smoke + стабилизация + финальный `ci:check`                                                          | 1 д        |

## 8. Этапы выполнения (основная последовательность)

### Phase 0

- Entry: scope утвержден.
- Действия: `A0`.
- Exit: baseline quality-gate статус зафиксирован.

### Phase 1

- Действия: `A1`.
- Exit: рабочий admin auth + общий GraphQL клиент.

### Phase 2

- Действия: `A2 + A3`.
- Exit: users admin flow полностью работоспособен.

### Phase 3

- Действия: `A4 + A5`.
- Exit: детали пользователя и платежи по UC закрыты.

### Phase 4

- Действия: `A6 + A7`.
- Exit: posts realtime + стабилизация + release readiness.

## 9. Definition of Done (критичные)

- A1 DoD:
- `loginAdmin` работает по контракту;
- остальные операции выполняются с корректным Basic auth header.
- настроен единый Apollo client (`@apollo/client`) для query/mutation и `graphql-ws` transport для subscription `postAdded` (без альтернативных клиентов в рамках Sprint 8).
- A2 DoD:
- users list отображает данные из API;
- поиск/сортировка/фильтр/пагинация соответствуют UC;
- фильтр блокировки (`Not selected/Blocked/Not blocked`) реализован в A2 как часть users list;
- page size принудительно `8`.
- A3 DoD:
- delete/ban/unban сценарии поддерживают `Yes/No/close`;
- успешные операции отражаются в UI;
- reject сценарии не ломают интерфейс.
- A4 DoD:
- `More information` показывает профиль;
- все 3 вкладки работают с пагинацией.
- вкладка `Payments` использует `getPaymentsByUser` (не `getPayments`) и корректно маппит `SubscriptionByPaymentModel`.
- A5 DoD:
- payments list показывает данные всех пользователей;
- поиск/сортировка/пагинация по UC;
- page size принудительно `6`.
- A6 DoD:
- posts infinite scroll стабилен;
- `postAdded` добавляет новые посты без reload;
- нет дублей при race conditions;
- ban из поста вызывает общий ban flow через тот же компонент/хук modal, что и в A3 (без дублирования реализации).
- A7 DoD:
- профильные тесты зелёные;
- финальный `pnpm run ci:check` зелёный или зафиксирован внешний baseline blocker;
- ручной smoke UC пройден.

## 10. Acceptance Criteria

- Суперадмин логинится и попадает на `Users list`.
- Users list поддерживает поиск/sort/filter/pagination и действия delete/ban/unban.
- `More information` открывает профиль + вкладки payments/followers/following.
- Payments list показывает записи по всем пользователям с поиском и сортировкой.
- Posts list работает с infinite scroll и realtime обновлением через subscription.
- Блокировка пользователя доступна из users и posts flow.
- Ошибки API/WS обрабатываются без падения приложения.
- Прохождение quality-gates подтверждено перед merge.

---

# Team Workflow — Branches and PR (Sprint 8)

- Детальный план взаимодействия команды из 4 разработчиков вынесен в отдельный файл:
- `sprint-8-collaboration-plan-and-ownership.ru.md`

## 0. Jira-first

- Feature-ветка создается только из Jira-задачи (`Create branch`).
- Ручные ветки вне Jira не использовать.

## 1. Точки интеграции

- Базовая ветка: `develop`.
- Delivery-ветка: `SCRUM-XXX-Admin-GraphQL-Delivery-Sprint-8`.
- Task PR идут в delivery-ветку.
- Финальный PR: `SCRUM-XXX-Admin-GraphQL-Delivery-Sprint-8 -> develop`.

## 2. PR стратегия

- PR-1: `A1` (auth + GraphQL foundation)
- PR-2: `A2 + A3` (users flows)
- PR-3: `A4 + A5` (details + payments)
- PR-4: `A6 + A7` (posts realtime + stabilization)

## 3. Merge checks

- Перед каждым PR: минимум `pnpm lint && pnpm typecheck`.
- Перед merge ключевых этапов и финала: `pnpm run ci:check`.
- Для обычных task PR участие Main Reviewer не является обязательным.
- Для финального PR `SCRUM-XXX-Admin-GraphQL-Delivery-Sprint-8 -> develop` обязательны 2 approvals, один из них — Main Reviewer.
- В PR фиксировать:
- покрытые UC;
- контрактные решения (если были);
- команды проверок и результат.
