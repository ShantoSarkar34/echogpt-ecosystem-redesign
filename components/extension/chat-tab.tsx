"use client";

import { useRef, useState } from "react";
import { Composer } from "@/components/chat/composer";
import { MessageList } from "@/components/chat/message-list";
import { ContextToggle } from "@/components/extension/context-toggle";
import { ExtensionEmpty } from "@/components/extension/extension-empty";
import { useChatStore } from "@/hooks/use-chat-store";

interface ChatTabProps {
  contextEnabled: boolean;
  onContextChange: (enabled: boolean) => void;
}

export function ChatTab({ contextEnabled, onContextChange }: ChatTabProps) {
  const conversation = useChatStore((s) => s.conversations.find((c) => c.id === s.activeId));
  const status = useChatStore((s) => (s.activeId ? s.pending[s.activeId] : undefined));
  const sendMessage = useChatStore((s) => s.sendMessage);
  const retry = useChatStore((s) => s.retry);

  const [draft, setDraft] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSend() {
    const text = draft.trim();
    if (!text || status === "loading") return;
    sendMessage(text);
    setDraft("");
  }

  return (
    <>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {conversation ? (
          <MessageList conversation={conversation} status={status} onRetry={retry} />
        ) : (
          <ExtensionEmpty contextEnabled={contextEnabled} onPick={sendMessage} />
        )}
      </div>
      <ContextToggle enabled={contextEnabled} onChange={onContextChange} />
      <Composer
        value={draft}
        onChange={setDraft}
        onSend={handleSend}
        disabled={status === "loading"}
        textareaRef={textareaRef}
        hideHint
      />
    </>
  );
}