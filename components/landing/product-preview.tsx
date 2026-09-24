import {
  AudioLines,
  ArrowUp,
  MessageSquare,
  Plus,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const history = [
  "Launch announcement draft",
  "Debounce vs throttle",
  "Quarterly report summary",
  "Weekly meal prep plan",
];

export function ProductPreview() {
  return (
    <div
      role="img"
      aria-label="Preview of the EchoGPT web app: a sidebar with conversation history, a chat with a drafted announcement, and a prompt box."
      className="overflow-hidden rounded-2xl border border-border bg-surface shadow-elev-2"
    >
      {/* Window bar */}
      <div className="flex h-10 items-center gap-1.5 border-b border-border bg-surface-2 px-4">
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
      </div>

      <div className="grid h-88 md:h-104 md:grid-cols-[13.5rem_1fr]">
        {/* Sidebar */}
        <aside className="hidden flex-col gap-3 border-r border-border bg-surface p-3 md:flex">
          <div className="flex items-center gap-2 px-1 text-sm font-semibold">
            <span className="grid size-6 place-items-center rounded-md bg-brand-gradient text-white">
              <AudioLines className="size-3.5" />
            </span>
            EchoGPT
          </div>
          <div className="flex h-9 items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 text-xs font-medium">
            <Plus className="size-3.5" /> New chat
          </div>
          <ul className="space-y-0.5">
            {history.map((title, i) => (
              <li
                key={title}
                className={cn(
                  "flex h-8 items-center gap-2 rounded-md px-2.5 text-xs",
                  i === 0
                    ? "bg-accent-soft font-medium text-foreground"
                    : "text-muted-foreground",
                )}
              >
                <MessageSquare className="size-3.5 shrink-0 opacity-70" />
                <span className="truncate">{title}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Chat */}
        <div className="flex min-w-0 flex-col bg-background">
          <div className="flex h-11 shrink-0 items-center justify-between border-b border-border px-4">
            <span className="truncate text-xs font-medium">
              Launch announcement draft
            </span>
            <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] font-medium">
              <Sparkles className="size-3 text-accent-text" /> Echo Balanced
            </span>
          </div>

          <div className="flex-1 space-y-5 overflow-hidden px-4 py-5">
            <div className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-br-md border border-border bg-surface-2 px-3.5 py-2 text-xs leading-relaxed sm:text-sm">
                Draft a short launch announcement for our new dashboard.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand-gradient text-white">
                <AudioLines className="size-3.5" />
              </span>
              <div className="min-w-0 space-y-2 pt-0.5 text-xs leading-relaxed sm:text-sm">
                <p>Here&apos;s a concise version you can post today:</p>
                <p className="rounded-lg border border-border bg-surface p-3 text-muted-foreground">
                  Meet the new dashboard: every metric, one clear view. Faster
                  loading, cleaner charts, and shortcuts built for the way your
                  team works.
                </p>
              </div>
            </div>
          </div>

          <div className="shrink-0 p-3">
            <div className="flex items-center justify-between rounded-xl border border-border-strong bg-surface py-1.5 pl-3.5 pr-1.5">
              <span className="text-xs text-subtle-foreground">
                Message EchoGPT…
              </span>
              <span className="grid size-8 place-items-center rounded-lg bg-accent text-accent-foreground">
                <ArrowUp className="size-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
