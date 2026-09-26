import { ArrowLeft, ArrowRight, Lock, RotateCw } from "lucide-react";
import { AssistantAvatar } from "@/components/chat/assistant-avatar";
import { getMockPage, mockPages } from "@/data/mock-page";
import { cn } from "@/lib/utils";

interface BrowserMockupProps {
  open: boolean;
  onToggle: () => void;
  activePageId: string;
  onSelectPage: (id: string) => void;
  className?: string;
}

export function BrowserMockup({
  open,
  onToggle,
  activePageId,
  onSelectPage,
  className,
}: BrowserMockupProps) {
  const page = getMockPage(activePageId);

  return (
    <div
      className={cn(
        "h-170 overflow-hidden rounded-2xl border border-border bg-surface shadow-elev-1",
        className,
      )}
    >
      {/* Tab strip: represents the browser's open tabs */}
      <div
        role="tablist"
        aria-label="Open browser tabs"
        className="flex gap-1 bg-surface-2 px-3 pt-2.5"
      >
        {mockPages.map((p) => {
          const active = p.id === activePageId;
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelectPage(p.id)}
              title={p.title}
              className={cn(
                "flex max-w-48 items-center gap-2 truncate rounded-t-lg px-3 py-2 text-xs font-medium transition-colors duration-150 motion-reduce:transition-none",
                active
                  ? "bg-surface text-foreground"
                  : "text-muted-foreground hover:bg-surface/60 hover:text-foreground",
              )}
            >
              <span className="truncate">{p.title}</span>
            </button>
          );
        })}
      </div>

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
            {page.site}
            {page.path}
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
            open && "bg-accent-soft",
          )}
        >
          <AssistantAvatar />
        </button>
      </div>

      {/* Page content (decorative placeholder article) */}
      <div aria-hidden="true" className="max-w-xl space-y-4 p-8">
        <p className="text-xs font-medium uppercase tracking-wide text-subtle-foreground">
          {page.site} · Blog
        </p>
        <h2 className="text-2xl font-semibold tracking-tight">{page.title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {page.intro}{" "}
          <mark className="rounded bg-accent-soft px-0.5 text-foreground">
            {page.highlight}
          </mark>{" "}
          {page.outro}
        </p>
        <div className="space-y-2.5 pt-2">
          <div className="h-3 w-full rounded bg-surface-2" />
          <div className="h-3 w-11/12 rounded bg-surface-2" />
          <div className="h-3 w-4/5 rounded bg-surface-2" />
          <div className="h-3 w-full rounded bg-surface-2" />
          <div className="h-3 w-2/3 rounded bg-surface-2" />
        </div>
        <p className="pt-2 text-xs text-subtle-foreground">
          Placeholder article for demonstration.
        </p>
      </div>
    </div>
  );
}
