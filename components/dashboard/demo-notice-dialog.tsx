"use client";

import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";

interface DemoNoticeDialogProps {
  trigger: ReactNode;
  title: string;
  description: string;
}

export function DemoNoticeDialog({
  trigger,
  title,
  description,
}: DemoNoticeDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in motion-reduce:animate-none" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-elevated p-6 text-center shadow-elev-2 outline-none data-[state=open]:animate-pop-in motion-reduce:animate-none">
          <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-muted-foreground">
            {description}
          </Dialog.Description>
          <Dialog.Close asChild>
            <button
              type="button"
              className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              Got it
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
