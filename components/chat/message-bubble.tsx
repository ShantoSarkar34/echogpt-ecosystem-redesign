"use client";

import { memo, useEffect, useRef, useState } from "react";
import { m } from "motion/react";
import { Check, Copy, Pencil, RotateCw, X } from "lucide-react";
import { AssistantAvatar } from "@/components/chat/assistant-avatar";
import { MarkdownLite } from "@/components/chat/markdown-lite";
import { Button } from "@/components/ui/button";
import type { Message } from "@/types/chat";

const enter = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.18, ease: "easeOut" as const },
};

function useTimedCopy(text: string) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  return async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable: fail silently */
    }
  };
}

interface MessageBubbleProps {
  message: Message;
  isLastUser?: boolean;
  isLastAssistant?: boolean;
  disabled?: boolean;
  onEditSend?: (id: string, text: string) => void;
  onRegenerate?: () => void;
}

export const MessageBubble = memo(function MessageBubble({
  message,
  isLastUser = false,
  isLastAssistant = false,
  disabled = false,
  onEditSend,
  onRegenerate,
}: MessageBubbleProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(message.content);
  const copy = useTimedCopy(message.content);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await copy();
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  if (message.role === "user") {
    if (editing) {
      return (
        <m.div {...enter} className="flex justify-end">
          <div className="w-full max-w-[85%] rounded-2xl rounded-br-md border border-accent bg-surface-2 p-3 sm:max-w-[75%]">
            <label htmlFor={`edit-${message.id}`} className="sr-only">
              Edit message
            </label>
            <textarea
              id={`edit-${message.id}`}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={3}
              className="w-full resize-none bg-transparent text-sm leading-relaxed outline-none"
              autoFocus
            />
            <div className="mt-2 flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setDraft(message.content);
                  setEditing(false);
                }}
              >
                <X aria-hidden="true" /> Cancel
              </Button>
              <Button
                size="sm"
                disabled={!draft.trim() || disabled}
                onClick={() => {
                  onEditSend?.(message.id, draft);
                  setEditing(false);
                }}
              >
                Save and resend
              </Button>
            </div>
          </div>
        </m.div>
      );
    }

    return (
      <m.div {...enter} className="group flex justify-end">
        <div className="flex max-w-[85%] flex-col items-end sm:max-w-[75%]">
          <p className="whitespace-pre-wrap wrap-break-words rounded-2xl rounded-br-md border border-border bg-surface-2 px-4 py-2.5 text-sm leading-relaxed">
            {message.content}
          </p>
          {isLastUser && onEditSend && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditing(true)}
              disabled={disabled}
              className="mt-1 h-9 gap-1.5 px-2 text-xs text-subtle-foreground sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
            >
              <Pencil aria-hidden="true" /> Edit
            </Button>
          )}
        </div>
      </m.div>
    );
  }

  return (
    <m.div {...enter} className="group flex gap-3">
      <AssistantAvatar />
      <div className="min-w-0 flex-1">
        <div className="pt-1 text-sm leading-relaxed">
          <MarkdownLite text={message.content} />
        </div>
        <div className="mt-1 flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy response"}
            className="h-9 gap-1.5 px-2 text-xs text-subtle-foreground sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
          >
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          {isLastAssistant && onRegenerate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRegenerate}
              disabled={disabled}
              className="h-9 gap-1.5 px-2 text-xs text-subtle-foreground sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
            >
              <RotateCw aria-hidden="true" /> Regenerate
            </Button>
          )}
        </div>
      </div>
    </m.div>
  );
});