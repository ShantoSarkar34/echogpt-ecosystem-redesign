"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="grid size-12 place-items-center rounded-2xl bg-danger/10 text-danger">
        <AlertCircle className="size-6" aria-hidden="true" />
      </span>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Something went wrong
        </h1>
        <p className="mt-3 text-muted-foreground">
          An unexpected error occurred. You can try again or head back home.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button asChild variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  );
}
