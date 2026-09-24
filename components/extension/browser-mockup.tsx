import { ArrowLeft, ArrowRight, Lock, RotateCw } from "lucide-react";
import { AssistantAvatar } from "@/components/chat/assistant-avatar";
import { mockPage } from "@/data/mock-page";
import { cn } from "@/lib/utils";

interface BrowserMockupProps {
  open: boolean;
  onToggle: () => void;
  className?: string;
}

export function BrowserMockup({ open, onToggle, className }: BrowserMockupProps) {
  return (
    <div
      className={cn(
        "h-170 overflow-hidden rounded-2xl border border-border bg-surface shadow-elev-1",
        className
      )}
    >
      {/* Toolbar */}
      <div className="flex h-12 items-center gap-3 border-b border-border bg-surface-2 px-4">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
        </div>
        <div className="flex gap-2 text-subtle-foreground" aria-hidden="true">
          <ArrowLeft className="size-4" />
          <ArrowRight className="size-4" />
          <RotateCw className="size-4" />
        </div>
        <div className="flex h-8 min-w-0 flex-1 items-center gap-2 rounded-full border border-border bg-background px-3 text-xs text-muted-foreground">
          <Lock className="size-3 shrink-0" aria-hidden="true" />
          <span className="truncate">
            {mockPage.site}
            {mockPage.path}
          </span>
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-label="EchoGPT extension"
          title="EchoGPT extension"
          className={cn(
            "grid size-10 place-items-center rounded-lg transition-colors duration-150 hover:bg-elevated motion-reduce:transition-none",
            open && "bg-accent-soft"
          )}
        >
          <AssistantAvatar />
        </button>
      </div>

      {/* Page content (decorative placeholder article) */}
      <div aria-hidden="true" className="max-w-xl space-y-4 p-8">
        <p className="text-xs font-medium uppercase tracking-wide text-subtle-foreground">
          {mockPage.site} · Blog
        </p>
        <h2 className="text-2xl font-semibold tracking-tight">{mockPage.title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Design systems are often introduced to make interfaces look consistent. Their bigger
          benefit is speed.{" "}
          <mark className="rounded bg-accent-soft px-0.5 text-foreground">{mockPage.highlight}</mark>{" "}
          Over time, shared components also make accessibility improvements easier to roll out
          everywhere at once.
        </p>
        <div className="space-y-2.5 pt-2">
          <div className="h-3 w-full rounded bg-surface-2" />
          <div className="h-3 w-11/12 rounded bg-surface-2" />
          <div className="h-3 w-4/5 rounded bg-surface-2" />
          <div className="h-3 w-full rounded bg-surface-2" />
          <div className="h-3 w-2/3 rounded bg-surface-2" />
        </div>
        <p className="pt-2 text-xs text-subtle-foreground">Placeholder article for demonstration.</p>
      </div>
    </div>
  );
}