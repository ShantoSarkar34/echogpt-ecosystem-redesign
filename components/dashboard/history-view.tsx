"use client";

import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Tabs from "@radix-ui/react-tabs";
import {
  History as HistoryIcon,
  Image as ImageIcon,
  ListTodo,
  MessageSquare,
  MoreHorizontal,
  Search,
  Trash2,
  Video as VideoIcon,
} from "lucide-react";
import { Badge } from "@/components/dashboard/badge";
import { Card } from "@/components/dashboard/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { PageContainer } from "@/components/dashboard/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import {
  initialHistoryItems,
  type HistoryItem,
  type HistoryType,
} from "@/data/history";

const typeIcons: Record<HistoryType, typeof MessageSquare> = {
  Chat: MessageSquare,
  Image: ImageIcon,
  Video: VideoIcon,
  Task: ListTodo,
};

const tabs = ["All", "Chats", "Images", "Videos", "Tasks"] as const;
type TabId = (typeof tabs)[number];
const tabToType: Record<Exclude<TabId, "All">, HistoryType> = {
  Chats: "Chat",
  Images: "Image",
  Videos: "Video",
  Tasks: "Task",
};

export function HistoryView() {
  const [items, setItems] = useState<HistoryItem[]>(initialHistoryItems);
  const [tab, setTab] = useState<TabId>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<HistoryItem | null>(null);

  const filtered = useMemo(() => {
    let list = items;
    if (tab !== "All") list = list.filter((i) => i.type === tabToType[tab]);
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((i) => i.title.toLowerCase().includes(q));
    if (sort === "oldest") list = [...list].reverse();
    return list;
  }, [items, tab, query, sort]);

  function startRename(item: HistoryItem) {
    setRenamingId(item.id);
    setRenameValue(item.title);
  }

  function confirmRename() {
    if (!renamingId || !renameValue.trim()) return;
    setItems((prev) =>
      prev.map((i) =>
        i.id === renamingId ? { ...i, title: renameValue.trim() } : i,
      ),
    );
    setRenamingId(null);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <PageHeader
        title="History"
        description="Browse everything you've created across EchoGPT."
      />
      <PageContainer className="max-w-4xl">
        <Tabs.Root value={tab} onValueChange={(v) => setTab(v as TabId)}>
          <Tabs.List
            aria-label="Filter history"
            className="flex flex-wrap gap-1 rounded-lg border border-border bg-surface-2 p-1"
          >
            {tabs.map((t) => (
              <Tabs.Trigger
                key={t}
                value={t}
                className="flex h-9 flex-1 items-center justify-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors duration-150 data-[state=active]:bg-surface data-[state=active]:text-foreground data-[state=active]:shadow-elev-1 motion-reduce:transition-none"
              >
                {t}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle-foreground"
              aria-hidden="true"
            />
            <label htmlFor="history-search" className="sr-only">
              Search history
            </label>
            <input
              id="history-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search history…"
              className="h-10 w-full rounded-lg border border-border-strong bg-surface-2 pl-9 pr-3 text-base outline-none transition-colors placeholder:text-subtle-foreground focus:border-accent sm:text-sm"
            />
          </div>
          <label htmlFor="history-sort" className="sr-only">
            Sort
          </label>
          <select
            id="history-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
            className="h-10 rounded-lg border border-border-strong bg-surface-2 px-3 text-base sm:text-sm"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={HistoryIcon}
            title="Nothing here yet"
            description="Items you create will show up in this list."
          />
        ) : (
          <ul className="space-y-2">
            {filtered.map((item) => {
              const Icon = typeIcons[item.type];
              const isRenaming = renamingId === item.id;
              return (
                <li key={item.id}>
                  <Card className="flex items-start gap-3 p-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent-text">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      {isRenaming ? (
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor={`rename-${item.id}`}
                            className="sr-only"
                          >
                            Rename
                          </label>
                          <input
                            id={`rename-${item.id}`}
                            autoFocus
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === "Enter" && confirmRename()
                            }
                            className="h-9 flex-1 rounded-lg border border-accent bg-surface-2 px-2.5 text-sm outline-none"
                          />
                          <Button size="sm" onClick={confirmRename}>
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setRenamingId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <>
                          <p className="truncate text-sm font-medium">
                            {item.title}
                          </p>
                          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                            {item.preview}
                          </p>
                          <div className="mt-1.5 flex items-center gap-2 text-xs text-subtle-foreground">
                            <Badge>{item.type}</Badge>
                            <span>{item.tool}</span>
                            <span>·</span>
                            <span>{item.date}</span>
                          </div>
                        </>
                      )}
                    </div>
                    {!isRenaming && (
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-9 shrink-0"
                            aria-label="More actions"
                          >
                            <MoreHorizontal aria-hidden="true" />
                          </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                          <DropdownMenu.Content
                            align="end"
                            className="z-50 min-w-36 rounded-xl border border-border bg-elevated p-1.5 shadow-elev-2 animate-pop-in motion-reduce:animate-none"
                          >
                            <DropdownMenu.Item className="flex cursor-pointer items-center rounded-lg px-2.5 py-2 text-sm outline-none data-highlighted:bg-surface-2">
                              Open
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                              onSelect={() => startRename(item)}
                              className="flex cursor-pointer items-center rounded-lg px-2.5 py-2 text-sm outline-none data-highlighted:bg-surface-2"
                            >
                              Rename
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                              onSelect={() => setDeleteTarget(item)}
                              className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-danger outline-none data-highlighted:bg-danger/10"
                            >
                              <Trash2 className="size-3.5" aria-hidden="true" />{" "}
                              Delete
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                      </DropdownMenu.Root>
                    )}
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </PageContainer>

      <Dialog.Root
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in motion-reduce:animate-none" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-elevated p-6 shadow-elev-2 outline-none data-[state=open]:animate-pop-in motion-reduce:animate-none">
            <Dialog.Title className="text-lg font-semibold">
              Delete this item?
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-muted-foreground">
              {deleteTarget?.title} will be removed. This can&apos;t be undone.
            </Dialog.Description>
            <div className="mt-6 flex justify-end gap-2">
              <Dialog.Close asChild>
                <Button variant="secondary">Cancel</Button>
              </Dialog.Close>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
