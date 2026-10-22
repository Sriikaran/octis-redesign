"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Receipt,
  Boxes,
  Users,
  Briefcase,
  BarChart3,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Store,
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
  statusText?: string;
}

export const ERP_NAV_ITEMS: NavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: "Active",
    badgeColor: "bg-emerald-100 text-emerald-800",
  },
  {
    name: "Parties & Vendors",
    href: "/parties",
    icon: Briefcase,
    badge: "Active",
    badgeColor: "bg-emerald-100 text-emerald-800",
  },
  {
    name: "Inventory & Tag Lookup",
    href: "/inventory",
    icon: Boxes,
    badge: "Active",
    badgeColor: "bg-emerald-100 text-emerald-800",
  },
  {
    name: "Sales & POS Billing",
    href: "/sales",
    icon: Receipt,
    badge: "Phase 6C",
    badgeColor: "bg-stone-200 text-stone-700",
  },
  {
    name: "Customer Dossier",
    href: "/customers",
    icon: Users,
    badge: "Phase 6E",
    badgeColor: "bg-stone-200 text-stone-700",
  },
  {
    name: "Business Intelligence",
    href: "/bi",
    icon: BarChart3,
    badge: "Phase 6F",
    badgeColor: "bg-stone-200 text-stone-700",
  },
];

interface ErpSidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export const ErpSidebar: React.FC<ErpSidebarProps> = ({
  className = "",
  onNavigate,
}) => {
  const pathname = usePathname();

  const isItemActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`flex flex-col h-full bg-[#152a45] text-stone-100 border-r border-[#1e385c] select-none ${className}`}
      aria-label="ERP Main Navigation"
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-[#1f3a60] bg-[#102238]">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-md py-1"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-brown-900 font-bold shadow-md">
            <Sparkles size={18} className="text-amber-950" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-wider text-white font-sans flex items-center gap-1.5">
              OCTIS
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.2 rounded bg-gold-500/20 text-gold-300 border border-gold-400/30">
                ERP
              </span>
            </span>
            <span className="text-[11px] text-stone-300 font-medium">
              Jewellery Suite
            </span>
          </div>
        </Link>
      </div>

      {/* Store Location Chip */}
      <div className="px-4 py-3 bg-[#11233b]/60 border-b border-[#1b3456]">
        <div className="flex items-center gap-2 text-xs text-stone-300">
          <Store size={14} className="text-gold-400 shrink-0" aria-hidden="true" />
          <div className="truncate">
            <span className="font-semibold text-white block truncate">
              Main Showroom (Bengaluru)
            </span>
            <span className="text-[11px] text-stone-400">POS Counter #01</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label="Modules">
        <div className="px-2 pb-2 text-[11px] font-bold uppercase tracking-wider text-stone-400">
          ERP Modules
        </div>

        {ERP_NAV_ITEMS.map((item) => {
          const active = isItemActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                active
                  ? "bg-gold-500 text-stone-950 font-semibold shadow-sm"
                  : "text-stone-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  size={18}
                  className={`shrink-0 ${
                    active ? "text-stone-950" : "text-stone-400 group-hover:text-gold-300"
                  }`}
                  aria-hidden="true"
                />
                <span className="truncate">{item.name}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                    active
                      ? "bg-stone-950 text-gold-300"
                      : item.badgeColor || "bg-stone-800 text-stone-300"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Safety & Demonstration Footer */}
      <div className="p-3 border-t border-[#1b3456] bg-[#0f1f33] space-y-2">
        <div className="rounded-lg p-2.5 bg-white/5 border border-white/10 text-xs">
          <div className="flex items-center gap-1.5 text-gold-400 font-semibold mb-1">
            <ShieldCheck size={14} aria-hidden="true" />
            <span>Local Demo Mode</span>
          </div>
          <p className="text-[11px] text-stone-300 leading-tight">
            Client-side canonical mock active. Not connected to production services.
          </p>
        </div>

        <Link
          href="/"
          className="flex items-center justify-between px-3 py-2 rounded-md text-xs text-stone-400 hover:text-stone-200 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
        >
          <span className="flex items-center gap-2">
            <ExternalLink size={14} aria-hidden="true" />
            Public Marketing Site
          </span>
          <span className="text-[10px] text-stone-500">octis.in</span>
        </Link>
      </div>
    </aside>
  );
};
