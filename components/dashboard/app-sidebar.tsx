"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Plus, Settings } from "lucide-react";
import { SidebarSection } from "@/components/dashboard/sidebar-section";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { navSections } from "@/data/nav";
import { useChatStore } from "@/hooks/use-chat-store";
import { useAuthStore } from "@/hooks/use-auth-store";
import { cn } from "@/lib/utils";

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const onChatRoute = pathname === "/app";
  const onSettingsRoute = pathname.startsWith("/app/settings");
  const startNewChat = useChatStore((s) => s.startNewChat);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const userName = useAuthStore((s) => s.name);

  function goToChat() {
    if (!onChatRoute) router.push("/app");
  }

  return (
    <div className="flex h-full w-full flex-col bg-surface">
      <div className="flex h-14 shrink-0 items-center px-4">
        <Link href="/app" aria-label="EchoGPT home" onClick={onNavigate}>
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
            onNavigate?.();
          }}
        >
          <Plus aria-hidden="true" />
          New chat
        </Button>
      </div>

      <nav
        aria-label="Sidebar"
        className="min-h-0 flex-1 space-y-1 overflow-y-auto px-2 pb-3"
      >
        {navSections.map((section) => (
          <SidebarSection
            key={section.label}
            section={section}
            onNavigate={onNavigate}
          />
        ))}
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
            onClick={onNavigate}
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
            {isAuthenticated ? userName.charAt(0).toUpperCase() : "G"}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {isAuthenticated ? userName : "Guest"}
            </p>
            <p className="truncate text-xs text-subtle-foreground">
              {isAuthenticated ? "Signed in" : "Demo workspace"}
            </p>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
