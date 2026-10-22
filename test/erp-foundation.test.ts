import test from "node:test";
import assert from "node:assert/strict";
import {
  formatIndianCurrency,
  formatGoldWeight,
  formatDate,
  resolveFinancialDirection,
  resolveMetalDirection,
} from "../src/lib/erp/formatters.ts";
import {
  getPartyLedger,
  getPartySummaryMetrics,
  getParties,
  getPartyDirectorySummary,
  CANONICAL_PARTIES,
  CANONICAL_VOUCHERS,
} from "../src/lib/erp/partyStore.ts";
import {
  resolveInventoryTag,
  normalizeTag,
  getInventoryCatalog,
} from "../src/lib/erp/inventoryStore.ts";

test("Financial Formatter - Indian Rupee consistent 2-decimal precision", () => {
  assert.equal(formatIndianCurrency(5703278.8), "₹57,03,278.80");
  assert.equal(formatIndianCurrency(0), "₹0.00");
  assert.equal(formatIndianCurrency(125000), "₹1,25,000.00");
  assert.equal(formatIndianCurrency(-45000), "- ₹45,000.00");
  assert.equal(formatIndianCurrency(-45000, { useAbsolute: true }), "₹45,000.00");
  assert.equal(formatIndianCurrency(null), "—");
  assert.equal(formatIndianCurrency(undefined), "—");
});

test("Weight Formatter - Milligram 3-decimal precision with unit", () => {
  assert.equal(formatGoldWeight(24.5), "24.500 g");
  assert.equal(formatGoldWeight(0), "0.000 g");
  assert.equal(formatGoldWeight(1.2345), "1.235 g");
  assert.equal(formatGoldWeight(-10.5), "- 10.500 g");
  assert.equal(formatGoldWeight(null), "—");
});

test("Date Formatter - Consistent format", () => {
  const formatted = formatDate("2024-10-22T10:00:00.000Z", "date");
  assert.match(formatted, /2024/);
  assert.equal(formatDate(null), "—");
});

test("Financial Direction - Explicit labels and non-color semantics (GEN-01)", () => {
  // Vendor payable (positive amount)
  const vendorPayable = resolveFinancialDirection(150000, "vendor");
  assert.equal(vendorPayable.direction, "we_owe_vendor");
  assert.equal(vendorPayable.shortLabel, "We Owe Vendor");
  assert.equal(vendorPayable.badgeVariant, "payable");

  // Vendor advance (negative amount)
  const vendorAdvance = resolveFinancialDirection(-50000, "vendor");
  assert.equal(vendorAdvance.direction, "vendor_owes_us");
  assert.equal(vendorAdvance.shortLabel, "Vendor Owes Us");
  assert.equal(vendorAdvance.badgeVariant, "advance");

  // Customer balance due (positive amount)
  const custDue = resolveFinancialDirection(85000, "customer");
  assert.equal(custDue.direction, "customer_owes");
  assert.equal(custDue.shortLabel, "Customer Owes");
  assert.equal(custDue.badgeVariant, "receivable");

  // Customer store credit (negative amount)
  const custCredit = resolveFinancialDirection(-25000, "customer");
  assert.equal(custCredit.direction, "customer_credit");
  assert.equal(custCredit.shortLabel, "Store Credit");
  assert.equal(custCredit.badgeVariant, "credit");

  // Settled
  const settled = resolveFinancialDirection(0, "vendor");
  assert.equal(settled.direction, "settled");
  assert.equal(settled.isZero, true);
});

test("Metal Direction - Explicit bullion balance semantics", () => {
  const metalWeOwe = resolveMetalDirection(500.5);
  assert.equal(metalWeOwe.direction, "metal_payable");
  assert.equal(metalWeOwe.shortLabel, "Metal We Owe");

  const metalPartyOwes = resolveMetalDirection(-250.0);
  assert.equal(metalPartyOwes.direction, "metal_receivable");
  assert.equal(metalPartyOwes.shortLabel, "Metal Party Owes");

  const settled = resolveMetalDirection(0);
  assert.equal(settled.direction, "metal_settled");
});

