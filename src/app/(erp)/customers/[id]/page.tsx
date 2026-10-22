import React, { use } from "react";
import Link from "next/link";
import { ErpPageHeader } from "@/components/erp/ErpPageHeader";
import { Users, Calendar, ArrowLeft } from "lucide-react";

interface CustomerDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function CustomerDetailPlaceholderPage({ params }: CustomerDetailPageProps) {
  const resolvedParams = use(params);
  const customerId = resolvedParams.id;

  return (
    <div>
      <ErpPageHeader
        title={`Customer Dossier: ${customerId}`}
        description="Individual customer profile and KYC identity ledger."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Customers", href: "/customers" },
          { label: customerId, current: true },
        ]}
        backHref="/customers"
      />

      <div className="max-w-2xl mx-auto rounded-xl border border-stone-200 bg-white p-8 text-center shadow-sm">
        <div className="w-14 h-14 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center mx-auto mb-4">
          <Users size={28} />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold mb-3 border border-stone-200">
          <Calendar size={13} />
          <span>Scheduled for Phase 6E</span>
        </div>
        <h2 className="text-xl font-bold text-stone-900 mb-2">
          Customer Profile View (CUST-02 to CUST-05)
        </h2>
        <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed mb-6">
          Phase 6E will provide complete customer profile views with masked PAN/Aadhaar credentials and purchase histories.
        </p>

        <Link
          href="/parties"
          className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors inline-flex items-center gap-1.5"
        >
          <ArrowLeft size={14} />
          <span>Go to Reconciled Parties Directory</span>
        </Link>
      </div>
    </div>
  );
}
