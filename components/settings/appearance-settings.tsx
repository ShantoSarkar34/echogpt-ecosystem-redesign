"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  SegmentedControl,
  type SegmentedOption,
} from "@/components/ui/segmented-control";
import {
  SettingRow,
  SettingsSection,
} from "@/components/settings/settings-section";
import { useMounted } from "@/hooks/use-mounted";
import type { ThemeChoice } from "@/types/settings";

const options: SegmentedOption<ThemeChoice>[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const value: ThemeChoice =
    mounted && (theme === "light" || theme === "dark") ? theme : "system";

  return (
    <SettingsSection
      title="Appearance"
      description="Choose how EchoGPT looks on this device."
    >
      <SettingRow
        id="theme"
        label="Theme"
        description="System follows your device's light or dark setting."
      >
        <SegmentedControl
          name="theme"
          label="Theme"
          value={value}
          onChange={setTheme}
          options={options}
        />
      </SettingRow>
    </SettingsSection>
  );
}