test("Party Mathematical Parity - Ledger running balance equals Party Summary (PART-01, PART-02)", () => {
  for (const party of CANONICAL_PARTIES) {
    const metrics = getPartySummaryMetrics(party.id);
    assert.ok(metrics, `Metrics must exist for ${party.id}`);

    const ledger = getPartyLedger(party.id);
    if (ledger.length > 0) {
      const lastEntry = ledger[ledger.length - 1];
      assert.equal(
        metrics.netFinancialBalance,
        lastEntry.runningFinancialBalance,
        `Financial balance parity mismatch for ${party.name}`
      );
      assert.equal(
        metrics.netMetalBalanceGrams,
        lastEntry.runningMetalBalanceGrams,
        `Metal balance parity mismatch for ${party.name}`
      );
    } else {
      assert.equal(metrics.netFinancialBalance, 0);
      assert.equal(metrics.netMetalBalanceGrams, 0);
    }
  }
});

test("Party Directory Summary - Exact aggregation without ambiguous blending (PART-03)", () => {
  const summary = getPartyDirectorySummary();
  const allParties = getParties();

  let calculatedVendorsPayable = 0;
  let calculatedVendorsAdvance = 0;
  let calculatedCustomersReceivable = 0;
  let calculatedCustomersCredit = 0;

  for (const p of allParties) {
    if (p.party.category === "vendor" || p.party.category === "bullion_dealer") {
      if (p.netFinancialBalance > 0) calculatedVendorsPayable += p.netFinancialBalance;
      if (p.netFinancialBalance < 0) calculatedVendorsAdvance += Math.abs(p.netFinancialBalance);
    } else {
      if (p.netFinancialBalance > 0) calculatedCustomersReceivable += p.netFinancialBalance;
      if (p.netFinancialBalance < 0) calculatedCustomersCredit += Math.abs(p.netFinancialBalance);
    }
  }

  assert.equal(summary.totalVendorsPayable, Number(calculatedVendorsPayable.toFixed(2)));
  assert.equal(summary.totalVendorsAdvance, Number(calculatedVendorsAdvance.toFixed(2)));
  assert.equal(summary.totalCustomersReceivable, Number(calculatedCustomersReceivable.toFixed(2)));
  assert.equal(summary.totalCustomersCredit, Number(calculatedCustomersCredit.toFixed(2)));
  assert.equal(summary.totalPartiesCount, CANONICAL_PARTIES.length);
});

test("Inventory Safe Tag Lookup - Resolves known tags and prevents crashes (INV-01)", () => {
  // Exact match
  const res1 = resolveInventoryTag("TAG-GLD-101");
  assert.equal(res1.success, true);
  assert.ok(res1.item);
  assert.equal(res1.item?.tag, "TAG-GLD-101");

  // Case-insensitive & normalized match
  const res2 = resolveInventoryTag("tag-gld-101");
  assert.equal(res2.success, true);
  assert.equal(res2.item?.tag, "TAG-GLD-101");

  // Safe unknown tag resolution (Does NOT crash, returns controlled state)
  const resUnknown = resolveInventoryTag("TAG-UNKNOWN-999");
  assert.equal(resUnknown.success, false);
  assert.equal(resUnknown.item, null);
  assert.equal(resUnknown.isRecoverable, true);
  assert.ok(resUnknown.suggestedTags && resUnknown.suggestedTags.length > 0);

  // Malformed / UUID simulation / arbitrary symbols
  const resMalformed = resolveInventoryTag("f47ac10b-58cc-4372-a567-0e02b2c3d479");
  assert.equal(resMalformed.success, false);
  assert.equal(resMalformed.isRecoverable, true);
  assert.ok(resMalformed.errorMessage?.includes("No inventory item matches"));
});
