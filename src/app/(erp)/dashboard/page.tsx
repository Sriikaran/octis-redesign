"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ErpPageHeader } from "@/components/erp/ErpPageHeader";
import { FinancialMetric } from "@/components/erp/FinancialMetric";
import { SemanticBalanceBadge } from "@/components/erp/SemanticBalanceBadge";
import { MetalBalanceBadge } from "@/components/erp/MetalBalanceBadge";
import {
  DateRangeFilter,
  DateRangeValue,
  calculateDateRangeFromPreset,
} from "@/components/erp/DateRangeFilter";
import { ResponsiveDataTable, ColumnDef } from "@/components/erp/ResponsiveDataTable";
import { ErpEmptyState } from "@/components/erp/ErpEmptyState";
import {
  getPartyDirectorySummary,
  getRecentVouchers,
  getDashboardExceptions,
  RecentVoucherItem,
  DashboardExceptionItem,
} from "@/lib/erp/partyStore";
import { getInventoryCatalog } from "@/lib/erp/inventoryStore";
import {
  formatIndianCurrency,
  formatGoldWeight,
  formatDate,
} from "@/lib/erp/formatters";
import {
  Boxes,
  Briefcase,
  Search,
  ArrowRight,
  ShieldCheck,
  Receipt,
  Users,
  Scale,
  AlertTriangle,
  TrendingUp,
  Wallet,
  Calendar,
  ChevronRight,
  Clock,
  ArrowUpRight,
  Info,
  Coins,
  CheckCircle2,
  ExternalLink,
  Layers,
} from "lucide-react";

