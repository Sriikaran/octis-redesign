"use client";

import { useState } from "react";
import Link from "next/link";
import { LogIn, Info } from "lucide-react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    setIsSubmitting(true);
    setNotice(null);

    // Simulate authentic connection attempt to demonstrate UI state without fake login
    setTimeout(() => {
      setIsSubmitting(false);
      setNotice(
        "Authentication service is external. Active cloud showroom credentials and owner approval are required to access the production Octis ERP system."
      );
    }, 700);
  };

  return (
    <div className="min-h-screen bg-primary/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background radial glow accents matching live site */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex mb-6 transform hover:scale-105 transition-transform">
            <Link
              href="/"
              className="inline-flex items-center flex-shrink-0 leading-none focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg"
              aria-label="Octis Home"
            >
              <img
                src="/logo.png"
                alt="Octis"
                className="h-20 sm:h-24 w-auto object-contain object-left max-w-[220px]"
                decoding="async"
              />
            </Link>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3 font-display">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-lg">
            Sign in to your jewellery management system
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-xl border text-card-foreground transition-all duration-200 hover:border-primary/20 hover:shadow-md p-8 shadow-2xl bg-background/95 backdrop-blur-sm border-primary/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {notice && (
              <div
                className="p-3.5 rounded-lg bg-primary/10 border border-primary/30 text-sm text-foreground flex items-start gap-2.5 animate-fadeIn"
                role="status"
                aria-live="polite"
              >
                <Info className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                <div className="leading-snug">{notice}</div>
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-bold text-foreground mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex w-full rounded-lg border border-input/80 bg-card/70 px-3 py-2 shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-1 focus-visible:border-primary/40 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 h-12 text-base"
                placeholder="Enter Username"
                required
                autoFocus
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-foreground mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex w-full rounded-lg border border-input/80 bg-card/70 px-3 py-2 shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-1 focus-visible:border-primary/40 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 h-12 text-base"
                placeholder="Enter Password"
                required
                disabled={isSubmitting}
              />
            </div>

            <button
              className="inline-flex items-center justify-center whitespace-nowrap font-semibold ring-offset-background duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md rounded-md px-8 w-full h-12 text-base shadow-lg hover:-translate-y-0.5 transition-transform"
              type="submit"
              disabled={isSubmitting}
            >
              <LogIn className="w-5 h-5 mr-2" />
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground font-medium">
              Need help? Contact your administrator
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-semibold focus:outline-none focus:underline"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
