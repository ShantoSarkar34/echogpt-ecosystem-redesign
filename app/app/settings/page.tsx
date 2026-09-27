import type { Metadata } from "next";
import { AppearanceSettings } from "@/components/settings/appearance-settings";
import { AssistantSettings } from "@/components/settings/assistant-settings";
import { DataSettings } from "@/components/settings/data-settings";
import { InterfaceSettings } from "@/components/settings/interface-settings";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto w-full max-w-2xl space-y-6 px-4 py-8 sm:px-6">
        <AppearanceSettings />
        <AssistantSettings />
        <InterfaceSettings />
        <DataSettings />
      </div>
    </div>
  );
}
