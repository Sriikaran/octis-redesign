import Link from "next/link";
import { Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="landing-footer pt-16 md:pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="mb-6 inline-flex rounded-xl bg-white/95 px-3 py-2 shadow-lg"
              aria-label="Octis Home"
            >
              <span className="inline-flex items-center flex-shrink-0 leading-none origin-left">
                <img
                  src="/logo.png"
                  alt="Octis"
                  className="h-14 w-auto object-contain object-left max-w-[220px]"
                  decoding="async"
                />
              </span>
            </Link>
            <p className="text-cream-200/75 leading-relaxed max-w-sm text-sm">
              Premium management software designed exclusively for Indian retail jewelers. Run your
              showroom with elegance and precision on Octis.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-gold-300 font-semibold mb-5 tracking-wide text-sm">Product</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className="text-cream-200/65 hover:text-gold-300 transition-colors text-sm"
                >
                  Point of Sale
                </a>
              </li>
              <li>
                <a
                  href="#inventory"
                  className="text-cream-200/65 hover:text-gold-300 transition-colors text-sm"
                >
                  Inventory
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-cream-200/65 hover:text-gold-300 transition-colors text-sm"
                >
                  CRM &amp; Schemes
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-cream-200/65 hover:text-gold-300 transition-colors text-sm"
                >
                  Reporting
                </a>
              </li>
            </ul>
          </div>

          {/* Resources & Contact */}
          <div>
            <h4 className="text-gold-300 font-semibold mb-5 tracking-wide text-sm">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#faq"
                  className="text-cream-200/65 hover:text-gold-300 transition-colors text-sm"
                >
                  FAQ
                </a>
              </li>
            </ul>

            <h4 className="text-gold-300 font-semibold mb-5 mt-8 tracking-wide text-sm">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+917396029339"
                  className="flex items-center gap-3 text-cream-200/65 hover:text-gold-300 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+91 7396 029 339</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@octis.in"
                  className="flex items-center gap-3 text-cream-200/65 hover:text-gold-300 transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>hello@octis.in</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gold-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream-200/50 text-sm">
            © 2026 Octis Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
