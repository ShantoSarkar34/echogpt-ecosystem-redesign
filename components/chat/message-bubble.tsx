"use client";

import { useEffect, useRef, useState, memo } from "react";
import { m } from "motion/react";
import { Check, Copy } from "lucide-react";
import { AssistantAvatar } from "@/components/chat/assistant-avatar";
import { Button } from "@/components/ui/button";
import type { Message } from "@/types/chat";

const enter = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.18, ease: "easeOut" as const },
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable: fail silently */
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy response"}
      className="-ml-2 mt-1 h-9 gap-1.5 px-2 text-xs text-subtle-foreground sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
    >
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}

export const MessageBubble = memo(function MessageBubble({
  message,
}: {
  message: Message;
}) {
  if (message.role === "user") {
    return (
      <m.div {...enter} className="flex justify-end">
        <p className="max-w-[85%] whitespace-pre-wrap wrap-break-word rounded-2xl rounded-br-md border border-border bg-surface-2 px-4 py-2.5 text-sm leading-relaxed sm:max-w-[75%]">
          {message.content}
        </p>
      </m.div>
    );
  }

  return (
    <m.div {...enter} className="group flex gap-3">
      <AssistantAvatar />
      <div className="min-w-0 flex-1">
        <p className="whitespace-pre-wrap wrap-break-word pt-1 text-sm leading-relaxed">
          {message.content}
        </p>
        <CopyButton text={message.content} />
      </div>
    </m.div>
  );
});
