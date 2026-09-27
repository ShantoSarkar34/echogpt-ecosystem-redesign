"use client";

import { useMemo, useState } from "react";
import { Check, Cpu, Gauge, Search, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/dashboard/badge";
import { Card } from "@/components/dashboard/card";
import { PageContainer } from "@/components/dashboard/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { platformModels, platformProviders } from "@/data/platform";
import { cn } from "@/lib/utils";

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span
        role="img"
        aria-label={`${label}: ${value} of 3`}
        className="flex gap-1"
      >
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className={cn(
              "h-1.5 w-5 rounded-full",
              n <= value ? "bg-accent" : "bg-border",
            )}
          />
        ))}
      </span>
    </div>
  );
}

export function PlatformView() {
  const [query, setQuery] = useState("");
  const [provider, setProvider] =
    useState<(typeof platformProviders)[number]>("All");
  const [selectedId, setSelectedId] = useState("echo-balanced");

  const filtered = useMemo(() => {
    return platformModels.filter((m) => {
      const matchesQuery = m.name
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      const matchesProvider = provider === "All" || m.provider === provider;
      return matchesQuery && matchesProvider;
    });
  }, [query, provider]);

  const providerCount = new Set(platformModels.map((m) => m.provider)).size;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <PageHeader
        title="AI Platform"
        description="Explore the models and AI capabilities powering EchoGPT."
      />
      <PageContainer className="max-w-5xl">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard
            icon={Cpu}
            label="Available models"
            value={platformModels.length}
          />
          <StatCard
            icon={Sparkles}
            label="AI providers"
            value={providerCount}
          />
          <StatCard icon={Zap} label="Requests" value="2.4M" />
          <StatCard icon={Gauge} label="Avg. response time" value="740ms" />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative sm:w-72">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle-foreground"
              aria-hidden="true"
            />
            <label htmlFor="platform-search" className="sr-only">
              Search models
            </label>
            <input
              id="platform-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search models…"
              className="h-10 w-full rounded-lg border border-border-strong bg-surface-2 pl-9 pr-3 text-base outline-none transition-colors placeholder:text-subtle-foreground focus:border-accent sm:text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {platformProviders.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setProvider(p)}
                aria-pressed={provider === p}
                className={cn(
                  "flex h-9 items-center rounded-full border px-3.5 text-sm font-medium transition-colors duration-150 motion-reduce:transition-none",
                  provider === p
                    ? "border-accent bg-accent-soft text-foreground"
                    : "border-border-strong text-muted-foreground hover:bg-surface-2",
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <Card key={m.id}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold">{m.name}</p>
                  <p className="text-xs text-subtle-foreground">{m.provider}</p>
                </div>
                <Badge variant="accent">{m.category}</Badge>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {m.contextSize} context
              </p>
              <div className="mt-3 space-y-2 border-t border-border pt-3">
                <Meter label="Speed" value={m.speed} />
                <Meter label="Intelligence" value={m.intelligence} />
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {m.useCases.map((u) => (
                  <Badge key={u}>{u}</Badge>
                ))}
              </div>
              <Button
                variant={selectedId === m.id ? "secondary" : "outline"}
                size="sm"
                className="mt-4 w-full"
                onClick={() => setSelectedId(m.id)}
              >
                {selectedId === m.id ? (
                  <>
                    <Check aria-hidden="true" /> Selected
                  </>
                ) : (
                  "Select model"
                )}
              </Button>
            </Card>
          ))}
        </div>
      </PageContainer>
    </div>
  );
}
