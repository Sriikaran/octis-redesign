import {
  Sparkles,
  Clock,
  Compass,
  AlertCircle,
  TrendingUp,
  Lightbulb,
  Boxes,
  Coins,
  Scale,
  Users,
  ShoppingBag,
} from "lucide-react";

export default function AIIntelligence() {
  const pillars = [
    {
      num: "01",
      title: "WHAT HAPPENED",
      description: "Sales, stock, customers, vendors and margins.",
      icon: Clock,
      badge: "Level 1",
    },
    {
      num: "02",
      title: "WHY IT HAPPENED",
      description: "Analyse business trends, dead stock, profitability and performance.",
      icon: Compass,
      badge: "Level 2",
    },
    {
      num: "03",
      title: "WHAT NEEDS ATTENTION",
      description:
        "Identify unusual patterns, slow-moving inventory, margin leakage and customer opportunities.",
      icon: AlertCircle,
      badge: "Level 3",
    },
    {
      num: "04",
      title: "WHAT COULD HAPPEN NEXT",
      description:
        "Use predictive intelligence to support future sales and purchasing decisions.",
      icon: TrendingUp,
      badge: "Level 4",
    },
    {
      num: "05",
      title: "WHAT YOU SHOULD DO NEXT",
      description:
        "Use AI-powered insights, alerts and recommendations to support better business decisions.",
      icon: Lightbulb,
      badge: "Level 5",
    },
  ];

  const examples = [
    {
      domain: "Stock",
      title: "Stock Intelligence",
      question: "What is selling? What is becoming dead stock? Where is capital stuck?",
      icon: Boxes,
    },
    {
      domain: "Profit",
      title: "Profit Intelligence",
      question: "Which articles have better margins? Where is margin leaking?",
      icon: Coins,
    },
    {
      domain: "Vendors",
      title: "Vendor Intelligence",
      question: "Which vendor gives better prices? Which vendor’s stock is sitting?",
      icon: Scale,
    },
    {
      domain: "Customers",
      title: "Customer Intelligence",
      question: "Which customers should your team follow up with?",
      icon: Users,
    },
    {
      domain: "Purchasing",
      title: "Purchasing Intelligence",
      question: "What should you consider buying?",
      icon: ShoppingBag,
    },
  ];

  return (
    <section id="intelligence" className="py-20 md:py-28 landing-surface relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <p className="landing-section-label mb-2.5">Jewellery Intelligence</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-bold tracking-tight mb-4 text-foreground">
            From Jewellery Software to Jewellery Intelligence
          </h2>
        </div>

        {/* Contrast Banner: Traditional vs Octis */}
        <div className="mb-16 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden border border-gold-300/60 shadow-lg shadow-gold-500/5">
            {/* Traditional Software */}
            <div className="p-6 sm:p-8 bg-muted/40 border-b md:border-b-0 md:border-r border-border/70 flex flex-col justify-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/60" />
                Traditional Software
              </span>
              <p className="text-base sm:text-lg font-medium text-muted-foreground">
                Traditional jewellery software tells you what happened.
              </p>
            </div>

            {/* Octis Intelligence */}
            <div className="p-6 sm:p-8 bg-gradient-to-br from-gold-500/10 via-white to-gold-500/5 flex flex-col justify-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Octis Jewellery Intelligence
              </span>
              <p className="text-base sm:text-lg font-semibold text-[#1a2f4a] leading-relaxed">
                Octis helps you understand what happened, why it happened, what needs attention, what could happen next and what you should consider doing.
              </p>
            </div>
          </div>
        </div>

        {/* The Five Intelligence Pillars */}
        <div className="mb-20 sm:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="landing-section-label mb-2">The Intelligence Journey</p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Five Levels of Business Understanding
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3.5">
            {pillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="landing-feature-card p-5 sm:p-6 flex flex-col justify-between relative group hover:border-gold-400"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-surface-tinted border border-gold-200 text-primary">
                        {pillar.num}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {pillar.badge}
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-lg icon-gradient-gold flex items-center justify-center text-white mb-3 group-hover:scale-105 transition-transform">
                      <IconComp className="w-5 h-5" strokeWidth={2} />
                    </div>

                    <h4 className="font-display text-sm sm:text-base font-bold text-[#1a2f4a] mb-2 tracking-tight">
                      {pillar.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-brown-500 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Five Concrete Jewellery AI Examples */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="landing-section-label mb-2">Practical Applications</p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Examples of AI-Powered Intelligence
            </h3>
            <p className="text-sm text-muted-foreground">
              Practical jewellery-business use cases answered with actionable intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {examples.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="landing-feature-card p-6 flex flex-col justify-between group hover:border-gold-400"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-surface-tinted border border-gold-200/80 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <IconComp className="w-5 h-5" strokeWidth={2} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                          {item.domain}
                        </span>
                        <h4 className="font-display text-lg font-bold text-[#1a2f4a]">
                          {item.title}
                        </h4>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-gold-200/60">
                      <p className="text-sm font-medium text-foreground leading-relaxed">
                        “{item.question}”
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
