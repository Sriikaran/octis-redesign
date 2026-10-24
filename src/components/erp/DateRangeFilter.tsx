"use client";

import React, { useState, useEffect, useId } from "react";
import { Calendar, ChevronDown, Check, AlertCircle } from "lucide-react";
import {
  DatePreset,
  DateRangeValue,
  calculateDateRangeFromPreset,
  validateCustomRange,
} from "@/lib/erp/dateRangeUtils";

export type { DatePreset, DateRangeValue };
export { calculateDateRangeFromPreset, validateCustomRange };

export interface DateRangeFilterProps {
  value?: DateRangeValue;
  onChange?: (range: DateRangeValue) => void;
  referenceDate?: Date; // Allows deterministic testing
  className?: string;
  disabled?: boolean;
  unsupportedNotice?: string;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  value,
  onChange,
  referenceDate,
  className = "",
  disabled = false,
  unsupportedNotice,
}) => {
  const customId = useId();
  const [internalPreset, setInternalPreset] = useState<DatePreset>(
    value?.preset || "today"
  );

  const initialRange = calculateDateRangeFromPreset(internalPreset, referenceDate);
  const [customStart, setCustomStart] = useState<string>(value?.startDate || initialRange.startDate);
  const [customEnd, setCustomEnd] = useState<string>(value?.endDate || initialRange.endDate);
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [customError, setCustomError] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      setInternalPreset(value.preset);
      setCustomStart(value.startDate);
      setCustomEnd(value.endDate);
    }
  }, [value]);

  const handlePresetSelect = (preset: DatePreset) => {
    if (disabled) return;
    setInternalPreset(preset);
    setCustomError(null);

    if (preset === "custom") {
      setIsCustomOpen(true);
      return;
    }

    setIsCustomOpen(false);
    const range = calculateDateRangeFromPreset(preset, referenceDate);
    onChange?.({
      preset,
      startDate: range.startDate,
      endDate: range.endDate,
      formattedLabel: range.label,
    });
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCustomRange(customStart, customEnd);
    if (!validation.isValid) {
      setCustomError(validation.error || "Invalid date range.");
      return;
    }

    setCustomError(null);
    setIsCustomOpen(false);
    onChange?.({
      preset: "custom",
      startDate: customStart,
      endDate: customEnd,
      formattedLabel: `${customStart} to ${customEnd}`,
    });
  };

  const PRESET_OPTIONS: { id: DatePreset; label: string }[] = [
    { id: "today", label: "Today" },
    { id: "yesterday", label: "Yesterday" },
    { id: "last_7_days", label: "Last 7D" },
    { id: "month_to_date", label: "This Month" },
    { id: "custom", label: "Custom Range" },
  ];

  return (
    <div className={`relative inline-flex flex-col gap-1.5 ${className}`}>
      {/* Preset Pill Bar */}
      <div
        role="radiogroup"
        aria-label="Select Date Range Filter"
        className="inline-flex items-center flex-wrap gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200 text-xs shadow-2xs"
      >
        <span className="sr-only">Date Range Presets</span>
        <Calendar size={13} className="text-stone-400 ml-1.5 mr-0.5 shrink-0" aria-hidden="true" />

        {PRESET_OPTIONS.map((opt) => {
          const isSelected = internalPreset === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => handlePresetSelect(opt.id)}
              className={`px-2.5 py-1 rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                isSelected
                  ? "bg-white text-stone-900 font-semibold shadow-xs border border-stone-200/80"
                  : "text-stone-600 hover:text-stone-950 hover:bg-stone-200/50"
              } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Custom Date Range Popover */}
      {isCustomOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Custom Date Range Picker"
          className="absolute top-full left-0 mt-2 z-50 w-72 rounded-xl border border-stone-300 bg-white p-4 shadow-xl text-xs animate-in fade-in duration-150"
        >
          <div className="flex items-center justify-between mb-3 border-b border-stone-100 pb-2">
            <span className="font-bold text-stone-900 flex items-center gap-1.5">
              <Calendar size={14} className="text-gold-600" />
              Specify Custom Range
            </span>
            <button
              type="button"
              onClick={() => setIsCustomOpen(false)}
              className="text-stone-400 hover:text-stone-700 font-semibold"
              aria-label="Close custom range picker"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleApplyCustom} className="space-y-3">
            <div>
              <label
                htmlFor={`${customId}-start`}
                className="block font-semibold text-stone-700 mb-1"
              >
                From (Start Date):
              </label>
              <input
                id={`${customId}-start`}
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 bg-stone-50 font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor={`${customId}-end`}
                className="block font-semibold text-stone-700 mb-1"
              >
                To (End Date):
              </label>
              <input
                id={`${customId}-end`}
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 bg-stone-50 font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                required
              />
            </div>

            {customError && (
              <div
                role="alert"
                className="rounded-md bg-red-50 border border-red-200 p-2 text-red-800 text-[11px] flex items-start gap-1.5"
              >
                <AlertCircle size={14} className="shrink-0 mt-0.5 text-red-600" />
                <span>{customError}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-1 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setIsCustomOpen(false)}
                className="px-3 py-1.5 rounded-md text-stone-600 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-md bg-stone-900 text-white font-semibold hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                Apply Range
              </button>
            </div>
          </form>
        </div>
      )}

      {unsupportedNotice && (
        <span className="text-[10px] text-stone-400 italic">
          {unsupportedNotice}
        </span>
      )}
    </div>
  );
};
