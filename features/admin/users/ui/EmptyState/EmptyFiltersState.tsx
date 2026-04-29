"use client";

import React, { memo } from "react";
import { Button, Typography } from "@/shared/ui";
import { Controls } from "../Controls/Controls";
import { PageContainer } from "../PageContainer/PageContainer";
import { FilterValue } from "../../model";

interface EmptyFiltersStateProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: string;
  onFilterChange: (value: FilterValue) => void;
  onClearFilters: () => void;
}

export const EmptyFiltersState = memo(({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
  onClearFilters
}: EmptyFiltersStateProps) => {
  return (
    <PageContainer>
      <Controls
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        filterStatus={filterStatus}
        onFilterChange={onFilterChange}
      />
      <div className="grid place-items-center gap-4 text-center py-12">
        <Typography variant="h2" className="text-light-100">
          No users found
        </Typography>
        <Typography variant="h3" className="text-dark-100">
          Try adjusting your search or filter criteria
        </Typography>
        <Button variant="primary" onClick={onClearFilters}>
          Clear filters
        </Button>
      </div>
    </PageContainer>
  );
});

EmptyFiltersState.displayName = "EmptyFiltersState";