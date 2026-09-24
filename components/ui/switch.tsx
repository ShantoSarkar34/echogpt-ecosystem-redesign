import { cn } from "@/lib/utils";

interface SwitchProps extends Omit<
  React.ComponentProps<"button">,
  "onChange" | "role" | "type" | "aria-checked"
> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function Switch({
  checked,
  onCheckedChange,
  className,
  ...props
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 before:absolute before:-inset-2 before:content-[''] motion-reduce:transition-none",
        checked ? "bg-accent" : "bg-border-strong",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none block size-5 rounded-full bg-white shadow-elev-1 transition-transform duration-200 motion-reduce:transition-none",
          checked ? "translate-x-5.5" : "translate-x-0.5",
        )}
      />
    </button>
  );
}
