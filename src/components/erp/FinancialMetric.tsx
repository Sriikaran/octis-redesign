import React from "react";
import { formatIndianCurrency, formatGoldWeight } from "@/lib/erp/formatters";
import { SemanticBalanceBadge } from "./SemanticBalanceBadge";
import { MetalBalanceBadge } from "./MetalBalanceBadge";
import { LucideIcon } from "lucide-react";

interface FinancialMetricProps {
  label: string;
  amount?: number | null;
  metalGrams?: number | null;
  directionLabel?: string;
  badgeType?: "financial" | "metal" | "custom";
  customBadge?: React.ReactNode;
  partyRole?: "customer" | "vendor" | "bullion_dealer";
  purity?: string;
  subtext?: string;
  icon?: LucideIcon;
  variant?: "default" | "highlight" | "danger" | "success" | "neutral";
  className?: string;
}

export const FinancialMetric: React.FC<FinancialMetricProps> = ({
  label,
  amount,
  metalGrams,
  directionLabel,
  badgeType = "financial",
  customBadge,
  partyRole = "vendor",
  purity,
  subtext,
  icon: Icon,
  variant = "default",
  className = "",
}) => {
  const cardThemes = {
    default: "bg-white border-stone-200/80 shadow-sm",
    highlight: "bg-gradient-to-br from-gold-50/50 to-white border-gold-300/80 shadow-sm",
    danger: "bg-red-50/40 border-red-200 shadow-sm",
    success: "bg-emerald-50/40 border-emerald-200 shadow-sm",
    neutral: "bg-stone-50/80 border-stone-200",
  };

  return (
    <div
      className={`rounded-xl border p-4 transition-all ${cardThemes[variant]} ${className}`}
      role="region"
      aria-label={`${label}: ${amount !== undefined ? formatIndianCurrency(amount) : ""}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          {label}
        </span>
        {Icon && (
          <div className="p-1.5 rounded-lg bg-stone-100 text-stone-600">
            <Icon size={16} aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        {/* Monetary metric */}
        {amount !== undefined && amount !== null && (
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tracking-tight text-stone-900">
              {formatIndianCurrency(amount)}
            </span>
          </div>
        )}

        {/* Metal metric */}
        {metalGrams !== undefined && metalGrams !== null && (
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono tracking-tight text-gold-900">
              {formatGoldWeight(metalGrams)}
            </span>
            {purity && (
              <span className="text-xs font-medium text-stone-600">
                ({purity})
              </span>
            )}
          </div>
        )}

        {/* Direction badge or custom status */}
        <div className="pt-1 flex flex-wrap items-center gap-1.5">
          {customBadge ? (
            customBadge
          ) : badgeType === "financial" && amount !== undefined && amount !== null ? (
            <SemanticBalanceBadge amount={amount} role={partyRole} showAmount={false} size="sm" />
          ) : badgeType === "metal" && metalGrams !== undefined && metalGrams !== null ? (
            <MetalBalanceBadge grams={metalGrams} purity={purity} showGrams={false} size="sm" />
          ) : null}

          {directionLabel && (
            <span className="text-xs text-stone-600 font-medium">
              {directionLabel}
            </span>
          )}
        </div>

        {subtext && (
          <p className="text-xs text-stone-500 mt-1">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
};
