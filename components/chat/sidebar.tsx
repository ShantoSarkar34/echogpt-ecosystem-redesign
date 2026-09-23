"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { ConversationList } from "@/components/chat/conversation-list";
import { useChatStore } from "@/hooks/use-chat-store";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const onChatRoute = pathname === "/app";
  const onSettingsRoute = pathname.startsWith("/app/settings");

  const conversations = useChatStore((s) => s.conversations);
  const activeId = useChatStore((s) => s.activeId);
  const selectConversation = useChatStore((s) => s.selectConversation);
  const startNewChat = useChatStore((s) => s.startNewChat);
  const setMobileNavOpen = useChatStore((s) => s.setMobileNavOpen);

  function goToChat() {
    if (!onChatRoute) router.push("/app");
  }

  return (
    <div className="flex h-full w-full flex-col bg-surface">
      <div className="flex h-14 shrink-0 items-center px-4">
        <Link
          href="/app"
          aria-label="EchoGPT home"
          onClick={() => setMobileNavOpen(false)}
        >
          <Logo />
        </Link>
      </div>

      <div className="px-3 pb-2">
        <Button
          variant="secondary"
          className="w-full justify-start"
          onClick={() => {
            startNewChat();
            goToChat();
          }}
        >
          <Plus aria-hidden="true" />
          New chat
        </Button>
      </div>

      <nav
        aria-label="Conversation history"
        className="min-h-0 flex-1 overflow-y-auto px-2 py-3"
      >
        <ConversationList
          conversations={conversations}
          activeId={onChatRoute ? activeId : null}
          onSelect={(id) => {
            selectConversation(id);
            goToChat();
          }}
        />
      </nav>

      <div className="space-y-1 border-t border-border p-2">
        <Button
          asChild
          variant="ghost"
          className={cn(
            "w-full justify-start",
            onSettingsRoute && "bg-surface-2 text-foreground",
          )}
        >
          <Link
            href="/app/settings"
            aria-current={onSettingsRoute ? "page" : undefined}
            onClick={() => setMobileNavOpen(false)}
          >
            <Settings aria-hidden="true" />
            Settings
          </Link>
        </Button>

        <div className="flex items-center gap-3 rounded-lg px-2 py-1.5">
          <span
            aria-hidden="true"
            className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-xs font-semibold text-accent-text"
          >
            G
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Guest</p>
            <p className="truncate text-xs text-subtle-foreground">
              Demo workspace
            </p>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
