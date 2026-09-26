"use client";

import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { BrowserMockup } from "@/components/extension/browser-mockup";
import { ExtensionPanel } from "@/components/extension/extension-panel";
import { Button } from "@/components/ui/button";
import { mockPages } from "@/data/mock-page";

export function ExtensionDemo() {
  const [open, setOpen] = useState(true);
  const [contextEnabled, setContextEnabled] = useState(true);
  const [activePageId, setActivePageId] = useState(mockPages[0].id);

  return (
    <div className="relative">
      <BrowserMockup
        open={open}
        onToggle={() => setOpen((v) => !v)}
        activePageId={activePageId}
        onSelectPage={setActivePageId}
        className="hidden md:block"
      />

      {/* Mobile has no browser chrome to click, so give the toggle its own visible control here. */}
      <div className="mb-3 flex items-center justify-between md:hidden">
        <p className="text-sm font-medium text-muted-foreground">
          {open ? "Extension popup open" : "Extension popup closed"}
        </p>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Open"}
        </Button>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            key="panel"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{ transformOrigin: "top right" }}
            className="mx-auto w-full max-w-95 md:absolute md:right-3 md:top-14 md:z-10"
          >
            <ExtensionPanel
              activePageId={activePageId}
              contextEnabled={contextEnabled}
              onContextChange={setContextEnabled}
            />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
