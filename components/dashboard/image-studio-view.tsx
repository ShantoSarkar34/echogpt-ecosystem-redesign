"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Copy, Download, Image as ImageIcon, MoreHorizontal, RefreshCcw, Sparkles } from "lucide-react";
import { Badge } from "@/components/dashboard/badge";
import { Card } from "@/components/dashboard/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { LoadingState } from "@/components/dashboard/loading-state";
import { PageContainer } from "@/components/dashboard/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import {
  aspectRatios,
  imageQualities,
  imageStyles,
  initialImageCreations,
  randomGradient,
  type AspectRatio,
  type ImageCreation,
  type ImageQuality,
  type ImageStyle,
} from "@/data/image-studio";

const counts = [1, 2, 4] as const;

export function ImageStudioView() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<ImageStyle>("Photorealistic");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("1:1");
  const [quality, setQuality] = useState<ImageQuality>("Standard");
  const [count, setCount] = useState<(typeof counts)[number]>(1);
  const [creations, setCreations] = useState<ImageCreation[]>(initialImageCreations);
  const [generating, setGenerating] = useState(false);

  function handleGenerate() {
    if (!prompt.trim() || generating) return;
    setGenerating(true);
    window.setTimeout(() => {
      const fresh: ImageCreation[] = Array.from({ length: count }, (_, i) => ({
        id: `img-${Date.now()}-${i}`,
        prompt: prompt.trim(),
        style,
        aspectRatio,
        date: "Just now",
        gradient: randomGradient(),
      }));
      setCreations((prev) => [...fresh, ...prev]);
      setGenerating(false);
    }, 1600);
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <PageHeader title="Image Studio" description="Create high-quality visuals from simple prompts." />
      <PageContainer className="max-w-5xl">
        <Card>
          <label htmlFor="image-prompt" className="text-sm font-medium">
            Prompt
          </label>
          <textarea
            id="image-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            placeholder="A cinematic futuristic city at sunset…"
            className="mt-2 w-full resize-none rounded-xl border border-border-strong bg-surface-2 p-3 text-base outline-none transition-colors placeholder:text-subtle-foreground focus:border-accent sm:text-sm"
          />

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="image-style" className="text-xs font-medium text-muted-foreground">
                Style
              </label>
              <select
                id="image-style"
                value={style}
                onChange={(e) => setStyle(e.target.value as ImageStyle)}
                className="mt-1.5 h-10 w-full rounded-lg border border-border-strong bg-surface-2 px-3 text-base sm:text-sm"
              >
                {imageStyles.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="image-ratio" className="text-xs font-medium text-muted-foreground">
                Aspect ratio
              </label>
              <select
                id="image-ratio"
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                className="mt-1.5 h-10 w-full rounded-lg border border-border-strong bg-surface-2 px-3 text-base sm:text-sm"
              >
                {aspectRatios.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="image-quality" className="text-xs font-medium text-muted-foreground">
                Quality
              </label>
              <select
                id="image-quality"
                value={quality}
                onChange={(e) => setQuality(e.target.value as ImageQuality)}
                className="mt-1.5 h-10 w-full rounded-lg border border-border-strong bg-surface-2 px-3 text-base sm:text-sm"
              >
                {imageQualities.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">Images:</span>
              {counts.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCount(c)}
                  aria-pressed={count === c}
                  className={`flex size-8 items-center justify-center rounded-lg border text-xs font-medium transition-colors duration-150 motion-reduce:transition-none ${
                    count === c
                      ? "border-accent bg-accent-soft text-foreground"
                      : "border-border-strong text-muted-foreground hover:bg-surface-2"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <Button onClick={handleGenerate} disabled={!prompt.trim() || generating}>
              <Sparkles aria-hidden="true" />
              {generating ? "Generating…" : "Generate image"}
            </Button>
          </div>
        </Card>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Recent creations</h3>
          {generating && <LoadingState label="Generating your image…" />}
          {!generating && creations.length === 0 && (
            <EmptyState
              icon={ImageIcon}
              title="No creations yet"
              description="Write a prompt above and generate your first image."
            />
          )}
          {!generating && creations.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {creations.map((c) => (
                <Card key={c.id} className="overflow-hidden p-0">
                  <div
                    style={{ backgroundImage: c.gradient }}
                    className="relative flex aspect-square items-center justify-center"
                  >
                    <span className="rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                      Demo preview
                    </span>
                  </div>
                  <div className="space-y-2 p-4">
                    <p className="line-clamp-2 text-sm">{c.prompt}</p>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge variant="accent">{c.style}</Badge>
                      <Badge>{c.aspectRatio}</Badge>
                      <span className="text-xs text-subtle-foreground">{c.date}</span>
                    </div>
                    <div className="flex items-center gap-1 pt-1">
                      <Button variant="ghost" size="sm" className="h-9 gap-1.5 px-2 text-xs">
                        <Download aria-hidden="true" /> Download
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 gap-1.5 px-2 text-xs"
                        onClick={() => setPrompt(c.prompt)}
                      >
                        <RefreshCcw aria-hidden="true" /> Reuse
                      </Button>
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                          <Button variant="ghost" size="icon" className="ml-auto size-9" aria-label="More actions">
                            <MoreHorizontal aria-hidden="true" />
                          </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                          <DropdownMenu.Content
                            align="end"
                            className="z-50 min-w-40 rounded-xl border border-border bg-elevated p-1.5 shadow-elev-2 animate-pop-in motion-reduce:animate-none"
                          >
                            <DropdownMenu.Item
                              onSelect={() => navigator.clipboard?.writeText(c.prompt)}
                              className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-sm outline-none data-highlighted:bg-surface-2"
                            >
                              <Copy className="size-3.5" aria-hidden="true" /> Copy prompt
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                              onSelect={() => setCreations((prev) => prev.filter((x) => x.id !== c.id))}
                              className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-danger outline-none data-highlighted:bg-danger/10"
                            >
                              Delete
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                      </DropdownMenu.Root>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </PageContainer>
    </div>
  );
}