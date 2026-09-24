import { Faq } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { FinalCta } from "@/components/landing/final-cta";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { ModelsSection } from "@/components/landing/models-section";
import { WhyEchoGPT } from "@/components/landing/why-echogpt";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <ModelsSection />
      <HowItWorks />
      <WhyEchoGPT />
      <Faq />
      <FinalCta />
    </>
  );
}
