# GraphQL Codegen — правила работы в проекте

## Как это работает

- Мы используем `@graphql-codegen/client-preset`.
- Ты пишешь `.graphql` файл → запускаешь `pnpm codegen` → получаешь типизированные документы и типы автоматически.
- Руками типы для GraphQL операций **не пишем**.
- Операции не пишем inline в .ts/.tsx (gql\...`) — только в .graphql в shared/api/graphql/operations/**.`

## Структура файлов

### Каждая операция — отдельный .graphql файл в shared/api/graphql/operations/\*\*:

```floobits
shared/
    api/
        graphql/
            operations/
                mutations/
                    banUser.mutation.graphql
                    unbanUser.mutation.graphql
                queries/
                    getUsers.query.graphql
                subscriptions/
                    postAdded.subscription.graphql
```

### Сгенерированные файлы (не трогать руками):

```floobits
shared/
    api/
        graphql/
            gql/
                graphql.ts # все типы и документы
                gql.ts # функция gql
                index.ts # реэкспорт
                fragment-masking.ts
```

## Как писать .graphql файлы

### Мутация:

```graphql
mutation BanUser($userId: Int!, $banReason: String!) {
  banUser(userId: $userId, banReason: $banReason)
}
```

### Запрос:

```graphql
query GetUsers($pageSize: Int, $pageNumber: Int) {
  getUsers(pageSize: $pageSize, pageNumber: $pageNumber) {
    users {
      id
      userName
      email
    }
    pagination {
      totalCount
      pagesCount
    }
  }
}
```

## Команды

# Генерация один раз

```bash
pnpm codegen
```

# Режим watch — автоматически при изменении .graphql файлов

```bash
pnpm codegen:watch
```

## Как использовать в компоненте

```ts
import { useGqlMutation } from "@/shared/api";
import {
  BanUserDocument,
  type BanUserMutation,
  type BanUserMutationVariables,
} from "@/shared/api/graphql/gql/graphql";

const [banUser] = useGqlMutation<BanUserMutation, BanUserMutationVariables>(
  BanUserDocument,
);

await banUser({ variables: { userId, banReason: reason } });
```

### Для query:

```ts
import { useGqlQuery } from "@/shared/api";
import {
  GetUsersDocument,
  type GetUsersQuery,
  type GetUsersQueryVariables,
} from "@/shared/api/graphql/gql/graphql";

const { data } = useGqlQuery<GetUsersQuery, GetUsersQueryVariables>(
  GetUsersDocument,
  {
    variables: { pageSize: 8, pageNumber: 1 },
  },
);
```

## Правила

1. Написал .graphql файл → сразу запусти pnpm codegen
2. Не пиши типы для GraphQL вручную — они генерируются
3. Файлы в shared/api/graphql/gql/ не редактируй руками — они перезапишутся при следующем codegen
4. Папку shared/api/graphql/gql/ коммитим в git — чтобы у всех были актуальные типы без лишнего шага
5. При конфликте в gql/ — не резолви руками, просто запусти pnpm codegen

## Соглашение по именованию .graphql файлов

- Мутации: banUser.mutation.graphql
- Запросы: getUsers.query.graphql
- Подписки: postAdded.subscription.graphql

## Если что-то сломалось

- Ошибка "Cannot find module '.../gql/graphql'" → запусти pnpm codegen
- Типы не обновились → запусти pnpm codegen
- Новый разработчик склонировал репо → запусти pnpm codegen

## Источник истины по архитектуре: .ai/policy.md (если есть конфликт — ориентируемся на него).
