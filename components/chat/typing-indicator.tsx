"use client";

import { motion } from "motion/react";
import { AssistantAvatar } from "./assistant-avatar";

export function TypingIndicator() {
  return (
    <div role="status" className="flex items-center gap-3">
      <AssistantAvatar />
      <span className="sr-only">EchoGPT is thinking</span>
      <div
        className="flex h-8 items-center gap-1 rounded-full bg-surface-2 px-3"
        aria-hidden="true"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-1.5 rounded-full bg-muted-foreground"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
