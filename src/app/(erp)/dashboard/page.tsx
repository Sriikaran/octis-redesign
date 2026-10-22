"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ErpPageHeader } from "@/components/erp/ErpPageHeader";
import { FinancialMetric } from "@/components/erp/FinancialMetric";
import { getPartyDirectorySummary } from "@/lib/erp/partyStore";
import { getInventoryCatalog } from "@/lib/erp/inventoryStore";
import {
  Boxes,
  Briefcase,
  Search,
  ArrowRight,
  ShieldCheck,
  Receipt,
  Users,
  BarChart3,
  Scale,
  Sparkles,
} from "lucide-react";

export default function ErpDashboardPage() {
  const router = useRouter();
  const summary = getPartyDirectorySummary();
  const catalog = getInventoryCatalog();
  const [tagQuery, setTagQuery] = useState("");

  const handleTagSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagQuery.trim()) {
      router.push(`/inventory/item/${encodeURIComponent(tagQuery.trim())}`);
    }
  };

  return (
    <div>
      <ErpPageHeader
        title="Showroom ERP Overview"
        description="Local demonstration workspace for jewellery operations, party ledgers, and inventory management."
        breadcrumbs={[{ label: "Dashboard", current: true }]}
      />

      {/* Scope Disclaimer Banner */}
      <div className="mb-8 rounded-xl border border-gold-300 bg-gold-50/70 p-4 text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-start gap-2.5">
          <ShieldCheck size={18} className="text-amber-800 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <span className="font-semibold text-sm text-stone-900 block mb-0.5">
              Phase 6A Foundation Active: Financial Trust & Safe Lookup
            </span>
            <p className="text-stone-700 leading-relaxed">
              This dashboard provides working access to the canonical Party store and safe Inventory tag resolution.
              Comprehensive multi-counter analytics (DASH-01, DASH-02) and live POS terminals are scheduled for subsequent phases.
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-200/80 text-amber-900 font-mono text-[11px] font-semibold">
            Mock Mode Active
          </span>
        </div>
      </div>

      {/* Financial & Operational Summaries */}
      <section className="mb-8" aria-label="Key Operational Metrics">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-600 mb-3">
          Reconciled Financial & Stock Balances
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FinancialMetric
            label="Vendor Payables"
            amount={summary.totalVendorsPayable}
            partyRole="vendor"
            subtext={`Across ${summary.activeVendorsCount + summary.bullionDealersCount} active vendor accounts`}
            variant="highlight"
            icon={Briefcase}
          />
          <FinancialMetric
            label="Customer Receivables"
            amount={summary.totalCustomersReceivable}
            partyRole="customer"
            subtext={`Across ${summary.activeCustomersCount} customer ledger accounts`}
            variant="default"
            icon={Users}
          />
          <FinancialMetric
            label="Net Fine Gold Payable"
            metalGrams={summary.netMetalPayableGrams}
            purity="999.0 Fine"
            badgeType="metal"
            subtext="Refinery & bullion settling balance"
            variant="default"
            icon={Scale}
          />
          <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                <span>In-Stock Catalogue</span>
                <div className="p-1.5 rounded-lg bg-stone-100 text-stone-600">
                  <Boxes size={16} aria-hidden="true" />
                </div>
              </div>
              <span className="text-2xl font-bold font-mono tracking-tight text-stone-900">
                {catalog.length} Items
              </span>
              <p className="text-xs text-stone-500 mt-1">
                Hallmarked with active HUID tags
              </p>
            </div>
            <div className="pt-3">
              <Link
                href="/inventory"
                className="text-xs font-semibold text-gold-700 hover:text-gold-900 flex items-center gap-1 focus-visible:outline-none focus-visible:underline"
              >
                Browse Catalog <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fast Item Tag Lookup Bar */}
      <section className="mb-8 rounded-xl border border-stone-200 bg-white p-6 shadow-sm" aria-label="Fast Tag Search">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-1.5">
            <Search size={18} className="text-gold-600" aria-hidden="true" />
            <h2 className="text-base font-bold text-stone-900">
              Safe Inventory Tag Lookup (INV-01)
            </h2>
          </div>
          <p className="text-xs text-stone-600 mb-4 leading-relaxed">
            Search jewellery by alphanumeric tag (e.g. <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-800">TAG-GLD-101</code>) or BIS HUID.
            Safe client-side routing handles non-existent or arbitrary queries without crashing or leaking technical database exceptions.
          </p>

          <form onSubmit={handleTagSearch} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <input
                id="dashboard-tag-input"
                type="text"
                value={tagQuery}
                onChange={(e) => setTagQuery(e.target.value)}
                placeholder="Enter item tag, e.g. TAG-GLD-101 or HUID91"
                className="w-full pl-3 pr-10 py-2.5 rounded-lg border border-stone-300 bg-white text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-gold-500 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-stone-900 text-white font-medium text-sm hover:bg-stone-800 transition-colors shadow-sm flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              <span>Inspect Item</span>
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="mt-3 flex items-center flex-wrap gap-2 text-xs text-stone-500">
            <span>Quick sample tags:</span>
            {["TAG-GLD-101", "TAG-DIA-201", "TAG-COI-301", "TAG-INVALID-404"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setTagQuery(tag);
                  router.push(`/inventory/item/${encodeURIComponent(tag)}`);
                }}
                className="font-mono text-[11px] px-2 py-0.5 rounded bg-stone-100 text-stone-700 hover:bg-gold-100 hover:text-stone-900 transition-colors border border-stone-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Module Navigation Grid */}
      <section aria-label="Available ERP Modules">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-600 mb-3">
          ERP Modules & Workflows
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Parties & Vendors */}
          <Link
            href="/parties"
            className="group rounded-xl border border-stone-200 bg-white p-5 shadow-sm hover:border-gold-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                  <Briefcase size={20} />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Ready in 6A
                </span>
              </div>
              <h3 className="text-base font-bold text-stone-900 group-hover:text-gold-800 transition-colors">
                Parties & Ledger Directory
              </h3>
              <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                Reconciled vendor & customer ledgers resolving PART-01, PART-02, and PART-03 with single-source mathematical parity.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-gold-700">
              <span>Open Parties Directory</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Inventory */}
          <Link
            href="/inventory"
            className="group rounded-xl border border-stone-200 bg-white p-5 shadow-sm hover:border-gold-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                  <Boxes size={20} />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Ready in 6A
                </span>
              </div>
              <h3 className="text-base font-bold text-stone-900 group-hover:text-gold-800 transition-colors">
                Inventory & Stock Lookup
              </h3>
              <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                Hallmarked stock catalog with safe tag error recovery (INV-01), weight specifications, and zero mobile overflow.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-gold-700">
              <span>Open Inventory Catalog</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Sales & Billing */}
          <Link
            href="/sales"
            className="group rounded-xl border border-stone-200 bg-white p-5 shadow-sm hover:border-stone-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-600 flex items-center justify-center font-bold">
                  <Receipt size={20} />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-200 text-stone-700">
                  Scheduled 6C
                </span>
              </div>
              <h3 className="text-base font-bold text-stone-900">
                POS Billing Terminal
              </h3>
              <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                Fast counter billing terminal, old gold exchange deduction, and return bill master-detail (POS-01 to POS-05).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-500">
              <span>View Module Status</span>
              <ArrowRight size={14} />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
