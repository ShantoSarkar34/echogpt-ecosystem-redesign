"use client";

import { EmptyState } from "@/components/chat/empty-state";
import { useChatStore } from "@/hooks/use-chat-store";

export function ChatView() {
  const conversation = useChatStore((s) =>
    s.conversations.find((c) => c.id === s.activeId),
  );

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      {!conversation ? (
        <EmptyState />
      ) : (
        <div className="mx-auto max-w-3xl space-y-4 px-4 py-6">
          {conversation.messages.map((m) => (
            <div
              key={m.id}
              className="rounded-xl border border-border bg-surface p-4 text-sm"
            >
              <p className="mb-1 text-xs font-medium text-subtle-foreground">
                {m.role === "user" ? "You" : "EchoGPT"}
              </p>
              <p className="whitespace-pre-wrap wrap-break-word">{m.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
