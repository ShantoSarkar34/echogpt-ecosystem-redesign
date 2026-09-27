import type { Metadata } from "next";
import { NewsletterView } from "@/components/dashboard/newsletter-view";

export const metadata: Metadata = { title: "Newsletter" };

export default function NewsletterPage() {
  return <NewsletterView />;
}
