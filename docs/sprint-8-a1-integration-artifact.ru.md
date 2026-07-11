# Sprint 8 A1 - Integration Artifact

## Purpose

Этот документ фиксирует handoff-контракт для задач A2/A3/A4/A5/A6 после завершения A1 (`GraphQL base + admin auth`).

## Approved stack

- `@apollo/client`
- `graphql-ws`

В рамках Sprint 8 альтернативные GraphQL-клиенты не используются.

## Public entrypoints

### Apollo Provider

Импортировать только так:

`import { ApolloAppProvider } from "@/app/providers/apollo";`

### GraphQL API

Импортировать только так:

`import { gql, useGqlClient, useGqlLazyQuery, useGqlMutation, useGqlQuery, useGqlSubscription, buildBasicHeader, LOGIN_ADMIN_MUTATION, POST_ADDED_SUBSCRIPTION } from "@/shared/api/graphql";`

## Auth contract

- `loginAdmin` вызывается без Basic auth header
- все остальные GraphQL operations выполняются с `Authorization: Basic base64(email:password)`

Helper:

`import { buildBasicHeader } from "@/shared/api/graphql";`

## Environment variables

Для локального запуска нужны:

`NEXT_PUBLIC_GRAPHQL_HTTP_URL=https://inctagram.work/api/v1/graphql`

`NEXT_PUBLIC_GRAPHQL_WS_URL=ws://inctagram.work/api/v1/graphql`

После изменения env нужно перезапустить dev server.

## Subscription foundation

Для A6.2 опубликован foundation subscription:

`import { POST_ADDED_SUBSCRIPTION } from "@/shared/api/graphql";`

Текущий минимальный selection set:

- `postAdded.id`

Этого достаточно для базового dedupe по `post.id`. Расширение selection set допускается уже в A6.2 по реальному контракту posts.

## Wrappers for team usage

Командные GraphQL hooks:

- `useGqlQuery`
- `useGqlLazyQuery`
- `useGqlMutation`
- `useGqlSubscription`
- `useGqlClient`

Сейчас это thin wrappers над Apollo hooks, но они являются approved public API для feature-модулей.

## Expected usage rule

Feature-код не должен импортировать hooks напрямую из `@apollo/client/react`.

Использовать нужно только:

`import { useGqlClient, useGqlLazyQuery, useGqlMutation, useGqlQuery, useGqlSubscription } from "@/shared/api/graphql";`
