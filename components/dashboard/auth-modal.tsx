"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import type { IconType } from "react-icons";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/use-auth-store";

type Mode = "sign-in" | "sign-up";
type Status = "idle" | "loading" | "success";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const providerIcons: Record<string, IconType> = {
  Google: FaGoogle,
  Facebook: FaFacebook,
  GitHub: FaGithub,
};

export function AuthModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const signIn = useAuthStore((s) => s.signIn);
  const [mode, setMode] = useState<Mode>("sign-in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  function reset() {
    setMode("sign-in");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
    setStatus("idle");
    setSocialLoading(null);
  }

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    if (!next) window.setTimeout(reset, 200);
  }

  function validate(): boolean {
    const next: FormErrors = {};
    if (mode === "sign-up" && !name.trim()) next.name = "Enter your name.";
    if (!email.trim()) next.email = "Enter your email address.";
    else if (!isValidEmail(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Enter your password.";
    else if (password.length < 6)
      next.password = "Password must be at least 6 characters.";
    if (mode === "sign-up" && confirmPassword !== password)
      next.confirmPassword = "Passwords don't match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    setStatus("loading");
    window.setTimeout(() => {
      signIn(email, mode === "sign-up" ? name : undefined);
      setStatus("success");
      window.setTimeout(() => handleOpenChange(false), 900);
    }, 1000);
  }

  function handleSocial(provider: string) {
    setSocialLoading(provider);
    window.setTimeout(() => {
      signIn(`demo@${provider.toLowerCase()}.example`, `${provider} User`);
      setSocialLoading(null);
      setStatus("success");
      window.setTimeout(() => handleOpenChange(false), 900);
    }, 1000);
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in motion-reduce:animate-none" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-elevated p-6 shadow-elev-2 outline-none data-[state=open]:animate-pop-in motion-reduce:animate-none">
          {status === "success" ? (
            <div className="flex flex-col items-center py-4 text-center">
              <span className="grid size-12 place-items-center rounded-full bg-success/10 text-success">
                <Check className="size-6" aria-hidden="true" />
              </span>
              <Dialog.Title className="mt-4 text-lg font-semibold">
                Welcome!
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm text-muted-foreground">
                You&apos;re signed in as a demo user. No real account was
                created.
              </Dialog.Description>
            </div>
          ) : (
            <>
              <Dialog.Title className="text-lg font-semibold">
                {mode === "sign-in" ? "Welcome back" : "Create your account"}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted-foreground">
                {mode === "sign-in"
                  ? "Sign in to EchoGPT"
                  : "Sign up to EchoGPT"}{" "}
                — demo only, any email and a 6+ character password will work.
              </Dialog.Description>

              <div className="mt-5 space-y-3">
                {mode === "sign-up" ? (
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label
                        htmlFor="auth-name"
                        className="text-xs font-medium text-muted-foreground"
                      >
                        Name
                      </label>
                      <input
                        id="auth-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? "auth-name-error" : undefined
                        }
                        className="mt-1.5 h-10 w-full rounded-lg border border-border-strong bg-surface-2 px-3 text-base outline-none transition-colors focus:border-accent sm:text-sm"
                      />
                      {errors.name && (
                        <p
                          id="auth-name-error"
                          role="alert"
                          className="mt-1 flex items-start gap-1.5 text-xs text-danger"
                        >
                          <AlertCircle
                            className="mt-0.5 size-3.5 shrink-0"
                            aria-hidden="true"
                          />{" "}
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="auth-email"
                        className="text-xs font-medium text-muted-foreground"
                      >
                        Email
                      </label>
                      <input
                        id="auth-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "auth-email-error" : undefined
                        }
                        className="mt-1.5 h-10 w-full rounded-lg border border-border-strong bg-surface-2 px-3 text-base outline-none transition-colors focus:border-accent sm:text-sm"
                      />
                      {errors.email && (
                        <p
                          id="auth-email-error"
                          role="alert"
                          className="mt-1 flex items-start gap-1.5 text-xs text-danger"
                        >
                          <AlertCircle
                            className="mt-0.5 size-3.5 shrink-0"
                            aria-hidden="true"
                          />{" "}
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="auth-email"
                      className="text-xs font-medium text-muted-foreground"
                    >
                      Email
                    </label>
                    <input
                      id="auth-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "auth-email-error" : undefined
                      }
                      className="mt-1.5 h-10 w-full rounded-lg border border-border-strong bg-surface-2 px-3 text-base outline-none transition-colors focus:border-accent sm:text-sm"
                    />
                    {errors.email && (
                      <p
                        id="auth-email-error"
                        role="alert"
                        className="mt-1 flex items-center gap-1.5 text-xs text-danger"
                      >
                        <AlertCircle
                          className="size-3.5 shrink-0"
                          aria-hidden="true"
                        />{" "}
                        {errors.email}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="auth-password"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Password
                  </label>
                  <input
                    id="auth-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={!!errors.password}
                    aria-describedby={
                      errors.password ? "auth-password-error" : undefined
                    }
                    className="mt-1.5 h-10 w-full rounded-lg border border-border-strong bg-surface-2 px-3 text-base outline-none transition-colors focus:border-accent sm:text-sm"
                  />
                  {errors.password && (
                    <p
                      id="auth-password-error"
                      role="alert"
                      className="mt-1 flex items-center gap-1.5 text-xs text-danger"
                    >
                      <AlertCircle className="size-3.5" aria-hidden="true" />{" "}
                      {errors.password}
                    </p>
                  )}
                </div>

                {mode === "sign-up" && (
                  <div>
                    <label
                      htmlFor="auth-confirm"
                      className="text-xs font-medium text-muted-foreground"
                    >
                      Confirm password
                    </label>
                    <input
                      id="auth-confirm"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      aria-invalid={!!errors.confirmPassword}
                      aria-describedby={
                        errors.confirmPassword
                          ? "auth-confirm-error"
                          : undefined
                      }
                      className="mt-1.5 h-10 w-full rounded-lg border border-border-strong bg-surface-2 px-3 text-base outline-none transition-colors focus:border-accent sm:text-sm"
                    />
                    {errors.confirmPassword && (
                      <p
                        id="auth-confirm-error"
                        role="alert"
                        className="mt-1 flex items-center gap-1.5 text-xs text-danger"
                      >
                        <AlertCircle className="size-3.5" aria-hidden="true" />{" "}
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {mode === "sign-in" && (
                <button
                  type="button"
                  className="mt-2 text-xs font-medium text-accent-text hover:underline"
                >
                  Forgot password?
                </button>
              )}

              <Button
                className="mt-4 w-full"
                onClick={handleSubmit}
                disabled={status === "loading"}
              >
                {status === "loading"
                  ? "Signing in…"
                  : mode === "sign-in"
                    ? "Sign In"
                    : "Create Account"}
              </Button>

              <div className="mt-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-subtle-foreground">OR</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="mt-4 space-y-2">
                {(["Google", "Facebook", "GitHub"] as const).map((provider) => {
                  const Icon = providerIcons[provider];
                  return (
                    <Button
                      key={provider}
                      variant="outline"
                      className="w-full justify-center gap-2"
                      disabled={socialLoading !== null}
                      onClick={() => handleSocial(provider)}
                    >
                      {socialLoading === provider ? (
                        <Loader2
                          className="size-4 animate-spin motion-reduce:animate-none"
                          aria-hidden="true"
                        />
                      ) : (
                        <Icon className="size-4" aria-hidden="true" />
                      )}
                      Continue with {provider}
                    </Button>
                  );
                })}
              </div>

              <p className="mt-5 text-center text-sm text-muted-foreground">
                {mode === "sign-in" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("sign-up")}
                      className="font-medium text-accent-text hover:underline"
                    >
                      Create account
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("sign-in")}
                      className="font-medium text-accent-text hover:underline"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
