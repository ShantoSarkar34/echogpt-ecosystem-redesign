"use client";

import { useState } from "react";
import { GitCompare, RotateCcw, Sparkles } from "lucide-react";
import { Badge } from "@/components/dashboard/badge";
import { Card } from "@/components/dashboard/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { LoadingState } from "@/components/dashboard/loading-state";
import { PageContainer } from "@/components/dashboard/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { compareModels, defaultCompareSelection } from "@/data/compare";
import {
  generateCompareResult,
  type CompareResult,
} from "@/lib/compare-responses";

const MAX_MODELS = 4;
const MIN_MODELS = 2;

export function CompareView() {
  const [prompt, setPrompt] = useState("");
  const [selected, setSelected] = useState<string[]>(defaultCompareSelection);
  const [results, setResults] = useState<CompareResult[] | null>(null);
  const [loading, setLoading] = useState(false);

  function toggleModel(id: string) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((m) => m !== id);
      if (prev.length >= MAX_MODELS) return prev;
      return [...prev, id];
    });
  }

  function handleCompare() {
    if (!prompt.trim() || selected.length < MIN_MODELS || loading) return;
    setLoading(true);
    window.setTimeout(() => {
      const models = compareModels.filter((m) => selected.includes(m.id));
      setResults(models.map((m) => generateCompareResult(prompt.trim(), m)));
      setLoading(false);
    }, 1400);
  }

  function handleClear() {
    setPrompt("");
    setResults(null);
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <PageHeader
        title="Compare AI Models"
        description="Send one prompt to multiple AI models and compare their answers."
      />
      <PageContainer className="max-w-5xl">
        <Card>
          <label htmlFor="compare-prompt" className="text-sm font-medium">
            Prompt
          </label>
          <textarea
            id="compare-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            placeholder="Explain the tradeoffs between REST and GraphQL…"
            className="mt-2 w-full resize-none rounded-xl border border-border-strong bg-surface-2 p-3 text-base outline-none transition-colors placeholder:text-subtle-foreground focus:border-accent sm:text-sm"
          />

          <fieldset className="mt-4">
            <legend className="text-xs font-medium text-muted-foreground">
              Models ({selected.length}/{MAX_MODELS}, minimum {MIN_MODELS})
            </legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {compareModels.map((m) => {
                const checked = selected.includes(m.id);
                const disabled = !checked && selected.length >= MAX_MODELS;
                return (
                  <label
                    key={m.id}
                    className={`flex min-h-11 cursor-pointer items-center gap-2.5 rounded-lg border px-3 text-sm transition-colors duration-150 motion-reduce:transition-none ${
                      checked
                        ? "border-accent bg-accent-soft"
                        : disabled
                          ? "cursor-not-allowed border-border opacity-50"
                          : "border-border-strong hover:bg-surface-2"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={disabled}
                      onChange={() => toggleModel(m.id)}
                      className="size-4"
                    />
                    <span className="min-w-0 flex-1 truncate">
                      {m.name}
                      <span className="ml-1.5 text-xs text-subtle-foreground">
                        {m.provider}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={handleClear}
              disabled={loading}
            >
              <RotateCcw aria-hidden="true" /> Clear
            </Button>
            <Button
              onClick={handleCompare}
              disabled={
                !prompt.trim() || selected.length < MIN_MODELS || loading
              }
            >
              <Sparkles aria-hidden="true" />
              {loading ? "Comparing…" : "Compare"}
            </Button>
          </div>
        </Card>

        {loading && (
          <LoadingState label="Running your prompt against each model…" />
        )}

        {!loading && results && (
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((r) => {
              const model = compareModels.find((m) => m.id === r.modelId)!;
              return (
                <Card key={r.modelId}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold">{model.name}</p>
                      <p className="text-xs text-subtle-foreground">
                        {model.provider}
                      </p>
                    </div>
                    <Badge variant="accent">{model.capability}</Badge>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                    {r.response}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3 text-xs text-subtle-foreground">
                    <span>{r.responseTimeMs}ms</span>
                    <span>{r.tokens} tokens</span>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {!loading && !results && (
          <EmptyState
            icon={GitCompare}
            title="No comparison yet"
            description="Write a prompt, pick 2–4 models, and click Compare."
          />
        )}
      </PageContainer>
    </div>
  );
}
