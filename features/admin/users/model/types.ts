import { UsersSortBy } from "./enums";

export type UsersSortDirection = "asc" | "desc";
export type FilterValue = "ALL" | "BLOCKED" | "UNBLOCKED";
export type SortValue = `${UsersSortBy}_${UsersSortDirection}`;

export type UsersSortState = {
  key: UsersSortBy | null;
  direction: UsersSortDirection;
};
