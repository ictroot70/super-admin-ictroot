"use client";

import React, { ChangeEvent, memo } from "react";
import { Input, Select } from "@/shared/ui";
import { FilterValue, FILTER_ITEMS } from "../../model";

interface ControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: string;
  onFilterChange: (value: FilterValue) => void;
}

export const Controls = memo(
  ({
    searchTerm,
    onSearchChange,
    filterStatus,
    onFilterChange,
  }: ControlsProps) => {
    return (
      <div className="flex w-full items-center justify-between gap-[46px]">
        <div className="w-[644px] flex-shrink-0">
          <Input
            inputType="search"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onSearchChange(e.target.value)
            }
            className="w-full h-[36px]"
            aria-label="Search users"
            reserveErrorSpace={false}
          />
        </div>

        <div className="w-[234px] flex-shrink-0">
          <Select
            items={FILTER_ITEMS}
            value={filterStatus}
            onValueChange={(val) => onFilterChange(val as FilterValue)}
            aria-label="Filter by status"
            size="medium"
            classNames={{
              trigger:
                "h-[36px] flex items-center px-[12px] py-0 rounded-[2px] bg-dark-500 hover:border-light-900 focus:border-transparent focus:outline-2 focus:outline-primary-500 !w-full",
              content: "bg-dark-500 border-light-100 rounded-[2px]",
              item: "h-[36px] flex items-center px-[12px] hover:bg-dark-300 hover:text-primary-500",
            }}
          />
        </div>
      </div>
    );
  },
);

Controls.displayName = "Controls";
