import React from "react";
import { formatGoldWeight, resolveMetalDirection } from "@/lib/erp/formatters";
import { Scale, ArrowUpRight, ArrowDownLeft, CheckCircle2 } from "lucide-react";

interface MetalBalanceBadgeProps {
  grams: number;
  purity?: string; // e.g. "22K (916)" or "24K (999)"
  showGrams?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * MetalBalanceBadge displays fine bullion / gold balances with explicit weight units,
 * purity standard, and directional indicators ("Metal We Owe" vs "Metal Party Owes").
 */
export const MetalBalanceBadge: React.FC<MetalBalanceBadgeProps> = ({
  grams,
  purity,
  showGrams = true,
  size = "md",
  className = "",
}) => {
  const semantic = resolveMetalDirection(grams);
  const formattedWeight = formatGoldWeight(grams, { useAbsolute: true });

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
    lg: "text-sm px-3.5 py-1.5 gap-2",
  };

  const variantStyles = {
    payable: "bg-amber-50 text-amber-950 border-amber-300 ring-1 ring-amber-200/50",
    receivable: "bg-cyan-50 text-cyan-950 border-cyan-300 ring-1 ring-cyan-200/50",
    settled: "bg-stone-100 text-stone-700 border-stone-200",
  };

  const renderIcon = () => {
    const iconSize = size === "sm" ? 12 : size === "md" ? 14 : 16;
    if (semantic.direction === "metal_payable") {
      return <ArrowUpRight size={iconSize} className="shrink-0 text-amber-700" aria-hidden="true" />;
    }
    if (semantic.direction === "metal_receivable") {
      return <ArrowDownLeft size={iconSize} className="shrink-0 text-cyan-700" aria-hidden="true" />;
    }
    return <CheckCircle2 size={iconSize} className="shrink-0 text-stone-500" aria-hidden="true" />;
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-md border ${sizeClasses[size]} ${variantStyles[semantic.badgeVariant]} ${className}`}
      title={semantic.ariaDescription}
      aria-label={`${semantic.label}: ${formattedWeight}${purity ? ` @ ${purity}` : ""}`}
    >
      <Scale size={size === "sm" ? 12 : 14} className="shrink-0 text-gold-700" aria-hidden="true" />
      {renderIcon()}
      <span className="font-semibold tracking-wide uppercase text-[10px]">
        {semantic.shortLabel}
      </span>
      {showGrams && !semantic.isZero && (
        <span className="font-bold font-mono pl-1 border-l border-current/20">
          {formattedWeight}
        </span>
      )}
      {purity && (
        <span className="text-[10px] font-normal opacity-85 px-1 py-0.2 rounded bg-black/5">
          {purity}
        </span>
      )}
    </span>
  );
};
