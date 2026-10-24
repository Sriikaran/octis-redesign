import {
  Gem,
  Network,
  Route,
  Building2,
  CircleDollarSign,
  Sparkles,
  TrendingUp,
  SlidersHorizontal,
} from "lucide-react";

export default function WhyOctis() {
  const pillars = [
    {
      num: "01",
      title: "Built for Jewellery",
      corePhrase: "Designed around jewellery-specific business requirements.",
      description:
        "Engineered specifically for the operational reality of jewellery showrooms — coordinating metals, inventory, karigars, pricing, billing, and customer relationships in one native workflow.",
      icon: Gem,
    },
    {
      num: "02",
      title: "One Connected Platform",
      corePhrase: "Bring operations, accounting, inventory and business intelligence together.",
      description:
        "Connects showroom billing, inventory, metal accounts, vendors, karigars, customer ledgers, pricing, accounting, and business intelligence in one unified platform.",
      icon: Network,
    },
    {
      num: "03",
      title: "Complete Traceability",
      corePhrase: "Follow every article and every gram through its business journey.",
      subtext: "Track Every Gram. Every Item. Every Movement.",
      flow: [
        "Purchase",
        "Inward",
        "Karigar",
        "Finished Jewellery",
        "Tag",
        "Stock",
        "Sale",
      ],
      description:
        "Follow the complete physical and financial journey of stock and metal with total accountability from inward to point of sale.",
      icon: Route,
    },
    {
      num: "04",
      title: "Vendor Intelligence",
      corePhrase: "Compare vendors, prices, articles, margins and stock performance.",
      description:
        "Assess supplier performance by comparing purchase prices, auditing making charges and wastage, and tracking which vendor stock is selling versus sitting.",
      icon: Building2,
    },
    {
      num: "05",
      title: "Article Profitability",
      corePhrase: "Understand the true margin on every article.",
      flow: [
        "Purchase Cost",
        "Making",
        "Wastage",
        "Stones",
        "Selling Price",
        "Margin",
      ],
      description:
        "Gain precise visibility into true article-level margins across varied making charges, wastage formulas, and stone valuations.",
      icon: CircleDollarSign,
    },
    {
      num: "06",
      title: "AI-Powered Decisions",
      corePhrase: "Move beyond reporting with intelligent insights, alerts and recommendations.",
      description:
        "Helps you understand what happened, why it happened, what needs attention, what could happen next, and what actions to consider taking.",
      icon: Sparkles,
    },
    {
      num: "07",
      title: "Designed to Scale",
      corePhrase: "Start with one showroom and move towards multi-branch.",
      progression: "Starter (Run) → Professional (Understand) → Enterprise (Scale)",
      description:
        "Begin with everyday showroom operations, unlock deeper business intelligence, and scale seamlessly into multi-branch oversight and central control.",
      icon: TrendingUp,
    },
    {
      num: "08",
      title: "Business-Specific Customisation",
      corePhrase: "Enterprise can be configured around business workflows and requirements.",
      description:
        "Configure Octis around your established business processes — including tailored workflows, custom roles, permissions, approval hierarchies, and reporting.",
      icon: SlidersHorizontal,
    },
  ];

  return (
    <section id="why-octis" className="py-20 md:py-28 landing-surface relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <p className="landing-section-label mb-3">Core Value Proposition</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4 sm:mb-5 text-foreground">
            Why Octis
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
            Eight foundational pillars connecting daily showroom operations, metal traceability,
            business intelligence, and AI decision support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {pillars.map((pillar) => {
            const IconComp = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="landing-feature-card p-6 flex flex-col justify-between hover:border-gold-400/80 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-surface-tinted border border-gold-200 text-primary">
                      {pillar.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg icon-gradient-gold flex items-center justify-center text-white">
                      <IconComp className="w-4 h-4" strokeWidth={2} />
                    </div>
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-bold text-[#1a2f4a] mb-2 tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="text-xs font-semibold text-gold-700 mb-2.5 leading-snug">
                    {pillar.corePhrase}
                  </p>

                  <p className="text-xs sm:text-sm text-brown-600 leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                </div>

                {/* Optional journey, formula, or subtext footer */}
                <div className="pt-3 border-t border-gold-200/40">
                  {pillar.flow && (
                    <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
                      {pillar.flow.map((step, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1">
                          <span className="px-1.5 py-0.5 rounded bg-gold-50/80 border border-gold-200/60 text-[#1a2f4a] font-medium whitespace-nowrap">
                            {step}
                          </span>
                          {idx < pillar.flow!.length - 1 && (
                            <span className="text-gold-400 font-bold select-none">→</span>
                          )}
                        </span>
                      ))}
                    </div>
                  )}

                  {pillar.progression && (
                    <div className="text-[10px] font-mono font-medium text-gold-800 bg-gold-50/80 px-2 py-1 rounded border border-gold-200/60 text-center">
                      {pillar.progression}
                    </div>
                  )}

                  {!pillar.flow && !pillar.progression && (
                    <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                      <span>Native Jewellery Architecture</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
