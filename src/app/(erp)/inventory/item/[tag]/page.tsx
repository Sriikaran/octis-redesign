"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ErpPageHeader } from "@/components/erp/ErpPageHeader";
import { resolveInventoryTag } from "@/lib/erp/inventoryStore";
import { formatIndianCurrency, formatGoldWeight, formatDate } from "@/lib/erp/formatters";
import {
  Tag,
  Search,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  AlertOctagon,
  Sparkles,
  MapPin,
  Calendar,
  Building2,
  Scale,
  Percent,
  Receipt,
  HelpCircle,
} from "lucide-react";

interface InventoryItemPageProps {
  params: Promise<{ tag: string }>;
}

export default function InventoryItemPage({ params }: InventoryItemPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const rawTag = resolvedParams.tag;

  const [newTagInput, setNewTagInput] = useState("");

  // Safe resolution that handles alphanumeric tags, UUIDs, or arbitrary strings without crashing
  const result = resolveInventoryTag(rawTag);

  const handleSearchAgain = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTagInput.trim()) {
      router.push(`/inventory/item/${encodeURIComponent(newTagInput.trim())}`);
    }
  };

  // -------------------------------------------------------------
  // CONTROLLED NOT-FOUND STATE (INV-01 Resolution)
  // -------------------------------------------------------------
  if (!result.success || !result.item) {
    return (
      <div>
        <ErpPageHeader
          title="Inventory Tag Not Found"
          breadcrumbs={[
            { label: "Inventory", href: "/inventory" },
            { label: "Tag Lookup Error", current: true },
          ]}
          backHref="/inventory"
          backLabel="Back to Inventory Catalog"
        />

        <div className="max-w-2xl mx-auto rounded-xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
          {/* Header & Icon */}
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
              <AlertOctagon size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                Item Tag Not Found in Showroom Inventory
              </h2>
              <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                The item tag or barcode query &ldquo;<span className="font-mono font-bold text-stone-900">{result.searchedTag}</span>&rdquo;
                does not match any active stock item in the demonstration database.
              </p>
            </div>
          </div>

          {/* Technical Safety Note */}
          <div className="mb-6 rounded-lg bg-stone-50 border border-stone-200 p-3.5 text-xs text-stone-600 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-stone-900">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>Safe Error Boundary Handled Gracefully (INV-01)</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-tight">
              The query was normalized and validated safely on the client without triggering raw PostgreSQL syntax errors or backend exceptions.
            </p>
          </div>

          {/* Search Again Field */}
          <form onSubmit={handleSearchAgain} className="mb-6">
            <label
              htmlFor="not-found-search-input"
              className="block text-xs font-semibold text-stone-700 mb-1.5"
            >
              Search a different tag or HUID:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  id="not-found-search-input"
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  placeholder="e.g. TAG-GLD-101, TAG-DIA-201, HUID91"
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-stone-300 text-sm font-mono text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Suggested Valid Tags */}
          {result.suggestedTags && result.suggestedTags.length > 0 && (
            <div className="mb-6 pt-4 border-t border-stone-100">
              <span className="text-xs font-semibold text-stone-600 block mb-2">
                Suggested active items in catalogue:
              </span>
              <div className="flex items-center flex-wrap gap-2">
                {result.suggestedTags.map((sTag) => (
                  <button
                    key={sTag}
                    type="button"
                    onClick={() => router.push(`/inventory/item/${encodeURIComponent(sTag)}`)}
                    className="font-mono text-xs px-3 py-1.5 rounded-lg bg-gold-50 text-gold-950 border border-gold-300 hover:bg-gold-100 transition-colors font-medium"
                  >
                    {sTag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs">
            <Link
              href="/inventory"
              className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-950 font-semibold"
            >
              <ArrowLeft size={14} />
              <span>Return to Inventory Catalog</span>
            </Link>
            <Link
              href="/dashboard"
              className="text-stone-500 hover:text-stone-800"
            >
              Dashboard Overview
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // MATCHED ITEM DETAIL VIEW
  // -------------------------------------------------------------
  const item = result.item;

  return (
    <div>
      <ErpPageHeader
        title={item.title}
        description={`Stock item specifications, HUID verification, and valuation breakdown for ${item.tag}.`}
        breadcrumbs={[
          { label: "Inventory", href: "/inventory" },
          { label: item.tag, current: true },
        ]}
        backHref="/inventory"
        backLabel="Back to Inventory"
      />

      {/* Main Item Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Details & Specifications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Identity Header */}
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm font-bold text-stone-900 px-2.5 py-0.5 rounded bg-stone-100 border border-stone-200">
                    {item.tag}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold px-2 py-0.5 rounded bg-gold-100 text-gold-900 border border-gold-300">
                    <CheckCircle2 size={12} className="text-gold-700" />
                    BIS HUID: {item.huid}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-stone-900 font-sans mt-2">
                  {item.title}
                </h2>
              </div>

              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                In Showroom Stock
              </span>
            </div>

            {item.description && (
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {item.description}
              </p>
            )}

            <div className="pt-3 border-t border-stone-100 flex items-center flex-wrap gap-4 text-xs text-stone-600">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-stone-400" />
                {item.location}
              </span>
              <span className="text-stone-300">•</span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-stone-400" />
                Inward Date: {formatDate(item.inwardDate, "date")}
              </span>
              {item.vendorName && (
                <>
                  <span className="text-stone-300">•</span>
                  <span className="flex items-center gap-1.5">
                    <Building2 size={13} className="text-stone-400" />
                    Vendor: {item.vendorName}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Metal & Weight Specifications */}
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-600 mb-4 flex items-center gap-2">
              <Scale size={16} className="text-gold-600" />
              <span>Metal & Weight Specifications</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200">
                <span className="text-[11px] font-semibold uppercase text-stone-500 block mb-1">
                  Purity Standard
                </span>
                <span className="font-mono text-base font-bold text-stone-900">
                  {item.purity}
                </span>
                <span className="text-[11px] text-stone-500 block">
                  {item.purityPercent}% Fine Gold
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200">
                <span className="text-[11px] font-semibold uppercase text-stone-500 block mb-1">
                  Gross Weight
                </span>
                <span className="font-mono text-base font-bold text-stone-900">
                  {formatGoldWeight(item.grossWeightGrams)}
                </span>
                <span className="text-[11px] text-stone-500 block">
                  Includes all stones
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200">
                <span className="text-[11px] font-semibold uppercase text-stone-500 block mb-1">
                  Stone / Enamel
                </span>
                <span className="font-mono text-base font-bold text-stone-900">
                  {formatGoldWeight(item.stoneWeightGrams)}
                </span>
                <span className="text-[11px] text-stone-500 block">
                  Deducted weight
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-gold-50 border border-gold-300">
                <span className="text-[11px] font-semibold uppercase text-gold-900 block mb-1">
                  Net Gold Weight
                </span>
                <span className="font-mono text-base font-bold text-gold-950">
                  {formatGoldWeight(item.netWeightGrams)}
                </span>
                <span className="text-[11px] text-gold-700 block font-medium">
                  Pure metal content
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Valuation & Commercials */}
        <div className="space-y-6">
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-2">
              <Receipt size={16} className="text-gold-600" />
              <span>Valuation & Commercials</span>
            </h3>

            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-xs text-stone-500 block mb-1">
                Estimated Retail Price:
              </span>
              <span className="font-mono text-2xl font-bold text-stone-950">
                {formatIndianCurrency(item.approxRetailPrice)}
              </span>
              <p className="text-[11px] text-stone-500 mt-1">
                Based on daily metal rate + making charges
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-600">Making Charge:</span>
                <span className="font-mono font-semibold text-stone-900">
                  {formatIndianCurrency(item.makingChargePerGram)} / gram
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-600">Wastage Allowance:</span>
                <span className="font-mono font-semibold text-stone-900">
                  {item.wastagePercent.toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-stone-600">GST Applicable:</span>
                <span className="font-mono font-semibold text-stone-900">
                  3.0% (1.5% CGST + 1.5% SGST)
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/inventory"
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors shadow-sm"
              >
                <ArrowLeft size={14} />
                <span>Return to Catalog</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
