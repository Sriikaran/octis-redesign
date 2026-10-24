import { CheckCircle2, MinusCircle, Sparkles, SlidersHorizontal, ArrowRight } from "lucide-react";

interface PlanFeature {
  text: string;
  included: boolean;
  isHighlight?: boolean;
  isClarification?: boolean;
}

interface Plan {
  name: string;
  concept: string;
  progressionTag: string;
  tagline: string;
  audience: string;
  featured: boolean;
  badge?: string;
  featuredBadge?: string;
  features: PlanFeature[];
  summaryNote: {
    title: string;
    flow: string;
  } | null;
  buttonStyle: string;
}

export default function Pricing() {
  const plans: Plan[] = [
    {
      name: "Starter",
      concept: "RUN",
      progressionTag: "Starter → Run",
      tagline: "Run your everyday operations.",
      audience: "For single-branch showrooms getting started with digital billing.",
      featured: false,
      features: [
        { text: "POS & billing", included: true },
        { text: "Inventory tagging", included: true },
        { text: "GST invoices", included: true },
        { text: "Basic reports", included: true },
        { text: "Email support", included: true },
        { text: "No AI Business Intelligence", included: false, isClarification: true },
      ],
      summaryNote: {
        title: "Starter Focus:",
        flow: "Showroom POS, inventory tagging, GST invoices, and daily reconciliation.",
      },
      buttonStyle:
        "border border-input bg-card hover:bg-accent hover:text-accent-foreground shadow-sm text-foreground",
    },
    {
      name: "Professional",
      concept: "UNDERSTAND",
      progressionTag: "Professional → Understand",
      tagline: "Use Business Intelligence + AI to understand your business.",
      badge: "AI Starts Here",
      featuredBadge: "Most Popular",
      audience:
        "For growing jewellery businesses that want deeper business visibility and AI-powered intelligence.",
      featured: true,
      features: [
        { text: "Everything in Starter", included: true, isHighlight: true },
        { text: "AI Business Insights", included: true },
        { text: "AI Stock & Dead Stock Analysis", included: true },
        { text: "AI Profit & Margin Insights", included: true },
        { text: "AI Vendor Intelligence", included: true },
        { text: "AI Alerts & Recommendations", included: true },
        { text: "100+ Business Reports", included: true },
        { text: "Karigar Management", included: true },
        { text: "Gold / Silver Schemes & CRM", included: true },
        { text: "Digital Catalogue", included: true },
        { text: "Configurable Business Rules", included: true },
        { text: "Priority Support", included: true },
      ],
      summaryNote: {
        title: "Professional helps you understand:",
        flow: "What is happening → Why it is happening → What needs attention → What action to consider",
      },
      buttonStyle:
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
    },
    {
      name: "Enterprise",
      concept: "PREDICT • OPTIMISE • SCALE",
      progressionTag: "Enterprise → Predict • Optimise • Scale",
      tagline: "Use advanced AI, customisation and centralised control to scale.",
      badge: "Scale & Control",
      audience:
        "For jewellery chains, multi-branch businesses and organisations requiring advanced intelligence, centralised control and business-specific customisation.",
      featured: false,
      features: [
        { text: "Everything in Professional", included: true, isHighlight: true },
        { text: "AI Catalogue Image Generation", included: true },
        { text: "Predictive Sales Insights", included: true },
        { text: "AI Purchase Recommendations", included: true },
        { text: "Advanced AI-Powered Business Alerts", included: true },
        { text: "Multi-Branch Management", included: true },
        { text: "Custom Roles & Permissions", included: true },
        { text: "Custom Workflows", included: true },
        { text: "Business-Specific Customisation", included: true },
        { text: "Advanced Business Intelligence", included: true },
        { text: "Centralised Management & Reporting", included: true },
        { text: "Dedicated Onboarding & Support", included: true },
        { text: "SLA-backed Support", included: true },
      ],
      summaryNote: {
        title: "Enterprise Formula:",
        flow: "Advanced AI + Multi-Branch + Customisation + Centralised Control",
      },
      buttonStyle:
        "border border-input bg-card hover:bg-accent hover:text-accent-foreground shadow-sm text-foreground",
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 landing-surface-tinted scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <p className="landing-section-label mb-3">Pricing & Plans</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-5 text-foreground">
            Plans that scale with your showroom
          </h2>
          <p className="text-lg sm:text-xl font-medium text-foreground/90 mb-2">
            Start with Daily Operations. Unlock AI Intelligence. Scale with Advanced AI and Customisation.
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
            Flexible pricing for Indian jewellery retailers. Contact us for a quote tailored to your branch count and team size.
          </p>

          {/* Value Progression Bar */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-white/90 border border-gold-300/40 shadow-xs text-xs">
            <span className="px-3 py-1 rounded-full bg-muted font-bold text-foreground">
              RUN
            </span>
            <span className="text-gold-600 font-bold">→</span>
            <span className="px-3 py-1 rounded-full bg-gold-100 font-bold text-[#9a7209]">
              UNDERSTAND
            </span>
            <span className="text-gold-600 font-bold">→</span>
            <span className="px-3 py-1 rounded-full bg-[#1a2f4a] font-bold text-cream-100 text-white">
              PREDICT • OPTIMISE • SCALE
            </span>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-7 sm:p-8 flex flex-col transition-all duration-300 ${
                plan.featured
                  ? "landing-pricing-featured scale-[1.02] shadow-xl z-10"
                  : "landing-feature-card bg-white"
              }`}
            >
              {/* Card Top Pill/Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-muted/80 text-foreground border border-border">
                  Tier: {plan.concept}
                </span>
                {plan.featured && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gold-500 text-white shadow-xs">
                    <Sparkles className="w-3 h-3" />
                    {plan.featuredBadge}
                  </span>
                )}
              </div>

              {/* Plan Name & Tagline */}
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-1">
                {plan.name}
              </h3>
              <p className="text-xs font-semibold text-gold-700 uppercase tracking-wide mb-3">
                {plan.tagline}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-6 min-h-[36px]">
                {plan.audience}
              </p>

              {/* Price */}
              <div className="pb-6 mb-6 border-b border-border/60">
                <p className="text-3xl font-bold text-foreground tabular-nums">
                  Custom
                  <span className="text-sm font-normal text-muted-foreground"> / month</span>
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Tailored to your counter & branch requirements
                </p>
              </div>

              {/* Features List */}
              <div className="flex-grow">
                <p className="text-xs font-bold uppercase tracking-wider text-foreground/80 mb-3">
                  {plan.name === "Starter" ? "Included Features:" : `${plan.name} Plan Includes:`}
                </p>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      {feat.isClarification ? (
                        <MinusCircle
                          className="w-4 h-4 text-muted-foreground/50 mt-0.5 flex-shrink-0"
                          strokeWidth={2}
                        />
                      ) : (
                        <CheckCircle2
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            feat.isHighlight ? "text-gold-700 font-bold" : "text-gold-600"
                          }`}
                          strokeWidth={2}
                        />
                      )}
                      <span
                        className={
                          feat.isClarification
                            ? "text-muted-foreground italic font-normal"
                            : feat.isHighlight
                            ? "font-semibold text-foreground"
                            : "text-foreground/90"
                        }
                      >
                        {feat.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcome Summary Callout */}
              {plan.summaryNote && (
                <div
                  className={`mt-auto mb-6 p-3.5 rounded-xl text-xs border min-h-[72px] flex flex-col justify-center ${
                    plan.featured
                      ? "bg-white/95 border-gold-300 text-espresso-950 shadow-xs"
                      : "bg-[#FAF8F4] border-gold-200/80 text-foreground"
                  }`}
                >
                  <p className="font-bold mb-1 text-[11px] uppercase tracking-wider text-gold-800">
                    {plan.summaryNote.title}
                  </p>
                  <p className="leading-relaxed font-medium text-muted-foreground text-[11px]">
                    {plan.summaryNote.flow}
                  </p>
                </div>
              )}

              {/* Action Button */}
              <a
                href="#cta"
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] h-12 px-4 py-2 w-full ${plan.buttonStyle}`}
              >
                Contact for pricing
              </a>
            </div>
          ))}
        </div>

        {/* Dedicated Enterprise Customisation Callout */}
        <div className="mt-12 rounded-2xl p-7 sm:p-9 bg-white border border-gold-300/50 shadow-md landing-feature-card">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 text-[#9a7209] text-xs font-bold uppercase tracking-wider mb-3 border border-gold-300/40">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Tailored Architecture
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Enterprise: Built Around Your Business
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                Every jewellery business operates differently. Enterprise is designed to be customised around your business requirements, workflows, roles, approvals, reporting and operational processes.
              </p>
              <div className="p-3.5 rounded-xl bg-gold-50/60 border border-gold-200/80">
                <p className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">
                  Configure Octis around your existing business processes — including workflows, roles, permissions, approvals, reports and operational requirements.
                </p>
              </div>
            </div>
            <div className="flex-shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href="#cta"
                className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold bg-[#1a2f4a] text-white hover:bg-[#15253b] px-6 py-3.5 shadow-sm transition-all duration-200 text-center"
              >
                Discuss Enterprise Setup
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-[11px] text-center text-muted-foreground">
                Dedicated onboarding & custom workflow configuration
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
