import { AudioLines } from "lucide-react";

export function AssistantAvatar() {
  return (
    <span
      aria-hidden="true"
      className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-gradient text-white shadow-elev-1"
    >
      <AudioLines className="size-4" />
    </span>
  );
}