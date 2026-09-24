"use client";

import { useEffect, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Sidebar } from "@/components/chat/sidebar";
import { useChatStore } from "@/hooks/use-chat-store";

export function AppShell({ children }: { children: ReactNode }) {
  const open = useChatStore((s) => s.mobileNavOpen);
  const setOpen = useChatStore((s) => s.setMobileNavOpen);

  // Close the drawer if the viewport grows to desktop size while it's open.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [setOpen]);

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <a
        href="#chat-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
      >
        Skip to content
      </a>
      <aside className="hidden w-72 shrink-0 border-r border-border lg:block">
        <Sidebar />
      </aside>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in motion-reduce:animate-none lg:hidden" />
          <Dialog.Content className="fixed inset-y-0 left-0 z-50 w-[85vw] max-w-80 border-r border-border shadow-elev-2 outline-none data-[state=closed]:animate-drawer-out data-[state=open]:animate-drawer-in motion-reduce:animate-none lg:hidden">
            <Dialog.Title className="sr-only">Navigation</Dialog.Title>
            <Dialog.Description className="sr-only">
              Conversation history, new chat, and settings.
            </Dialog.Description>
            <Sidebar />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <main
        id="chat-main"
        tabIndex={-1}
        className="flex min-w-0 flex-1 flex-col outline-none"
      >
        {children}
      </main>
    </div>
  );
}
