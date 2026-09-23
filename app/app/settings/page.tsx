import type { Metadata } from "next";
import { SidebarTrigger } from "@/components/chat/sidebar-trigger";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-3 sm:px-4">
        <SidebarTrigger />
        <h1 className="text-sm font-medium">Settings</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-6">
        <p className="text-muted-foreground">Settings controls arrive in a later phase.</p>
      </div>
    </>
  );
}