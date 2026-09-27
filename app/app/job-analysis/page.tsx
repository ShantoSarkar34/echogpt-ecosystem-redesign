import type { Metadata } from "next";
import { JobAnalysisView } from "@/components/dashboard/job-analysis-view";

export const metadata: Metadata = { title: "AI Job Analysis" };

export default function JobAnalysisPage() {
  return <JobAnalysisView />;
}
