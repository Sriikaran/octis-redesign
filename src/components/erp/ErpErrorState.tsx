import React from "react";
import { AlertOctagon, RotateCcw, Home, LucideIcon } from "lucide-react";

export interface ErpErrorStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  onRetry?: () => void;
  returnHref?: string;
  returnLabel?: string;
  diagnosticId?: string;
  className?: string;
}

export const ErpErrorState: React.FC<ErpErrorStateProps> = ({
  title,
  description,
  icon: Icon = AlertOctagon,
  onRetry,
  returnHref = "/dashboard",
  returnLabel = "Return to Dashboard",
  diagnosticId,
  className = "",
}) => {
  return (
    <div
      role="alert"
      className={`rounded-xl border border-stone-200 bg-white p-6 sm:p-10 text-center max-w-lg mx-auto shadow-sm ${className}`}
    >
      <div className="mx-auto w-12 h-12 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center mb-3.5">
        <Icon size={24} aria-hidden="true" />
      </div>

      <h3 className="text-base font-bold text-stone-900 font-sans">
        {title}
      </h3>

      <p className="mt-1.5 text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
        {description}
      </p>

      {diagnosticId && (
        <div className="mt-3 inline-block rounded bg-stone-100 px-2 py-0.5 text-[10px] font-mono text-stone-500">
          Ref ID: {diagnosticId}
        </div>
      )}

      <div className="mt-6 flex items-center justify-center flex-wrap gap-2.5">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 shadow-xs"
          >
            <RotateCcw size={13} />
            <span>Try Again</span>
          </button>
        )}

        {returnHref && (
          <a
            href={returnHref}
            className="px-4 py-2 rounded-lg border border-stone-300 bg-white text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          >
            <Home size={13} />
            <span>{returnLabel}</span>
          </a>
        )}
      </div>
    </div>
  );
};
