"use client";

import { Switch } from "@/components/ui/switch";
import {
  SettingRow,
  SettingsSection,
} from "@/components/settings/settings-section";
import { useSettingsStore } from "@/hooks/use-settings-store";

export function InterfaceSettings() {
  const compactMode = useSettingsStore((s) => s.compactMode);
  const enterToSend = useSettingsStore((s) => s.enterToSend);
  const reduceMotion = useSettingsStore((s) => s.reduceMotion);
  const setPreference = useSettingsStore((s) => s.setPreference);

  return (
    <SettingsSection
      title="Interface"
      description="Tune the chat experience to your workflow."
    >
      <SettingRow
        id="compact"
        stack={false}
        label="Compact messages"
        description="Tighter spacing to fit more of the conversation on screen."
      >
        <Switch
          checked={compactMode}
          onCheckedChange={(v) => setPreference("compactMode", v)}
          aria-labelledby="compact-label"
          aria-describedby="compact-desc"
        />
      </SettingRow>

      <SettingRow
        id="enter"
        stack={false}
        label="Enter to send"
        description="When off, use Ctrl/⌘ + Enter to send and Enter for a new line."
      >
        <Switch
          checked={enterToSend}
          onCheckedChange={(v) => setPreference("enterToSend", v)}
          aria-labelledby="enter-label"
          aria-describedby="enter-desc"
        />
      </SettingRow>

      <SettingRow
        id="motion"
        stack={false}
        label="Reduce animations"
        description="Minimize movement across the interface. Your system setting is always respected."
      >
        <Switch
          checked={reduceMotion}
          onCheckedChange={(v) => setPreference("reduceMotion", v)}
          aria-labelledby="motion-label"
          aria-describedby="motion-desc"
        />
      </SettingRow>
    </SettingsSection>
  );
}
