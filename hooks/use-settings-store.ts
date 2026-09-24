import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DEFAULT_MODEL_ID } from "@/data/models";
import type { Preferences } from "@/types/settings";

export const defaultPreferences: Preferences = {
  defaultModelId: DEFAULT_MODEL_ID,
  responseStyle: "balanced",
  compactMode: false,
  enterToSend: true,
  reduceMotion: false,
};

interface SettingsState extends Preferences {
  setPreference: <K extends keyof Preferences>(
    key: K,
    value: Preferences[K],
  ) => void;
  resetPreferences: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultPreferences,
      setPreference: (key, value) =>
        set({ [key]: value } as Pick<Preferences, typeof key>),
      resetPreferences: () => set(defaultPreferences),
    }),
    {
      name: "echogpt-settings",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s): Preferences => ({
        defaultModelId: s.defaultModelId,
        responseStyle: s.responseStyle,
        compactMode: s.compactMode,
        enterToSend: s.enterToSend,
        reduceMotion: s.reduceMotion,
      }),
    },
  ),
);
