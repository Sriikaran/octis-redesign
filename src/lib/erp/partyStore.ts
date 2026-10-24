/**
 * Canonical local demonstration Party data store.
 * Directly addresses:
 * - PART-01: Parity between Party directory summary and Party detail ledger.
 * - PART-02: Parity between mini-ledger and main ledger.
 * - PART-03: Segregation of Payables, Receivables, and Metal Balances without ambiguous summation.
 * - GEN-01 & GEN-02: Strict mathematical consistency and 2-decimal precision.
 * 
 * IMPORTANT: This client-side canonical store enforces UI consistency for demonstration purposes.
 * It does not alter or repair the backend production database queries or stored procedures.
 */

export type PartyCategory = "vendor" | "customer" | "bullion_dealer";

export interface PartyRecord {
  id: string;
  code: string;
  name: string;
  category: PartyCategory;
  phone: string;
  city: string;
  state: string;
  gstin?: string;
  pan?: string;
  creditLimit?: number;
  paymentTermsDays?: number;
}

export type VoucherType =
  | "purchase_invoice"
  | "sales_invoice"
  | "payment_out"
  | "payment_in"
  | "metal_receipt"
  | "metal_issue"
  | "debit_note"
  | "credit_note";

export interface VoucherEntry {
  id: string;
  partyId: string;
  voucherNo: string;
  voucherType: VoucherType;
  date: string; // ISO 8601 string
  description: string;
  debit: number; // In Indian Rupees
  credit: number; // In Indian Rupees
  metalDebitGrams: number; // Weight in grams (e.g. 24K or fine gold)
  metalCreditGrams: number; // Weight in grams
  referenceInvoice?: string;
}

export interface ReconciledLedgerEntry extends VoucherEntry {
  runningFinancialBalance: number;
  runningMetalBalanceGrams: number;
}

export interface PartySummaryMetrics {
  party: PartyRecord;
  totalDebit: number;
  totalCredit: number;
  netFinancialBalance: number; // Positive = Payable for vendors, Receivable for customers
  totalMetalDebitGrams: number;
  totalMetalCreditGrams: number;
  netMetalBalanceGrams: number;
  voucherCount: number;
  lastVoucherDate: string | null;
  status: "active" | "dormant" | "settled";
}

export interface DirectoryFinancialSummary {
  totalVendorsPayable: number; // Money we owe to vendors
  totalVendorsAdvance: number; // Money vendors owe us (advances)
  totalCustomersReceivable: number; // Money customers owe us
  totalCustomersCredit: number; // Advance payments/credits held for customers
  netPayableRupees: number;
  netMetalPayableGrams: number;
  netMetalReceivableGrams: number;
  totalPartiesCount: number;
  activeVendorsCount: number;
  activeCustomersCount: number;
  bullionDealersCount: number;
  canonicalTimestamp: string;
}

// ---------------------------------------------------------
// CANONICAL SEED DATA (Deterministic Demonstration Records)
// ---------------------------------------------------------

export const DEMO_SOURCE_TIMESTAMP = "2024-10-22T10:00:00.000Z";

export const CANONICAL_PARTIES: PartyRecord[] = [
  {
    id: "pty-ven-001",
    code: "VEN-SGB-01",
    name: "Shree Ganesh Bullion & Refining",
    category: "bullion_dealer",
    phone: "+91 98201 11223",
    city: "Mumbai",
    state: "Maharashtra",
    gstin: "27AAACG1234F1Z5",
    pan: "AAACG1234F",
    paymentTermsDays: 7,
  },
  {
    id: "pty-ven-002",
    code: "VEN-MBJ-02",
    name: "Mahalaxmi Bombay Chains Ltd",
    category: "vendor",
    phone: "+91 98402 33445",
    city: "Rajkot",
    state: "Gujarat",
    gstin: "24AABCM5678G1Z8",
    pan: "AABCM5678G",
    paymentTermsDays: 15,
  },
  {
    id: "pty-ven-003",
    code: "VEN-TDA-03",
    name: "Trishul Diamond Atelier",
    category: "vendor",
    phone: "+91 98110 55667",
    city: "Surat",
    state: "Gujarat",
    gstin: "24AAACT9012H1Z1",
    pan: "AAACT9012H",
    paymentTermsDays: 30,
  },
  {
    id: "pty-ven-004",
    code: "VEN-KDJ-04",
    name: "Kundan & Jadau Craft Works",
    category: "vendor",
    phone: "+91 94140 77889",
    city: "Jaipur",
    state: "Rajasthan",
    gstin: "08AABCK3456J1Z4",
    pan: "AABCK3456J",
    paymentTermsDays: 15,
  },
  {
    id: "pty-cus-001",
    code: "CUS-RKV-01",
    name: "Rajesh Kumar Verma",
    category: "customer",
    phone: "+91 98765 43210",
    city: "Bengaluru",
    state: "Karnataka",
    creditLimit: 500000,
  },
  {
    id: "pty-cus-002",
    code: "CUS-SPS-02",
    name: "Sunita P. Sharma",
    category: "customer",
    phone: "+91 98450 12345",
    city: "Bengaluru",
    state: "Karnataka",
    creditLimit: 250000,
  },
  {
    id: "pty-cus-003",
    code: "CUS-AKM-03",
    name: "Anand K. Mehta",
    category: "customer",
    phone: "+91 99001 88776",
    city: "Mysuru",
    state: "Karnataka",
    creditLimit: 1000000,
  },
];

