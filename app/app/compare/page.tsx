import type { Metadata } from "next";
import { CompareView } from "@/components/dashboard/compare-view";

export const metadata: Metadata = { title: "Compare" };

export default function ComparePage() {
  return <CompareView />;
}
