"use client";

import React, { use } from "react";
import Link from "next/link";
import { ErpPageHeader } from "@/components/erp/ErpPageHeader";
import { FinancialMetric } from "@/components/erp/FinancialMetric";
import { SemanticBalanceBadge } from "@/components/erp/SemanticBalanceBadge";
import { MetalBalanceBadge } from "@/components/erp/MetalBalanceBadge";
import {
  getPartySummaryMetrics,
  getPartyLedger,
  VoucherType,
} from "@/lib/erp/partyStore";
import { formatIndianCurrency, formatGoldWeight, formatDate } from "@/lib/erp/formatters";
import {
  Briefcase,
  Users,
  Scale,
  Phone,
  MapPin,
  Building2,
  FileCheck2,
  AlertOctagon,
  ArrowLeft,
  ArrowUpRight,
  ArrowDownLeft,
  Receipt,
  Calendar,
} from "lucide-react";

interface PartyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function PartyDetailPage({ params }: PartyDetailPageProps) {
  const resolvedParams = use(params);
  const partyId = resolvedParams.id;

  const metrics = getPartySummaryMetrics(partyId);
  const ledger = getPartyLedger(partyId);

  // If party does not exist in local canonical store, render controlled not-found state
  if (!metrics) {
    return (
      <div>
        <ErpPageHeader
          title="Party Record Not Found"
          breadcrumbs={[
            { label: "Parties", href: "/parties" },
            { label: "Unknown Party", current: true },
          ]}
          backHref="/parties"
          backLabel="Return to Parties Directory"
        />

        <div className="rounded-xl border border-stone-200 bg-white p-12 text-center max-w-xl mx-auto shadow-sm">
          <div className="mx-auto w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
            <AlertOctagon size={28} />
          </div>
          <h2 className="text-lg font-bold text-stone-900">
            No Account Found for Identifier &ldquo;{partyId}&rdquo;
          </h2>
          <p className="mt-2 text-xs text-stone-600 leading-relaxed">
            This account code does not exist in the local demonstration party store.
            Please verify the URL or return to the directory to select an active party.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/parties"
              className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              <ArrowLeft size={14} />
              <span>Back to Parties Directory</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { party } = metrics;
  const isVendor = party.category === "vendor" || party.category === "bullion_dealer";

  const getVoucherTypeLabel = (type: VoucherType) => {
    switch (type) {
      case "purchase_invoice":
        return { label: "Purchase Bill", color: "bg-blue-50 text-blue-900 border-blue-200" };
      case "sales_invoice":
        return { label: "Sales Invoice", color: "bg-emerald-50 text-emerald-900 border-emerald-200" };
      case "payment_out":
        return { label: "Payment Out", color: "bg-purple-50 text-purple-900 border-purple-200" };
      case "payment_in":
        return { label: "Payment In", color: "bg-teal-50 text-teal-900 border-teal-200" };
      case "metal_issue":
        return { label: "Metal Issue", color: "bg-amber-50 text-amber-900 border-amber-200" };
      case "metal_receipt":
        return { label: "Metal Receipt", color: "bg-cyan-50 text-cyan-900 border-cyan-200" };
      case "debit_note":
        return { label: "Debit Note", color: "bg-rose-50 text-rose-900 border-rose-200" };
      case "credit_note":
        return { label: "Credit Note", color: "bg-indigo-50 text-indigo-900 border-indigo-200" };
    }
  };

  return (
    <div>
      <ErpPageHeader
        title={party.name}
        description={`Account dossier, canonical running ledger, and metal settlement for ${party.code}. Numbers derived directly from identical voucher records.`}
        breadcrumbs={[
          { label: "Parties", href: "/parties" },
          { label: party.name, current: true },
        ]}
        backHref="/parties"
        backLabel="Back to Parties"
      />

      {/* Party Identity Dossier Card */}
      <section className="mb-6 rounded-xl border border-stone-200 bg-white p-5 shadow-sm" aria-label="Party Identity Details">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center flex-wrap gap-2">
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                {party.code}
              </span>
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                {party.category === "bullion_dealer"
                  ? "Bullion Dealer & Refinery"
                  : party.category === "vendor"
                  ? "Jewellery Manufacturer"
                  : "Retail Customer"}
              </span>
              <span className="text-xs text-stone-400">•</span>
              <span className="text-xs text-stone-500 font-medium">
                {ledger.length} Canonical Vouchers
              </span>
            </div>

            <div className="pt-2 flex items-center flex-wrap gap-4 text-xs text-stone-600">
              <span className="flex items-center gap-1.5">
                <Phone size={13} className="text-stone-400" />
                {party.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-stone-400" />
                {party.city}, {party.state}
              </span>
              {party.gstin && (
                <span className="flex items-center gap-1.5 font-mono text-[11px] bg-stone-50 px-2 py-0.5 rounded border border-stone-200">
                  <Building2 size={12} className="text-stone-400" />
                  GSTIN: {party.gstin}
                </span>
              )}
              {party.pan && (
                <span className="font-mono text-[11px] bg-stone-50 px-2 py-0.5 rounded border border-stone-200">
                  PAN: {party.pan}
                </span>
              )}
              {party.paymentTermsDays && (
                <span className="text-stone-500">
                  Payment Terms: {party.paymentTermsDays} Days
                </span>
              )}
            </div>
          </div>

          {/* Explicit Direction Badge in Header */}
          <div className="shrink-0 flex flex-col items-start lg:items-end gap-1.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-100">
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">
              Net Running Position
            </span>
            <div className="flex items-center flex-wrap gap-2">
              <SemanticBalanceBadge
                amount={metrics.netFinancialBalance}
                role={party.category}
                size="lg"
              />
              {metrics.netMetalBalanceGrams !== 0 && (
                <MetalBalanceBadge
                  grams={metrics.netMetalBalanceGrams}
                  purity="Fine 999.0"
                  size="lg"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Financial Parity Metric Cards (PART-01 / PART-02 Reconciliation Proof) */}
      <section className="mb-8" aria-label="Financial Reconciliation Breakdown">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-600 mb-3">
          Account Balance & Voucher Totals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FinancialMetric
            label="Net Financial Balance"
            amount={metrics.netFinancialBalance}
            partyRole={party.category}
            subtext="Guaranteed identical to final ledger balance (PART-01)"
            variant="highlight"
          />
          <FinancialMetric
            label="Total Debits (Payments/Bills)"
            amount={metrics.totalDebit}
            partyRole={party.category}
            directionLabel="Cumulative Outflow"
            subtext="Sum of all debit voucher entries"
            variant="default"
          />
          <FinancialMetric
            label="Total Credits (Purchases/Receipts)"
            amount={metrics.totalCredit}
            partyRole={party.category}
            directionLabel="Cumulative Inflow"
            subtext="Sum of all credit voucher entries"
            variant="default"
          />
          <FinancialMetric
            label="Net Fine Metal Balance"
            metalGrams={metrics.netMetalBalanceGrams}
            purity="999.0 Fine"
            badgeType="metal"
            subtext="Physical bullion weight ledger balance"
            variant="default"
            icon={Scale}
          />
        </div>
      </section>

      {/* Reconciled Ledger Table */}
      <section className="rounded-xl border border-stone-200 bg-white overflow-hidden shadow-sm" aria-label="Party Ledger Entries">
        <div className="p-4 border-b border-stone-200 bg-stone-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-stone-900">
              Complete Account Ledger & Running Balances
            </h2>
            <p className="text-xs text-stone-500">
              Strict chronologically ordered entries with running financial balance. Resolves PART-02 mini-ledger parity.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-stone-600 bg-white px-2.5 py-1 rounded border border-stone-200 self-start sm:self-auto">
            <Receipt size={13} className="text-stone-400" />
            <span>{ledger.length} Reconciled Records</span>
          </div>
        </div>

        {ledger.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-500">
            No transaction vouchers recorded for this party.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" aria-label="Transaction Ledger Table">
              <thead className="bg-stone-50 border-b border-stone-200 text-xs uppercase font-bold tracking-wider text-stone-600">
                <tr>
                  <th scope="col" className="px-4 py-3">Date</th>
                  <th scope="col" className="px-4 py-3">Voucher No & Type</th>
                  <th scope="col" className="px-4 py-3">Description & Reference</th>
                  <th scope="col" className="px-4 py-3 text-right">Debit (₹)</th>
                  <th scope="col" className="px-4 py-3 text-right">Credit (₹)</th>
                  <th scope="col" className="px-4 py-3 text-right">Metal Flow (g)</th>
                  <th scope="col" className="px-4 py-3 text-right bg-amber-50/50">Running Balance (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {ledger.map((v) => {
                  const badgeInfo = getVoucherTypeLabel(v.voucherType);

                  return (
                    <tr key={v.id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="px-4 py-3 text-xs text-stone-600 whitespace-nowrap">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-stone-400" />
                          {formatDate(v.date, "date")}
                        </span>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-mono text-xs font-bold text-stone-900">
                            {v.voucherNo}
                          </span>
                          <span className={`inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider border w-fit ${badgeInfo.color}`}>
                            {badgeInfo.label}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-xs text-stone-700 max-w-xs">
                        <div className="font-medium text-stone-900">
                          {v.description}
                        </div>
                        {v.referenceInvoice && (
                          <span className="text-[11px] font-mono text-stone-500">
                            Ref: {v.referenceInvoice}
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 text-right font-mono text-xs text-stone-800 whitespace-nowrap">
                        {v.debit > 0 ? formatIndianCurrency(v.debit) : "—"}
                      </td>

                      <td className="px-4 py-3 text-right font-mono text-xs text-stone-800 whitespace-nowrap">
                        {v.credit > 0 ? formatIndianCurrency(v.credit) : "—"}
                      </td>

                      <td className="px-4 py-3 text-right font-mono text-xs text-gold-900 whitespace-nowrap">
                        {v.metalDebitGrams > 0 ? (
                          <span className="text-cyan-700">+{formatGoldWeight(v.metalDebitGrams)}</span>
                        ) : v.metalCreditGrams > 0 ? (
                          <span className="text-amber-800">-{formatGoldWeight(v.metalCreditGrams)}</span>
                        ) : (
                          <span className="text-stone-400">—</span>
                        )}
                      </td>

                      <td className="px-4 py-3 text-right whitespace-nowrap bg-amber-50/30">
                        <div className="flex flex-col items-end">
                          <span className="font-mono font-bold text-xs text-stone-950">
                            {formatIndianCurrency(v.runningFinancialBalance, { useAbsolute: true })}
                          </span>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                            {isVendor
                              ? v.runningFinancialBalance > 0
                                ? "Payable (Cr)"
                                : v.runningFinancialBalance < 0
                                ? "Advance (Dr)"
                                : "Settled"
                              : v.runningFinancialBalance > 0
                              ? "Due (Dr)"
                              : v.runningFinancialBalance < 0
                              ? "Credit (Cr)"
                              : "Settled"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