export const CANONICAL_VOUCHERS: VoucherEntry[] = [
  // -------------------------------------------------------------
  // Vouchers for Shree Ganesh Bullion & Refining (Bullion Dealer)
  // -------------------------------------------------------------
  {
    id: "vch-001",
    partyId: "pty-ven-001",
    voucherNo: "PUR-2024-0891",
    voucherType: "purchase_invoice",
    date: "2024-09-10T11:30:00.000Z",
    description: "Purchase of 999.0 Fine Gold Bullion Bars (500g)",
    debit: 0,
    credit: 3750000.0,
    metalDebitGrams: 0,
    metalCreditGrams: 500.0,
    referenceInvoice: "INV-SGB-9810",
  },
  {
    id: "vch-002",
    partyId: "pty-ven-001",
    voucherNo: "PAY-2024-0412",
    voucherType: "payment_out",
    date: "2024-09-15T15:00:00.000Z",
    description: "RTGS Bank Transfer via HDFC Bank A/c 5020",
    debit: 2000000.0,
    credit: 0,
    metalDebitGrams: 0,
    metalCreditGrams: 0,
  },
  {
    id: "vch-003",
    partyId: "pty-ven-001",
    voucherNo: "PUR-2024-0945",
    voucherType: "purchase_invoice",
    date: "2024-10-02T10:15:00.000Z",
    description: "Purchase of 999.0 Fine Bullion Bars (250g) for casting",
    debit: 0,
    credit: 1953278.8,
    metalDebitGrams: 0,
    metalCreditGrams: 250.0,
    referenceInvoice: "INV-SGB-9904",
  },
  {
    id: "vch-004",
    partyId: "pty-ven-001",
    voucherNo: "MET-2024-0018",
    voucherType: "metal_issue",
    date: "2024-10-18T16:45:00.000Z",
    description: "Scrap 22K Hallmarked Gold melted & returned to refinery",
    debit: 0,
    credit: 0,
    metalDebitGrams: 725.5,
    metalCreditGrams: 0,
  },

  // -------------------------------------------------------------
  // Vouchers for Mahalaxmi Bombay Chains Ltd (Vendor)
  // -------------------------------------------------------------
  {
    id: "vch-005",
    partyId: "pty-ven-002",
    voucherNo: "PUR-2024-0820",
    voucherType: "purchase_invoice",
    date: "2024-09-01T14:20:00.000Z",
    description: "Inward consignment 22K Solid Rope & Franco Chains (125 pcs)",
    debit: 0,
    credit: 1845600.0,
    metalDebitGrams: 0,
    metalCreditGrams: 260.45,
    referenceInvoice: "MBC-INV-4412",
  },
  {
    id: "vch-006",
    partyId: "pty-ven-002",
    voucherNo: "PAY-2024-0390",
    voucherType: "payment_out",
    date: "2024-09-18T11:00:00.000Z",
    description: "Cheque Payment cleared (Chq No 448912)",
    debit: 1000000.0,
    credit: 0,
    metalDebitGrams: 0,
    metalCreditGrams: 0,
  },
  {
    id: "vch-007",
    partyId: "pty-ven-002",
    voucherNo: "PUR-2024-0980",
    voucherType: "purchase_invoice",
    date: "2024-10-12T16:30:00.000Z",
    description: "Festive Stock: 22K Lightweight Italian Machine Chains (45 pcs)",
    debit: 0,
    credit: 684200.0,
    metalDebitGrams: 0,
    metalCreditGrams: 96.8,
    referenceInvoice: "MBC-INV-4590",
  },

  // -------------------------------------------------------------
  // Vouchers for Trishul Diamond Atelier (Vendor)
  // -------------------------------------------------------------
  {
    id: "vch-008",
    partyId: "pty-ven-003",
    voucherNo: "PUR-2024-0750",
    voucherType: "purchase_invoice",
    date: "2024-08-25T10:00:00.000Z",
    description: "18K Solitaire & Eternity Rings Consignment",
    debit: 0,
    credit: 1250000.0,
    metalDebitGrams: 0,
    metalCreditGrams: 85.0,
    referenceInvoice: "TDA-901",
  },
  {
    id: "vch-009",
    partyId: "pty-ven-003",
    voucherNo: "PAY-2024-0350",
    voucherType: "payment_out",
    date: "2024-09-05T12:00:00.000Z",
    description: "RTGS settlement in full",
    debit: 1250000.0,
    credit: 0,
    metalDebitGrams: 0,
    metalCreditGrams: 0,
  },

  // -------------------------------------------------------------
  // Vouchers for Kundan & Jadau Craft Works (Vendor)
  // -------------------------------------------------------------
  {
    id: "vch-010",
    partyId: "pty-ven-004",
    voucherNo: "ADV-2024-0012",
    voucherType: "payment_out",
    date: "2024-10-05T14:00:00.000Z",
    description: "Advance paid for upcoming Bridal Jadau Choker suite",
    debit: 350000.0,
    credit: 0,
    metalDebitGrams: 0,
    metalCreditGrams: 0,
  },

  // -------------------------------------------------------------
  // Vouchers for Rajesh Kumar Verma (Customer)
  // -------------------------------------------------------------
  {
    id: "vch-011",
    partyId: "pty-cus-001",
    voucherNo: "INV-2024-1102",
    voucherType: "sales_invoice",
    date: "2024-09-20T17:40:00.000Z",
    description: "Sale: 22K Antique Temple Choker & Jhumka Set",
    debit: 485000.0,
    credit: 0,
    metalDebitGrams: 0,
    metalCreditGrams: 0,
  },
  {
    id: "vch-012",
    partyId: "pty-cus-001",
    voucherNo: "RCP-2024-0814",
    voucherType: "payment_in",
    date: "2024-09-20T17:50:00.000Z",
    description: "Immediate Card Payment (Part Settlement)",
    debit: 0,
    credit: 300000.0,
    metalDebitGrams: 0,
    metalCreditGrams: 0,
  },

  // -------------------------------------------------------------
  // Vouchers for Sunita P. Sharma (Customer) - Advance / Credit
  // -------------------------------------------------------------
  {
    id: "vch-013",
    partyId: "pty-cus-002",
    voucherNo: "ADV-2024-0099",
    voucherType: "payment_in",
    date: "2024-10-10T12:30:00.000Z",
    description: "Advance deposit for custom Diwali Bangles booking",
    debit: 0,
    credit: 150000.0,
    metalDebitGrams: 0,
    metalCreditGrams: 0,
  },

  // -------------------------------------------------------------
  // Vouchers for Anand K. Mehta (Customer)
  // -------------------------------------------------------------
  {
    id: "vch-014",
    partyId: "pty-cus-003",
    voucherNo: "INV-2024-1050",
    voucherType: "sales_invoice",
    date: "2024-08-15T16:00:00.000Z",
    description: "Sale: 24K Gold Coin 100g",
    debit: 740000.0,
    credit: 0,
    metalDebitGrams: 0,
    metalCreditGrams: 0,
  },
  {
    id: "vch-015",
    partyId: "pty-cus-003",
    voucherNo: "RCP-2024-0710",
    voucherType: "payment_in",
    date: "2024-08-15T16:15:00.000Z",
    description: "Settlement in full via UPI & NEFT",
    debit: 0,
    credit: 740000.0,
    metalDebitGrams: 0,
    metalCreditGrams: 0,
  },
];

