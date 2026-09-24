"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ConversationList } from "@/components/chat/conversation-list";
import { useChatStore } from "@/hooks/use-chat-store";

export function HistoryTab({ onOpenChat }: { onOpenChat: () => void }) {
  const conversations = useChatStore((s) => s.conversations);
  const activeId = useChatStore((s) => s.activeId);
  const selectConversation = useChatStore((s) => s.selectConversation);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? conversations.filter((c) => c.title.toLowerCase().includes(q))
      : conversations;
  }, [conversations, query]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="px-3 pt-3">
        <label htmlFor="ext-search" className="sr-only">
          Search conversations
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle-foreground"
            aria-hidden="true"
          />
          <input
            id="ext-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chats…"
            className="h-10 w-full rounded-lg border border-border-strong bg-surface-2 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-subtle-foreground focus:border-accent"
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2 py-3">
        {filtered.length > 0 ? (
          <ConversationList
            conversations={filtered}
            activeId={activeId}
            onSelect={(id) => {
              selectConversation(id);
              onOpenChat();
            }}
          />
        ) : (
          <p className="px-3 py-6 text-center text-sm text-subtle-foreground">
            No chats match &ldquo;{query}&rdquo;.
          </p>
        )}
      </div>
    </div>
  );
}
