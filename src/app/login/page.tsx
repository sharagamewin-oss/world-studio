
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
} from "lucide-react";
import { loginUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);

      await loginUser(email.trim(), password);

      router.push("/dashboard");
    } catch (err) {
      const code = err instanceof Error ? err.message : "";

      if (code.includes("auth/invalid-credential") ||
          code.includes("auth/wrong-password") ||
          code.includes("auth/user-not-found")) {
        setError("Incorrect email or password.");
      } else if (code.includes("auth/invalid-email")) {
        setError("Please enter a valid email address.");
      } else if (code.includes("Firebase is not configured")) {
        setError("Firebase is not configured yet. Please complete the Firebase setup first.");
      } else {
        setError("Unable to sign in. Please try again.");
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
          <div className="mb-8">
            <p className="mb-2 text-sm font-medium text-violet-300">
              WELCOME BACK, CREATOR
            </p>

            <h1 className="text-3xl font-bold tracking-tight">
              Sign in
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Continue building the universe you imagined.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

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

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs text-violet-300 hover:text-violet-200"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="input pr-12"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
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
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={18} />
                </>
              )}
            </button>

          </form>

          <div className="mt-7 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-violet-300 hover:text-violet-200"
            >
              Create account
            </Link>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-gray-500">
          Your universe is waiting for you.
        </p>

      </div>
    </main>
  );
}
