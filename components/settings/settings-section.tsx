import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-label={title}
      className="rounded-2xl border border-border bg-surface"
    >
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-base font-semibold">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="divide-y divide-border px-5">{children}</div>
    </section>
  );
}

interface SettingRowProps {
  id: string;
  label: string;
  description: string;
  stack?: boolean;
  children: ReactNode;
}

export function SettingRow({
  id,
  label,
  description,
  stack = true,
  children,
}: SettingRowProps) {
  return (
    <div
      className={cn(
        "flex gap-3 py-4 sm:items-center sm:justify-between sm:gap-6",
        stack
          ? "flex-col sm:flex-row"
          : "flex-row items-center justify-between",
      )}
    >
      <div className="min-w-0">
        <p id={`${id}-label`} className="text-sm font-medium">
          {label}
        </p>
        <p id={`${id}-desc`} className="mt-0.5 text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}
