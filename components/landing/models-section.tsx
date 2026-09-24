import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/landing/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { models } from "@/data/models";
import { cn } from "@/lib/utils";
import type { ModelId } from "@/types/chat";

const traits: Record<ModelId, { speed: number; depth: number }> = {
  "echo-swift": { speed: 3, depth: 1 },
  "echo-balanced": { speed: 2, depth: 2 },
  "echo-deep": { speed: 1, depth: 3 },
};

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span
        role="img"
        aria-label={`${label}: ${value} of 3`}
        className="flex gap-1"
      >
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className={cn(
              "h-1.5 w-6 rounded-full",
              n <= value ? "bg-accent" : "bg-border",
            )}
          />
        ))}
      </span>
    </div>
  );
}

export function ModelsSection() {
  return (
    <section
      id="models"
      className="scroll-mt-20 border-t border-border bg-surface py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="AI models"
          title="The right model for every task"
          description="Choose speed when you're moving fast and depth when the problem is hard. Models shown here are representative placeholders."
        />

        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {models.map((m, i) => {
            const t = traits[m.id];
            const isDefault = m.id === "echo-balanced";
            return (
              <li key={m.id}>
                <Reveal delay={i * 0.06} className="h-full">
                  <div
                    className={cn(
                      "h-full rounded-2xl border bg-background p-6",
                      isDefault ? "border-accent" : "border-border",
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold">{m.name}</h3>
                      <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-text">
                        {m.badge}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {m.tagline}
                    </p>
                    <div className="mt-6 space-y-3 border-t border-border pt-5">
                      <Meter label="Speed" value={t.speed} />
                      <Meter label="Depth" value={t.depth} />
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
