/**
 * Pure date range utilities and business logic for Octis ERP.
 * Supports standard Indian retail reporting presets:
 * - Today
 * - Yesterday
 * - Last 7 Days
 * - Month to Date
 * - Custom Range
 */

export type DatePreset = "today" | "yesterday" | "last_7_days" | "month_to_date" | "custom";

export interface DateRangeValue {
  preset: DatePreset;
  startDate: string; // ISO format: YYYY-MM-DD
  endDate: string; // ISO format: YYYY-MM-DD
  formattedLabel: string;
}

/**
 * Calculates start and end dates deterministically from a preset.
 * Normalized to local YYYY-MM-DD strings.
 */
export function calculateDateRangeFromPreset(
  preset: DatePreset,
  referenceDate: Date = new Date()
): { startDate: string; endDate: string; label: string } {
  const ref = new Date(referenceDate);
  ref.setHours(0, 0, 0, 0);

  const formatDateYMD = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const endStr = formatDateYMD(ref);

  switch (preset) {
    case "today":
      return {
        startDate: endStr,
        endDate: endStr,
        label: "Today",
      };

    case "yesterday": {
      const y = new Date(ref);
      y.setDate(y.getDate() - 1);
      const yStr = formatDateYMD(y);
      return {
        startDate: yStr,
        endDate: yStr,
        label: "Yesterday",
      };
    }

    case "last_7_days": {
      const past7 = new Date(ref);
      past7.setDate(past7.getDate() - 6);
      return {
        startDate: formatDateYMD(past7),
        endDate: endStr,
        label: "Last 7 Days",
      };
    }

    case "month_to_date": {
      const startOfMonth = new Date(ref.getFullYear(), ref.getMonth(), 1);
      return {
        startDate: formatDateYMD(startOfMonth),
        endDate: endStr,
        label: "Month to Date",
      };
    }

    case "custom":
    default:
      return {
        startDate: endStr,
        endDate: endStr,
        label: "Custom Range",
      };
  }
}

/**
 * Validates custom date ranges. Rejects inverted ranges (start > end).
 */
export function validateCustomRange(startDate: string, endDate: string): {
  isValid: boolean;
  error?: string;
} {
  if (!startDate || !endDate) {
    return { isValid: false, error: "Both start and end dates are required." };
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { isValid: false, error: "Invalid date format." };
  }

  if (start.getTime() > end.getTime()) {
    return {
      isValid: false,
      error: "Start date cannot be after end date. Please select a valid range.",
    };
  }

  return { isValid: true };
}
