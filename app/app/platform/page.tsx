import type { Metadata } from "next";
import { PlatformView } from "@/components/dashboard/platform-view";

export const metadata: Metadata = { title: "AI Platform" };

export default function PlatformPage() {
  return <PlatformView />;
}