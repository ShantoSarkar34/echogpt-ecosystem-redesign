import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { FaChrome } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { ProductPreview } from "@/components/landing/product-preview";
import { Reveal } from "@/components/landing/reveal";
import { FaChromecast } from "react-icons/fa6";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-128 bg-[radial-gradient(60%_60%_at_50%_0%,var(--accent-soft),transparent_70%)]"
      />

      <Container className="relative pb-16 pt-14 sm:pb-24 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="size-3.5 text-accent-text" aria-hidden="true" />
              Redesign concept · demo content
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Your AI workspace,{" "}
              <span className="text-accent-text">wherever you work</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              EchoGPT brings fast, focused conversations to a clean web app, and to a Chrome
              extension that works with the page you&apos;re on.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg">
                <Link href="/app">
                  Try the web app <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/extension">
                  <FaChrome aria-hidden="true" /> See the extension
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-subtle-foreground">
              No sign-up needed. Everything runs locally with mock data.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.26} className="mx-auto mt-14 max-w-5xl">
          <ProductPreview />
        </Reveal>
      </Container>
    </section>
  );
}