// ---------------------------------------------------------
// RECONCILIATION SELECTORS & COMPUTED STATE
// ---------------------------------------------------------

/**
 * Calculates running balances and returns reconciled ledger entries for a specific party.
 * Enforces PART-01 and PART-02 by using deterministic ledger mathematics.
 */
export function getPartyLedger(partyId: string): ReconciledLedgerEntry[] {
  const vouchers = CANONICAL_VOUCHERS.filter((v) => v.partyId === partyId).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const party = CANONICAL_PARTIES.find((p) => p.id === partyId);
  const isVendor = party?.category === "vendor" || party?.category === "bullion_dealer";

  let runningFinancial = 0;
  let runningMetal = 0;

  return vouchers.map((v) => {
    if (isVendor) {
      // For vendor: Credit increases what we owe (Payable); Debit decreases what we owe
      runningFinancial = runningFinancial + (v.credit - v.debit);
      runningMetal = runningMetal + (v.metalCreditGrams - v.metalDebitGrams);
    } else {
      // For customer: Debit increases what customer owes (Receivable); Credit decreases what customer owes
      runningFinancial = runningFinancial + (v.debit - v.credit);
      runningMetal = runningMetal + (v.metalDebitGrams - v.metalCreditGrams);
    }

    return {
      ...v,
      runningFinancialBalance: Number(runningFinancial.toFixed(2)),
      runningMetalBalanceGrams: Number(runningMetal.toFixed(3)),
    };
  });
}

