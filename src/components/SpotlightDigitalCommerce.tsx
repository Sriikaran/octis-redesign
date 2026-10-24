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

        <p className="text-lg text-cream-200/80 mb-8 leading-relaxed">
          Turn your live ERP inventory into a customer-facing digital catalogue and website. Digital Commerce connects internal jewellery operations with how customers discover and view products, presenting showroom stock as a coherent extension of your business system.
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

      {/* Right Column: Visual Operational Pipeline Card */}
      <div className="relative">
        <div className="landing-mockup-glow" />
        <div className="landing-mockup-frame relative p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#1f3757] via-[#1a2f4a] to-[#142338] border border-gold-400/30 shadow-2xl text-white">
          {/* Top Pipeline Bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs">
            <span className="font-semibold text-gold-300 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Connected Pipeline
            </span>
            <span className="text-cream-200/60 font-mono text-[11px]">ERP → Live Catalogue</span>
          </div>

          {/* Flow Stepper */}
          <div className="grid grid-cols-3 gap-2 mb-6 text-center">
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
              <p className="text-[10px] text-cream-200/60 uppercase font-bold">Step 1</p>
              <p className="text-xs font-semibold text-cream-100 mt-0.5">Showroom ERP</p>
              <p className="text-[10px] text-cream-200/70 mt-0.5">Barcode & Purity</p>
            </div>
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
              <p className="text-[10px] text-cream-200/60 uppercase font-bold">Step 2</p>
              <p className="text-xs font-semibold text-cream-100 mt-0.5">Digital Catalogue</p>
              <p className="text-[10px] text-gold-300 mt-0.5">Professional+</p>
            </div>
            <div className="p-2.5 rounded-lg bg-gold-500/10 border border-gold-400/40">
              <p className="text-[10px] text-gold-300 uppercase font-bold">Step 3</p>
              <p className="text-xs font-semibold text-gold-200 mt-0.5">AI Imagery</p>
              <p className="text-[10px] text-gold-300/80 mt-0.5">Enterprise</p>
            </div>
          </div>

          {/* Product Representation Box */}
          <div className="rounded-xl bg-black/25 p-4 sm:p-5 border border-white/10 mb-5">
            <div className="flex justify-between items-start gap-3 mb-3">
              <div>
                <p className="text-[11px] font-mono text-gold-300/80 uppercase">Sample SKU: NK-22K-8092 • HUID #OCT892</p>
                <h5 className="font-display font-bold text-base sm:text-lg text-white">
                  Handcrafted Antique Temple Choker
                </h5>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                Illustrative Preview
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs text-cream-200/80 bg-white/5 p-3 rounded-lg border border-white/5 mb-3">
              <div>
                <span className="text-[10px] block text-cream-200/50 uppercase">Purity</span>
                <span className="font-semibold text-cream-100">22K (916 BIS)</span>
              </div>
              <div>
                <span className="text-[10px] block text-cream-200/50 uppercase">Gross Weight</span>
                <span className="font-semibold text-cream-100">48.200 g</span>
              </div>
              <div>
                <span className="text-[10px] block text-cream-200/50 uppercase">Net Gold</span>
                <span className="font-semibold text-cream-100">45.850 g</span>
              </div>
            </div>

            {/* AI Generation Highlight Callout */}
            <div className="p-3 rounded-lg bg-gradient-to-r from-gold-500/15 to-transparent border border-gold-400/30 flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-gold-300 flex-shrink-0" />
              <div className="text-[11px] leading-relaxed text-cream-100">
                <span className="font-bold text-gold-200">AI Catalogue Creation:</span> Generates studio-grade product presentations directly from ERP specification records.
              </div>
            </div>
          </div>

          {/* Tier Boundary Assurance */}
          <p className="text-[11px] text-cream-200/60 text-center leading-normal">
            Digital Catalogue included in Professional. AI Catalogue Image Generation included in Enterprise.
          </p>
        </div>
      </div>
    </div>
  );
}
