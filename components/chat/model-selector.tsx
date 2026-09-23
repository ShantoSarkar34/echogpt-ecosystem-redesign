"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getModel, models } from "@/data/models";
import { useChatStore } from "@/hooks/use-chat-store";
import type { ModelId } from "@/types/chat";

export function ModelSelector() {
  const modelId = useChatStore((s) => s.modelId);
  const setModel = useChatStore((s) => s.setModel);
  const current = getModel(modelId);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="secondary" className="max-w-44 gap-2 px-3">
          <Sparkles className="text-accent-text" aria-hidden="true" />
          <span className="truncate">{current.name}</span>
          <ChevronDown className="opacity-60" aria-hidden="true" />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-50 w-72 max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-elevated p-1.5 shadow-elev-2 animate-pop-in motion-reduce:animate-none"
        >
          <DropdownMenu.Label className="px-2.5 py-1.5 text-xs font-medium text-subtle-foreground">
            Choose a model
          </DropdownMenu.Label>

          <DropdownMenu.RadioGroup
            value={modelId}
            onValueChange={(v) => setModel(v as ModelId)}
          >
            {models.map((m) => (
              <DropdownMenu.RadioItem
                key={m.id}
                value={m.id}
                className="flex cursor-pointer items-start gap-3 rounded-lg px-2.5 py-2 outline-none transition-colors data-highlighted:bg-surface-2"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">
                      {m.name}
                    </span>
                    <span className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent-text">
                      {m.badge}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {m.tagline}
                  </p>
                </div>
                <span className="mt-0.5 size-4 shrink-0">
                  <DropdownMenu.ItemIndicator>
                    <Check
                      className="size-4 text-accent-text"
                      aria-hidden="true"
                    />
                  </DropdownMenu.ItemIndicator>
                </span>
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>

          <p className="border-t border-border px-2.5 pb-1.5 pt-2 text-[11px] text-subtle-foreground">
            Demo only. Models are representative and responses are mocked.
          </p>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
