/**
 * Canonical local demonstration Inventory store and safe tag resolution.
 * Directly addresses:
 * - INV-01: Safe alphanumeric tag lookup with controlled recovery state.
 *   Prevents crashes and unhandled exceptions (such as backend PostgreSQL UUID parse failures).
 * - INV-03: Strict stock categorization and item metadata integrity.
 * - INV-04: Clear naming, standardized casing, and responsive card views.
 */

export type InventoryCategory =
  | "gold_jewellery"
  | "diamond_jewellery"
  | "silver_articles"
  | "bullion_coins";

export type InventoryStatus = "in_stock" | "reserved" | "sold";

export interface InventoryItem {
  id: string;
  tag: string; // e.g. "TAG-GLD-101"
  huid: string; // 6-digit alphanumeric BIS Hallmark Unique Identification
  title: string;
  category: InventoryCategory;
  purity: string; // e.g. "22K (916)", "18K (750)", "24K (999)"
  purityPercent: number; // e.g. 91.6
  grossWeightGrams: number;
  netWeightGrams: number;
  stoneWeightGrams: number;
  makingChargePerGram: number;
  wastagePercent: number;
  approxRetailPrice: number;
  location: string;
  vendorId?: string;
  vendorName?: string;
  inwardDate: string;
  status: InventoryStatus;
  description?: string;
}

export const CANONICAL_INVENTORY: InventoryItem[] = [
  {
    id: "inv-item-001",
    tag: "TAG-GLD-101",
    huid: "HUID91",
    title: "22K Antique Temple Floral Choker",
    category: "gold_jewellery",
    purity: "22K (916)",
    purityPercent: 91.6,
    grossWeightGrams: 48.65,
    netWeightGrams: 46.2,
    stoneWeightGrams: 2.45,
    makingChargePerGram: 650,
    wastagePercent: 3.5,
    approxRetailPrice: 382450.0,
    location: "Main Showroom - Counter A1",
    vendorId: "pty-ven-002",
    vendorName: "Mahalaxmi Bombay Chains Ltd",
    inwardDate: "2024-09-15T11:00:00.000Z",
    status: "in_stock",
    description: "Handcrafted temple choker featuring ruby cabochons and south sea pearls.",
  },
  {
    id: "inv-item-002",
    tag: "TAG-GLD-102",
    huid: "HUID92",
    title: "22K Handcrafted Filigree Jhumkas",
    category: "gold_jewellery",
    purity: "22K (916)",
    purityPercent: 91.6,
    grossWeightGrams: 24.5,
    netWeightGrams: 24.5,
    stoneWeightGrams: 0.0,
    makingChargePerGram: 550,
    wastagePercent: 2.5,
    approxRetailPrice: 194800.0,
    location: "Main Showroom - Counter A2",
    vendorId: "pty-ven-002",
    vendorName: "Mahalaxmi Bombay Chains Ltd",
    inwardDate: "2024-09-18T14:30:00.000Z",
    status: "in_stock",
    description: "Classic Rajasthani three-tier jhumkas with delicate dangling beads.",
  },
  {
    id: "inv-item-003",
    tag: "TAG-DIA-201",
    huid: "HUID75",
    title: "18K White Gold Solitaire Halo Ring",
    category: "diamond_jewellery",
    purity: "18K (750)",
    purityPercent: 75.0,
    grossWeightGrams: 6.85,
    netWeightGrams: 5.95,
    stoneWeightGrams: 0.9,
    makingChargePerGram: 1200,
    wastagePercent: 4.0,
    approxRetailPrice: 165000.0,
    location: "Diamond Lounge - Case D",
    vendorId: "pty-ven-003",
    vendorName: "Trishul Diamond Atelier",
    inwardDate: "2024-08-28T16:00:00.000Z",
    status: "in_stock",
    description: "Center certified 0.75ct VVS-EF brilliant cut solitaire surrounded by pavé diamonds.",
  },
  {
    id: "inv-item-004",
    tag: "TAG-DIA-202",
    huid: "HUID76",
    title: "18K Rose Gold Tennis Bracelet",
    category: "diamond_jewellery",
    purity: "18K (750)",
    purityPercent: 75.0,
    grossWeightGrams: 16.2,
    netWeightGrams: 13.4,
    stoneWeightGrams: 2.8,
    makingChargePerGram: 1400,
    wastagePercent: 4.5,
    approxRetailPrice: 320000.0,
    location: "Diamond Lounge - Case B",
    vendorId: "pty-ven-003",
    vendorName: "Trishul Diamond Atelier",
    inwardDate: "2024-09-02T10:30:00.000Z",
    status: "in_stock",
    description: "Continuously set 4.50ct total diamond weight tennis bracelet with double safety latch.",
  },
  {
    id: "inv-item-005",
    tag: "TAG-COI-301",
    huid: "HUID99",
    title: "24K Lakshmi Ganesh Gold Coin (10g)",
    category: "bullion_coins",
    purity: "24K (999)",
    purityPercent: 99.9,
    grossWeightGrams: 10.0,
    netWeightGrams: 10.0,
    stoneWeightGrams: 0.0,
    makingChargePerGram: 150,
    wastagePercent: 0.0,
    approxRetailPrice: 79500.0,
    location: "Bullion Vault - Safe 1",
    vendorId: "pty-ven-001",
    vendorName: "Shree Ganesh Bullion & Refining",
    inwardDate: "2024-10-05T09:30:00.000Z",
    status: "in_stock",
    description: "Tamper-evident certicard minted fine bullion coin with assay stamp.",
  },
  {
    id: "inv-item-006",
    tag: "TAG-SLV-401",
    huid: "HUID92S",
    title: "92.5 Sterling Silver Puja Thali Set",
    category: "silver_articles",
    purity: "925 Silver",
    purityPercent: 92.5,
    grossWeightGrams: 550.0,
    netWeightGrams: 550.0,
    stoneWeightGrams: 0.0,
    makingChargePerGram: 45,
    wastagePercent: 1.5,
    approxRetailPrice: 58500.0,
    location: "Silver Gallery - Shelf S3",
    vendorId: "pty-ven-002",
    vendorName: "Mahalaxmi Bombay Chains Ltd",
    inwardDate: "2024-09-22T13:15:00.000Z",
    status: "in_stock",
    description: "Complete 7-piece carved floral silver thali set with diya, bell, and agarbatti stand.",
  },
];

