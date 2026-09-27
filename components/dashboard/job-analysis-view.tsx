"use client";

import { useState } from "react";
import {
  AlertCircle,
  BriefcaseBusiness,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/dashboard/badge";
import { Card } from "@/components/dashboard/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { LoadingState } from "@/components/dashboard/loading-state";
import { PageContainer } from "@/components/dashboard/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import {
  mockJobAnalysis,
  sampleJobDescription,
  type JobAnalysisResult,
} from "@/data/job-analysis";

type Status = "idle" | "loading" | "error" | "done";

export function JobAnalysisView() {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<JobAnalysisResult | null>(null);

  function analyze() {
    if (!description.trim()) return;
    setStatus("loading");
    window.setTimeout(() => {
      if (description.toLowerCase().includes("/error")) {
        setStatus("error");
        return;
      }
      setResult(mockJobAnalysis);
      setStatus("done");
    }, 1400);
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <PageHeader
        title="AI Job Analysis"
        description="Analyze job descriptions and understand what employers are looking for."
      />
      <PageContainer className="max-w-4xl">
        <Card>
          <label htmlFor="job-description" className="text-sm font-medium">
            Job description
          </label>
          <textarea
            id="job-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder={sampleJobDescription}
            className="mt-2 w-full resize-none rounded-xl border border-border-strong bg-surface-2 p-3 text-base outline-none transition-colors placeholder:text-subtle-foreground focus:border-accent sm:text-sm"
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setDescription(sampleJobDescription)}
              className="text-xs font-medium text-accent-text hover:underline"
            >
              Use example job description
            </button>
            <Button
              onClick={analyze}
              disabled={!description.trim() || status === "loading"}
            >
              <Sparkles aria-hidden="true" />
              {status === "loading" ? "Analyzing…" : "Analyze job"}
            </Button>
          </div>
        </Card>

        {status === "loading" && (
          <LoadingState label="Analyzing the job description…" />
        )}

        {status === "error" && (
          <div
            role="alert"
            className="flex flex-col gap-3 rounded-xl border border-danger/40 bg-danger/10 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <AlertCircle
                className="mt-0.5 size-5 shrink-0 text-danger"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-medium">
                  Couldn&apos;t analyze this job description
                </p>
                <p className="text-sm text-muted-foreground">
                  This is a simulated error. Try again to continue.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={analyze}
              className="shrink-0"
            >
              <RotateCcw aria-hidden="true" /> Retry
            </Button>
          </div>
        )}

        {status === "idle" && (
          <EmptyState
            icon={BriefcaseBusiness}
            title="No analysis yet"
            description="Paste a job description above and click Analyze job."
          />
        )}

        {status === "done" && result && (
          <div className="space-y-4">
            <Card>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{result.role}</p>
                  <p className="text-xs text-muted-foreground">
                    {result.experience} · {result.workType} · {result.location}
                  </p>
                </div>
                <Badge variant="accent">{result.matchScore}% Match</Badge>
              </div>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <h3 className="text-sm font-semibold">Required skills</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {result.requiredSkills.map((s) => (
                    <Badge key={s} variant="accent">
                      {s}
                    </Badge>
                  ))}
                </div>
              </Card>
              <Card>
                <h3 className="text-sm font-semibold">Nice to have</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {result.niceToHaveSkills.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </Card>
            </div>

            <Card>
              <h3 className="text-sm font-semibold">Responsibilities</h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                {result.responsibilities.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold">Skill gaps</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {result.skillGaps.map((s) => (
                  <Badge key={s} variant="warning">
                    {s}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold">Recommendations</h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                {result.recommendations.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </Card>
          </div>
        )}
      </PageContainer>
    </div>
  );
}
