"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Inventory", href: "#inventory" },
    { name: "Compliance", href: "#compliance" },
    { name: "Pricing", href: "#pricing" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 landing-nav transition-all duration-300 py-2.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center" aria-label="Octis Home">
          <span className="inline-flex items-center flex-shrink-0 leading-none group-hover:scale-[1.02] transition-transform origin-left">
            <img
              src="/logo.png"
              alt="Octis"
              className="h-14 sm:h-16 w-auto object-contain object-left max-w-[min(100vw-8rem,22rem)]"
              decoding="async"
            />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/75 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-1 py-0.5"
            >
              {link.name}
            </a>
          ))}

          {/* Sign In CTA */}
          <Link
            href="/login"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] h-10 px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10"
          >
            Sign In
          </Link>

          {/* Request Demo Primary CTA */}
          <a
            href="#cta"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md h-10 px-4 py-2 shadow-md shadow-primary/20 hover:shadow-primary/35"
          >
            Request Demo
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="md:hidden text-foreground p-2 rounded-lg hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[72px] bottom-0 bg-[#faf8f4]/95 backdrop-blur-xl border-t border-gold-300/30 z-40 p-6 flex flex-col justify-between overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="text-lg font-medium text-foreground/85 hover:text-primary py-2.5 border-b border-gold-300/20 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 pb-8 border-t border-gold-300/30">
            <Link
              href="/login"
              onClick={handleLinkClick}
              className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-semibold border border-border/80 bg-white/80 hover:bg-white text-foreground h-12 shadow-sm"
            >
              Sign In
            </Link>
            <a
              href="#cta"
              onClick={handleLinkClick}
              className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 h-12 shadow-md shadow-primary/25"
            >
              Request Demo
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
