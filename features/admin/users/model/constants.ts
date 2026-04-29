import { SelectItemsProps } from "@ictroot/ui-kit";

export const FILTER_ITEMS: SelectItemsProps[] = [
  { value: "ALL", label: "Not Selected" },
  { value: "BLOCKED", label: "Blocked" },
  { value: "UNBLOCKED", label: "Not Blocked" },
];

export const USERS_PAGE_SIZE_OPTIONS = [4, 8, 12, 20];
