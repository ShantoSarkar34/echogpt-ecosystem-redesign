"use client";

import { useRef, useState } from "react";
import { Composer } from "@/components/chat/composer";
import { EmptyState } from "@/components/chat/empty-state";
import { MessageList } from "@/components/chat/message-list";
import { useChatStore } from "@/hooks/use-chat-store";

export function ChatView() {
  const conversation = useChatStore((s) =>
    s.conversations.find((c) => c.id === s.activeId),
  );
  const status = useChatStore((s) =>
    s.activeId ? s.pending[s.activeId] : undefined,
  );
  const sendMessage = useChatStore((s) => s.sendMessage);
  const retry = useChatStore((s) => s.retry);
  const regenerate = useChatStore((s) => s.regenerate);
  const editAndResend = useChatStore((s) => s.editAndResend);

  const [draft, setDraft] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSend() {
    const text = draft.trim();
    if (!text || status === "loading") return;
    sendMessage(text);
    setDraft("");
  }

  function handlePick(prompt: string) {
    setDraft(prompt);
    textareaRef.current?.focus();
  }

  return (
    <>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {conversation ? (
          <MessageList
            conversation={conversation}
            status={status}
            onRetry={retry}
            onEditSend={editAndResend}
            onRegenerate={regenerate}
          />
        ) : (
          <EmptyState onPick={handlePick} />
        )}
      </div>
      <Composer
        value={draft}
        onChange={setDraft}
        onSend={handleSend}
        disabled={status === "loading"}
        textareaRef={textareaRef}
      />
    </>
  );
}
