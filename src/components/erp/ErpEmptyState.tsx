import React from "react";
import { FolderSearch, LucideIcon } from "lucide-react";

export interface ErpEmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  className?: string;
}

export const ErpEmptyState: React.FC<ErpEmptyStateProps> = ({
  title,
  description,
  icon: Icon = FolderSearch,
  action,
  secondaryAction,
  className = "",
}) => {
  return (
    <div
      role="status"
      className={`rounded-xl border border-dashed border-stone-300 bg-white p-8 sm:p-12 text-center max-w-lg mx-auto ${className}`}
    >
      <div className="mx-auto w-12 h-12 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center mb-3">
        <Icon size={24} aria-hidden="true" />
      </div>

      <h3 className="text-base font-bold text-stone-900 font-sans">
        {title}
      </h3>

      <p className="mt-1.5 text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
        {description}
      </p>

      {(action || secondaryAction) && (
        <div className="mt-5 flex items-center justify-center flex-wrap gap-2.5">
          {action && (
            action.href ? (
              <a
                href={action.href}
                className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 shadow-xs"
              >
                {action.label}
              </a>
            ) : (
              <button
                type="button"
                onClick={action.onClick}
                className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 shadow-xs"
              >
                {action.label}
              </button>
            )
          )}

          {secondaryAction && (
            secondaryAction.href ? (
              <a
                href={secondaryAction.href}
                className="px-4 py-2 rounded-lg border border-stone-300 bg-white text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                {secondaryAction.label}
              </a>
            ) : (
              <button
                type="button"
                onClick={secondaryAction.onClick}
                className="px-4 py-2 rounded-lg border border-stone-300 bg-white text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                {secondaryAction.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};
