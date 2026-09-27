"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ExternalLink, MessageCircle, Users } from "lucide-react";
import { Card } from "@/components/dashboard/card";
import { PageContainer } from "@/components/dashboard/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { DemoNoticeDialog } from "@/components/dashboard/demo-notice-dialog";
import {
  communityCategories,
  communityStats,
  recentActivity,
} from "@/data/community";

const sections = ["General", "AI", "Community"] as const;

export function DiscordView() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <PageHeader
        title="EchoGPT Community"
        description="Join the EchoGPT community and connect with other AI enthusiasts."
      />
      <PageContainer className="max-w-4xl">
        <Card className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white">
            <MessageCircle className="size-7" aria-hidden="true" />
          </span>
          <div className="flex-1">
            <p className="text-base font-semibold">EchoGPT Community</p>
            <p className="mt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted-foreground sm:justify-start">
              <span className="flex items-center gap-1">
                <Users className="size-3.5" aria-hidden="true" />{" "}
                {communityStats.members} members
              </span>
              <span className="flex items-center gap-1">
                <span
                  className="size-2 rounded-full bg-success"
                  aria-hidden="true"
                />{" "}
                {communityStats.online} online
              </span>
            </p>
          </div>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <Button>
                Join Discord <ExternalLink aria-hidden="true" />
              </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in motion-reduce:animate-none" />
              <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-elevated p-6 text-center shadow-elev-2 outline-none data-[state=open]:animate-pop-in motion-reduce:animate-none">
                <Dialog.Title className="text-lg font-semibold">
                  This is a demo
                </Dialog.Title>
                <Dialog.Description className="mt-2 text-sm text-muted-foreground">
                  In a real deployment, this would open an invite link to the
                  EchoGPT Discord server. No real Discord integration exists in
                  this project.
                </Dialog.Description>
                <Button className="mt-6 w-full" onClick={() => setOpen(false)}>
                  Got it
                </Button>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </Card>

        <div className="grid gap-4 sm:grid-cols-3">
          {sections.map((section) => (
            <Card key={section}>
              <h3 className="text-xs font-medium uppercase tracking-wide text-subtle-foreground">
                {section}
              </h3>
              <ul className="mt-2.5 space-y-1.5 text-sm">
                {communityCategories
                  .filter((c) => c.section === section)
                  .map((c) => (
                    <li key={c.name} className="text-muted-foreground">
                      # {c.name}
                    </li>
                  ))}
              </ul>
            </Card>
          ))}
        </div>

        <Card>
          <h3 className="text-sm font-semibold">Recent activity</h3>
          <ul className="mt-3 space-y-2.5">
            {recentActivity.map((a) => (
              <li
                key={a}
                className="rounded-lg bg-surface-2 px-3 py-2 text-sm text-muted-foreground"
              >
                {a}
              </li>
            ))}
          </ul>
        </Card>

        <div className="flex flex-wrap gap-2">
          <DemoNoticeDialog
            trigger={<Button variant="secondary">Join Community</Button>}
            title="Join the community"
            description="This would normally open the Discord invite flow. No real Discord integration exists in this demo."
          />
          <DemoNoticeDialog
            trigger={<Button variant="outline">View Guidelines</Button>}
            title="Community guidelines"
            description="Guidelines content would appear here in a real deployment. This is a demo placeholder."
          />
        </div>
      </PageContainer>
    </div>
  );
}
