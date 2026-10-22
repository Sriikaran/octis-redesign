import React from "react";
import Link from "next/link";
import { ErpBreadcrumbs, BreadcrumbItem } from "./ErpBreadcrumbs";
import { ArrowLeft, Clock, Info } from "lucide-react";
import { formatDate } from "@/lib/erp/formatters";
import { DEMO_SOURCE_TIMESTAMP } from "@/lib/erp/partyStore";

interface ErpPageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  backHref?: string;
  backLabel?: string;
  actions?: React.ReactNode;
  showTimestamp?: boolean;
  className?: string;
}

export const ErpPageHeader: React.FC<ErpPageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  backHref,
  backLabel = "Back",
  actions,
  showTimestamp = true,
  className = "",
}) => {
  return (
    <header className={`mb-6 flex flex-col gap-3 ${className}`}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <ErpBreadcrumbs items={breadcrumbs} />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3">
          {backHref && (
            <Link
              href={backHref}
              className="mt-1 p-2 rounded-lg border border-stone-200 bg-white text-stone-600 hover:text-stone-950 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 shadow-sm transition-colors"
              aria-label={backLabel}
            >
              <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          )}

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900 font-sans">
              {title}
            </h1>
            {description && (
              <p className="mt-1 text-sm text-stone-600 max-w-3xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>

        {actions && (
          <div className="flex items-center flex-wrap gap-2.5 shrink-0">
            {actions}
          </div>
        )}
      </div>

      {showTimestamp && (
        <div className="flex items-center flex-wrap gap-3 pt-1 text-xs text-stone-500 border-t border-stone-200/60">
          <span className="inline-flex items-center gap-1.5 text-stone-600 font-medium">
            <Clock size={12} className="text-stone-400" aria-hidden="true" />
            Demo Snapshot: {formatDate(DEMO_SOURCE_TIMESTAMP, "datetime")}
          </span>
          <span className="text-stone-300">•</span>
          <span className="inline-flex items-center gap-1 text-stone-500">
            <Info size={12} className="text-stone-400" aria-hidden="true" />
            Local Canonical Store Active (Mathematical Parity Guaranteed)
          </span>
        </div>
      )}
    </header>
  );
};
