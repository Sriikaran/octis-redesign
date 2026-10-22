/**
 * Canonical formatting and financial semantics utilities for Octis ERP.
 * Complies with GEN-01 (explicit direction & non-color cues) and GEN-02 (consistent rounding & units).
 */

export interface CurrencyFormatOptions {
  showSymbol?: boolean;
  useAbsolute?: boolean;
  fallback?: string;
}

export interface WeightFormatOptions {
  unit?: "g" | "kg" | "mg";
  precision?: number;
  useAbsolute?: boolean;
  fallback?: string;
}

/**
 * Formats a monetary amount into standard Indian Rupee notation (₹ xx,xx,xxx.xx).
 * Always strictly enforces 2 decimal places to avoid discrepancy and truncation bugs.
 * Example: 5703278.8 -> "₹57,03,278.80"
 */
export function formatIndianCurrency(
  amount: number | null | undefined,
  options: CurrencyFormatOptions = {}
): string {
  const { showSymbol = true, useAbsolute = false, fallback = "—" } = options;

  if (amount === null || amount === undefined || isNaN(amount)) {
    return fallback;
  }

  const val = useAbsolute ? Math.abs(amount) : amount;
  const isNegative = val < 0;
  const absVal = Math.abs(val);

  // Use Intl.NumberFormat for en-IN locale
  const formattedNumber = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(absVal);

  const prefix = showSymbol ? "₹" : "";
  const sign = isNegative ? "- " : "";

  return `${sign}${prefix}${formattedNumber}`;
}

/**
 * Formats metal weights with fixed precision and explicit units.
 * Default is grams ('g') with 3 decimal places (milligram accuracy standard in bullion/jewellery).
 * Example: 24.5 -> "24.500 g"
 */
export function formatGoldWeight(
  grams: number | null | undefined,
  options: WeightFormatOptions = {}
): string {
  const { unit = "g", precision = 3, useAbsolute = false, fallback = "—" } = options;

  if (grams === null || grams === undefined || isNaN(grams)) {
    return fallback;
  }

  const val = useAbsolute ? Math.abs(grams) : grams;
  const isNegative = val < 0;
  const absVal = Math.abs(val);

  // Accurate decimal rounding to avoid IEEE 754 binary floating representation issues
  const factor = Math.pow(10, precision);
  const rounded = Math.round((absVal + Number.EPSILON) * factor) / factor;
  const formattedNumber = rounded.toFixed(precision);
  const sign = isNegative ? "- " : "";

  return `${sign}${formattedNumber} ${unit}`;
}

/**
 * Consistent date and time formatting using standard Indian business conventions.
 * Example: "14 Oct 2024" or "14 Oct 2024, 04:30 PM"
 */
export function formatDate(
  dateInput: string | number | Date | null | undefined,
  mode: "date" | "datetime" | "time" = "date"
): string {
  if (!dateInput) return "—";

  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "—";

  const day = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  if (mode === "date") return day;

  const time = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  if (mode === "time") return time;
  return `${day}, ${time}`;
}

export type PartyRole = "customer" | "vendor" | "bullion_dealer";

export type FinancialDirection =
  | "customer_owes" // Customer owes money to showroom (Receivable)
  | "customer_credit" // Customer has deposit / credit in store
  | "we_owe_vendor" // Showroom owes vendor for inventory (Payable)
  | "vendor_owes_us" // Vendor owes showroom (Advance paid / return)
  | "payable" // Generic payable
  | "receivable" // Generic receivable
  | "settled"; // Zero balance

export interface DirectionSemantic {
  direction: FinancialDirection;
  label: string;
  shortLabel: string;
  badgeVariant: "receivable" | "payable" | "credit" | "advance" | "settled";
  isZero: boolean;
  ariaDescription: string;
}

/**
 * Resolves unambiguous financial meaning based on party category and amount.
 * Solves GEN-01 by pairing direction with explicit plain-English text.
 */
export function resolveFinancialDirection(
  amount: number,
  role: PartyRole = "vendor"
): DirectionSemantic {
  if (Math.abs(amount) < 0.01) {
    return {
      direction: "settled",
      label: "Settled (Zero Balance)",
      shortLabel: "Settled",
      badgeVariant: "settled",
      isZero: true,
      ariaDescription: "Account balance is completely settled with zero outstanding.",
    };
  }

  if (role === "customer") {
    if (amount > 0) {
      return {
        direction: "customer_owes",
        label: "Customer Owes (Balance Due)",
        shortLabel: "Customer Owes",
        badgeVariant: "receivable",
        isZero: false,
        ariaDescription: "Customer owes this amount to the showroom.",
      };
    } else {
      return {
        direction: "customer_credit",
        label: "Store Credit (Advance Paid)",
        shortLabel: "Store Credit",
        badgeVariant: "credit",
        isZero: false,
        ariaDescription: "Customer has store credit or advance payment on file.",
      };
    }
  }

  // Vendors & Bullion Dealers
  // Positive amount indicates unpaid bill / payable; negative indicates advance paid to vendor
  if (amount > 0) {
    return {
      direction: "we_owe_vendor",
      label: "We Owe Vendor (Payable)",
      shortLabel: "We Owe Vendor",
      badgeVariant: "payable",
      isZero: false,
      ariaDescription: "Showroom owes this outstanding amount to the vendor.",
    };
  } else {
    return {
      direction: "vendor_owes_us",
      label: "Vendor Owes Us (Advance Paid)",
      shortLabel: "Vendor Owes Us",
      badgeVariant: "advance",
      isZero: false,
      ariaDescription: "Showroom has paid advance to this vendor or is owed a refund.",
    };
  }
}

export type MetalDirection = "metal_payable" | "metal_receivable" | "metal_settled";

export interface MetalDirectionSemantic {
  direction: MetalDirection;
  label: string;
  shortLabel: string;
  badgeVariant: "payable" | "receivable" | "settled";
  isZero: boolean;
  ariaDescription: string;
}

/**
 * Resolves metal balance direction (e.g. bullion purchase ledger).
 */
export function resolveMetalDirection(grams: number): MetalDirectionSemantic {
  if (Math.abs(grams) < 0.001) {
    return {
      direction: "metal_settled",
      label: "Metal Settled",
      shortLabel: "Settled",
      badgeVariant: "settled",
      isZero: true,
      ariaDescription: "Metal weight account is completely balanced.",
    };
  }

  if (grams > 0) {
    return {
      direction: "metal_payable",
      label: "Metal Payable (We Owe)",
      shortLabel: "Metal We Owe",
      badgeVariant: "payable",
      isZero: false,
      ariaDescription: "Showroom owes this weight of fine metal to the party.",
    };
  } else {
    return {
      direction: "metal_receivable",
      label: "Metal Receivable (Party Owes)",
      shortLabel: "Metal Party Owes",
      badgeVariant: "receivable",
      isZero: false,
      ariaDescription: "Party owes this weight of fine metal to the showroom.",
    };
  }
}
