"use client";

import { m } from "motion/react";
import {
  Bug,
  FileText,
  Lightbulb,
  Mail,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { quickActions, type QuickActionId } from "@/data/quick-actions";

const icons: Record<QuickActionId, LucideIcon> = {
  summarize: FileText,
  email: Mail,
  explain: Sparkles,
  debug: Bug,
  brainstorm: Lightbulb,
};

export function QuickActions({ onPick }: { onPick: (prompt: string) => void }) {
  return (
    <ul className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
      {quickActions.map((action, i) => {
        const Icon = icons[action.id];
        return (
          <m.li
            key={action.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.05 * i, ease: "easeOut" }}
            className="last:sm:odd:col-span-2"
          >
            <button
              type="button"
              onClick={() => onPick(action.prompt)}
              className="group flex min-h-16 w-full items-center gap-3 rounded-xl border border-border bg-surface p-3 text-left transition-[border-color,background-color] duration-150 hover:border-border-strong hover:bg-surface-2 motion-reduce:transition-none"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent-text">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">
                  {action.label}
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  {action.description}
                </span>
              </span>
            </button>
          </m.li>
        );
      })}
    </ul>
  );
}
