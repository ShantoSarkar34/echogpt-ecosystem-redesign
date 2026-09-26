"use client";

import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import {
  History,
  MessageSquare,
  Settings,
  SquarePen,
  type LucideIcon,
} from "lucide-react";
import { AssistantAvatar } from "@/components/chat/assistant-avatar";
import { ModelSelector } from "@/components/chat/model-selector";
import { ChatTab } from "@/components/extension/chat-tab";
import { HistoryTab } from "@/components/extension/history-tab";
import { SettingsTab } from "@/components/extension/settings-tab";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/hooks/use-chat-store";

type TabId = "chat" | "history" | "settings";

const tabs: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "history", label: "History", icon: History },
  { id: "settings", label: "Settings", icon: Settings },
];

interface ExtensionPanelProps {
  activePageId: string;
  contextEnabled: boolean;
  onContextChange: (enabled: boolean) => void;
}

export function ExtensionPanel({
  activePageId,
  contextEnabled,
  onContextChange,
}: ExtensionPanelProps) {
  const [tab, setTab] = useState<TabId>("chat");
  const startNewChat = useChatStore((s) => s.startNewChat);

  return (
    <section
      aria-label="EchoGPT extension"
      className="flex h-[min(600px,calc(100dvh-9rem))] min-h-105 w-full flex-col overflow-hidden rounded-2xl border border-border-strong bg-background shadow-elev-2"
    >
      <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-3">
        <AssistantAvatar />
        <h2 className="sr-only">EchoGPT</h2>
        <div className="min-w-0 flex-1">
          <ModelSelector />
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label="New chat"
          onClick={() => {
            startNewChat();
            setTab("chat");
          }}
        >
          <SquarePen aria-hidden="true" />
        </Button>
        <ThemeToggle />
      </header>

      <Tabs.Root
        value={tab}
        onValueChange={(v) => setTab(v as TabId)}
        className="flex min-h-0 flex-1 flex-col"
      >
        <Tabs.List
          aria-label="Extension sections"
          className="grid shrink-0 grid-cols-3 gap-1 border-b border-border px-2 py-1.5"
        >
          {tabs.map((t) => (
            <Tabs.Trigger
              key={t.id}
              value={t.id}
              className="flex h-9 items-center justify-center gap-1.5 rounded-lg text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground data-[state=active]:bg-surface-2 data-[state=active]:text-foreground motion-reduce:transition-none"
            >
              <t.icon className="size-4" aria-hidden="true" />
              {t.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {/* Chat stays mounted so an unsent draft survives tab switches */}
        <Tabs.Content
          value="chat"
          forceMount
          className="flex min-h-0 flex-1 flex-col outline-none data-[state=active]:animate-fade-in data-[state=inactive]:hidden motion-reduce:animate-none"
        >
          <ChatTab
            activePageId={activePageId}
            contextEnabled={contextEnabled}
            onContextChange={onContextChange}
          />
        </Tabs.Content>

        <Tabs.Content
          value="history"
          className="flex min-h-0 flex-1 flex-col outline-none data-[state=active]:animate-fade-in motion-reduce:animate-none"
        >
          <HistoryTab onOpenChat={() => setTab("chat")} />
        </Tabs.Content>

        <Tabs.Content
          value="settings"
          className="flex min-h-0 flex-1 flex-col outline-none data-[state=active]:animate-fade-in motion-reduce:animate-none"
        >
          <SettingsTab
            contextEnabled={contextEnabled}
            onContextChange={onContextChange}
          />
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
