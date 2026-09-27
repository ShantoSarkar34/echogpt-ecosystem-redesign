"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Check } from "lucide-react";
import { Badge } from "@/components/dashboard/badge";
import { Card } from "@/components/dashboard/card";
import { PageContainer } from "@/components/dashboard/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { plans as initialPlans, type Plan } from "@/data/subscriptions";
import { cn } from "@/lib/utils";

type ModalStatus = "confirm" | "loading" | "success";

export function SubscriptionsView() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [target, setTarget] = useState<Plan | null>(null);
  const [status, setStatus] = useState<ModalStatus>("confirm");

  const current = plans.find((p) => p.current);

  function openConfirm(plan: Plan) {
    setTarget(plan);
    setStatus("confirm");
  }

  function confirmSubscribe() {
    if (!target) return;
    setStatus("loading");
    window.setTimeout(() => {
      setPlans((prev) =>
        prev.map((p) => ({ ...p, current: p.id === target.id })),
      );
      setStatus("success");
    }, 1200);
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <PageHeader
        title="Subscriptions"
        description="Manage your plan, billing, and included features."
      />
      <PageContainer className="max-w-5xl">
        {current && (
          <Card className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Current plan</p>
              <p className="text-sm font-semibold">
                {current.name} · {current.price}
                {current.perLabel}
              </p>
            </div>
            <Badge variant="success">Active</Badge>
          </Card>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={cn("flex flex-col", plan.highlight && "border-accent")}
            >
              {plan.highlight && (
                <Badge variant="accent" className="self-start">
                  Most popular
                </Badge>
              )}
              <p className="mt-2 text-sm font-semibold">{plan.name}</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">
                {plan.price}
                <span className="text-sm font-normal text-muted-foreground">
                  {plan.perLabel}
                </span>
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {plan.models}
              </p>
              <p className="text-xs text-muted-foreground">{plan.credits}</p>
              <ul className="mt-4 flex-1 space-y-1.5 text-sm text-muted-foreground">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 size-3.5 shrink-0 text-accent-text"
                      aria-hidden="true"
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-4"
                variant={plan.current ? "secondary" : "primary"}
                disabled={plan.current}
                onClick={() => openConfirm(plan)}
              >
                {plan.current ? "Current plan" : "Subscribe"}
              </Button>
            </Card>
          ))}
        </div>
      </PageContainer>

      <Dialog.Root
        open={!!target}
        onOpenChange={(open) => !open && setTarget(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in motion-reduce:animate-none" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-elevated p-6 shadow-elev-2 outline-none data-[state=open]:animate-pop-in motion-reduce:animate-none">
            {status === "success" ? (
              <div className="flex flex-col items-center py-4 text-center">
                <span className="grid size-12 place-items-center rounded-full bg-success/10 text-success">
                  <Check className="size-6" aria-hidden="true" />
                </span>
                <Dialog.Title className="mt-4 text-lg font-semibold">
                  Subscribed to {target?.name}
                </Dialog.Title>
                <Dialog.Description className="mt-2 text-sm text-muted-foreground">
                  This is a demo confirmation — no real payment was processed.
                </Dialog.Description>
                <Button className="mt-6" onClick={() => setTarget(null)}>
                  Done
                </Button>
              </div>
            ) : (
              <>
                <Dialog.Title className="text-lg font-semibold">
                  Confirm subscription
                </Dialog.Title>
                <Dialog.Description className="mt-2 text-sm text-muted-foreground">
                  You&apos;re about to subscribe to the{" "}
                  <strong className="text-foreground">{target?.name}</strong>{" "}
                  plan at {target?.price}
                  {target?.perLabel}. No real payment will be processed.
                </Dialog.Description>
                <div className="mt-6 flex justify-end gap-2">
                  <Dialog.Close asChild>
                    <Button variant="secondary">Cancel</Button>
                  </Dialog.Close>
                  <Button
                    onClick={confirmSubscribe}
                    disabled={status === "loading"}
                  >
                    {status === "loading"
                      ? "Confirming…"
                      : "Confirm subscription"}
                  </Button>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
