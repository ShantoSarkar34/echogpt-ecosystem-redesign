import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/app", label: "Web app" },
      { href: "/extension", label: "Extension concept" },
      { href: "/app/settings", label: "Settings" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "#features", label: "Features" },
      { href: "#models", label: "AI models" },
      { href: "#faq", label: "FAQ" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              A frontend redesign concept for the EchoGPT web app, landing page,
              and Chrome extension.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-sm font-semibold">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    {l.href.startsWith("#") ? (
                      <a
                        href={l.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="mt-10 border-t border-border pt-6 text-xs text-subtle-foreground">
          Redesign concept with demo content. Not affiliated with or endorsed by
          the original product.
        </p>
      </Container>
    </footer>
  );
}