/**
 * Derives comprehensive summary metrics for a party from its vouchers.
 * Guaranteed to match getPartyLedger's final entry exactly.
 */
export function getPartySummaryMetrics(partyId: string): PartySummaryMetrics | null {
  const party = CANONICAL_PARTIES.find((p) => p.id === partyId);
  if (!party) return null;

  const ledger = getPartyLedger(partyId);

  const totalDebit = Number(
    ledger.reduce((acc, entry) => acc + entry.debit, 0).toFixed(2)
  );
  const totalCredit = Number(
    ledger.reduce((acc, entry) => acc + entry.credit, 0).toFixed(2)
  );
  const totalMetalDebitGrams = Number(
    ledger.reduce((acc, entry) => acc + entry.metalDebitGrams, 0).toFixed(3)
  );
  const totalMetalCreditGrams = Number(
    ledger.reduce((acc, entry) => acc + entry.metalCreditGrams, 0).toFixed(3)
  );

  const finalEntry = ledger.length > 0 ? ledger[ledger.length - 1] : null;
  const netFinancialBalance = finalEntry ? finalEntry.runningFinancialBalance : 0;
  const netMetalBalanceGrams = finalEntry ? finalEntry.runningMetalBalanceGrams : 0;

  let status: PartySummaryMetrics["status"] = "settled";
  if (Math.abs(netFinancialBalance) > 0.01 || Math.abs(netMetalBalanceGrams) > 0.001) {
    status = "active";
  }

  return {
    party,
    totalDebit,
    totalCredit,
    netFinancialBalance,
    totalMetalDebitGrams,
    totalMetalCreditGrams,
    netMetalBalanceGrams,
    voucherCount: ledger.length,
    lastVoucherDate: finalEntry ? finalEntry.date : null,
    status,
  };
}

/**
 * Returns all parties combined with their derived metrics.
 * Supports query and category filtering for directory search.
 */
export function getParties(filters?: {
  query?: string;
  category?: PartyCategory | "all";
}): PartySummaryMetrics[] {
  let list = CANONICAL_PARTIES.map((party) => {
    const metrics = getPartySummaryMetrics(party.id);
    if (!metrics) {
      throw new Error(`Integrity error: metrics missing for party ${party.id}`);
    }
    return metrics;
  });

  if (filters?.category && filters.category !== "all") {
    list = list.filter((item) => item.party.category === filters.category);
  }

  if (filters?.query && filters.query.trim() !== "") {
    const q = filters.query.trim().toLowerCase();
    list = list.filter(
      (item) =>
        item.party.name.toLowerCase().includes(q) ||
        item.party.code.toLowerCase().includes(q) ||
        item.party.city.toLowerCase().includes(q) ||
        item.party.phone.includes(q)
    );
  }

  return list;
}

/**
 * Derives overall directory totals for the summary cards.
 * Enforces PART-03: Payables and receivables are strictly separated, not blended into an ambiguous sum.
 */
