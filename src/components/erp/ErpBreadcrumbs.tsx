import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface ErpBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const ErpBreadcrumbs: React.FC<ErpBreadcrumbsProps> = ({
  items,
  className = "",
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-xs text-stone-500 font-medium ${className}`}
    >
      <ol className="flex items-center flex-wrap gap-1.5 list-none p-0 m-0">
        <li>
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-stone-500 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded px-1 py-0.5"
            title="ERP Dashboard"
          >
            <Home size={13} aria-hidden="true" />
            <span className="sr-only">Dashboard</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.current;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              <ChevronRight size={12} className="text-stone-400 shrink-0" aria-hidden="true" />
              {isLast || !item.href ? (
                <span
                  className="font-semibold text-stone-900 px-1 py-0.5"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-stone-600 hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded px-1 py-0.5"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
