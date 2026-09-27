"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { LogIn, LogOut } from "lucide-react";
import { AuthModal } from "@/components/dashboard/auth-modal";
import { ModelSelector } from "@/components/chat/model-selector";
import { SidebarTrigger } from "@/components/chat/sidebar-trigger";
import { Button } from "@/components/ui/button";
import { extraRouteTitles, getNavItem } from "@/data/nav";
import { useAuthStore } from "@/hooks/use-auth-store";
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
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const name = useAuthStore((s) => s.name);
  const signOut = useAuthStore((s) => s.signOut);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-3 sm:px-4">
      <SidebarTrigger />
      <h1 className="min-w-0 flex-1 truncate text-sm font-medium" title={title}>
        {title}
      </h1>
      {onChatRoute && <ModelSelector />}
      {isAuthenticated ? (
        <Button variant="ghost" size="sm" className="gap-1.5" onClick={signOut}>
          <LogOut aria-hidden="true" />
          <span className="max-w-24 truncate">{name}</span>
        </Button>
      ) : (
        <Button
          variant="secondary"
          size="sm"
          className="gap-1.5"
          onClick={() => setAuthOpen(true)}
        >
          <LogIn aria-hidden="true" />
          Sign in
        </Button>
      )}
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </header>
  );
}
