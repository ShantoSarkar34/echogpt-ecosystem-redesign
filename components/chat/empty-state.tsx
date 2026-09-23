import { AudioLines } from "lucide-react";

export function EmptyState() {
  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center px-6 py-12 text-center">
      <div className="grid size-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-elev-2">
        <AudioLines className="size-6" aria-hidden="true" />
      </div>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
        How can I help you today?
      </h2>
      <p className="mt-2 text-muted-foreground">
        Ask anything or pick a quick action. This is a demo, so responses are
        mocked.
      </p>
    </div>
  );
}
