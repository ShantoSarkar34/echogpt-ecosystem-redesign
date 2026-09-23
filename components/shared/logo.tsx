import { AudioLines } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-tight",
        className,
      )}
    >
      <span className="grid size-8 place-items-center rounded-lg bg-brand-gradient text-white shadow-elev-1">
        <AudioLines className="size-4" aria-hidden="true" />
      </span>
      <span>EchoGPT</span>
    </span>
  );
}
