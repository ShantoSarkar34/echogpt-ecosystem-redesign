"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Sparkles, Video as VideoIcon } from "lucide-react";
import { Badge } from "@/components/dashboard/badge";
import { Card } from "@/components/dashboard/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { PageContainer } from "@/components/dashboard/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import {
  initialVideoProjects,
  videoDurations,
  videoStyles,
  type VideoDuration,
  type VideoProject,
  type VideoStyle,
} from "@/data/video-studio";

export function VideoStudioView() {
  const [script, setScript] = useState("");
  const [style, setStyle] = useState<VideoStyle>("Explainer");
  const [duration, setDuration] = useState<VideoDuration>("30s");
  const [projects, setProjects] =
    useState<VideoProject[]>(initialVideoProjects);
  const [progress, setProgress] = useState<number | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearInterval(timer.current), []);

  function handleGenerate() {
    if (!script.trim() || progress !== null) return;
    const id = `vid-${Date.now()}`;
    const draft: VideoProject = {
      id,
      title:
        script.trim().split(/\s+/).slice(0, 4).join(" ") || "Untitled project",
      duration,
      status: "Processing",
      date: "Just now",
      gradient: "linear-gradient(135deg, #7c3aed, #4f46e5)",
    };
    setProjects((prev) => [draft, ...prev]);
    setProgress(0);

    timer.current = window.setInterval(() => {
      setProgress((p) => {
        if (p === null) return p;
        const next = p + 20;
        if (next >= 100) {
          window.clearInterval(timer.current);
          setProjects((prev) =>
            prev.map((proj) =>
              proj.id === id ? { ...proj, status: "Ready" } : proj,
            ),
          );
          return null;
        }
        return next;
      });
    }, 350);
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <PageHeader
        title="Video Studio"
        description="Turn ideas and scripts into engaging AI-powered videos."
      />
      <PageContainer className="max-w-5xl">
        <Card>
          <label htmlFor="video-script" className="text-sm font-medium">
            Script or idea
          </label>
          <textarea
            id="video-script"
            value={script}
            onChange={(e) => setScript(e.target.value)}
            rows={3}
            placeholder="A 30-second product launch teaser for a new app…"
            className="mt-2 w-full resize-none rounded-xl border border-border-strong bg-surface-2 p-3 text-base outline-none transition-colors placeholder:text-subtle-foreground focus:border-accent sm:text-sm"
          />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="video-style"
                className="text-xs font-medium text-muted-foreground"
              >
                Style
              </label>
              <select
                id="video-style"
                value={style}
                onChange={(e) => setStyle(e.target.value as VideoStyle)}
                className="mt-1.5 h-10 w-full rounded-lg border border-border-strong bg-surface-2 px-3 text-base sm:text-sm"
              >
                {videoStyles.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="video-duration"
                className="text-xs font-medium text-muted-foreground"
              >
                Duration
              </label>
              <select
                id="video-duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value as VideoDuration)}
                className="mt-1.5 h-10 w-full rounded-lg border border-border-strong bg-surface-2 px-3 text-base sm:text-sm"
              >
                {videoDurations.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={handleGenerate}
              disabled={!script.trim() || progress !== null}
            >
              <Sparkles aria-hidden="true" />
              {progress !== null ? "Processing…" : "Generate video"}
            </Button>
          </div>
        </Card>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Projects</h3>
          {projects.length === 0 ? (
            <EmptyState
              icon={VideoIcon}
              title="No projects yet"
              description="Describe your idea above and generate your first video."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <Card key={p.id} className="overflow-hidden p-0">
                  <div
                    style={{ backgroundImage: p.gradient }}
                    className="relative flex aspect-video items-center justify-center"
                  >
                    {p.status === "Ready" ? (
                      <span className="grid size-11 place-items-center rounded-full bg-black/30 text-white backdrop-blur-sm">
                        <Play className="size-5" aria-hidden="true" />
                      </span>
                    ) : (
                      <span className="rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                        Processing…{" "}
                        {progress !== null && p.status === "Processing"
                          ? `${progress}%`
                          : ""}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 p-4">
                    <p className="truncate text-sm font-medium">{p.title}</p>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge
                        variant={p.status === "Ready" ? "success" : "warning"}
                      >
                        {p.status}
                      </Badge>
                      <Badge>{p.duration}</Badge>
                      <span className="text-xs text-subtle-foreground">
                        {p.date}
                      </span>
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
