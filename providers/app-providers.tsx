"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { SettingsEffects } from "@/components/settings/settings-effects";
import { useSettingsStore } from "@/hooks/use-settings-store";

export function AppProviders({ children }: { children: ReactNode }) {
  const reduceMotion = useSettingsStore((s) => s.reduceMotion);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {/* "user" follows the OS setting; "always" is our in-app override */}
      <MotionConfig reducedMotion={reduceMotion ? "always" : "user"}>
        <LazyMotion features={domAnimation} strict>
          <SettingsEffects />
          {children}
        </LazyMotion>
      </MotionConfig>
    </ThemeProvider>
  );
}
