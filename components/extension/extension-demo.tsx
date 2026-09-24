"use client";

import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { BrowserMockup } from "@/components/extension/browser-mockup";
import { ExtensionPanel } from "@/components/extension/extension-panel";
import { useMediaQuery } from "@/hooks/use-media-query";

export function ExtensionDemo() {
  const [open, setOpen] = useState(true);
  const [contextEnabled, setContextEnabled] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // On small screens there is no browser frame, so the panel is always shown.
  const visible = open || !isDesktop;

  return (
    <div className="relative">
      <BrowserMockup
        open={visible}
        onToggle={() => setOpen((v) => !v)}
        className="hidden md:block"
      />

      <AnimatePresence>
        {visible && (
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
              contextEnabled={contextEnabled}
              onContextChange={setContextEnabled}
            />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
