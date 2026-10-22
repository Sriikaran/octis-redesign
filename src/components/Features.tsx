import {
  ShoppingCart,
  Package,
  TrendingUp,
  Users,
  Truck,
  BarChart3,
} from "lucide-react";

export default function Features() {
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
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <p className="landing-section-label mb-3">Core Features</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4 sm:mb-5 text-foreground">
            Everything you need to run a modern jewellery retail business
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
            We&apos;ve replaced clunky legacy software with a beautiful, intuitive system that your
            staff will learn in minutes, not months.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={idx}
                className="landing-feature-card group p-7 lg:p-8"
              >
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
    </section>
  );
}
