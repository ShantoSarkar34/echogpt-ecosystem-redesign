"use client";

import { useRef, useState } from "react";
import { Composer } from "@/components/chat/composer";
import { MessageList } from "@/components/chat/message-list";
import { ContextToggle } from "@/components/extension/context-toggle";
import { ExtensionEmpty } from "@/components/extension/extension-empty";
import { getMockPage } from "@/data/mock-page";
import { useChatStore } from "@/hooks/use-chat-store";

interface ChatTabProps {
  activePageId: string;
  contextEnabled: boolean;
  onContextChange: (enabled: boolean) => void;
}

export function ChatTab({
  activePageId,
  contextEnabled,
  onContextChange,
}: ChatTabProps) {
  const page = getMockPage(activePageId);
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

  function send(text: string) {
    if (!text.trim() || status === "loading") return;
    sendMessage(
      text,
      contextEnabled
        ? { title: page.title, highlight: page.highlight }
        : undefined,
    );
  }

  function handleSend() {
    send(draft);
    setDraft("");
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
          <ExtensionEmpty
            page={page}
            contextEnabled={contextEnabled}
            onPick={send}
          />
        )}
      </div>
      <ContextToggle
        page={page}
        enabled={contextEnabled}
        onChange={onContextChange}
      />
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
