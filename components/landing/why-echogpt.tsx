import { Check } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/landing/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { reasons } from "@/data/landing";

export function WhyEchoGPT() {
  return (
    <section className="border-t border-border bg-surface py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <SectionHeading
          align="left"
          eyebrow="Why EchoGPT"
          title="Built with care, end to end"
          description="A calm, consistent experience whether you're on your laptop, your phone, or in the browser extension."
        />

        <ul className="space-y-5">
          {reasons.map((r, i) => (
            <li key={r.title}>
              <Reveal delay={i * 0.06} className="flex gap-4">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-text">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-semibold">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {r.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
