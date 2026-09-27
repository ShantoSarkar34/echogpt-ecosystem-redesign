import type { Metadata } from "next";
import { SopBuilderView } from "@/components/dashboard/sop-builder-view";

export const metadata: Metadata = { title: "AI SOP Builder" };

export default function SopBuilderPage() {
  return <SopBuilderView />;
}
