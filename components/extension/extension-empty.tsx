import { generalActions, pageActions } from "@/data/extension-action";
import type { MockPage } from "@/data/mock-page";

interface ExtensionEmptyProps {
  page: MockPage;
  contextEnabled: boolean;
  onPick: (prompt: string) => void;
}

export function ExtensionEmpty({
  page,
  contextEnabled,
  onPick,
}: ExtensionEmptyProps) {
  const actions = contextEnabled ? pageActions : generalActions;

  return (
    <div className="flex min-h-full flex-col justify-center px-4 py-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold tracking-tight">
          {contextEnabled ? "Ask about this page" : "How can I help?"}
        </h3>
        <p className="mt-1 truncate text-sm text-muted-foreground">
          {contextEnabled
            ? `Reading: ${page.title}`
            : "Pick a quick action or type below."}
        </p>
      </div>

      <ul className="mt-5 space-y-2">
        {actions.map((a) => (
          <li key={a.id}>
            <button
              type="button"
              onClick={() => onPick(a.prompt)}
              className="flex min-h-11 w-full items-center gap-3 rounded-xl border border-border bg-surface px-3 text-left text-sm font-medium transition-colors duration-150 hover:border-border-strong hover:bg-surface-2 motion-reduce:transition-none"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent-text">
                <a.icon className="size-4" aria-hidden="true" />
              </span>
              <span className="truncate">{a.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
