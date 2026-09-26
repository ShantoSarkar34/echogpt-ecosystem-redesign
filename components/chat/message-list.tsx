"use client";

import { useEffect, useRef } from "react";
import { MessageBubble } from "@/components/chat/message-bubble";
import { MessageError } from "@/components/chat/message-error";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import { useSettingsStore } from "@/hooks/use-settings-store";
import { cn } from "@/lib/utils";
import type { PendingStatus } from "@/hooks/use-chat-store";
import type { Conversation } from "@/types/chat";

interface MessageListProps {
  conversation: Conversation;
  status: PendingStatus | undefined;
  onRetry: () => void;
  onEditSend?: (id: string, text: string) => void;
  onRegenerate?: () => void;
}

export function MessageList({
  conversation,
  status,
  onRetry,
  onEditSend,
  onRegenerate,
}: MessageListProps) {
  const compact = useSettingsStore((s) => s.compactMode);
  const bottomRef = useRef<HTMLDivElement>(null);
  const prevId = useRef(conversation.id);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const switched = prevId.current !== conversation.id;
    prevId.current = conversation.id;

    bottomRef.current?.scrollIntoView({
      behavior: reduceMotion || switched ? "auto" : "smooth",
      block: "end",
    });
  }, [conversation.id, conversation.messages.length, status]);

  const lastUserId = conversation.messages.findLast(
    (m) => m.role === "user",
  )?.id;
  const lastAssistantId = conversation.messages.findLast(
    (m) => m.role === "assistant",
  )?.id;
  const busy = status === "loading";

  return (
    <div
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      aria-label="Conversation"
      className={cn(
        "mx-auto w-full max-w-3xl px-4",
        compact ? "space-y-3 py-4" : "space-y-6 py-6",
      )}
    >
      {conversation.messages.map((m) => (
        <MessageBubble
          key={m.id}
          message={m}
          isLastUser={m.id === lastUserId}
          isLastAssistant={m.id === lastAssistantId}
          disabled={busy}
          onEditSend={onEditSend}
          onRegenerate={onRegenerate}
        />
      ))}
      {status === "loading" && <TypingIndicator />}
      {status === "error" && <MessageError onRetry={onRetry} />}
      <div ref={bottomRef} />
    </div>
  );
}
