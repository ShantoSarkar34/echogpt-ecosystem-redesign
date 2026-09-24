"use client";

import {
  SegmentedControl,
  type SegmentedOption,
} from "@/components/ui/segmented-control";
import {
  SettingRow,
  SettingsSection,
} from "@/components/settings/settings-section";
import { models } from "@/data/models";
import { useChatStore } from "@/hooks/use-chat-store";
import { useSettingsStore } from "@/hooks/use-settings-store";
import type { ModelId } from "@/types/chat";
import type { ResponseStyle } from "@/types/settings";

const styleOptions: SegmentedOption<ResponseStyle>[] = [
  { value: "concise", label: "Concise" },
  { value: "balanced", label: "Balanced" },
  { value: "detailed", label: "Detailed" },
];

export function AssistantSettings() {
  const defaultModelId = useSettingsStore((s) => s.defaultModelId);
  const responseStyle = useSettingsStore((s) => s.responseStyle);
  const setPreference = useSettingsStore((s) => s.setPreference);
  const setChatModel = useChatStore((s) => s.setModel);

  function changeDefaultModel(id: ModelId) {
    setPreference("defaultModelId", id);
    if (useChatStore.getState().activeId === null) setChatModel(id);
  }

  return (
    <SettingsSection
      title="Assistant"
      description="Mock preferences that shape how the demo assistant behaves."
    >
      <SettingRow
        id="default-model"
        label="Default model"
        description="Used when you start a new chat."
      >
        <select
          aria-labelledby="default-model-label"
          aria-describedby="default-model-desc"
          value={defaultModelId}
          onChange={(e) => changeDefaultModel(e.target.value as ModelId)}
          className="h-10 w-full cursor-pointer rounded-lg border border-border-strong bg-surface-2 px-3 text-sm sm:w-52"
        >
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </SettingRow>

      <SettingRow
        id="response-style"
        label="Response style"
        description="Changes the wording of mock replies."
      >
        <SegmentedControl
          name="response-style"
          label="Response style"
          value={responseStyle}
          onChange={(v) => setPreference("responseStyle", v)}
          options={styleOptions}
        />
      </SettingRow>
    </SettingsSection>
  );
}
