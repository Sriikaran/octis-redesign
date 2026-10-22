import { ArrowRight, Phone } from "lucide-react";

export default function CtaBanner() {
  return (
    <section id="cta" className="py-20 md:py-28 landing-surface relative scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="landing-cta-panel p-10 md:p-16 text-center">
          <div className="relative z-10">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5 tracking-tight">
              Ready to transform your showroom?
            </h2>
            <p className="text-lg sm:text-xl text-cream-200/85 mb-10 max-w-2xl mx-auto">
              Join the fastest-growing network of modern jewelers. Get a personalized demo and a
              30-day free trial to see the difference with Octis.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="mailto:demo@octis.in"
                className="inline-flex items-center justify-center whitespace-nowrap font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] hover:bg-primary/90 hover:shadow-md rounded-md h-14 px-8 text-lg shadow-lg shadow-black/20 bg-gradient-to-r from-gold-400 to-gold-600 text-brown-900 hover:from-gold-300 hover:to-gold-500 border-0"
              >
                Request a Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <a
                href="tel:+917396029339"
                className="inline-flex items-center justify-center whitespace-nowrap font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] border shadow-sm rounded-md h-14 px-8 text-lg border-gold-400/40 bg-white/10 text-cream-100 hover:bg-white/15 hover:text-white backdrop-blur-sm"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Sales
              </a>
            </div>
            <p className="mt-8 text-sm text-gold-300/80">
              No credit card required. Free data migration included.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
