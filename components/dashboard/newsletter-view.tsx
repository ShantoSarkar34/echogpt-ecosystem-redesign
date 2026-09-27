"use client";

import { useState } from "react";
import { AlertCircle, Check, Mail } from "lucide-react";
import { Badge } from "@/components/dashboard/badge";
import { Card } from "@/components/dashboard/card";
import { PageContainer } from "@/components/dashboard/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { newsletters } from "@/data/newsletters";

type Status = "idle" | "loading" | "success" | "invalid";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function NewsletterView() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function handleSubscribe() {
    if (!email.trim() || !isValidEmail(email)) {
      setStatus("invalid");
      return;
    }
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 1100);
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <PageHeader
        title="EchoGPT Newsletter"
        description="Get the latest AI tools, product updates, and productivity tips."
      />
      <PageContainer className="max-w-4xl">
        <Card>
          {status === "success" ? (
            <div className="flex flex-col items-center py-6 text-center">
              <span className="grid size-12 place-items-center rounded-full bg-success/10 text-success">
                <Check className="size-6" aria-hidden="true" />
              </span>
              <p className="mt-4 text-base font-semibold">
                You&apos;re subscribed!
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                We&apos;ll send updates to {email}.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent-text">
                  <Mail className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Subscribe for updates</p>
                  <p className="text-xs text-muted-foreground">
                    You&apos;re joining 25,000+ AI enthusiasts.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "invalid") setStatus("idle");
                  }}
                  placeholder="you@example.com"
                  aria-invalid={status === "invalid"}
                  aria-describedby={
                    status === "invalid" ? "newsletter-error" : undefined
                  }
                  className="h-11 flex-1 rounded-lg border border-border-strong bg-surface-2 px-3 text-base outline-none transition-colors placeholder:text-subtle-foreground focus:border-accent"
                />
                <Button
                  onClick={handleSubscribe}
                  disabled={status === "loading"}
                  className="sm:w-auto"
                >
                  {status === "loading" ? "Subscribing…" : "Subscribe"}
                </Button>
              </div>
              {status === "invalid" && (
                <p
                  id="newsletter-error"
                  role="alert"
                  className="mt-2 flex items-center gap-1.5 text-xs text-danger"
                >
                  <AlertCircle className="size-3.5" aria-hidden="true" />
                  Enter a valid email address.
                </p>
              )}
              <p className="mt-3 text-xs text-subtle-foreground">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </>
          )}
        </Card>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Recent newsletters</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {newsletters.map((n) => (
              <Card key={n.id}>
                <Badge variant="accent">{n.category}</Badge>
                <p className="mt-3 text-sm font-semibold">{n.title}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {n.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-subtle-foreground">
                    {n.date}
                  </span>
                  <Button variant="ghost" size="sm">
                    Read
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
