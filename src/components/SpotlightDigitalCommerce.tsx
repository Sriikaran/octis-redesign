import { Globe, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export default function SpotlightDigitalCommerce() {
  const capabilities = [
    {
      title: "From Live ERP to Online Catalogue",
      description:
        "Turn your live ERP inventory into a customer-facing digital catalogue and website without duplicate stock entry.",
      tierBadge: "Professional & Enterprise",
    },
    {
      title: "Connected Customer Product Discovery",
      description:
        "Connect internal showroom operations with how customers discover, filter, and view articles by purity, weight, and style.",
      tierBadge: "Professional & Enterprise",
    },
    {
      title: "AI Catalogue Image Generation",
      description:
        "Create professional, catalogue-ready jewellery imagery using AI-powered image generation tools to present articles at their best.",
      tierBadge: "Enterprise Tier",
      isAi: true,
    },
  ];

  return (
    <div id="digital-commerce" className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center scroll-mt-24">
      {/* Left Column: Narrative and Capabilities */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="landing-icon-ring landing-icon-ring--light">
            <Globe className="w-[22px] h-[22px] text-gold-300" strokeWidth={2.25} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold-300/90 px-2.5 py-1 rounded bg-gold-500/15 border border-gold-400/30">
            Digital Commerce
          </span>
        </div>

        <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-5 tracking-tight">
          From Your Jewellery ERP to Your Customer-Facing Catalogue
        </h3>

        <p className="text-base sm:text-lg text-cream-200/85 mb-8 leading-relaxed">
          Turn your live ERP inventory into a customer-facing digital catalogue and website without duplicate stock entry. Connect showroom operations with how customers discover, filter, and view jewellery articles.
        </p>

        <div className="space-y-4 mb-8">
          {capabilities.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                item.isAi
                  ? "bg-gradient-to-r from-gold-950/40 to-[#1a2f4a]/60 border-gold-400/50 shadow-md"
                  : "bg-white/[0.04] border-white/10 hover:border-gold-400/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                    item.isAi
                      ? "bg-gold-500/30 ring-1 ring-gold-300 text-gold-300"
                      : "bg-gold-500/20 ring-1 ring-gold-400/40 text-gold-300"
                  }`}
                >
                  {item.isAi ? (
                    <Sparkles className="w-3.5 h-3.5" strokeWidth={2.2} />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.2} />
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h4 className="text-cream-100 font-semibold text-sm sm:text-base">
                      {item.title}
                    </h4>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        item.isAi
                          ? "bg-gold-400/20 text-gold-200 border border-gold-400/40"
                          : "bg-white/10 text-cream-200/90 border border-white/10"
                      }`}
                    >
                      {item.tierBadge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-cream-200/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex items-center gap-4">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gold-300 hover:text-gold-200 transition-colors uppercase tracking-wider"
          >
            <span>Compare Digital Commerce in Pricing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Right Column: Visual Operational Pipeline Card (Crisp, High-Contrast Surface) */}
      <div className="relative">
        <div className="landing-mockup-glow" />
        <div className="relative p-6 sm:p-8 rounded-2xl bg-white border border-gold-300/70 shadow-2xl text-[#1a2f4a]">
          {/* Top Pipeline Bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-gold-200/80 text-xs">
            <span className="font-bold text-[#9a7209] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse ring-2 ring-emerald-200" />
              Connected Pipeline
            </span>
            <span className="text-[#64748b] font-mono text-[11px] font-semibold">ERP → Live Catalogue</span>
          </div>

          {/* Flow Stepper */}
          <div className="grid grid-cols-3 gap-2.5 mb-6 text-center">
            <div className="p-3 rounded-xl bg-[#FAF8F4] border border-gold-200/80 shadow-xs">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Step 1</p>
              <p className="text-xs font-bold text-[#1a2f4a] mt-0.5">Showroom ERP</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">Barcode &amp; Purity</p>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF8F4] border border-gold-200/80 shadow-xs">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Step 2</p>
              <p className="text-xs font-bold text-[#1a2f4a] mt-0.5">Digital Catalogue</p>
              <p className="text-[10px] font-bold text-[#9a7209] mt-0.5">Professional+</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-gold-50 to-amber-50/70 border border-gold-400/70 shadow-xs ring-1 ring-gold-400/20">
              <p className="text-[10px] text-[#9a7209] uppercase font-bold tracking-wider">Step 3</p>
              <p className="text-xs font-bold text-[#1a2f4a] mt-0.5">AI Imagery</p>
              <p className="text-[10px] font-bold text-[#9a7209] mt-0.5">Enterprise</p>
            </div>
          </div>

          {/* Product Representation Box */}
          <div className="rounded-xl bg-[#FAF8F4] p-5 sm:p-6 border border-gold-300/80 shadow-md mb-5">
            <div className="flex justify-between items-start gap-3 mb-3.5">
              <div>
                <p className="text-[11px] font-mono text-[#64748b] font-semibold uppercase tracking-wide">
                  Sample SKU: NK-22K-8092 • HUID #OCT892
                </p>
                <h5 className="font-display font-bold text-lg sm:text-xl text-[#1a2f4a] mt-0.5">
                  Handcrafted Antique Temple Choker
                </h5>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300/80 shadow-xs whitespace-nowrap">
                Illustrative Preview
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs bg-white p-3.5 rounded-lg border border-gold-200/80 shadow-xs mb-4">
              <div>
                <span className="text-[10px] block text-muted-foreground font-semibold uppercase tracking-wider">Purity</span>
                <span className="font-bold text-[#1a2f4a] text-sm">22K (916 BIS)</span>
              </div>
              <div>
                <span className="text-[10px] block text-muted-foreground font-semibold uppercase tracking-wider">Gross Weight</span>
                <span className="font-bold text-[#1a2f4a] text-sm">48.200 g</span>
              </div>
              <div>
                <span className="text-[10px] block text-muted-foreground font-semibold uppercase tracking-wider">Net Gold</span>
                <span className="font-bold text-[#1a2f4a] text-sm">45.850 g</span>
              </div>
            </div>

            {/* AI Generation Highlight Callout */}
            <div className="p-3.5 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50/60 border border-gold-300/80 flex items-center gap-3 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#9a7209] flex-shrink-0" />
              <div className="text-xs leading-relaxed text-[#1a2f4a]">
                <span className="font-bold text-[#9a7209]">AI Catalogue Creation:</span> Generates studio-grade product presentations directly from ERP specification records.
              </div>
            </div>
          </div>

          {/* Tier Boundary Assurance */}
          <p className="text-xs text-muted-foreground text-center font-medium">
            Digital Catalogue included in Professional. AI Catalogue Image Generation included in Enterprise.
          </p>
        </div>
      </div>
    </div>
  );
}
