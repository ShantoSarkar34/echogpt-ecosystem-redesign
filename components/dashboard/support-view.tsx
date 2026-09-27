"use client";

import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, ChevronDown, CircleHelp, Search } from "lucide-react";
import { Card } from "@/components/dashboard/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { PageContainer } from "@/components/dashboard/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { faqItems, supportCategories } from "@/data/faq";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "sent";

export function SupportView() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<
    "All" | (typeof supportCategories)[number]
  >("All");
  const [ticketOpen, setTicketOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [ticketCategory, setTicketCategory] = useState<
    (typeof supportCategories)[number]
  >(supportCategories[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqItems.filter((f) => {
      const matchesQuery = !q || f.question.toLowerCase().includes(q);
      const matchesCategory = category === "All" || f.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  function submitTicket() {
    if (!subject.trim() || !message.trim()) return;
    setStatus("submitting");
    window.setTimeout(() => setStatus("sent"), 1200);
  }

  function closeTicket(open: boolean) {
    setTicketOpen(open);
    if (!open) {
      setStatus("idle");
      setSubject("");
      setMessage("");
    }
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <PageHeader
        title="How can we help?"
        description="Search our help center or reach out to the team directly."
      />
      <PageContainer className="max-w-4xl">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle-foreground"
            aria-hidden="true"
          />
          <label htmlFor="support-search" className="sr-only">
            Search help
          </label>
          <input
            id="support-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for help…"
            className="h-11 w-full rounded-lg border border-border-strong bg-surface-2 pl-9 pr-3 text-base outline-none transition-colors placeholder:text-subtle-foreground focus:border-accent"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {(["All", ...supportCategories] as const).map((cat) => (
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
            icon={CircleHelp}
            title="No results"
            description="Try a different search term or category."
          />
        ) : (
          <Card className="divide-y divide-border p-0">
            {filtered.map((f) => (
              <details key={f.question} className="group px-5">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-sm font-medium">{f.question}</h3>
                  <ChevronDown
                    className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-5 text-sm text-muted-foreground">{f.answer}</p>
              </details>
            ))}
          </Card>
        )}

        <Card className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">Still need help?</p>
            <p className="text-sm text-muted-foreground">
              Reach out and we&apos;ll get back to you.
            </p>
          </div>
          <Dialog.Root open={ticketOpen} onOpenChange={closeTicket}>
            <Dialog.Trigger asChild>
              <Button variant="secondary">Contact Support</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in motion-reduce:animate-none" />
              <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-elevated p-6 shadow-elev-2 outline-none data-[state=open]:animate-pop-in motion-reduce:animate-none">
                {status === "sent" ? (
                  <div className="flex flex-col items-center py-4 text-center">
                    <span className="grid size-12 place-items-center rounded-full bg-success/10 text-success">
                      <Check className="size-6" aria-hidden="true" />
                    </span>
                    <Dialog.Title className="mt-4 text-lg font-semibold">
                      Ticket submitted
                    </Dialog.Title>
                    <Dialog.Description className="mt-2 text-sm text-muted-foreground">
                      This is a demo submission — no real ticket was created.
                    </Dialog.Description>
                    <Button className="mt-6" onClick={() => closeTicket(false)}>
                      Done
                    </Button>
                  </div>
                ) : (
                  <>
                    <Dialog.Title className="text-lg font-semibold">
                      Submit a ticket
                    </Dialog.Title>
                    <Dialog.Description className="sr-only">
                      Fill in a subject, category, and description to submit a
                      demo support ticket.
                    </Dialog.Description>
                    <div className="mt-4 space-y-3">
                      <div>
                        <label
                          htmlFor="ticket-subject"
                          className="text-xs font-medium text-muted-foreground"
                        >
                          Subject
                        </label>
                        <input
                          id="ticket-subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="mt-1.5 h-10 w-full rounded-lg border border-border-strong bg-surface-2 px-3 text-base sm:text-sm"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="ticket-category"
                          className="text-xs font-medium text-muted-foreground"
                        >
                          Category
                        </label>
                        <select
                          id="ticket-category"
                          value={ticketCategory}
                          onChange={(e) =>
                            setTicketCategory(
                              e.target
                                .value as (typeof supportCategories)[number],
                            )
                          }
                          className="mt-1.5 h-10 w-full rounded-lg border border-border-strong bg-surface-2 px-3 text-base sm:text-sm"
                        >
                          {supportCategories.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="ticket-message"
                          className="text-xs font-medium text-muted-foreground"
                        >
                          Description
                        </label>
                        <textarea
                          id="ticket-message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={3}
                          className="mt-1.5 w-full resize-none rounded-lg border border-border-strong bg-surface-2 p-3 text-base sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-2">
                      <Dialog.Close asChild>
                        <Button variant="secondary">Cancel</Button>
                      </Dialog.Close>
                      <Button
                        onClick={submitTicket}
                        disabled={
                          !subject.trim() ||
                          !message.trim() ||
                          status === "submitting"
                        }
                      >
                        {status === "submitting" ? "Submitting…" : "Submit"}
                      </Button>
                    </div>
                  </>
                )}
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </Card>
      </PageContainer>
    </div>
  );
}
