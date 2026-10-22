import React from "react";
import {
  formatIndianCurrency,
  resolveFinancialDirection,
  PartyRole,
  FinancialDirection,
} from "@/lib/erp/formatters";
import { ArrowUpRight, ArrowDownLeft, CheckCircle2, AlertCircle } from "lucide-react";

interface SemanticBalanceBadgeProps {
  amount: number;
  role?: PartyRole;
  showAmount?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  forceDirection?: FinancialDirection;
}

/**
 * SemanticBalanceBadge resolves GEN-01 by explicitly stating what an outstanding
 * balance means (e.g. "We Owe Vendor" vs "Customer Owes" vs "Store Credit").
 * Never relies on color alone — incorporates clear labels, icons, and accessible aria descriptions.
 */
export const SemanticBalanceBadge: React.FC<SemanticBalanceBadgeProps> = ({
  amount,
  role = "vendor",
  showAmount = true,
  size = "md",
  className = "",
  forceDirection,
}) => {
  const semantic = resolveFinancialDirection(amount, role);
  const formattedAmount = formatIndianCurrency(amount, { useAbsolute: true });

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
    lg: "text-sm px-3.5 py-1.5 gap-2",
  };

  // Color & border styles matching Octis palette and financial meaning
  // Each has distinct icon, text, and border for accessible non-color discrimination
  const variantStyles = {
    // We owe money to vendor (Payable): amber/orange tone with outgoing arrow
    payable: "bg-amber-50 text-amber-900 border-amber-300 ring-1 ring-amber-200/50",
    // Customer owes money to showroom (Receivable): blue/navy tone with incoming arrow
    receivable: "bg-blue-50 text-blue-900 border-blue-300 ring-1 ring-blue-200/50",
    // Customer has advance/store credit (Store Credit): emerald tone with credit shield/check
    credit: "bg-emerald-50 text-emerald-900 border-emerald-300 ring-1 ring-emerald-200/50",
    // Vendor owes money / advance paid to vendor: purple/indigo tone
    advance: "bg-purple-50 text-purple-900 border-purple-300 ring-1 ring-purple-200/50",
    // Settled account: neutral stone
    settled: "bg-stone-100 text-stone-700 border-stone-200",
  };

  const currentVariant = semantic.badgeVariant;

  const renderIcon = () => {
    const iconSize = size === "sm" ? 12 : size === "md" ? 14 : 16;
    switch (currentVariant) {
      case "payable":
        return <ArrowUpRight size={iconSize} className="shrink-0 text-amber-700" aria-hidden="true" />;
      case "receivable":
        return <ArrowDownLeft size={iconSize} className="shrink-0 text-blue-700" aria-hidden="true" />;
      case "credit":
        return <CheckCircle2 size={iconSize} className="shrink-0 text-emerald-700" aria-hidden="true" />;
      case "advance":
        return <ArrowDownLeft size={iconSize} className="shrink-0 text-purple-700" aria-hidden="true" />;
      case "settled":
      default:
        return <CheckCircle2 size={iconSize} className="shrink-0 text-stone-500" aria-hidden="true" />;
    }
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-md border ${sizeClasses[size]} ${variantStyles[currentVariant]} ${className}`}
      title={semantic.ariaDescription}
      aria-label={`${semantic.label}: ${formattedAmount}`}
    >
      {renderIcon()}
      <span className="font-semibold tracking-wide uppercase text-[10px]">
        {semantic.shortLabel}
      </span>
      {showAmount && !semantic.isZero && (
        <span className="font-bold font-mono pl-1 border-l border-current/20">
          {formattedAmount}
        </span>
      )}
    </span>
  );
};
