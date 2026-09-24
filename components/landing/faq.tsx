import { ChevronDown } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/landing/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { faqs } from "@/data/landing";

export function Faq() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 border-t border-border py-20 sm:py-28"
    >
      <Container>
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
            {faqs.map((f) => (
              <details key={f.question} className="group px-5">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <ChevronDown
                    className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-5 text-sm text-muted-foreground">{f.answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
