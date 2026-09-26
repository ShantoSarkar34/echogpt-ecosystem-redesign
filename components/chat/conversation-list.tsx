import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Conversation, ConversationGroup } from "@/types/chat";

const GROUP_ORDER: ConversationGroup[] = [
  "Today",
  "Yesterday",
  "Previous 7 days",
];

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  pendingIds?: string[];
}

export function ConversationList({
  conversations,
  activeId,
  onSelect,
  pendingIds = [],
}: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <p className="px-3 py-6 text-sm text-subtle-foreground">
        No conversations yet.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      {GROUP_ORDER.map((group) => {
        const items = conversations.filter((c) => c.group === group);
        if (items.length === 0) return null;

        return (
          <section key={group} aria-label={group}>
            <h2 className="px-3 pb-1.5 text-xs font-medium text-subtle-foreground">
              {group}
            </h2>
            <ul className="space-y-0.5">
              {items.map((c) => {
                const active = c.id === activeId;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(c.id)}
                      aria-current={active ? "true" : undefined}
                      title={c.title}
                      className={cn(
                        "flex min-h-10 w-full items-center gap-2 rounded-lg px-3 text-left text-sm transition-colors duration-150 motion-reduce:transition-none",
                        active
                          ? "bg-accent-soft font-medium text-foreground"
                          : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
                      )}
                    >
                      <MessageSquare
                        className="size-4 shrink-0 opacity-70"
                        aria-hidden="true"
                      />
                      <span className="truncate">{c.title}</span>
                      {pendingIds.includes(c.id) && (
                        <span
                          aria-label="Reply in progress"
                          className="ml-auto size-1.5 shrink-0 animate-pulse rounded-full bg-accent"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
