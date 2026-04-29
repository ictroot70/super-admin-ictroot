"use client";

import { memo } from "react";
import { Button, Typography } from "@/shared/ui";

export const ErrorState = memo(() => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <Typography variant="h1" className="text-light-100">
          Failed to load users
        </Typography>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    </div>
  );
});

ErrorState.displayName = "ErrorState";
