import React from "react";
import Link from "next/link";
import { ErpPageHeader } from "@/components/erp/ErpPageHeader";
import { Receipt, Calendar, ArrowRight } from "lucide-react";

export default function NewSaleTerminalPlaceholderPage() {
  return (
    <div>
      <ErpPageHeader
        title="POS Billing Terminal"
        description="Cashier billing checkout terminal with integrated metal exchange deduction."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Sales", href: "/sales" },
          { label: "New Sale", current: true },
        ]}
        backHref="/sales"
      />

      <div className="max-w-2xl mx-auto rounded-xl border border-stone-200 bg-white p-8 text-center shadow-sm">
        <div className="w-14 h-14 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center mx-auto mb-4">
          <Receipt size={28} />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold mb-3 border border-stone-200">
          <Calendar size={13} />
          <span>Scheduled for Phase 6C</span>
        </div>
        <h2 className="text-xl font-bold text-stone-900 mb-2">
          New Cashier Terminal (POS-01, POS-02)
        </h2>
        <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed mb-6">
          Phase 6C will implement the high-speed billing interface with scanner input, GST breakdown,
          and old gold scrap deduction.
        </p>

        <Link
          href="/dashboard"
          className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
