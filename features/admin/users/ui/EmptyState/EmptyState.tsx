"use client";

import React, { memo } from "react";
import { Typography } from "@/shared/ui";

export const EmptyState = memo(() => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Typography variant="h1" className="text-light-100">
        No users yet
      </Typography>
    </div>
  );
});

EmptyState.displayName = "EmptyState";
