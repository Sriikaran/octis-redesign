import Link from "next/link";
import { CheckCircle2, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden landing-hero-bg min-h-[calc(100vh-72px)] flex items-center">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(107,58,42,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(107,58,42,.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Copy Column */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Category Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gold-300/60 shadow-md shadow-gold-500/10 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-bold tracking-wider text-primary uppercase">
                AI-Powered Jewellery ERP
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1a2f4a] leading-[1.14] mb-3 tracking-tight">
              Every Gram. Every Item. Every Rupee.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-gold-600 to-[#9a7209]">
                Every Decision — Connected.
              </span>
            </h1>

            {/* Business Positioning */}
            <p className="text-base sm:text-lg font-semibold text-[#1a2f4a]/90 mb-1.5">
              The Business Operating System for Modern Jewellery Businesses
            </p>

            {/* Secondary Positioning Lead */}
            <p className="text-sm sm:text-base font-medium text-primary mb-3.5">
              Run Your Entire Jewellery Business from One Powerful Ecosystem Platform.
            </p>

            {/* Supporting Copy & SEO */}
            <p className="text-sm sm:text-base text-brown-500 leading-relaxed mb-6 max-w-xl">
              <strong className="font-semibold text-foreground">From recording transactions to understanding your business.</strong>{" "}
              Octis connects jewellery billing, inventory, metal, vendors, karigars, customers, pricing, accounting and business intelligence in one secure cloud platform — built specifically for Indian jewellery retailers.
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/login"
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] border hover:text-accent-foreground shadow-sm rounded-md glass-card bg-card/80 hover:bg-card h-12 px-8 border-border/60"
              >
                Sign In
              </Link>
              <a
                href="#cta"
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md rounded-md h-12 px-8 shadow-lg shadow-primary/25 hover:shadow-primary/40"
              >
                Request Demo
              </a>
            </div>

            {/* Trust & Compliance Badges */}
            <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>BIS Hallmarking Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>GST Auto-Calculation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>AI Jewellery Software Built for India</span>
              </div>
            </div>
          </div>

          {/* Right Graphic Column: Product Mockup & Floating Card */}
          <div className="relative flex items-center justify-center">
            <div className="landing-mockup-glow" />
            <div className="relative w-full max-w-xl mx-auto z-10 landing-mockup-frame">
              <img
                src="/hero-product.png"
                alt="Octis Dashboard"
                className="relative z-10 w-full rounded-xl"
                decoding="async"
              />

              {/* Floating Live Simulation Card */}
              <div className="absolute -bottom-5 -left-5 glass-card p-3 z-20 animate-float flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg icon-gradient-gold flex items-center justify-center text-white">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wide">
                      Today&apos;s Sales
                    </p>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/15 text-primary font-semibold">
                      DEMO
                    </span>
                  </div>
                  <p className="text-lg font-bold text-foreground tabular-nums">₹4,85,200</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

