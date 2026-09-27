import type { Metadata } from "next";
import { ImageStudioView } from "@/components/dashboard/image-studio-view";

export const metadata: Metadata = { title: "Image Studio" };

export default function ImageStudioPage() {
  return <ImageStudioView />;
}