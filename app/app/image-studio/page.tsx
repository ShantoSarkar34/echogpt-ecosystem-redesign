import type { Metadata } from "next";
import { FeaturePlaceholder } from "@/components/dashboard/feature-placeholder";
import { getNavItem } from "@/data/nav";

export const metadata: Metadata = { title: "Image Studio" };

export default function ImageStudioPage() {
  return <FeaturePlaceholder item={getNavItem("/app/image-studio")} />;
}
