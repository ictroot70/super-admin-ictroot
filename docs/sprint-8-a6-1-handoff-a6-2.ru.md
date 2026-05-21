# Sprint 8 A6.1 -> A6.2 Handoff Contract

## Purpose

Этот документ фиксирует handoff-контракт от A6.1 к A6.2 для posts flow:

- cursor state;
- append/dedupe policy;
- точка расширения под realtime `postAdded`.

## Source of truth

Текущий источник истины для A6 posts-list orchestration:

- `features/admin/fetch-posts/model/userPostsList.ts`

UI-контейнер (client composition):

- `features/admin/fetch-posts/ui/PostsPageClient.tsx`

Route-level composition:

- `app/(super-admin)/posts/page.tsx`

## Pagination contract (A6.1 baseline)

- pagination: cursor-based через `endCursorPostId`;
- `loadInitial(search)` выполняет `replace` набора;
- `loadMore()` выполняет `append` следующей страницы;
- `hasMore = endCursorPostId !== null && posts.length < totalCount`.

Правило:

- `endCursorPostId` всегда берется из последнего элемента актуального ответа (`items[items.length - 1].id`) либо `null`, если ответ пустой.

## Append / Dedupe policy

- при `append` используется dedupe по `post.id`:
  - входящие элементы фильтруются через `existingIds` и добавляются только новые;
- при `replace` выполняется защита от лишней перерисовки:
  - если список по `id` и длине совпадает с текущим, `posts` не перезаписывается.

Это является обязательным инвариантом для A6.2, чтобы избежать дублей и лишнего flicker.

## Search + concurrency policy

- UI input state: `inputValue` (мгновенный controlled input);
- query state: `searchTerm` (debounced, 300ms);
- stale-search защита: `requestIdRef` (устаревшие ответы игнорируются);
- во время `isSearching` догрузка страниц блокируется;
- observer триггер отключается при `isInitialLoading || isFetchingMore || isSearching`.

## Realtime extension point for A6.2

Для `postAdded` в A6.2 использовать только расширение текущего hook-контракта:

1. Нормализовать subscription payload в тот же `PostVM` формат.
2. Применять prepend-политику через dedupe по `post.id` (аналог append dedupe).
3. Не ломать текущие инварианты cursor/search:
   - `searchTerm` и search-поток остаются приоритетными для видимого списка;
   - realtime update не должен дублировать пост, уже присутствующий в `posts`.

Текущая подготовленная точка расширения:

- `mergePrepend` в `userPostsList.ts` (пока не подключен в A6.1).

## Reuse contract (moderation)

Ban flow в posts-контексте обязан переиспользовать общий модуль:

- `features/admin/ban-user` (без дублирования modal/hook в `fetch-posts`).

## Verification baseline for A6.2 integration

Минимальный smoke после подключения subscription:

1. Новый пост появляется без reload.
2. Дубликаты по `post.id` не возникают при race (subscription + pagination/search).
3. Infinite scroll продолжает корректно догружать после realtime update.
4. Поиск не ломает controlled input и не теряет символы.
