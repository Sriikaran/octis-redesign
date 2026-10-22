"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ErpPageHeader } from "@/components/erp/ErpPageHeader";
import {
  getInventoryCatalog,
  InventoryCategory,
  InventoryStatus,
  InventoryItem,
} from "@/lib/erp/inventoryStore";
import { formatIndianCurrency, formatGoldWeight, formatDate } from "@/lib/erp/formatters";
import {
  Search,
  Boxes,
  Tag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  XCircle,
  Filter,
} from "lucide-react";

export default function InventoryCatalogPage() {
  const router = useRouter();
  const [tagQuery, setTagQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<InventoryCategory | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<InventoryStatus | "all">("all");

  const catalog = useMemo(() => {
    return getInventoryCatalog({
      query: searchQuery,
      category: selectedCategory,
      status: selectedStatus,
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  const handleTagLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagQuery.trim()) {
      router.push(`/inventory/item/${encodeURIComponent(tagQuery.trim())}`);
    }
  };

  const getCategoryLabel = (category: InventoryCategory) => {
    switch (category) {
      case "gold_jewellery":
        return { label: "Gold Jewellery", color: "bg-amber-100 text-amber-900 border-amber-200" };
      case "diamond_jewellery":
        return { label: "Diamond Jewellery", color: "bg-blue-100 text-blue-900 border-blue-200" };
      case "bullion_coins":
        return { label: "Bullion Coins", color: "bg-yellow-100 text-yellow-950 border-yellow-300" };
      case "silver_articles":
        return { label: "Silver Articles", color: "bg-stone-100 text-stone-800 border-stone-300" };
    }
  };

  return (
    <div>
      <ErpPageHeader
        title="Inventory & Stock Catalog"
        description="Showroom inventory management with hallmarked item identification, weight specifications, and safe alphanumeric tag lookup (INV-01, INV-03, INV-04)."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Inventory", current: true },
        ]}
      />

      {/* Tag Search Spotlight Box (INV-01 Resolution) */}
      <section className="mb-6 rounded-xl border border-gold-300 bg-gradient-to-r from-gold-50/60 to-white p-5 shadow-sm" aria-label="Direct Tag Lookup">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-1.5">
            <Tag size={18} className="text-gold-700" aria-hidden="true" />
            <h2 className="text-base font-bold text-stone-900">
              Direct Barcode & Tag Lookup (INV-01)
            </h2>
          </div>
          <p className="text-xs text-stone-600 mb-3 leading-relaxed">
            Scan barcode or enter alphanumeric item tag (e.g. <span className="font-mono font-bold text-stone-900">TAG-GLD-101</span>) or BIS HUID.
            Direct lookup resolves safely with a controlled not-found state for non-existent tags, eliminating raw backend database UUID errors.
          </p>

          <form onSubmit={handleTagLookup} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                id="inventory-tag-search"
                type="text"
                value={tagQuery}
                onChange={(e) => setTagQuery(e.target.value)}
                placeholder="Scan or enter tag (e.g. TAG-GLD-101, TAG-DIA-201, HUID91)..."
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-stone-300 text-sm font-mono text-stone-900 bg-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              <span>Look Up Tag</span>
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="mt-2.5 flex items-center flex-wrap gap-2 text-xs text-stone-500">
            <span>Try sample tags:</span>
            {["TAG-GLD-101", "TAG-GLD-102", "TAG-DIA-201", "TAG-COI-301", "TAG-SLV-401", "TAG-UNKNOWN-99"].map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => router.push(`/inventory/item/${encodeURIComponent(sample)}`)}
                className="font-mono text-[11px] px-2 py-0.5 rounded bg-white text-stone-700 hover:bg-gold-100 hover:text-stone-950 border border-stone-200 transition-colors"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog Filters */}
      <section className="mb-6 rounded-xl border border-stone-200 bg-white p-4 shadow-sm" aria-label="Catalog Filters">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              id="catalog-text-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter catalog by title, HUID, or metal purity..."
              className="w-full pl-9 pr-8 py-2 rounded-lg border border-stone-300 text-sm bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <XCircle size={16} />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center flex-wrap gap-1.5 p-1 bg-stone-100 rounded-lg text-xs font-medium" role="tablist">
            {(
              [
                { id: "all", label: "All Stock" },
                { id: "gold_jewellery", label: "Gold" },
                { id: "diamond_jewellery", label: "Diamond" },
                { id: "bullion_coins", label: "Coins" },
                { id: "silver_articles", label: "Silver" },
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

      {/* Inventory Catalog Table / Cards */}
      {catalog.length === 0 ? (
        <div className="rounded-xl border border-dashed border-stone-300 bg-white p-12 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 mb-3">
            <Boxes size={24} />
          </div>
          <h3 className="text-base font-bold text-stone-900">
            No inventory items found
          </h3>
          <p className="mt-1 text-xs text-stone-500 max-w-sm mx-auto">
            No items match &ldquo;{searchQuery}&rdquo;. Try clearing filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block rounded-xl border border-stone-200 bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm" aria-label="Inventory Stock Table">
                <thead className="bg-stone-50 border-b border-stone-200 text-xs uppercase font-bold tracking-wider text-stone-600">
                  <tr>
                    <th scope="col" className="px-4 py-3">Item Tag & HUID</th>
                    <th scope="col" className="px-4 py-3">Description</th>
                    <th scope="col" className="px-4 py-3">Category & Purity</th>
                    <th scope="col" className="px-4 py-3 text-right">Gross Wt (g)</th>
                    <th scope="col" className="px-4 py-3 text-right">Net Wt (g)</th>
                    <th scope="col" className="px-4 py-3 text-right">Approx Retail (₹)</th>
                    <th scope="col" className="px-4 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {catalog.map((item) => {
                    const catBadge = getCategoryLabel(item.category);

                    return (
                      <tr key={item.id} className="hover:bg-amber-50/40 transition-colors group">
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="flex flex-col gap-0.5">
                            <Link
                              href={`/inventory/item/${encodeURIComponent(item.tag)}`}
                              className="font-mono text-xs font-bold text-stone-900 hover:text-gold-700 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded"
                            >
                              <Tag size={13} className="text-gold-600" />
                              <span>{item.tag}</span>
                            </Link>
                            <span className="font-mono text-[11px] text-stone-500">
                              HUID: {item.huid}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="flex flex-col">
                            <Link
                              href={`/inventory/item/${encodeURIComponent(item.tag)}`}
                              className="font-medium text-stone-900 hover:text-gold-700"
                            >
                              {item.title}
                            </Link>
                            <span className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                              <MapPin size={11} className="text-stone-400" />
                              {item.location}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="flex flex-col gap-1">
                            <span className={`inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider border w-fit ${catBadge.color}`}>
                              {catBadge.label}
                            </span>
                            <span className="text-xs font-mono font-semibold text-stone-700">
                              {item.purity}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-3.5 text-right font-mono text-xs text-stone-800 whitespace-nowrap">
                          {formatGoldWeight(item.grossWeightGrams)}
                        </td>

                        <td className="px-4 py-3.5 text-right font-mono text-xs font-bold text-gold-950 whitespace-nowrap">
                          {formatGoldWeight(item.netWeightGrams)}
                        </td>

                        <td className="px-4 py-3.5 text-right font-mono text-xs font-bold text-stone-900 whitespace-nowrap">
                          {formatIndianCurrency(item.approxRetailPrice)}
                        </td>

                        <td className="px-4 py-3.5 text-center whitespace-nowrap">
                          <Link
                            href={`/inventory/item/${encodeURIComponent(item.tag)}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-xs font-semibold text-stone-700 hover:bg-stone-50 hover:text-stone-950 shadow-2xs transition-colors"
                          >
                            <span>Inspect</span>
                            <ArrowRight size={12} className="text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card List (< 768px) */}
          <div className="md:hidden space-y-3" aria-label="Inventory Mobile Cards">
            {catalog.map((item) => {
              const catBadge = getCategoryLabel(item.category);

              return (
                <div key={item.id} className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`/inventory/item/${encodeURIComponent(item.tag)}`}
                        className="font-bold text-base text-stone-950 hover:text-gold-700 block"
                      >
                        {item.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-xs font-semibold text-stone-600">
                          {item.tag}
                        </span>
                        <span className="text-stone-400 text-xs">•</span>
                        <span className="font-mono text-xs text-stone-500">
                          HUID: {item.huid}
                        </span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border shrink-0 ${catBadge.color}`}>
                      {catBadge.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-stone-100">
                    <div>
                      <span className="text-stone-500 block">Purity & Net Wt:</span>
                      <span className="font-mono font-semibold text-stone-900">
                        {item.purity} • {formatGoldWeight(item.netWeightGrams)}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Retail Price:</span>
                      <span className="font-mono font-bold text-stone-950">
                        {formatIndianCurrency(item.approxRetailPrice)}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/inventory/item/${encodeURIComponent(item.tag)}`}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-stone-100 text-stone-800 text-xs font-semibold hover:bg-stone-200 transition-colors"
                  >
                    <span>View Item Specs & Barcode</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
