"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/hooks/use-chat-store";

export function SidebarTrigger() {
  const setOpen = useChatStore((s) => s.setMobileNavOpen);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="-ml-1 lg:hidden"
      aria-label="Open navigation"
      onClick={() => setOpen(true)}
    >
      <Menu aria-hidden="true" />
    </Button>
  );
}