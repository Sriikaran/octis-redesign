"use client";

import React, { useState } from "react";
import { ErpEmptyState } from "./ErpEmptyState";
import { ErpErrorState } from "./ErpErrorState";
import { Check } from "lucide-react";

export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T, index: number) => React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
  headerClassName?: string;
  priority?: "essential" | "medium" | "low"; // Controls responsive column hiding
}

export interface ResponsiveDataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  getRowId: (item: T, index: number) => string;
  ariaLabel: string;
  caption?: string;
  renderMobileCard?: (item: T, index: number, isSelected?: boolean) => React.ReactNode;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  isLoading?: boolean;
  errorMessage?: string;
  onRetryError?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
  tableClassName?: string;
}

export function ResponsiveDataTable<T>({
  data,
  columns,
  getRowId,
  ariaLabel,
  caption,
  renderMobileCard,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  isLoading = false,
  errorMessage,
  onRetryError,
  emptyTitle = "No records found",
  emptyDescription = "There are no records to display matching current criteria.",
  className = "",
  tableClassName = "",
}: ResponsiveDataTableProps<T>) {
  const [internalSelected, setInternalSelected] = useState<string[]>(selectedIds);

  const currentSelection = onSelectionChange ? selectedIds : internalSelected;

  const handleToggleSelectAll = () => {
    if (!selectable) return;
    const allIds = data.map((item, idx) => getRowId(item, idx));
    const isAllSelected = currentSelection.length === data.length && data.length > 0;
    const newSelection = isAllSelected ? [] : allIds;

    if (onSelectionChange) {
      onSelectionChange(newSelection);
    } else {
      setInternalSelected(newSelection);
    }
  };

  const handleToggleRow = (id: string) => {
    if (!selectable) return;
    const exists = currentSelection.includes(id);
    const newSelection = exists
      ? currentSelection.filter((item) => item !== id)
      : [...currentSelection, id];

    if (onSelectionChange) {
      onSelectionChange(newSelection);
    } else {
      setInternalSelected(newSelection);
    }
  };

  // Error state
  if (errorMessage) {
    return (
      <div className="py-6">
        <ErpErrorState
          title="Unable to load records"
          description={errorMessage}
          onRetry={onRetryError}
        />
      </div>
    );
  }

  // Loading skeleton state
  if (isLoading) {
    return (
      <div className={`rounded-xl border border-stone-200 bg-white p-6 shadow-sm ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-stone-200 rounded w-1/4" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 bg-stone-100 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <div className="py-6">
        <ErpEmptyState
          title={emptyTitle}
          description={emptyDescription}
        />
      </div>
    );
  }

  const isAllSelected = data.length > 0 && currentSelection.length === data.length;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Desktop Table View (>= 768px) */}
      <div className="hidden md:block rounded-xl border border-stone-200 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table
            className={`w-full text-left text-sm border-collapse ${tableClassName}`}
            aria-label={ariaLabel}
          >
            {caption && <caption className="sr-only">{caption}</caption>}
            <thead className="bg-stone-50 border-b border-stone-200 text-xs uppercase font-bold tracking-wider text-stone-600">
              <tr>
                {selectable && (
                  <th scope="col" className="w-10 px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleToggleSelectAll}
                      aria-label="Select all rows"
                      className="rounded border-stone-300 text-gold-600 focus:ring-gold-500 cursor-pointer"
                    />
                  </th>
                )}
                {columns.map((col) => {
                  const alignClass =
                    col.align === "right"
                      ? "text-right"
                      : col.align === "center"
                      ? "text-center"
                      : "text-left";

                  const priorityClass =
                    col.priority === "low"
                      ? "hidden xl:table-cell"
                      : col.priority === "medium"
                      ? "hidden lg:table-cell"
                      : "";

                  return (
                    <th
                      key={col.id}
                      scope="col"
                      className={`px-4 py-3 ${alignClass} ${priorityClass} ${col.headerClassName || ""}`}
                    >
                      {col.header}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {data.map((item, rowIdx) => {
                const id = getRowId(item, rowIdx);
                const isSelected = currentSelection.includes(id);

                return (
                  <tr
                    key={id}
                    aria-selected={selectable ? isSelected : undefined}
                    className={`transition-colors ${
                      isSelected
                        ? "bg-amber-50/80 font-medium"
                        : "hover:bg-amber-50/30"
                    }`}
                  >
                    {selectable && (
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleRow(id)}
                          aria-label={`Select row ${id}`}
                          className="rounded border-stone-300 text-gold-600 focus:ring-gold-500 cursor-pointer"
                        />
                      </td>
                    )}
                    {columns.map((col) => {
                      const alignClass =
                        col.align === "right"
                          ? "text-right"
                          : col.align === "center"
                          ? "text-center"
                          : "text-left";

                      const priorityClass =
                        col.priority === "low"
                          ? "hidden xl:table-cell"
                          : col.priority === "medium"
                          ? "hidden lg:table-cell"
                          : "";

                      return (
                        <td
                          key={col.id}
                          className={`px-4 py-3.5 ${alignClass} ${priorityClass} ${col.className || ""}`}
                        >
                          {col.cell
                            ? col.cell(item, rowIdx)
                            : col.accessorKey
                            ? String(item[col.accessorKey] ?? "—")
                            : "—"}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card / List Representation (< 768px) */}
      <div className="md:hidden space-y-3" aria-label={`${ariaLabel} Mobile Cards`}>
        {data.map((item, rowIdx) => {
          const id = getRowId(item, rowIdx);
          const isSelected = currentSelection.includes(id);

          if (renderMobileCard) {
            return (
              <div key={id} aria-selected={selectable ? isSelected : undefined}>
                {renderMobileCard(item, rowIdx, isSelected)}
              </div>
            );
          }

          // Default fallback card if custom mobile renderer is not supplied
          return (
            <div
              key={id}
              className={`rounded-xl border p-4 shadow-sm bg-white space-y-2.5 transition-all ${
                isSelected ? "border-gold-400 bg-gold-50/40 ring-1 ring-gold-300" : "border-stone-200"
              }`}
            >
              {selectable && (
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="text-xs font-mono font-semibold text-stone-600">
                    ID: {id}
                  </span>
                  <label className="flex items-center gap-1.5 text-xs text-stone-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleRow(id)}
                      className="rounded border-stone-300 text-gold-600 focus:ring-gold-500"
                    />
                    <span>Select</span>
                  </label>
                </div>
              )}

              <div className="space-y-1.5 text-xs">
                {columns.map((col) => (
                  <div key={col.id} className="flex items-start justify-between gap-2">
                    <span className="text-stone-500 shrink-0 font-medium">{col.header}:</span>
                    <span className="text-stone-900 text-right font-semibold">
                      {col.cell
                        ? col.cell(item, rowIdx)
                        : col.accessorKey
                        ? String(item[col.accessorKey] ?? "—")
                        : "—"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
