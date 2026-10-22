import { CheckCircle2 } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      audience: "For single-branch showrooms getting started with digital billing.",
      featured: false,
      features: [
        "POS & billing",
        "Inventory tagging",
        "GST invoices",
        "Basic reports",
        "Email support",
      ],
      buttonStyle:
        "border border-input bg-card/80 hover:bg-accent hover:text-accent-foreground shadow-sm text-foreground",
    },
    {
      name: "Professional",
      badge: "Most Popular",
      audience: "For growing jewellers who need compliance, schemes, and multi-user access.",
      featured: true,
      features: [
        "Everything in Starter",
        "HUID & BIS compliance",
        "Gold schemes & CRM",
        "Karigar management",
        "Priority support",
      ],
      buttonStyle:
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
    },
    {
      name: "Enterprise",
      audience: "For multi-branch chains with advanced controls and custom workflows.",
      featured: false,
      features: [
        "Everything in Professional",
        "Multi-branch sync",
        "Custom roles & permissions",
        "Dedicated onboarding",
        "SLA-backed support",
      ],
      buttonStyle:
        "border border-input bg-card/80 hover:bg-accent hover:text-accent-foreground shadow-sm text-foreground",
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 landing-surface-tinted scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <p className="landing-section-label mb-3">Pricing</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4 sm:mb-5 text-foreground">
            Plans that scale with your showroom
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
            Flexible pricing for Indian jewellery retailers. Contact us for a quote tailored to
            your branch count and team size.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 flex flex-col transition-all duration-500 ${
                plan.featured
                  ? "landing-pricing-featured scale-[1.02] z-10"
                  : "landing-feature-card"
              }`}
            >
              {plan.featured && (
                <span className="text-xs font-bold uppercase tracking-wider text-gold-600 mb-4">
                  {plan.badge}
                </span>
              )}
              <h4 className="font-display font-bold text-2xl text-foreground mb-2">
                {plan.name}
              </h4>
              <p className="text-brown-500 text-sm mb-6 flex-grow">{plan.audience}</p>
              <p className="text-3xl font-bold text-foreground mb-6 tabular-nums">
                Custom
                <span className="text-base font-normal text-brown-400"> / month</span>
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2 text-sm text-brown-600">
                    <CheckCircle2
                      className="w-4 h-4 text-gold-600 mt-0.5 flex-shrink-0"
                      strokeWidth={2}
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] h-10 px-4 py-2 w-full ${plan.buttonStyle}`}
              >
                Contact for pricing
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
