"use client";

import { useEffect, type RefObject } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettingsStore } from "@/hooks/use-settings-store";

interface ComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  /** Hide the helper text under the input (used in the compact extension). */
  hideHint?: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}

const MAX_HEIGHT = 200;

export function Composer({
  value,
  onChange,
  onSend,
  disabled,
  hideHint = false,
  textareaRef,
}: ComposerProps) {
  const enterToSend = useSettingsStore((s) => s.enterToSend);

  // Auto-grow the textarea up to MAX_HEIGHT.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`;
  }, [value, textareaRef]);

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="shrink-0 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 sm:px-4">
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex items-end gap-2 rounded-2xl border border-border-strong bg-surface p-2 shadow-elev-1 transition-colors focus-within:border-accent">
          <label htmlFor="prompt-input" className="sr-only">
            Message EchoGPT
          </label>
          <textarea
            id="prompt-input"
            ref={textareaRef}
            value={value}
            rows={1}
            maxLength={4000}
            placeholder="Message EchoGPT…"
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
              const wantsSend = enterToSend
                ? !e.shiftKey
                : e.ctrlKey || e.metaKey;
              if (wantsSend) {
                e.preventDefault();
                if (canSend) onSend();
              }
            }}
            className="max-h-50 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm leading-relaxed outline-none placeholder:text-subtle-foreground"
          />
          <Button
            size="icon"
            aria-label="Send message"
            disabled={!canSend}
            onClick={onSend}
            className="shrink-0"
          >
            <ArrowUp aria-hidden="true" />
          </Button>
        </div>
        {!hideHint && (
          <p className="mt-2 hidden text-center text-xs text-subtle-foreground sm:block">
            Demo mode: replies are mocked.{" "}
            {enterToSend
              ? "Enter to send, Shift+Enter for a new line."
              : "Ctrl/⌘ + Enter to send."}
          </p>
        )}
      </div>
    </div>
  );
}
