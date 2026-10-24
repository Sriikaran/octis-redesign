import {
  ShoppingCart,
  Package,
  TrendingUp,
  Users,
  Truck,
  BarChart3,
  ScanLine,
  Scale,
  CircleDollarSign,
  Layers,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function Features() {
  const businessFlowStages = [
    { name: "Metal", isAi: false },
    { name: "Inventory", isAi: false },
    { name: "Vendors", isAi: false },
    { name: "Purchase", isAi: false },
    { name: "Karigars", isAi: false },
    { name: "Pricing", isAi: false },
    { name: "Billing", isAi: false },
    { name: "Customers", isAi: false },
    { name: "Money", isAi: false },
    { name: "Accounting", isAi: false },
    { name: "Business Intelligence", isAi: false },
    { name: "AI", isAi: true },
    { name: "Digital Commerce", isAi: false },
  ];

  const features = [
    {
      icon: ShoppingCart,
      title: "Lightning Fast POS",
      description:
        "Bill a customer in under 90 seconds. Seamlessly handle old gold exchange, multiple payment splits, and scheme redemptions in one clean interface.",
    },
    {
      icon: Package,
      title: "Intelligent Inventory",
      description:
        "Track every piece with precision. Full support for HUID, 10 distinct stone categories, and real-time stock alerts for low inventory.",
    },
    {
      icon: TrendingUp,
      title: "Live Metal Rate Sync",
      description:
        "Update today's rates once, and watch your entire inventory pricing automatically recalculate instantly.",
    },
    {
      icon: Users,
      title: "Customer Loyalty CRM",
      description:
        "Build relationships that last. Track purchase histories, auto-send birthday wishes, and manage complex monthly installment schemes.",
    },
    {
      icon: Truck,
      title: "Karigar Management",
      description:
        "Never lose track of job work. Issue raw gold, receive finished goods, and settle accounts with your vendors accurately.",
    },
    {
      icon: BarChart3,
      title: "Deep Analytics",
      description:
        "Stop guessing. Get visual dashboards for daily sales, profit margins, staff performance, and tax liabilities at a glance.",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 landing-surface-tinted relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ======================================================== */}
        {/* SUBSECTION 1: CONNECTED BUSINESS FLOW                     */}
        {/* ======================================================== */}
        <div className="mb-20 sm:mb-24">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <p className="landing-section-label mb-2.5">Connected Ecosystem</p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 text-foreground">
              The Operating System for Modern Jewellery Businesses
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              One connected platform to run operations, understand performance and make smarter business decisions.
            </p>
          </div>

          {/* Flow Container */}
          <div className="glass-card p-6 sm:p-8 lg:p-10 border border-gold-300/40 shadow-xl shadow-gold-500/5 rounded-2xl bg-white/95">
            {/* Desktop: 2 Intentional Balanced Connected Rows */}
            <div className="hidden lg:flex flex-col gap-3.5 items-center" aria-label="Connected Jewellery Business Flow">
              {/* Row 1: Operations to Billing (01 to 07) */}
              <div className="flex items-center justify-center gap-2">
                {businessFlowStages.slice(0, 7).map((stage, idx) => (
                  <div key={idx} className="flex items-center">
                    <div
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                        stage.isAi
                          ? "bg-gradient-to-r from-gold-500 to-[#9a7209] text-white shadow-md ring-2 ring-gold-400/50"
                          : "bg-[#FAF8F4] border border-gold-200/80 text-[#1a2f4a] hover:border-gold-400/80 hover:bg-white"
                      }`}
                    >
                      <span className="text-[11px] opacity-60 font-mono">
                        {(idx + 1).toString().padStart(2, "0")}
                      </span>
                      <span>{stage.name}</span>
                    </div>
                    {idx < 6 && (
                      <ChevronRight className="w-3.5 h-3.5 text-gold-500 mx-1 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              {/* Row 2: Customers, Accounts & Intelligence (08 to 13) */}
              <div className="flex items-center justify-center gap-2">
                {businessFlowStages.slice(7).map((stage, idx) => {
                  const actualIdx = idx + 7;
                  return (
                    <div key={actualIdx} className="flex items-center">
                      <div
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                          stage.isAi
                            ? "bg-gradient-to-r from-gold-500 to-[#9a7209] text-white shadow-md shadow-gold-500/25 ring-2 ring-gold-400/50 font-bold"
                            : "bg-[#FAF8F4] border border-gold-200/80 text-[#1a2f4a] hover:border-gold-400/80 hover:bg-white"
                        }`}
                      >
                        <span className={`text-[11px] font-mono ${stage.isAi ? "text-gold-200" : "opacity-60"}`}>
                          {(actualIdx + 1).toString().padStart(2, "0")}
                        </span>
                        <span>{stage.name}</span>
                        {stage.isAi && <Sparkles className="w-3.5 h-3.5 text-gold-200" />}
                      </div>
                      {idx < businessFlowStages.slice(7).length - 1 && (
                        <ChevronRight className="w-3.5 h-3.5 text-gold-500 mx-1 flex-shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tablet & Mobile: Deliberate Numbered Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:hidden gap-2 sm:gap-2.5">
              {businessFlowStages.map((stage, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold border ${
                    stage.isAi
                      ? "bg-gradient-to-r from-gold-500 to-[#9a7209] text-white border-gold-400 shadow-sm"
                      : "bg-[#FAF8F4] border-gold-200/80 text-[#1a2f4a]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono ${stage.isAi ? "text-gold-200" : "text-gold-700"}`}>
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="truncate">{stage.name}</span>
                  </div>
                  {stage.isAi && <Sparkles className="w-3.5 h-3.5 text-gold-200 flex-shrink-0" />}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-border/40 flex flex-wrap items-center justify-between text-xs text-muted-foreground gap-3">
              <span className="font-semibold text-foreground">End-to-End Operational Lifecycle</span>
              <span className="flex items-center gap-1.5 text-primary font-semibold">
                <span>13 Connected Stages</span>
                <span className="text-muted-foreground font-normal">
                  • One Unified Jewellery Workflow
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SUBSECTION 2: CORE DIFFERENTIATORS                        */}
        {/* ======================================================== */}
        <div className="mb-20 sm:mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <p className="landing-section-label mb-2.5">Platform Differentiators</p>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 text-foreground">
              What Makes Octis Truly Different
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Moving beyond generic showroom software with end-to-end traceability, vendor visibility, article profitability, and unified accounting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Card 1: Complete Traceability */}
            <div className="landing-feature-card p-6 sm:p-8 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl icon-gradient-gold flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <ScanLine className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-gold-100 text-[#9a7209] border border-gold-300/40">
                    Traceability Matrix
                  </span>
                </div>
                <h4 className="font-display text-xl sm:text-2xl font-bold text-[#1a2f4a] mb-1">
                  Complete Traceability
                </h4>
                <p className="text-sm sm:text-base font-semibold text-primary mb-3">
                  Track Every Gram. Every Item. Every Movement.
                </p>
                <p className="text-sm text-brown-500 leading-relaxed mb-6">
                  Follow the complete journey of stock and metal across every production and sales milestone.
                </p>

                {/* Step Flow Stepper */}
                <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-gold-200/70">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
                    Traceability Matrix Journey
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 sm:gap-2">
                    {[
                      "Purchase",
                      "Inward",
                      "Karigar",
                      "Finished Jewellery",
                      "Tag",
                      "Stock",
                      "Sale",
                    ].map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex flex-col items-center justify-center py-2 px-1.5 rounded-lg bg-white border border-gold-200/80 text-center shadow-xs"
                      >
                        <span className="text-[10px] font-mono font-bold text-gold-700">0{sIdx + 1}</span>
                        <span className="text-xs font-semibold text-[#1a2f4a] mt-0.5 leading-snug">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Vendor Intelligence */}
            <div className="landing-feature-card p-6 sm:p-8 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl icon-gradient-gold flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <Scale className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-gold-100 text-[#9a7209] border border-gold-300/40">
                    Vendor Visibility
                  </span>
                </div>
                <h4 className="font-display text-xl sm:text-2xl font-bold text-[#1a2f4a] mb-1">
                  Vendor Intelligence
                </h4>
                <p className="text-sm sm:text-base font-semibold text-primary mb-3">
                  Know Which Vendor Actually Works for Your Business.
                </p>
                <p className="text-sm text-brown-500 leading-relaxed mb-5">
                  Empower your showroom purchasing with objective vendor metrics rather than guesswork or historical habit.
                </p>

                {/* 6 Documented Bullet Points from website.docx */}
                <ul className="space-y-2 text-xs sm:text-sm text-foreground/90">
                  {[
                    "Compare the same article across vendors",
                    "View previous purchase prices and purchase history",
                    "Compare making charges and wastage",
                    "Track vendor sales and margins",
                    "Track outstanding, gold balance and vendor capital",
                    "Understand which vendor stock is selling and which is still sitting",
                  ].map((item, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card 3: Article Profitability */}
            <div className="landing-feature-card p-6 sm:p-8 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl icon-gradient-gold flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <CircleDollarSign className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-gold-100 text-[#9a7209] border border-gold-300/40">
                    Unit Margin
                  </span>
                </div>
                <h4 className="font-display text-xl sm:text-2xl font-bold text-[#1a2f4a] mb-1">
                  Article Profitability
                </h4>
                <p className="text-sm sm:text-base font-semibold text-primary mb-3">
                  Know What Each Article Actually Makes You.
                </p>
                <p className="text-sm text-brown-500 leading-relaxed mb-6">
                  Gain transparent margin visibility on every article by tracking each cost element from raw procurement to final sale.
                </p>

                {/* Article Cost Breakdown */}
                <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-gold-200/70">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
                    True Margin Calculation Flow
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2">
                    {[
                      "Purchase Cost",
                      "Making",
                      "Wastage",
                      "Stones",
                      "Selling Price",
                      "Margin",
                    ].map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className={`flex flex-col items-center justify-center py-2 px-1.5 rounded-lg border text-center shadow-xs ${
                          step === "Margin"
                            ? "bg-primary text-white border-primary"
                            : "bg-white border-gold-200/80 text-[#1a2f4a]"
                        }`}
                      >
                        <span
                          className={`text-[10px] font-mono font-bold ${
                            step === "Margin" ? "text-gold-100" : "text-gold-700"
                          }`}
                        >
                          0{sIdx + 1}
                        </span>
                        <span
                          className={`text-xs font-semibold mt-0.5 leading-snug ${
                            step === "Margin" ? "text-white" : "text-[#1a2f4a]"
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Tally + Jewellery, One System */}
            <div className="landing-feature-card p-6 sm:p-8 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl icon-gradient-gold flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <Layers className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-gold-100 text-[#9a7209] border border-gold-300/40">
                    One System
                  </span>
                </div>
                <h4 className="font-display text-xl sm:text-2xl font-bold text-[#1a2f4a] mb-1">
                  Tally + Jewellery, One System
                </h4>
                <p className="text-sm sm:text-base font-semibold text-primary mb-3">
                  Unified Accounts & Complete Jewellery Operations
                </p>
                <p className="text-sm text-brown-500 leading-relaxed mb-6">
                  Bring accounts, ledgers and complete jewellery operations together in one system instead of managing separate software for accounting and jewellery operations.
                </p>

                {/* Approved core highlight */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-gold-50/60 to-white border border-gold-200/80">
                  <p className="text-xs font-semibold text-[#1a2f4a] mb-1">
                    Integrated Business Management
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Manage accounts, ledgers, and day-to-day jewellery showroom workflows together in a single system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SUBSECTION 3: CORE SHOWROOM CAPABILITIES (PRESERVED)      */}
        {/* ======================================================== */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <p className="landing-section-label mb-2.5">Showroom Essentials</p>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-foreground">
              Everything you need to run a modern jewellery retail business
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              We&apos;ve replaced clunky legacy software with a beautiful, intuitive system that your staff will learn in minutes, not months.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <div key={idx} className="landing-feature-card group p-7 lg:p-8">
                  <div className="w-12 h-12 rounded-xl icon-gradient-gold flex items-center justify-center mb-5 group-hover:scale-105 transition-transform text-white">
                    <IconComponent className="w-[22px] h-[22px]" strokeWidth={2.25} />
                  </div>
                  <h4 className="font-semibold text-lg text-foreground mb-2.5">
                    {feature.title}
                  </h4>
                  <p className="text-brown-500 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

