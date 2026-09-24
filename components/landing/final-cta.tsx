import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaChrome } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/landing/reveal";

export function FinalCta() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-14 text-center sm:px-12 sm:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_0%,var(--accent-soft),transparent_70%)]"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready to try the new EchoGPT?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Explore the web app and the extension concept. No sign-up, no
                setup.
              </p>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg">
                  <Link href="/app">
                    Open the web app <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/extension">
                    <FaChrome aria-hidden="true" /> Explore the extension
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
