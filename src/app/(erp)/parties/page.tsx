"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ErpPageHeader } from "@/components/erp/ErpPageHeader";
import { FinancialMetric } from "@/components/erp/FinancialMetric";
import { SemanticBalanceBadge } from "@/components/erp/SemanticBalanceBadge";
import { MetalBalanceBadge } from "@/components/erp/MetalBalanceBadge";
import {
  getParties,
  getPartyDirectorySummary,
  PartyCategory,
  PartySummaryMetrics,
} from "@/lib/erp/partyStore";
import { formatDate } from "@/lib/erp/formatters";
import {
  Search,
  Filter,
  Briefcase,
  Users,
  Scale,
  ArrowRight,
  Phone,
  MapPin,
  FileText,
  AlertCircle,
  XCircle,
} from "lucide-react";

export default function PartiesDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<PartyCategory | "all">("all");

  const summary = useMemo(() => getPartyDirectorySummary(), []);

  const parties = useMemo(() => {
    return getParties({
      query: searchQuery,
      category: selectedCategory,
    });
  }, [searchQuery, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  const getCategoryBadge = (category: PartyCategory) => {
    switch (category) {
      case "bullion_dealer":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
            Bullion Dealer
          </span>
        );
      case "vendor":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-200">
            Ornament Vendor
          </span>
        );
      case "customer":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-200">
            Retail Customer
          </span>
        );
    }
  };

  return (
    <div>
      <ErpPageHeader
        title="Parties & Ledger Directory"
        description="Unified vendor and customer directory. All financial metrics and outstanding balances are derived directly from canonical ledger vouchers with mathematical parity (PART-01, PART-02, PART-03)."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Parties", current: true },
        ]}
      />

      {/* Summary KPI Cards derived from canonical store */}
      <section className="mb-6" aria-label="Reconciled Party Totals">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FinancialMetric
            label="Total Vendor Payables"
            amount={summary.totalVendorsPayable}
            partyRole="vendor"
            subtext="Outstanding bills payable to jewellery manufacturers"
            variant="highlight"
            icon={Briefcase}
          />
          <FinancialMetric
            label="Total Customer Receivables"
            amount={summary.totalCustomersReceivable}
            partyRole="customer"
            subtext="Net balance due from jewellery sales"
            variant="default"
            icon={Users}
          />
          <FinancialMetric
            label="Vendor Advance Balances"
            amount={summary.totalVendorsAdvance}
            partyRole="vendor"
            subtext="Showroom advances on unfulfilled consignments"
            variant="default"
          />
          <FinancialMetric
            label="Net Fine Metal Payable"
            metalGrams={summary.netMetalPayableGrams}
            purity="999.0 Fine"
            badgeType="metal"
            subtext="Fine bullion weight owed to refinery accounts"
            variant="default"
            icon={Scale}
          />
        </div>
      </section>

      {/* Filter and Search Controls */}
      <section className="mb-6 rounded-xl border border-stone-200 bg-white p-4 shadow-sm" aria-label="Filter Parties">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              aria-hidden="true"
            />
            <input
              id="party-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by party name, account code (e.g. VEN-SGB-01), or phone..."
              className="w-full pl-9 pr-8 py-2 rounded-lg border border-stone-300 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white text-stone-900"
              aria-label="Search parties directory"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                aria-label="Clear search input"
              >
                <XCircle size={16} />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center flex-wrap gap-1.5 p-1 bg-stone-100 rounded-lg text-xs font-medium" role="tablist" aria-label="Filter by Party Type">
            {(
              [
                { id: "all", label: "All Parties" },
                { id: "vendor", label: "Vendors" },
                { id: "bullion_dealer", label: "Bullion" },
                { id: "customer", label: "Customers" },
              ] as const
            ).map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={selectedCategory === cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                  selectedCategory === cat.id
                    ? "bg-white text-stone-900 font-semibold shadow-xs"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Directory Records List / Table */}
      {parties.length === 0 ? (
        /* Empty State */
        <div
          className="rounded-xl border border-dashed border-stone-300 bg-white p-12 text-center"
          role="status"
        >
          <div className="mx-auto w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 mb-3">
            <AlertCircle size={24} />
          </div>
          <h3 className="text-base font-bold text-stone-900">
            No party records found
          </h3>
          <p className="mt-1 text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
            No party matches your query &ldquo;{searchQuery}&rdquo;. Try clearing your search term or selecting another category.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          {/* Desktop Table View (>= 768px) */}
          <div className="hidden md:block rounded-xl border border-stone-200 bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm" aria-label="Parties Directory Table">
                <thead className="bg-stone-50 border-b border-stone-200 text-xs uppercase font-bold tracking-wider text-stone-600">
                  <tr>
                    <th scope="col" className="px-4 py-3">Party Name & Code</th>
                    <th scope="col" className="px-4 py-3">Category</th>
                    <th scope="col" className="px-4 py-3">Contact & Location</th>
                    <th scope="col" className="px-4 py-3 text-right">Financial Balance (Rupees)</th>
                    <th scope="col" className="px-4 py-3 text-right">Metal Balance (Fine Gold)</th>
                    <th scope="col" className="px-4 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {parties.map((item) => (
                    <tr
                      key={item.party.id}
                      className="hover:bg-amber-50/40 transition-colors group"
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex flex-col">
                          <Link
                            href={`/parties/${item.party.id}`}
                            className="font-bold text-stone-950 hover:text-gold-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded"
                          >
                            {item.party.name}
                          </Link>
                          <span className="font-mono text-xs text-stone-500">
                            {item.party.code}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        {getCategoryBadge(item.party.category)}
                      </td>

                      <td className="px-4 py-3.5 text-xs text-stone-600">
                        <div className="flex flex-col gap-0.5">
                          <span className="flex items-center gap-1">
                            <Phone size={12} className="text-stone-400" />
                            {item.party.phone}
                          </span>
                          <span className="flex items-center gap-1 text-stone-500">
                            <MapPin size={12} className="text-stone-400" />
                            {item.party.city}, {item.party.state}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <SemanticBalanceBadge
                          amount={item.netFinancialBalance}
                          role={item.party.category}
                          size="md"
                        />
                      </td>

                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        {item.party.category !== "customer" && item.netMetalBalanceGrams !== 0 ? (
                          <MetalBalanceBadge
                            grams={item.netMetalBalanceGrams}
                            purity="Fine 999.0"
                            size="md"
                          />
                        ) : (
                          <span className="text-stone-400 text-xs">—</span>
                        )}
                      </td>

                      <td className="px-4 py-3.5 text-center">
                        <Link
                          href={`/parties/${item.party.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-xs font-semibold text-stone-700 hover:bg-stone-50 hover:text-stone-950 hover:border-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 shadow-2xs transition-colors"
                        >
                          <FileText size={13} className="text-stone-500" />
                          <span>Ledger</span>
                          <ArrowRight size={12} className="text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View (< 768px) - Eliminates horizontal table scrolling */}
          <div className="md:hidden space-y-3" aria-label="Parties Directory Mobile Cards">
            {parties.map((item) => (
              <div
                key={item.party.id}
                className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link
                      href={`/parties/${item.party.id}`}
                      className="font-bold text-base text-stone-950 hover:text-gold-700 block"
                    >
                      {item.party.name}
                    </Link>
                    <span className="font-mono text-xs text-stone-500">
                      {item.party.code}
                    </span>
                  </div>
                  {getCategoryBadge(item.party.category)}
                </div>

                <div className="flex items-center gap-3 text-xs text-stone-600">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-stone-400" />
                    {item.party.city}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Phone size={12} className="text-stone-400" />
                    {item.party.phone}
                  </span>
                </div>

                <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500">Financial Balance:</span>
                    <SemanticBalanceBadge
                      amount={item.netFinancialBalance}
                      role={item.party.category}
                      size="sm"
                    />
                  </div>

                  {item.party.category !== "customer" && item.netMetalBalanceGrams !== 0 && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-500">Fine Metal Balance:</span>
                      <MetalBalanceBadge
                        grams={item.netMetalBalanceGrams}
                        purity="Fine 999.0"
                        size="sm"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <Link
                    href={`/parties/${item.party.id}`}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-stone-100 text-stone-800 text-xs font-semibold hover:bg-stone-200 transition-colors"
                  >
                    <FileText size={14} />
                    <span>View Reconciled Ledger ({item.voucherCount} Vouchers)</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
