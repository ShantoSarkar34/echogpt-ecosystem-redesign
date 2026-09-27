import type { Metadata } from "next";
import { ConnectorsView } from "@/components/dashboard/connectors-view";

export const metadata: Metadata = { title: "Connectors" };

export default function ConnectorsPage() {
  return <ConnectorsView />;
}