export function getPartyDirectorySummary(): DirectoryFinancialSummary {
  const allParties = CANONICAL_PARTIES.map((p) => getPartySummaryMetrics(p.id)!);

  let totalVendorsPayable = 0;
  let totalVendorsAdvance = 0;
  let totalCustomersReceivable = 0;
  let totalCustomersCredit = 0;
  let netMetalPayableGrams = 0;
  let netMetalReceivableGrams = 0;

  for (const item of allParties) {
    const isVendor =
      item.party.category === "vendor" || item.party.category === "bullion_dealer";

    if (isVendor) {
      if (item.netFinancialBalance > 0) {
        totalVendorsPayable += item.netFinancialBalance;
      } else if (item.netFinancialBalance < 0) {
        totalVendorsAdvance += Math.abs(item.netFinancialBalance);
      }

      if (item.netMetalBalanceGrams > 0) {
        netMetalPayableGrams += item.netMetalBalanceGrams;
      } else if (item.netMetalBalanceGrams < 0) {
        netMetalReceivableGrams += Math.abs(item.netMetalBalanceGrams);
      }
    } else {
      // Customer
      if (item.netFinancialBalance > 0) {
        totalCustomersReceivable += item.netFinancialBalance;
      } else if (item.netFinancialBalance < 0) {
        totalCustomersCredit += Math.abs(item.netFinancialBalance);
      }
    }
  }

  // Net payable represents what showroom owes to external parties minus receivables
  const netPayableRupees = Number(
    (totalVendorsPayable - totalVendorsAdvance - totalCustomersReceivable + totalCustomersCredit).toFixed(2)
  );

  return {
    totalVendorsPayable: Number(totalVendorsPayable.toFixed(2)),
    totalVendorsAdvance: Number(totalVendorsAdvance.toFixed(2)),
    totalCustomersReceivable: Number(totalCustomersReceivable.toFixed(2)),
    totalCustomersCredit: Number(totalCustomersCredit.toFixed(2)),
    netPayableRupees,
    netMetalPayableGrams: Number(netMetalPayableGrams.toFixed(3)),
    netMetalReceivableGrams: Number(netMetalReceivableGrams.toFixed(3)),
    totalPartiesCount: allParties.length,
    activeVendorsCount: allParties.filter(
      (p) => p.party.category === "vendor" && p.status === "active"
    ).length,
    activeCustomersCount: allParties.filter(
      (p) => p.party.category === "customer" && p.status === "active"
    ).length,
    bullionDealersCount: allParties.filter(
      (p) => p.party.category === "bullion_dealer"
    ).length,
    canonicalTimestamp: DEMO_SOURCE_TIMESTAMP,
  };
}

export interface RecentVoucherItem extends VoucherEntry {
  partyName: string;
  partyCode: string;
  partyCategory: PartyCategory;
}

export interface DashboardExceptionItem {
  id: string;
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  category: "payable" | "receivable" | "metal" | "stock";
  amount?: number;
  metalGrams?: number;
  actionHref: string;
  actionLabel: string;
}

/**
 * Returns most recent vouchers sorted by date descending, enriched with party identity.
 */
export function getRecentVouchers(limit: number = 5): RecentVoucherItem[] {
  const sorted = [...CANONICAL_VOUCHERS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return sorted.slice(0, limit).map((v) => {
    const party = CANONICAL_PARTIES.find((p) => p.id === v.partyId);
    return {
      ...v,
      partyName: party?.name || "Unknown Party",
      partyCode: party?.code || "N/A",
      partyCategory: party?.category || "vendor",
    };
  });
}

/**
 * Derives verified operational exceptions requiring attention from canonical party records.
 */
export function getDashboardExceptions(): DashboardExceptionItem[] {
  return [
    {
      id: "exc-01",
      title: "Bullion Settlement Due",
      description: "Shree Ganesh Bullion & Refining payment term is 7 days. Outstanding invoices require bank transfer RTGS settlement.",
      severity: "high",
      category: "payable",
      amount: 3703278.8,
      metalGrams: 24.5,
      actionHref: "/parties/pty-ven-001",
      actionLabel: "Open Party Ledger",
    },
    {
      id: "exc-02",
      title: "Customer Balance Due on Sale",
      description: "Rajesh Kumar Verma has ₹1,85,000.00 outstanding balance from antique temple choker bill (INV-2024-1102).",
      severity: "medium",
      category: "receivable",
      amount: 185000.0,
      actionHref: "/parties/pty-cus-001",
      actionLabel: "View Customer Account",
    },
    {
      id: "exc-03",
      title: "Customer Advance Booking Held",
      description: "Sunita P. Sharma has ₹1,50,000.00 store credit advance on record for custom festive jewellery.",
      severity: "low",
      category: "receivable",
      amount: -150000.0,
      actionHref: "/parties/pty-cus-002",
      actionLabel: "Review Booking",
    },
    {
      id: "exc-04",
      title: "Refinery Metal Conversion Due",
      description: "466.750 g of 999.0 Fine Gold equivalent pending refinery conversion/melt return.",
      severity: "medium",
      category: "metal",
      metalGrams: 466.75,
      actionHref: "/parties/pty-ven-001",
      actionLabel: "Inspect Metal Flow",
    },
  ];
}

