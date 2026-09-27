"use client";

import { usePathname } from "next/navigation";
import { LogIn } from "lucide-react";
import { ModelSelector } from "@/components/chat/model-selector";
import { SidebarTrigger } from "@/components/chat/sidebar-trigger";
import { Button } from "@/components/ui/button";
import { extraRouteTitles, getNavItem } from "@/data/nav";
import { useChatStore } from "@/hooks/use-chat-store";

function usePageTitle(pathname: string) {
  const activeConversationTitle = useChatStore(
    (s) => s.conversations.find((c) => c.id === s.activeId)?.title,
  );

  if (pathname === "/app") return activeConversationTitle ?? "New chat";
  if (extraRouteTitles[pathname]) return extraRouteTitles[pathname];
  try {
    return getNavItem(pathname).label;
  } catch {
    return "EchoGPT";
  }
}

export function AppHeader() {
  const pathname = usePathname();
  const title = usePageTitle(pathname);
  const onChatRoute = pathname === "/app";

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-3 sm:px-4">
      <SidebarTrigger />
      <h1 className="min-w-0 flex-1 truncate text-sm font-medium" title={title}>
        {title}
      </h1>
      {onChatRoute && <ModelSelector />}
      <Button variant="secondary" size="sm" className="gap-1.5">
        <LogIn aria-hidden="true" />
        Sign in
      </Button>
    </header>
  );
}
