"use client";

import { useMemo, useState } from "react";
import { Loader2, Plug, Search, Settings2 } from "lucide-react";
import { Badge } from "@/components/dashboard/badge";
import { Card } from "@/components/dashboard/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { PageContainer } from "@/components/dashboard/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import {
  connectorCategories,
  initialConnectors,
  type Connector,
} from "@/data/connectors";
import { cn } from "@/lib/utils";
import { DemoNoticeDialog } from "@/components/dashboard/demo-notice-dialog";

export function ConnectorsView() {
  const [connectors, setConnectors] = useState<Connector[]>(initialConnectors);
  const [announcement, setAnnouncement] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] =
    useState<(typeof connectorCategories)[number]>("All");
  const [pendingId, setPendingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return connectors.filter((c) => {
      const matchesQuery = c.name
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      const matchesCategory = category === "All" || c.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [connectors, query, category]);

  const connectedCount = connectors.filter((c) => c.connected).length;

  function toggleConnection(id: string) {
    const target = connectors.find((c) => c.id === id);
    if (!target) return;

    if (target.connected) {
      setConnectors((prev) =>
        prev.map((c) => (c.id === id ? { ...c, connected: false } : c)),
      );
      setAnnouncement(`${target.name} disconnected.`);
      return;
    }

    setPendingId(id);
    window.setTimeout(() => {
      setConnectors((prev) =>
        prev.map((c) => (c.id === id ? { ...c, connected: true } : c)),
      );
      setPendingId(null);
      setAnnouncement(`${target.name} connected.`);
    }, 1100);
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <PageHeader
        title="Connectors"
        description="Connect EchoGPT with the tools you use every day."
      />
      <PageContainer className="max-w-5xl">
        <p aria-live="polite" className="sr-only">
          {announcement}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative sm:w-72">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle-foreground"
              aria-hidden="true"
            />
            <label htmlFor="connector-search" className="sr-only">
              Search connectors
            </label>
            <input
              id="connector-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search connectors…"
              className="h-10 w-full rounded-lg border border-border-strong bg-surface-2 pl-9 pr-3 text-base outline-none transition-colors placeholder:text-subtle-foreground focus:border-accent sm:text-sm"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {connectedCount}
            </span>{" "}
            of {connectors.length} connected
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {connectorCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={cn(
                "flex h-9 items-center rounded-full border px-3.5 text-sm font-medium transition-colors duration-150 motion-reduce:transition-none",
                category === cat
                  ? "border-accent bg-accent-soft text-foreground"
                  : "border-border-strong text-muted-foreground hover:bg-surface-2",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={Plug}
            title="No connectors found"
            description="Try a different search term or category."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <Card key={c.id}>
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent-text">
                    <c.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{c.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {c.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  {c.connected ? (
                    <Badge variant="success">Connected</Badge>
                  ) : (
                    <Badge>Not connected</Badge>
                  )}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Button
                    variant={c.connected ? "outline" : "primary"}
                    size="sm"
                    className="flex-1"
                    disabled={pendingId === c.id}
                    onClick={() => toggleConnection(c.id)}
                  >
                    {pendingId === c.id ? (
                      <>
                        <Loader2
                          className="size-4 animate-spin motion-reduce:animate-none"
                          aria-hidden="true"
                        />
                        Connecting…
                      </>
                    ) : c.connected ? (
                      "Disconnect"
                    ) : (
                      "Connect"
                    )}
                  </Button>
                  {c.connected && (
                    <DemoNoticeDialog
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`${c.name} settings`}
                        >
                          <Settings2 aria-hidden="true" />
                        </Button>
                      }
                      title={`${c.name} settings`}
                      description="Connector-specific settings would appear here in a real deployment."
                    />
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </PageContainer>
    </div>
  );
}
