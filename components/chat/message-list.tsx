"use client";

import { useEffect, useRef } from "react";
import { MessageBubble } from "@/components/chat/message-bubble";
import { MessageError } from "@/components/chat/message-error";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import type { PendingStatus } from "@/hooks/use-chat-store";
import type { Conversation } from "@/types/chat";
import { useSettingsStore } from "@/hooks/use-settings-store";
import { cn } from "@/lib/utils";

interface MessageListProps {
  conversation: Conversation;
  status: PendingStatus | undefined;
  onRetry: () => void;
}

export function MessageList({
  conversation,
  status,
  onRetry,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const prevId = useRef(conversation.id);
  const compact = useSettingsStore((s) => s.compactMode);

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
        <MessageBubble key={m.id} message={m} />
      ))}
      {status === "loading" && <TypingIndicator />}
      {status === "error" && <MessageError onRetry={onRetry} />}
      <div ref={bottomRef} />
    </div>
  );
}
