import type { Metadata } from "next";
import { DiscordView } from "@/components/dashboard/discord-view";

export const metadata: Metadata = { title: "Discord" };

export default function DiscordPage() {
  return <DiscordView />;
}
