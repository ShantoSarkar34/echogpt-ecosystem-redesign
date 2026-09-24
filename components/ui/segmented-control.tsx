import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  icon?: LucideIcon;
}

interface SegmentedControlProps<T extends string> {
  name: string;
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: SegmentedOption<T>[];
  className?: string;
}

export function SegmentedControl<T extends string>({
  name,
  label,
  value,
  onChange,
  options,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "inline-flex w-full rounded-lg border border-border bg-surface-2 p-1 sm:w-auto",
        className,
      )}
    >
      {options.map((o) => (
        <label key={o.value} className="relative flex-1 sm:flex-none">
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
            className="peer sr-only"
          />
          <span className="flex min-h-9 cursor-pointer items-center justify-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground peer-checked:bg-surface peer-checked:text-foreground peer-checked:shadow-elev-1 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring motion-reduce:transition-none">
            {o.icon && <o.icon className="size-4" aria-hidden="true" />}
            {o.label}
          </span>
        </label>
      ))}
    </div>
  );
}
