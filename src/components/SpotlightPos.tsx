import { ShoppingCart, CheckCircle2 } from "lucide-react";

export default function SpotlightPos() {
  const benefits = [
    "One-click old gold exchange calculation",
    "Split payments (Cash + Card + UPI)",
    "Instant WhatsApp invoice sharing",
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div>
        <div className="landing-icon-ring landing-icon-ring--light mb-6">
          <ShoppingCart className="w-[22px] h-[22px] text-gold-300" strokeWidth={2.25} />
        </div>
        <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-5 tracking-tight">
          A Point of Sale that keeps the line moving
        </h3>
        <p className="text-lg text-cream-200/80 mb-8 leading-relaxed">
          Long queues during Dhanteras? No problem. Our POS is optimized for speed. Add items via
          barcode scanner, calculate wastage and making charges instantly, and accept any payment
          method.
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

      <div>
        <div className="relative">
          <div className="landing-mockup-glow" />
          <div className="landing-mockup-frame relative">
            <img
              src="/pos-mockup.png"
              alt="Octis POS System"
              className="w-full rounded-xl relative z-10"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
