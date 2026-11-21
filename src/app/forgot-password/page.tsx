
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  Sparkles,
} from "lucide-react";
import { resetPassword } from "@/lib/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess(false);

    try {
      setLoading(true);

      await resetPassword(email.trim());

      setSuccess(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "";

      if (message.includes("Firebase is not configured")) {
        setError("Firebase is not configured yet.");
      } else if (message.includes("auth/invalid-email")) {
        setError("Please enter a valid email address.");
      } else {
        setError(
          "Unable to process your request. Please check your email and try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <Link
          href="/"
          className="mb-10 flex items-center justify-center gap-2 text-xl font-bold"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
            <Sparkles size={19} />
          </span>
          WORLD STUDIO
        </Link>

        <section className="card p-7 sm:p-9">

          <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-400/10 text-violet-300">
            <Mail size={26} />
          </div>

          <p className="mb-2 text-sm font-medium text-violet-300">
            ACCOUNT RECOVERY
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Forgot your password?
          </h1>

          <p className="mt-3 text-sm leading-7 text-gray-400">
            Don't worry. Enter the email address associated with your
            account and we'll send you instructions to reset your password.
          </p>

          {success ? (
            <div className="mt-7 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5">
              <div className="flex items-center gap-2 text-emerald-300">
                <CheckCircle2 size={20} />
                <span className="font-semibold">Request submitted</span>
              </div>

              <p className="mt-3 text-sm leading-6 text-gray-300">
                If an account exists for this email, a password reset
                message will be sent. Check your inbox and spam folder.
              </p>

              <button
                onClick={() => setSuccess(false)}
                className="mt-5 text-sm font-medium text-violet-300 hover:text-violet-200"
              >
                Try another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-7 space-y-5">

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="button button-primary flex w-full items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send reset instructions
                    <Mail size={17} />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-7 border-t border-white/10 pt-6">
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm font-medium text-violet-300 hover:text-violet-200"
            >
              <ArrowLeft size={16} />
              Back to sign in
            </Link>
          </div>

        </section>

        <p className="mt-6 text-center text-xs text-gray-500">
          WORLD STUDIO · Your universe is waiting.
        </p>

      </div>
    </main>
  );
}
