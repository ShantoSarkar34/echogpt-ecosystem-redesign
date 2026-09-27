import { SidebarItem } from "@/components/dashboard/sidebar-item";
import type { NavSection } from "@/types/nav";

export function SidebarSection({
  section,
  onNavigate,
}: {
  section: NavSection;
  onNavigate?: () => void;
}) {
  return (
    <section aria-label={section.label}>
      <h2 className="px-3 pb-1.5 pt-3 text-xs font-medium uppercase tracking-wide text-subtle-foreground">
        {section.label}
      </h2>
      <ul className="space-y-0.5">
        {section.items.map((item) => (
          <li key={item.href}>
            <SidebarItem item={item} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    </section>
  );
}
