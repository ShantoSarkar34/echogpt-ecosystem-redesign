import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/landing/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { features } from "@/data/landing";

export function Features() {
  return (
    <section
      id="features"
      className="scroll-mt-20 border-t border-border py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="Features"
          title="Everything you need, nothing you don't"
          description="A focused set of tools that make everyday AI conversations faster and calmer."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <li key={f.title}>
              <Reveal delay={i * 0.05} className="h-full">
                <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-strong motion-reduce:transform-none">
                  <span className="grid size-10 place-items-center rounded-lg bg-accent-soft text-accent-text">
                    <f.icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {f.description}
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
