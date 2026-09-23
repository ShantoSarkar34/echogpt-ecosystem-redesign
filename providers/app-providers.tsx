"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {/* Respects the user's prefers-reduced-motion for all motion components */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
