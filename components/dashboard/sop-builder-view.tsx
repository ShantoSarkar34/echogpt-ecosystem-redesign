"use client";

import { useState } from "react";
import {
  Check,
  ClipboardList,
  Copy,
  Download,
  Pencil,
  Save,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/dashboard/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { LoadingState } from "@/components/dashboard/loading-state";
import { PageContainer } from "@/components/dashboard/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { mockSop, sopDepartments, sopTones, type SopResult } from "@/data/sop";

function sopToText(r: SopResult) {
  return `${r.title}\n\nObjective:\n${r.objective}\n\nScope:\n${r.scope}\n\nRequired tools:\n${r.tools
    .map((t) => `- ${t}`)
    .join("\n")}\n\nStep-by-step procedure:\n${r.steps
    .map((s, i) => `${i + 1}. ${s}`)
    .join("\n")}\n\nNotes:\n${r.notes}\n\nQuality checklist:\n${r.checklist
    .map((c) => `[ ] ${c}`)
    .join("\n")}\n`;
}

export function SopBuilderView() {
  const [title, setTitle] = useState("");
  const [department, setDepartment] =
    useState<(typeof sopDepartments)[number]>("Marketing");
  const [objective, setObjective] = useState("");
  const [tone, setTone] = useState<(typeof sopTones)[number]>("Formal");
  const [steps, setSteps] = useState(6);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<SopResult | null>(null);
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleGenerate() {
    if (!title.trim() || generating) return;
    setGenerating(true);
    window.setTimeout(() => {
      const generated: SopResult = { ...mockSop, title: title.trim() };
      setResult(generated);
      setEditedText(sopToText(generated));
      setGenerating(false);
    }, 1400);
  }

  async function handleCopy() {
    if (!result) return;
    await navigator.clipboard?.writeText(
      editing ? editedText : sopToText(result),
    );
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  function handleSave() {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1500);
  }

  function handleExport() {
    if (!result) return;
    const text = editing ? editedText : sopToText(result);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.title.replace(/\s+/g, "-").toLowerCase() || "sop"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <PageHeader
        title="AI SOP Builder"
        description="Create clear, structured standard operating procedures with AI."
      />
      <PageContainer className="max-w-4xl">
        <Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="sop-title"
                className="text-xs font-medium text-muted-foreground"
              >
                SOP title
              </label>
              <input
                id="sop-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="How to Review and Publish a New Blog Post"
                className="mt-1.5 h-10 w-full rounded-lg border border-border-strong bg-surface-2 px-3 text-base outline-none placeholder:text-subtle-foreground focus:border-accent sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="sop-department"
                className="text-xs font-medium text-muted-foreground"
              >
                Department
              </label>
              <select
                id="sop-department"
                value={department}
                onChange={(e) =>
                  setDepartment(
                    e.target.value as (typeof sopDepartments)[number],
                  )
                }
                className="mt-1.5 h-10 w-full rounded-lg border border-border-strong bg-surface-2 px-3 text-base sm:text-sm"
              >
                {sopDepartments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="sop-objective"
              className="text-xs font-medium text-muted-foreground"
            >
              Objective
            </label>
            <textarea
              id="sop-objective"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              rows={2}
              placeholder="What should this SOP achieve?"
              className="mt-1.5 w-full resize-none rounded-lg border border-border-strong bg-surface-2 p-3 text-base outline-none placeholder:text-subtle-foreground focus:border-accent sm:text-sm"
            />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="sop-tone"
                className="text-xs font-medium text-muted-foreground"
              >
                Tone
              </label>
              <select
                id="sop-tone"
                value={tone}
                onChange={(e) =>
                  setTone(e.target.value as (typeof sopTones)[number])
                }
                className="mt-1.5 h-10 w-full rounded-lg border border-border-strong bg-surface-2 px-3 text-base sm:text-sm"
              >
                {sopTones.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="sop-steps"
                className="text-xs font-medium text-muted-foreground"
              >
                Number of steps: {steps}
              </label>
              <input
                id="sop-steps"
                type="range"
                min={3}
                max={10}
                value={steps}
                onChange={(e) => setSteps(Number(e.target.value))}
                className="mt-3 w-full accent-accent"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              onClick={handleGenerate}
              disabled={!title.trim() || generating}
            >
              <Sparkles aria-hidden="true" />
              {generating ? "Generating…" : "Generate SOP"}
            </Button>
          </div>
        </Card>

        {generating && <LoadingState label="Structuring your SOP…" />}

        {!generating && !result && (
          <EmptyState
            icon={ClipboardList}
            title="No SOP yet"
            description="Fill in a title and objective above, then generate your first SOP."
          />
        )}

        {!generating && result && (
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-base font-semibold">{result.title}</h3>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditing((v) => !v)}
                  className="h-9 gap-1.5 px-2 text-xs"
                >
                  <Pencil aria-hidden="true" /> {editing ? "Preview" : "Edit"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-9 gap-1.5 px-2 text-xs"
                >
                  {copied ? (
                    <Check aria-hidden="true" />
                  ) : (
                    <Copy aria-hidden="true" />
                  )}{" "}
                  {copied ? "Copied" : "Copy"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSave}
                  className="h-9 gap-1.5 px-2 text-xs"
                >
                  {saved ? (
                    <Check aria-hidden="true" />
                  ) : (
                    <Save aria-hidden="true" />
                  )}{" "}
                  {saved ? "Saved" : "Save"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleExport}
                  className="h-9 gap-1.5 px-2 text-xs"
                >
                  <Download aria-hidden="true" /> Export
                </Button>
              </div>
            </div>

            {editing ? (
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                rows={16}
                className="mt-4 w-full resize-none rounded-lg border border-border-strong bg-surface-2 p-3 font-mono text-xs leading-relaxed outline-none focus:border-accent"
              />
            ) : (
              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Objective
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    {result.objective}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Scope
                  </p>
                  <p className="mt-1 text-muted-foreground">{result.scope}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Required tools
                  </p>
                  <ul className="mt-1 list-disc pl-5 text-muted-foreground">
                    {result.tools.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Step-by-step procedure
                  </p>
                  <ol className="mt-1 list-decimal space-y-1 pl-5 text-muted-foreground">
                    {result.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Notes
                  </p>
                  <p className="mt-1 text-muted-foreground">{result.notes}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Quality checklist
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {result.checklist.map((c) => (
                      <li
                        key={c}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <span
                          className="size-3.5 shrink-0 rounded border border-border-strong"
                          aria-hidden="true"
                        />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </Card>
        )}
      </PageContainer>
    </div>
  );
}
