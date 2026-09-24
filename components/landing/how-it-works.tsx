import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/landing/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { steps } from "@/data/landing";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-t border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From question to answer in three steps"
          description="A simple flow that keeps you in control."
        />

        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.08}>
                <span className="grid size-10 place-items-center rounded-full border border-border-strong bg-surface text-sm font-semibold text-accent-text">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}