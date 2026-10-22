import React from "react";
import Link from "next/link";
import { ErpPageHeader } from "@/components/erp/ErpPageHeader";
import { Users, Calendar, ArrowRight } from "lucide-react";

export default function CustomersModulePlaceholderPage() {
  return (
    <div>
      <ErpPageHeader
        title="Customer Management & Loyalty"
        description="Customer directory, KYC verification, purchase histories, and gold scheme memberships."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Customers", current: true },
        ]}
      />

      <div className="max-w-2xl mx-auto rounded-xl border border-stone-200 bg-white p-8 text-center shadow-sm">
        <div className="w-14 h-14 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center mx-auto mb-4">
          <Users size={28} />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold mb-3 border border-stone-200">
          <Calendar size={13} />
          <span>Scheduled for Phase 6E (Customers & KYC Dossier)</span>
        </div>
        <h2 className="text-xl font-bold text-stone-900 mb-2">
          Customer 360 & KYC Dossier Module
        </h2>
        <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed mb-6">
          Phase 6E will implement masked Aadhaar/PAN security controls (CUST-02), store credit badges (CUST-03),
          and comprehensive customer purchase timelines.
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
            <span>View Parties Directory</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
