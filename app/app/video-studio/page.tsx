import type { Metadata } from "next";
import { VideoStudioView } from "@/components/dashboard/video-studio-view";

export const metadata: Metadata = { title: "Video Studio" };

export default function VideoStudioPage() {
  return <VideoStudioView />;
}