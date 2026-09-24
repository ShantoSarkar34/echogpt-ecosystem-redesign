import { AudioLines } from "lucide-react";
import { QuickActions } from "@/components/chat/quick-actions";

export function EmptyState({ onPick }: { onPick: (prompt: string) => void }) {
  return (
    <div className="mx-auto flex min-h-full max-w-2xl flex-col items-center justify-center px-4 py-10 text-center sm:px-6">
      <div className="grid size-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-elev-2">
        <AudioLines className="size-6" aria-hidden="true" />
      </div>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
        How can I help you today?
      </h2>
      <p className="mb-8 mt-2 text-muted-foreground">
        Pick a quick action or type your own prompt. Replies are mocked for this
        demo.
      </p>
      <QuickActions onPick={onPick} />
      <p className="mt-6 text-xs text-subtle-foreground">
        Tip: include{" "}
        <code className="rounded bg-surface-2 px-1 py-0.5 font-mono">
          /error
        </code>{" "}
        in a prompt to preview the error state.
      </p>
    </div>
  );
}
