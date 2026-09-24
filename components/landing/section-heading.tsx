import { Reveal } from "@/components/landing/reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}
    >
      <p className="text-sm font-medium text-accent-text">{eyebrow}</p>
      <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
