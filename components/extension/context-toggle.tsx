import { Globe } from "lucide-react";
import type { MockPage } from "@/data/mock-page";
import { cn } from "@/lib/utils";

interface ContextToggleProps {
  page: MockPage;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function ContextToggle({ page, enabled, onChange }: ContextToggleProps) {
  return (
    <div className="shrink-0 space-y-1.5 px-3 pt-1">
      <button
        type="button"
        aria-pressed={enabled}
        aria-label="Use this page as context"
        onClick={() => onChange(!enabled)}
        className={cn(
          "flex min-h-9 w-full items-center gap-2 rounded-lg border px-3 text-left text-xs transition-colors duration-150 motion-reduce:transition-none",
          enabled
            ? "border-accent/40 bg-accent-soft text-foreground"
            : "border-dashed border-border-strong text-muted-foreground hover:bg-surface-2",
        )}
      >
        <Globe
          className="size-3.5 shrink-0 text-accent-text"
          aria-hidden="true"
        />
        <span className="min-w-0 flex-1 truncate">
          {enabled ? page.title : "Page context is off"}
        </span>
        <span className="shrink-0 font-medium">{enabled ? "On" : "Off"}</span>
      </button>
      {enabled && (
        <p
          className="truncate px-1 text-[11px] text-subtle-foreground"
          title={page.highlight}
        >
          &ldquo;{page.highlight}&rdquo;
        </p>
      )}
    </div>
  );
}
