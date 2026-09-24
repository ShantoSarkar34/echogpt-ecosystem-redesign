"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  SegmentedControl,
  type SegmentedOption,
} from "@/components/ui/segmented-control";
import { Switch } from "@/components/ui/switch";
import { models } from "@/data/models";
import { useChatStore } from "@/hooks/use-chat-store";
import { useMounted } from "@/hooks/use-mounted";
import { useSettingsStore } from "@/hooks/use-settings-store";
import { cn } from "@/lib/utils";
import type { ModelId } from "@/types/chat";
import type { ThemeChoice } from "@/types/settings";

const themeOptions: SegmentedOption<ThemeChoice>[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

interface RowProps {
  id: string;
  label: string;
  description?: string;
  inline?: boolean;
  children: ReactNode;
}

function Row({ id, label, description, inline = false, children }: RowProps) {
  return (
    <div
      className={cn(
        "py-3",
        inline ? "flex items-center justify-between gap-4" : "space-y-2",
      )}
    >
      <div className="min-w-0">
        <p id={`${id}-label`} className="text-sm font-medium">
          {label}
        </p>
        {description && (
          <p id={`${id}-desc`} className="mt-0.5 text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <div className={inline ? "shrink-0" : undefined}>{children}</div>
    </div>
  );
}

interface SettingsTabProps {
  contextEnabled: boolean;
  onContextChange: (enabled: boolean) => void;
}

export function SettingsTab({
  contextEnabled,
  onContextChange,
}: SettingsTabProps) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const themeValue: ThemeChoice =
    mounted && (theme === "light" || theme === "dark") ? theme : "system";

  const defaultModelId = useSettingsStore((s) => s.defaultModelId);
  const enterToSend = useSettingsStore((s) => s.enterToSend);
  const compactMode = useSettingsStore((s) => s.compactMode);
  const setPreference = useSettingsStore((s) => s.setPreference);
  const setChatModel = useChatStore((s) => s.setModel);

  function changeDefaultModel(id: ModelId) {
    setPreference("defaultModelId", id);
    if (useChatStore.getState().activeId === null) setChatModel(id);
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-4 py-2">
      <div className="divide-y divide-border">
        <Row id="x-theme" label="Theme">
          <SegmentedControl
            name="ext-theme"
            label="Theme"
            value={themeValue}
            onChange={setTheme}
            options={themeOptions}
            className="w-fit sm:w-fit"
          />
        </Row>

        <Row id="x-model" label="Default model">
          <select
            aria-labelledby="x-model-label"
            value={defaultModelId}
            onChange={(e) => changeDefaultModel(e.target.value as ModelId)}
            className="h-10 w-full cursor-pointer rounded-lg border border-border-strong bg-surface-2 px-3 text-sm"
          >
            {models.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </Row>

        <Row
          id="x-context"
          inline
          label="Page context"
          description="Let EchoGPT read the current page."
        >
          <Switch
            checked={contextEnabled}
            onCheckedChange={onContextChange}
            aria-labelledby="x-context-label"
            aria-describedby="x-context-desc"
          />
        </Row>

        <Row
          id="x-enter"
          inline
          label="Enter to send"
          description="Off: Ctrl/⌘ + Enter sends."
        >
          <Switch
            checked={enterToSend}
            onCheckedChange={(v) => setPreference("enterToSend", v)}
            aria-labelledby="x-enter-label"
            aria-describedby="x-enter-desc"
          />
        </Row>

        <Row
          id="x-compact"
          inline
          label="Compact messages"
          description="Tighter chat spacing."
        >
          <Switch
            checked={compactMode}
            onCheckedChange={(v) => setPreference("compactMode", v)}
            aria-labelledby="x-compact-label"
            aria-describedby="x-compact-desc"
          />
        </Row>
      </div>

      <p className="pb-2 pt-4 text-xs text-subtle-foreground">
        Concept only, not a published extension.{" "}
        <Link
          href="/app/settings"
          className="text-accent-text underline-offset-2 hover:underline"
        >
          Open full settings
        </Link>
      </p>
    </div>
  );
}
