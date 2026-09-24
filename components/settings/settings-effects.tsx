"use client";

import { useEffect } from "react";
import { useChatStore } from "@/hooks/use-chat-store";
import { useSettingsStore } from "@/hooks/use-settings-store";

export function SettingsEffects() {
  const reduceMotion = useSettingsStore((s) => s.reduceMotion);

  useEffect(() => {
    void Promise.resolve(useSettingsStore.persist.rehydrate()).then(() => {
      const chat = useChatStore.getState();
      if (chat.activeId === null) {
        chat.setModel(useSettingsStore.getState().defaultModelId);
      }
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reduceMotion);
  }, [reduceMotion]);

  return null;
}
