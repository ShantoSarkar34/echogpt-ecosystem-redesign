import type { Metadata } from "next";
import Link from "next/link";
import { ExtensionDemo } from "@/components/extension/extension-demo";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Extension concept" };

export default function ExtensionPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-6 sm:px-6">
      <header className="flex items-center justify-between gap-4">
        <Link href="/" aria-label="EchoGPT home">
          <Logo />
        </Link>
        <Button asChild variant="ghost" size="sm">
          <Link href="/app">Open web app</Link>
        </Button>
      </header>

      <div className="mt-8 max-w-2xl">
        <p className="text-sm font-medium text-accent-text">
          Chrome extension concept
        </p>
        <h1 className="mt-2 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          EchoGPT, one click from any page
        </h1>
        <p className="mt-3 text-muted-foreground">
          A compact popup built for limited space: chat, history, and settings
          in three tabs, with optional page context.{" "}
          <span className="hidden md:inline">
            Click the extension icon in the browser toolbar to open or close it.
          </span>
        </p>
      </div>

      <div className="mt-8">
        <ExtensionDemo />
      </div>
    </main>
  );
}
