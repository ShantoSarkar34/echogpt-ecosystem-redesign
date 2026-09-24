import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MessageError({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-3 rounded-xl border border-danger/40 bg-danger/10 p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-3">
        <AlertCircle
          className="mt-0.5 size-5 shrink-0 text-danger"
          aria-hidden="true"
        />
        <div>
          <p className="text-sm font-medium">Couldn&apos;t get a response</p>
          <p className="text-sm text-muted-foreground">
            This is a simulated error. Try again to continue.
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onRetry}
        className="shrink-0 self-start sm:self-auto"
      >
        <RotateCcw aria-hidden="true" />
        Retry
      </Button>
    </div>
  );
}
