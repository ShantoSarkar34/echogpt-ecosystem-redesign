"use client";

import { ModelSelector } from "@/components/chat/model-selector";
import { SidebarTrigger } from "@/components/chat/sidebar-trigger";
import { useChatStore } from "@/hooks/use-chat-store";

export function ChatHeader() {
  const title = useChatStore(
    (s) =>
      s.conversations.find((c) => c.id === s.activeId)?.title ?? "New chat",
  );

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-3 sm:px-4">
      <SidebarTrigger />
      <h1 className="min-w-0 flex-1 truncate text-sm font-medium" title={title}>
        {title}
      </h1>
      <ModelSelector />
    </header>
  );
}