export interface TagLookupResult {
  success: boolean;
  item: InventoryItem | null;
  searchedTag: string;
  normalizedTag: string;
  errorMessage?: string;
  suggestedTags?: string[];
  isRecoverable: boolean;
}

/**
 * Normalizes user-entered inventory tags safely:
 * - Trims whitespace
 * - Decodes URI encoding if passed from URL params
 * - Replaces multiple spaces or dashes
 * - Uppercases
 */
export function normalizeTag(rawTag: string): string {
  if (!rawTag) return "";
  try {
    const decoded = decodeURIComponent(rawTag).trim();
    return decoded.toUpperCase().replace(/\s+/g, "-");
  } catch {
    return rawTag.trim().toUpperCase();
  }
}

/**
 * Safe tag resolution function that never throws exceptions.
 * Replaces risky database queries / UUID-only lookups with safe multi-strategy matching:
 * 1. Exact match on tag (case-insensitive)
 * 2. Exact match on HUID
 * 3. Partial or prefix match suggestions if not found
 */
export function resolveInventoryTag(rawQuery: string): TagLookupResult {
  const normalized = normalizeTag(rawQuery);

  if (!normalized || normalized.length < 2) {
    return {
      success: false,
      item: null,
      searchedTag: rawQuery,
      normalizedTag: normalized,
      errorMessage: "Please provide a valid item tag or HUID (minimum 2 characters).",
      suggestedTags: CANONICAL_INVENTORY.slice(0, 3).map((i) => i.tag),
      isRecoverable: true,
    };
  }

  // Exact tag match
  const matchedItem = CANONICAL_INVENTORY.find(
    (item) => item.tag.toUpperCase() === normalized || item.huid.toUpperCase() === normalized
  );

  if (matchedItem) {
    return {
      success: true,
      item: matchedItem,
      searchedTag: rawQuery,
      normalizedTag: normalized,
      isRecoverable: true,
    };
  }

  // Not found: find fuzzy / prefix suggestions
  const suggestions = CANONICAL_INVENTORY.filter(
    (item) =>
      item.tag.toUpperCase().includes(normalized) ||
      item.huid.toUpperCase().includes(normalized) ||
      normalized.includes(item.tag.toUpperCase())
  ).map((i) => i.tag);

  const fallbackSuggestions =
    suggestions.length > 0
      ? suggestions
      : CANONICAL_INVENTORY.slice(0, 3).map((i) => i.tag);

  return {
    success: false,
    item: null,
    searchedTag: rawQuery,
    normalizedTag: normalized,
    errorMessage: `No inventory item matches tag "${rawQuery}". Verify the tag number or pick from suggested items.`,
    suggestedTags: fallbackSuggestions,
    isRecoverable: true,
  };
}

/**
 * Filter inventory catalog items
 */
export function getInventoryCatalog(filters?: {
  query?: string;
  category?: InventoryCategory | "all";
  status?: InventoryStatus | "all";
}): InventoryItem[] {
  let list = [...CANONICAL_INVENTORY];

  if (filters?.category && filters.category !== "all") {
    list = list.filter((i) => i.category === filters.category);
  }

  if (filters?.status && filters.status !== "all") {
    list = list.filter((i) => i.status === filters.status);
  }

  if (filters?.query && filters.query.trim() !== "") {
    const q = filters.query.trim().toLowerCase();
    list = list.filter(
      (i) =>
        i.tag.toLowerCase().includes(q) ||
        i.huid.toLowerCase().includes(q) ||
        i.title.toLowerCase().includes(q) ||
        i.purity.toLowerCase().includes(q) ||
        (i.vendorName && i.vendorName.toLowerCase().includes(q))
    );
  }

  return list;
}
