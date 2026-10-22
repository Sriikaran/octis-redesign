import { Package, CheckCircle2 } from "lucide-react";

export default function SpotlightInventory() {
  const benefits = [
    "Seamless HUID barcode generation",
    "Filter by Purity (22K/24K/18K)",
    "Track stone weight vs net gold weight",
  ];

  return (
    <div
      id="inventory"
      className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center scroll-mt-24"
    >
      <div className="order-2 lg:order-1">
        <div className="relative">
          <div className="landing-mockup-glow" />
          <div className="landing-mockup-frame relative">
            <img
              src="/inventory-mockup.png"
              alt="Octis Inventory System"
              className="w-full rounded-xl relative z-10"
              decoding="async"
            />
          </div>
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <div className="landing-icon-ring landing-icon-ring--light mb-6">
          <Package className="w-[22px] h-[22px] text-gold-300" strokeWidth={2.25} />
        </div>
        <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-5 tracking-tight">
          Total visibility over your most valuable assets
        </h3>
        <p className="text-lg text-cream-200/80 mb-8 leading-relaxed">
          Every gram counts. Track your entire stock from procurement to sale with granular details.
          Know exactly what you have, where it is, and what you need to reorder.
        </p>
        <ul className="space-y-3.5">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-center gap-3 text-cream-100 font-medium text-sm">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-500/25 flex items-center justify-center ring-1 ring-gold-400/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-300" strokeWidth={2} />
              </div>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
