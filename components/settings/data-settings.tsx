"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SettingRow,
  SettingsSection,
} from "@/components/settings/settings-section";
import { useChatStore } from "@/hooks/use-chat-store";
import { useSettingsStore } from "@/hooks/use-settings-store";

export function DataSettings() {
  const resetPreferences = useSettingsStore((s) => s.resetPreferences);
  const resetChats = useChatStore((s) => s.resetChats);
  const [open, setOpen] = useState(false);

  return (
    <SettingsSection
      title="Data"
      description="Everything here lives only in your browser."
    >
      <SettingRow
        id="reset-prefs"
        label="Reset preferences"
        description="Restore default settings. Theme is not affected."
      >
        <Button variant="secondary" onClick={resetPreferences}>
          <RotateCcw aria-hidden="true" />
          Reset
        </Button>
      </SettingRow>

      <SettingRow
        id="reset-chats"
        label="Reset demo chats"
        description="Remove new conversations and restore the sample history."
      >
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <Button variant="outline">
              <Trash2 aria-hidden="true" />
              Reset chats
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in motion-reduce:animate-none" />
            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-elevated p-6 shadow-elev-2 outline-none data-[state=open]:animate-pop-in motion-reduce:animate-none">
              <Dialog.Title className="text-lg font-semibold">
                Reset demo chats?
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm text-muted-foreground">
                New conversations will be removed and the sample history
                restored. This can&apos;t be undone.
              </Dialog.Description>
              <div className="mt-6 flex justify-end gap-2">
                <Dialog.Close asChild>
                  <Button variant="secondary">Cancel</Button>
                </Dialog.Close>
                <Button
                  variant="destructive"
                  onClick={() => {
                    resetChats();
                    setOpen(false);
                  }}
                >
                  Reset chats
                </Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </SettingRow>
    </SettingsSection>
  );
}
