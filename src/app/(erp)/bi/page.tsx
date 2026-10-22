import React from "react";
import Link from "next/link";
import { ErpPageHeader } from "@/components/erp/ErpPageHeader";
import { BarChart3, Calendar, ArrowRight } from "lucide-react";

export default function BiModulePlaceholderPage() {
  return (
    <div>
      <ErpPageHeader
        title="Business Intelligence & Analytics Hub"
        description="Jewellery operational analytics, bullion price exposure, stock turnaround, and risk hierarchy graphs."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Business Intelligence", current: true },
        ]}
      />

      <div className="max-w-2xl mx-auto rounded-xl border border-stone-200 bg-white p-8 text-center shadow-sm">
        <div className="w-14 h-14 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center mx-auto mb-4">
          <BarChart3 size={28} />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold mb-3 border border-stone-200">
          <Calendar size={13} />
          <span>Scheduled for Phase 6F (Business Intelligence & Graph Drill-Through)</span>
        </div>
        <h2 className="text-xl font-bold text-stone-900 mb-2">
          BI & Analytics Module (BI-01 to BI-06)
        </h2>
        <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed mb-6">
          Phase 6F will implement labeled analytics tabs (BI-01), strict Indian Rupee formatting (BI-02),
          graph viewport auto-fit and zoom controls (BI-03), deep-link drawer (BI-04), and unified date filtering (BI-05).
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
          >
            Back to Dashboard
          </Link>
          <Link
            href="/parties"
            className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors flex items-center gap-1"
          >
            <span>View Reconciled Parties</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
