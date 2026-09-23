import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const routes = [
  { href: "/", label: "Landing" },
  { href: "/app", label: "Web app" },
  { href: "/app/settings", label: "Settings" },
  { href: "/extension", label: "Extension" },
];

export function RoutePlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center gap-8 px-6 py-16">
      <div className="flex items-center justify-between">
        <Logo />
        <ThemeToggle />
      </div>
      <div className="rounded-2xl border border-border bg-surface p-8 shadow-elev-1">
        <p className="text-sm font-medium text-accent-text">
          Placeholder route
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 text-muted-foreground">{description}</p>
        <nav aria-label="Routes" className="mt-6 flex flex-wrap gap-2">
          {routes.map((r) => (
            <Button key={r.href} asChild variant="secondary" size="sm">
              <Link href={r.href}>{r.label}</Link>
            </Button>
          ))}
        </nav>
      </div>
    </main>
  );
}
