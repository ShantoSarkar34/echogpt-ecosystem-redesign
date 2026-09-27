"use client";

import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  CheckCircle2,
  Clock,
  ListTodo,
  Play,
  Plus,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/dashboard/badge";
import { Card } from "@/components/dashboard/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { PageContainer } from "@/components/dashboard/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import {
  initialTasks,
  taskModels,
  taskPriorities,
  type Task,
  type TaskPriority,
} from "@/data/tasks";

const statusBadge: Record<
  Task["status"],
  "default" | "accent" | "success" | "warning" | "danger"
> = {
  Pending: "default",
  Running: "accent",
  Completed: "success",
  Failed: "danger",
};

export function TasksView() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [model, setModel] = useState(taskModels[1]);
  const [priority, setPriority] = useState<TaskPriority>("Medium");
  const timers = useRef<Record<string, number>>({});

  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach((t) => window.clearInterval(t));
    };
  }, []);

  const total = tasks.length;
  const running = tasks.filter((t) => t.status === "Running").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const failed = tasks.filter((t) => t.status === "Failed").length;

  function runTask(id: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "Running", progress: 0 } : t,
      ),
    );
    timers.current[id] = window.setInterval(() => {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id !== id || t.status !== "Running") return t;
          const next = t.progress + 25;
          if (next >= 100) {
            window.clearInterval(timers.current[id]);
            return { ...t, progress: 100, status: "Completed" };
          }
          return { ...t, progress: next };
        }),
      );
    }, 500);
  }

  function handleCreate() {
    if (!name.trim()) return;
    const task: Task = {
      id: `t-${Date.now()}`,
      name: name.trim(),
      description: description.trim() || "No description provided.",
      status: "Pending",
      priority,
      progress: 0,
      createdDate: "Just now",
      dueDate: "Not set",
      model,
    };
    setTasks((prev) => [task, ...prev]);
    setName("");
    setDescription("");
    setOpen(false);
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <PageHeader
        title="AI Tasks"
        description="Create and manage tasks powered by EchoGPT."
      />
      <PageContainer className="max-w-4xl">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard icon={ListTodo} label="Total tasks" value={total} />
          <StatCard icon={Clock} label="In progress" value={running} />
          <StatCard icon={CheckCircle2} label="Completed" value={completed} />
          <StatCard icon={XCircle} label="Failed" value={failed} />
        </div>

        <div className="flex justify-end">
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <Button>
                <Plus aria-hidden="true" /> Create Task
              </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in motion-reduce:animate-none" />
              <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-elevated p-6 shadow-elev-2 outline-none data-[state=open]:animate-pop-in motion-reduce:animate-none">
                <Dialog.Title className="text-lg font-semibold">
                  Create task
                </Dialog.Title>
                <div className="mt-4 space-y-3">
                  <div>
                    <label
                      htmlFor="task-name"
                      className="text-xs font-medium text-muted-foreground"
                    >
                      Task name
                    </label>
                    <input
                      id="task-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1.5 h-10 w-full rounded-lg border border-border-strong bg-surface-2 px-3 text-base sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="task-desc"
                      className="text-xs font-medium text-muted-foreground"
                    >
                      Description
                    </label>
                    <textarea
                      id="task-desc"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="mt-1.5 w-full resize-none rounded-lg border border-border-strong bg-surface-2 p-3 text-base sm:text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="task-model"
                        className="text-xs font-medium text-muted-foreground"
                      >
                        Model
                      </label>
                      <select
                        id="task-model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="mt-1.5 h-10 w-full rounded-lg border border-border-strong bg-surface-2 px-3 text-base sm:text-sm"
                      >
                        {taskModels.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="task-priority"
                        className="text-xs font-medium text-muted-foreground"
                      >
                        Priority
                      </label>
                      <select
                        id="task-priority"
                        value={priority}
                        onChange={(e) =>
                          setPriority(e.target.value as TaskPriority)
                        }
                        className="mt-1.5 h-10 w-full rounded-lg border border-border-strong bg-surface-2 px-3 text-base sm:text-sm"
                      >
                        {taskPriorities.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <Dialog.Close asChild>
                    <Button variant="secondary">Cancel</Button>
                  </Dialog.Close>
                  <Button onClick={handleCreate} disabled={!name.trim()}>
                    Run task
                  </Button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        {tasks.length === 0 ? (
          <EmptyState
            icon={ListTodo}
            title="No tasks yet"
            description="Create a task to get started."
          />
        ) : (
          <ul className="space-y-2">
            {tasks.map((t) => (
              <li key={t.id}>
                <Card className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{t.name}</p>
                      <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                        {t.description}
                      </p>
                    </div>
                    {t.status === "Pending" && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => runTask(t.id)}
                      >
                        <Play aria-hidden="true" /> Run
                      </Button>
                    )}
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge variant={statusBadge[t.status]}>{t.status}</Badge>
                    <Badge>{t.priority} priority</Badge>
                    <span className="text-xs text-subtle-foreground">
                      {t.model}
                    </span>
                  </div>
                  {(t.status === "Running" || t.status === "Completed") && (
                    <div
                      role="progressbar"
                      aria-valuenow={t.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${t.name} progress`}
                      className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-2"
                    >
                      <div
                        className="h-full rounded-full bg-accent transition-[width] duration-300 motion-reduce:transition-none"
                        style={{ width: `${t.progress}%` }}
                      />
                    </div>
                  )}
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-subtle-foreground">
                    <span>Created {t.createdDate}</span>
                    <span>Due {t.dueDate}</span>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </PageContainer>
    </div>
  );
}
