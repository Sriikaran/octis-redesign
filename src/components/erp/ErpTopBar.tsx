"use client";

import React from "react";
import { Menu, AlertTriangle, ShieldCheck, User } from "lucide-react";

interface ErpTopBarProps {
  onOpenMobileNav: () => void;
}

export const ErpTopBar: React.FC<ErpTopBarProps> = ({ onOpenMobileNav }) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-stone-200 shadow-xs">
      {/* Top Banner Notice: Persistent & non-intrusive demo disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-1.5 text-xs text-amber-900 flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <AlertTriangle size={14} className="text-amber-700 shrink-0" aria-hidden="true" />
          <span>
            <strong className="font-semibold">Demo interface</strong> — uses local sample data and is not connected to production Octis services.
          </span>
        </div>
        <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-300">
          <ShieldCheck size={12} className="text-amber-800" />
          Safe Client Mode
        </span>
      </div>

      {/* Main Topbar */}
      <div className="h-14 px-4 sm:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={onOpenMobileNav}
            className="lg:hidden p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            aria-label="Open ERP Navigation Menu"
          >
            <Menu size={20} aria-hidden="true" />
          </button>

          {/* Demo Bullion Rates Indicator */}
          <div className="hidden sm:flex items-center gap-2.5 text-xs">
            <span
              className="font-semibold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-1.5 py-0.5 rounded text-[10px] border border-amber-200"
              title="Sample rates for showroom demonstration — not connected to a live bullion market feed"
            >
              Demo Metal Rates (Sample):
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gold-50 text-gold-900 border border-gold-200 font-mono text-[11px] font-medium" title="Sample 24K demonstration rate">
                24K: ₹7,950/g
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-stone-100 text-stone-800 border border-stone-200 font-mono text-[11px] font-medium" title="Sample 22K (916) demonstration rate">
                22K (916): ₹7,285/g
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200 font-mono text-[11px]" title="Sample Silver demonstration rate">
                Silver: ₹94.50/g
              </span>
            </div>
          </div>
        </div>

        {/* Right side staff info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-8 h-8 rounded-full bg-[#152a45] text-gold-300 flex items-center justify-center font-bold font-sans shadow-sm">
              <User size={15} />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-semibold text-stone-900 leading-tight">
                Demo Cashier
              </span>
              <span className="text-[11px] text-stone-500">
                Staff Terminal (Offline)
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