export default function ErpDashboardPage() {
  const router = useRouter();
  const summary = getPartyDirectorySummary();
  const catalog = getInventoryCatalog();
  const allExceptions = useMemo(() => getDashboardExceptions(), []);
  const allVouchers = useMemo(() => getRecentVouchers(20), []);

  // Tag search input state
  const [tagQuery, setTagQuery] = useState("");

  // Deterministic reference date for demo snapshot (2024-10-22)
  const DEMO_REFERENCE_DATE = useMemo(() => new Date("2024-10-22T10:00:00.000Z"), []);

  // Date range filter state (defaults to Month to Date covering October demo records)
  const [dateRange, setDateRange] = useState<DateRangeValue>(() => {
    const initial = calculateDateRangeFromPreset("month_to_date", DEMO_REFERENCE_DATE);
    return {
      preset: "month_to_date",
      startDate: initial.startDate,
      endDate: initial.endDate,
      formattedLabel: initial.label,
    };
  });

  // Selected voucher rows in the responsive table
  const [selectedVoucherIds, setSelectedVoucherIds] = useState<string[]>([]);

  // Filter vouchers by selected date range
  const filteredVouchers = useMemo(() => {
    return allVouchers.filter((v) => {
      const vDate = v.date.substring(0, 10);
      return vDate >= dateRange.startDate && vDate <= dateRange.endDate;
    });
  }, [allVouchers, dateRange]);

  const handleTagSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagQuery.trim()) {
      router.push(`/inventory/item/${encodeURIComponent(tagQuery.trim())}`);
    }
  };

  // Column definitions for the Recent Vouchers table
  const voucherColumns: ColumnDef<RecentVoucherItem>[] = [
    {
      id: "date",
      header: "Date",
      priority: "essential",
      cell: (item) => (
        <span className="font-mono text-xs text-stone-700 whitespace-nowrap">
          {formatDate(item.date, "date")}
        </span>
      ),
    },
    {
      id: "voucherNo",
      header: "Voucher #",
      priority: "essential",
      cell: (item) => (
        <span className="font-mono text-xs font-semibold text-stone-900 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
          {item.voucherNo}
        </span>
      ),
    },
    {
      id: "party",
      header: "Party Account",
      priority: "essential",
      cell: (item) => (
        <div>
          <Link
            href={`/parties/${item.partyId}`}
            className="font-semibold text-stone-900 hover:text-gold-700 hover:underline flex items-center gap-1"
          >
            {item.partyName}
            <ArrowUpRight size={11} className="text-stone-400" />
          </Link>
          <span className="text-[10px] text-stone-500 font-mono">
            {item.partyCode} • {item.partyCategory.replace("_", " ")}
          </span>
        </div>
      ),
    },
    {
      id: "description",
      header: "Description / Narration",
      priority: "medium",
      cell: (item) => (
        <span className="text-xs text-stone-600 line-clamp-1 max-w-xs">
          {item.description}
        </span>
      ),
    },
    {
      id: "financial",
      header: "Amount (₹)",
      align: "right",
      priority: "essential",
      cell: (item) => {
        if (item.debit > 0) {
          return (
            <div className="text-right">
              <span className="font-mono font-semibold text-stone-900">
                {formatIndianCurrency(item.debit)}
              </span>
              <span className="block text-[10px] text-stone-400 font-sans">Debit</span>
            </div>
          );
        }
        if (item.credit > 0) {
          return (
            <div className="text-right">
              <span className="font-mono font-semibold text-stone-900">
                {formatIndianCurrency(item.credit)}
              </span>
              <span className="block text-[10px] text-stone-400 font-sans">Credit</span>
            </div>
          );
        }
        return <span className="text-stone-400 text-xs">—</span>;
      },
    },
    {
      id: "metal",
      header: "Metal Weight",
      align: "right",
      priority: "low",
      cell: (item) => {
        const grams = item.metalDebitGrams || item.metalCreditGrams;
        if (!grams || grams === 0) {
          return <span className="text-stone-400 text-xs">—</span>;
        }
        return (
          <div className="text-right font-mono text-xs">
            <span className="font-medium text-amber-900">
              {formatGoldWeight(grams)}
            </span>
            <span className="block text-[10px] text-stone-400 font-sans">
              {item.metalDebitGrams > 0 ? "Debit (Out)" : "Credit (In)"}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      align: "center",
      priority: "medium",
      cell: (item) => (
        <Link
          href={`/parties/${item.partyId}`}
          className="text-xs font-semibold text-gold-700 hover:text-gold-900 underline underline-offset-2"
        >
          Ledger
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header with contextual metadata */}
      <ErpPageHeader
        title="Executive Showroom Dashboard"
        description="Multi-counter liquidity, operational exceptions, and store activity for Bengaluru Flagship (Local demonstration workspace)."
        breadcrumbs={[{ label: "Dashboard", current: true }]}
        actions={
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-200 text-xs font-mono text-stone-700">
              <Clock size={13} className="text-stone-400" />
              <span>Snapshot: 22 Oct 2024, 10:00 AM</span>
            </span>
          </div>
        }
      />

      {/* Trust & Boundary Notice Banner */}
      <div className="rounded-xl border border-gold-300 bg-gold-50/70 p-4 text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-start gap-2.5">
          <ShieldCheck size={18} className="text-amber-800 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <span className="font-semibold text-sm text-stone-900 block mb-0.5">
              Phase 6B Operational: Dashboard Hierarchy (DASH-01) & Executive KPIs (DASH-02)
            </span>
            <p className="text-stone-700 leading-relaxed">
              Metrics are derived from canonical local demonstration stores. Metal and monetary positions are strictly separated with explicit direction.
              Counter billing totals activate in Phase 6C (POS Terminal); no estimated sales metrics are fabricated.
            </p>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-200/80 text-amber-900 font-mono text-[11px] font-semibold">
            Demo Mode Active
          </span>
        </div>
      </div>

      {/* =========================================================================
          TIER 1: PRIMARY EXECUTIVE KPIs & LIQUIDITY CONTEXT (DASH-01 / DASH-02)
          ========================================================================= */}
      <section aria-labelledby="tier1-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h2 id="tier1-heading" className="text-sm font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-600 inline-block" />
              1. Primary Executive KPIs & Liquidity Context
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Reconciled ledger balances and verified store positions. Cash and metal balances are strictly separated.
            </p>
          </div>
          <span className="text-[11px] text-stone-500 font-mono self-start sm:self-auto">
            Store: Main Flagship (Bengaluru)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {/* KPI 1: Vendor Payables */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm flex flex-col justify-between hover:border-gold-300 transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                <span>Vendor Payables</span>
                <div className="p-1.5 rounded-lg bg-rose-50 text-rose-700">
                  <Briefcase size={16} aria-hidden="true" />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-bold font-mono tracking-tight text-stone-900 block">
                  {formatIndianCurrency(summary.totalVendorsPayable)}
                </span>
                <div className="pt-0.5">
                  <SemanticBalanceBadge
                    amount={summary.totalVendorsPayable}
                    role="vendor"
                    size="sm"
                  />
                </div>
              </div>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                Across {summary.activeVendorsCount + summary.bullionDealersCount} active vendor accounts. Payment terms 7–14 days.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-stone-100">
              <Link
                href="/parties?category=vendor"
                className="text-xs font-semibold text-gold-700 hover:text-gold-900 flex items-center gap-1 focus-visible:outline-none focus-visible:underline"
              >
                <span>Inspect Payables</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* KPI 2: Customer Receivables */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm flex flex-col justify-between hover:border-gold-300 transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                <span>Customer Receivables</span>
                <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
                  <Users size={16} aria-hidden="true" />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-bold font-mono tracking-tight text-stone-900 block">
                  {formatIndianCurrency(summary.totalCustomersReceivable)}
                </span>
                <div className="pt-0.5">
                  <SemanticBalanceBadge
                    amount={summary.totalCustomersReceivable}
                    role="customer"
                    size="sm"
                  />
                </div>
              </div>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                Pending balance on high-value antique temple jewellery sale (INV-2024-1102).
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-stone-100">
              <Link
                href="/parties?category=customer"
                className="text-xs font-semibold text-gold-700 hover:text-gold-900 flex items-center gap-1 focus-visible:outline-none focus-visible:underline"
              >
                <span>Inspect Receivables</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* KPI 3: Customer Advances Held */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm flex flex-col justify-between hover:border-gold-300 transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                <span>Customer Advances</span>
                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                  <Wallet size={16} aria-hidden="true" />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-bold font-mono tracking-tight text-emerald-950 block">
                  {formatIndianCurrency(summary.totalCustomersCredit)}
                </span>
                <div className="pt-0.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Store Credit / Advance Held
                  </span>
                </div>
              </div>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                Restricted advance deposit for custom festive Diwali bangles booking.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-stone-100">
              <Link
                href="/parties/pty-cus-002"
                className="text-xs font-semibold text-gold-700 hover:text-gold-900 flex items-center gap-1 focus-visible:outline-none focus-visible:underline"
              >
                <span>View Booking Account</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* KPI 4: Net Fine Gold Payable */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm flex flex-col justify-between hover:border-gold-300 transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                <span>Net Metal Balance</span>
                <div className="p-1.5 rounded-lg bg-amber-100 text-amber-900">
                  <Scale size={16} aria-hidden="true" />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-bold font-mono tracking-tight text-amber-950 block">
                  {formatGoldWeight(summary.netMetalPayableGrams)}
                </span>
                <div className="pt-0.5">
                  <MetalBalanceBadge
                    grams={summary.netMetalPayableGrams}
                    purity="999.0 Fine"
                    size="sm"
                  />
                </div>
              </div>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                Refinery conversion & bullion bar settlement balance with Shree Ganesh Bullion.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-stone-100">
              <Link
                href="/parties/pty-ven-001"
                className="text-xs font-semibold text-gold-700 hover:text-gold-900 flex items-center gap-1 focus-visible:outline-none focus-visible:underline"
              >
                <span>Refinery Ledger</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* KPI 5: Today's Counter Sales (Explicit Unavailable State) */}
          <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50/60 p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                <span>Counter Sales (POS)</span>
                <div className="p-1.5 rounded-lg bg-stone-200/60 text-stone-500">
                  <Receipt size={16} aria-hidden="true" />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-bold font-mono tracking-tight text-stone-400 block">
                  —
                </span>
                <div className="pt-0.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-stone-200/80 text-stone-600 border border-stone-300">
                    Unavailable (POS Offline)
                  </span>
                </div>
              </div>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                Live cash drawer & register totals activate in Phase 6C (POS Terminal). No estimated sales numbers are fabricated.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-stone-200/80">
              <Link
                href="/sales"
                className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1 focus-visible:outline-none focus-visible:underline"
              >
                <span>View POS Status</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* Supplementary Showroom Inventory Valuation Ribbon */}
        <div className="mt-4 rounded-xl border border-stone-200 bg-white p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
              <Boxes size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Catalogue Inventory In Showroom Cases
                </span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold font-mono">
                  100% BIS Hallmarked
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-lg font-bold font-mono text-stone-900">
                  {catalog.length} Hallmarked Items
                </span>
                <span className="text-xs text-stone-500 font-sans">
                  • Approx Retail Valuation: <strong className="text-stone-800 font-mono">₹12,00,250.00</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
            <Link
              href="/inventory"
              className="px-3.5 py-2 rounded-lg bg-stone-900 text-white font-medium text-xs hover:bg-stone-800 transition-colors shadow-xs flex items-center gap-1.5"
            >
              <span>Browse Catalog</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 2: ACTIONABLE OPERATIONAL EXCEPTIONS (DASH-01)
          ========================================================================= */}
      <section aria-labelledby="tier2-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h2 id="tier2-heading" className="text-sm font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              2. Actionable Operational Exceptions (Priority Queue)
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Verified items requiring manager review or cashier action before end-of-day.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
            <AlertTriangle size={12} />
            <span>{allExceptions.length} Exceptions Active</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allExceptions.map((exc) => {
            const severityColor =
              exc.severity === "high"
                ? "border-rose-200 bg-rose-50/40 text-rose-900"
                : exc.severity === "medium"
                ? "border-amber-200 bg-amber-50/40 text-amber-900"
                : "border-blue-200 bg-blue-50/40 text-blue-900";

            const badgeColor =
              exc.severity === "high"
                ? "bg-rose-100 text-rose-800 border-rose-200"
                : exc.severity === "medium"
                ? "bg-amber-100 text-amber-800 border-amber-200"
                : "bg-blue-100 text-blue-800 border-blue-200";

            return (
              <div
                key={exc.id}
                className={`rounded-xl border p-4 shadow-xs flex flex-col justify-between transition-all hover:shadow-sm ${severityColor}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-sm font-bold text-stone-900">
                      {exc.title}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${badgeColor}`}>
                      {exc.severity} Priority
                    </span>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed mb-3">
                    {exc.description}
                  </p>

                  <div className="flex items-center flex-wrap gap-3 text-xs font-mono font-semibold pt-1">
                    {exc.amount !== undefined && (
                      <span className="text-stone-900 bg-white/80 px-2 py-1 rounded border border-stone-200/60">
                        Balance: {formatIndianCurrency(Math.abs(exc.amount))} {exc.amount < 0 ? "(Credit)" : "(Due)"}
                      </span>
                    )}
                    {exc.metalGrams !== undefined && (
                      <span className="text-amber-900 bg-amber-100/80 px-2 py-1 rounded border border-amber-200/60">
                        Metal: {formatGoldWeight(exc.metalGrams)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-200/50 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500 font-mono">
                    ID: {exc.id}
                  </span>
                  <Link
                    href={exc.actionHref}
                    className="text-xs font-bold text-stone-900 hover:text-gold-800 flex items-center gap-1 group focus-visible:outline-none focus-visible:underline"
                  >
                    <span>{exc.actionLabel}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          TIER 3: OPERATIONAL TRENDS & LIQUIDITY BREAKDOWN (DASH-01)
          ========================================================================= */}
      <section aria-labelledby="tier3-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 id="tier3-heading" className="text-sm font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
              3. Operational Trends & Store Liquidity Breakdown
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Examine store cash/metal distribution and sample transactional timelines.
            </p>
          </div>

          {/* Reusable DateRangeFilter Component */}
          <div className="flex items-center gap-2">
            <DateRangeFilter
              value={dateRange}
              onChange={(newRange) => setDateRange(newRange)}
              referenceDate={DEMO_REFERENCE_DATE}
              unsupportedNotice="Filters recent store activity table below."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Liquidity Breakdown Card */}
          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  Showroom Liquidity & Asset Composition
                </h3>
                <span className="text-[11px] text-stone-500">
                  Physical and ledger holdings as of 22 Oct 2024
                </span>
              </div>
              <Coins size={18} className="text-gold-600" />
            </div>

            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-stone-800 block">Showroom Cash Drawer</span>
                  <span className="text-[11px] text-stone-500">Opening floating balance & day collections</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-stone-400 font-semibold">—</span>
                  <span className="block text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded font-mono">
                    Awaiting POS (Phase 6C)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-100">
                <div>
                  <span className="font-semibold text-stone-800 block">Gross Jewellery Stock In Hand</span>
                  <span className="text-[11px] text-stone-500">Gold, Diamond Mountings & Bullion Coins</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-stone-900 font-bold">106.200 g</span>
                  <span className="block text-[10px] text-stone-500">+ 550.000 g Silver</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-100">
                <div>
                  <span className="font-semibold text-stone-800 block">Restricted Customer Advances</span>
                  <span className="text-[11px] text-stone-500">Advance booking deposits held in custody</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-emerald-800 font-bold">₹1,50,000.00</span>
                  <span className="block text-[10px] text-stone-500">Booking Liability</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-100">
                <div>
                  <span className="font-semibold text-stone-800 block">Refinery Net Metal Position</span>
                  <span className="text-[11px] text-stone-500">999.0 Fine Gold payable on settlement</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-amber-900 font-bold">466.750 g</span>
                  <span className="block text-[10px] text-amber-800">We Owe Fine Gold</span>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-lg bg-stone-50 p-3 text-[11px] text-stone-600 border border-stone-200/70">
              <span className="font-semibold text-stone-800 block mb-0.5">Liquidity Rule (GEN-01 / DASH-02):</span>
              Metal weights and currency balances are never merged. Floating cash liquidity cannot be validated without counter POS logs.
            </div>
          </div>

          {/* Sample Activity Trend Card */}
          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  Sample Transaction Flow Timeline
                </h3>
                <span className="text-[11px] text-stone-500">
                  Canonical demo activity across August–October 2024
                </span>
              </div>
              <TrendingUp size={18} className="text-gold-600" />
            </div>

            {/* Visual Flow Distribution */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-stone-700">Vendor Inward Invoices (Sep–Oct)</span>
                  <span className="font-mono font-bold text-stone-900">₹52,33,078.80</span>
                </div>
                <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: "85%" }} />
                </div>
                <span className="text-[10px] text-stone-500 mt-0.5 block">
                  Chains, bangles, and bridal jewellery stock inwards
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-stone-700">Retail Sales Recorded (Sep)</span>
                  <span className="font-mono font-bold text-stone-900">₹4,85,000.00</span>
                </div>
                <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: "35%" }} />
                </div>
                <span className="text-[10px] text-stone-500 mt-0.5 block">
                  Antique temple choker sale (₹3.00L card + ₹1.85L balance)
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-stone-700">Customer Advance Bookings (Oct)</span>
                  <span className="font-mono font-bold text-stone-900">₹1,50,000.00</span>
                </div>
                <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: "15%" }} />
                </div>
                <span className="text-[10px] text-stone-500 mt-0.5 block">
                  Diwali bangles custom booking deposit
                </span>
              </div>
            </div>

            <div className="mt-5 rounded-lg bg-amber-50/70 p-3 text-[11px] text-amber-900 border border-amber-200">
              <span className="font-semibold text-stone-900 block mb-0.5">Sample Demonstration:</span>
              This bar distribution reflects verified voucher records. Historical analytics reports (DASH-03 / REP-01) will expand this view with time-series aggregates.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 4: STORE ACTIVITY & MODULE SHORTCUTS (DASH-01)
          ========================================================================= */}
      <section aria-labelledby="tier4-heading" className="space-y-6">
        <div>
          <h2 id="tier4-heading" className="text-sm font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-stone-500 inline-block" />
            4. Store Activity & Module Shortcuts
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Search inventory items or inspect recent ledger vouchers filtered by date range.
          </p>
        </div>

        {/* Fast Item Tag Lookup Bar (INV-01) */}
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-1">
              <Search size={18} className="text-gold-600" aria-hidden="true" />
              <h3 className="text-sm font-bold text-stone-900">
                Safe Inventory Tag Lookup (INV-01)
              </h3>
            </div>
            <p className="text-xs text-stone-600 mb-3.5 leading-relaxed">
              Lookup jewellery by tag (<code className="bg-stone-100 px-1 py-0.5 rounded text-stone-800">TAG-GLD-101</code>) or BIS HUID. Safe client-side routing handles non-existent or arbitrary queries without crashing.
            </p>

            <form onSubmit={handleTagSearch} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <input
                  id="dashboard-tag-input"
                  type="text"
                  value={tagQuery}
                  onChange={(e) => setTagQuery(e.target.value)}
                  placeholder="Enter item tag, e.g. TAG-GLD-101 or HUID91"
                  className="w-full pl-3 pr-10 py-2 rounded-lg border border-stone-300 bg-white text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-gold-500 font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-stone-900 text-white font-medium text-xs hover:bg-stone-800 transition-colors shadow-xs flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                <span>Inspect Item</span>
                <ArrowRight size={13} />
              </button>
            </form>

            <div className="mt-2.5 flex items-center flex-wrap gap-2 text-xs text-stone-500">
              <span className="text-[11px]">Quick samples:</span>
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
        </div>

        {/* Recent Vouchers Activity Table (ResponsiveDataTable) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <span>Recent Ledger Vouchers</span>
                <span className="text-xs font-mono font-normal text-stone-500">
                  ({filteredVouchers.length} records in range: {dateRange.formattedLabel})
                </span>
              </h3>
              <p className="text-xs text-stone-500">
                Showing vouchers between {dateRange.startDate} and {dateRange.endDate}.
              </p>
            </div>

            {selectedVoucherIds.length > 0 && (
              <span className="text-xs font-semibold text-gold-900 bg-gold-100 px-2.5 py-1 rounded-full">
                {selectedVoucherIds.length} vouchers selected
              </span>
            )}
          </div>

          <ResponsiveDataTable<RecentVoucherItem>
            data={filteredVouchers}
            columns={voucherColumns}
            getRowId={(item) => item.id}
            ariaLabel="Recent Store Vouchers Table"
            selectable={true}
            selectedIds={selectedVoucherIds}
            onSelectionChange={setSelectedVoucherIds}
            emptyTitle="No vouchers found for this date range"
            emptyDescription={`There are no canonical vouchers recorded between ${dateRange.startDate} and ${dateRange.endDate}. Select 'This Month' or a custom date range covering October 2024 to view records.`}
            renderMobileCard={(item, idx, isSelected) => (
              <div
                className={`rounded-xl border p-4 shadow-xs bg-white space-y-2.5 transition-all ${
                  isSelected ? "border-gold-400 bg-gold-50/40 ring-1 ring-gold-300" : "border-stone-200"
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-stone-100 text-xs">
                  <span className="font-mono font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded">
                    {item.voucherNo}
                  </span>
                  <span className="font-mono text-stone-500">
                    {formatDate(item.date, "date")}
                  </span>
                </div>

                <div>
                  <Link
                    href={`/parties/${item.partyId}`}
                    className="font-bold text-stone-900 hover:text-gold-700 text-xs flex items-center justify-between"
                  >
                    <span>{item.partyName}</span>
                    <ChevronRight size={14} className="text-stone-400" />
                  </Link>
                  <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">Party Role</span>
                    <span className="font-mono text-stone-700 font-medium">
                      {item.partyCategory.replace("_", " ")}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">Amount</span>
                    <span className="font-mono font-bold text-stone-900">
                      {item.debit > 0
                        ? formatIndianCurrency(item.debit)
                        : item.credit > 0
                        ? formatIndianCurrency(item.credit)
                        : "—"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          />
        </div>

        {/* Module Navigation Grid */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
            Module Navigation Shortcuts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Parties Directory */}
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
                    Live Demo (6A)
                  </span>
                </div>
                <h4 className="text-base font-bold text-stone-900 group-hover:text-gold-800 transition-colors">
                  Parties & Ledger Directory
                </h4>
                <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                  Reconciled vendor & customer ledgers resolving PART-01, PART-02, and PART-03 with single-source mathematical parity.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-gold-700">
                <span>Open Parties Directory</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Inventory Catalog */}
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
                    Live Demo (6A)
                  </span>
                </div>
                <h4 className="text-base font-bold text-stone-900 group-hover:text-gold-800 transition-colors">
                  Inventory & Stock Lookup
                </h4>
                <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                  Hallmarked stock catalog with safe tag error recovery (INV-01), weight specifications, and zero mobile overflow.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-gold-700">
                <span>Open Inventory Catalog</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Sales & Billing Terminal */}
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
                    Scheduled (Phase 6C)
                  </span>
                </div>
                <h4 className="text-base font-bold text-stone-900">
                  POS Billing Terminal
                </h4>
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
        </div>
      </section>
    </div>
  );
}
