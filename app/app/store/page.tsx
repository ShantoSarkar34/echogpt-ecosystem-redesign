import type { Metadata } from "next";
import { StoreView } from "@/components/dashboard/store-view";

export const metadata: Metadata = { title: "Store" };

export default function StorePage() {
  return <StoreView />;
}
