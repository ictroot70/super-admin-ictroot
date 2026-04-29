"use client";

import React, { memo } from "react";

interface PageContainerProps {
  children: React.ReactNode;
}

export const PageContainer = memo(({ children }: PageContainerProps) => (
  <div className="flex min-h-screen w-full items-center justify-center p-4">
    <div className="w-[972px] min-h-[432px] grid grid-rows-[auto_1fr_auto] gap-4 border border-dark-100 bg-dark-700 p-6">
      {children}
    </div>
  </div>
));

PageContainer.displayName = "PageContainer";