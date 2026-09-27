import { PageContainer } from "@/components/dashboard/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import type { NavItem } from "@/types/nav";

export function FeaturePlaceholder({ item }: { item: NavItem }) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <PageHeader title={item.label} description={item.description} />
      <PageContainer>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="text-sm font-semibold">What this page will include</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {item.plannedSections.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-subtle-foreground">
            This is a routing placeholder. The full interactive demo for this
            page arrives in a later phase.
          </p>
        </div>
      </PageContainer>
    </div>
  );
}
