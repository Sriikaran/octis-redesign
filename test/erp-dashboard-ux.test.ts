import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  calculateDateRangeFromPreset,
  validateCustomRange,
} from "../src/lib/erp/dateRangeUtils.ts";
import {
  getPartyDirectorySummary,
  getRecentVouchers,
  getDashboardExceptions,
  CANONICAL_PARTIES,
  CANONICAL_VOUCHERS,
} from "../src/lib/erp/partyStore.ts";
import {
  formatIndianCurrency,
  formatGoldWeight,
  resolveFinancialDirection,
  resolveMetalDirection,
} from "../src/lib/erp/formatters.ts";
import { getInventoryCatalog } from "../src/lib/erp/inventoryStore.ts";

test("DateRangeFilter - Deterministic preset boundaries (Step 5 & 8)", () => {
  const refDate = new Date("2024-10-22T10:00:00.000Z");

  // Today
  const today = calculateDateRangeFromPreset("today", refDate);
  assert.equal(today.startDate, "2024-10-22");
  assert.equal(today.endDate, "2024-10-22");
  assert.equal(today.label, "Today");

  // Yesterday
  const yesterday = calculateDateRangeFromPreset("yesterday", refDate);
  assert.equal(yesterday.startDate, "2024-10-21");
  assert.equal(yesterday.endDate, "2024-10-21");
  assert.equal(yesterday.label, "Yesterday");

  // Last 7 Days (2024-10-16 to 2024-10-22)
  const last7 = calculateDateRangeFromPreset("last_7_days", refDate);
  assert.equal(last7.startDate, "2024-10-16");
  assert.equal(last7.endDate, "2024-10-22");
  assert.equal(last7.label, "Last 7 Days");

  // Month to Date (2024-10-01 to 2024-10-22)
  const mtd = calculateDateRangeFromPreset("month_to_date", refDate);
  assert.equal(mtd.startDate, "2024-10-01");
  assert.equal(mtd.endDate, "2024-10-22");
  assert.equal(mtd.label, "Month to Date");
});

test("DateRangeFilter - Custom range validation and reversed range rejection (Step 5 & 8)", () => {
  // Valid forward range
  const valid = validateCustomRange("2024-10-01", "2024-10-22");
  assert.equal(valid.isValid, true);
  assert.equal(valid.error, undefined);

  // Equal dates (single day)
  const singleDay = validateCustomRange("2024-10-15", "2024-10-15");
  assert.equal(singleDay.isValid, true);

  // Inverted / reversed range: start after end
  const reversed = validateCustomRange("2024-10-25", "2024-10-10");
  assert.equal(reversed.isValid, false);
  assert.match(
    reversed.error || "",
    /Start date cannot be after end date/,
    "Reversed date range must provide clear recoverable message"
  );

  // Missing or empty inputs
  const missing = validateCustomRange("", "2024-10-22");
  assert.equal(missing.isValid, false);
});

test("Dashboard Executive KPIs - Derivation from canonical Party store (DASH-02)", () => {
  const summary = getPartyDirectorySummary();

  // Payables across all 3 vendors (Shree Ganesh, Mahalaxmi, Trishul)
  assert.equal(summary.totalVendorsPayable, 5233078.8);
  const vendorDir = resolveFinancialDirection(summary.totalVendorsPayable, "vendor");
  assert.equal(vendorDir.direction, "we_owe_vendor");
  assert.equal(vendorDir.shortLabel, "We Owe Vendor");

  // Receivables
  assert.equal(summary.totalCustomersReceivable, 185000.0);
  const custDir = resolveFinancialDirection(summary.totalCustomersReceivable, "customer");
  assert.equal(custDir.direction, "customer_owes");
  assert.equal(custDir.shortLabel, "Customer Owes");

  // Customer Credit / Advance held
  assert.equal(summary.totalCustomersCredit, 150000.0);
  const creditDir = resolveFinancialDirection(-summary.totalCustomersCredit, "customer");
  assert.equal(creditDir.direction, "customer_credit");
  assert.equal(creditDir.shortLabel, "Store Credit");

  // Net Metal Position (1000g in - 275.45g scrap - 257.80g scrap = 466.750g)
  assert.equal(summary.netMetalPayableGrams, 466.75);
  const metalDir = resolveMetalDirection(summary.netMetalPayableGrams);
  assert.equal(metalDir.direction, "metal_payable");
  assert.equal(metalDir.shortLabel, "Metal We Owe");

  // Ensure cash and metal values are NEVER mixed into a single balance number
  assert.notEqual(summary.totalVendorsPayable, summary.netMetalPayableGrams);
});

test("Dashboard Exceptions Queue - 4 actionable exceptions with valid routes (DASH-01)", () => {
  const exceptions = getDashboardExceptions();
  assert.equal(exceptions.length, 4);

  for (const exc of exceptions) {
    assert.ok(exc.id, "Exception must have an id");
    assert.ok(exc.title, "Exception must have a title");
    assert.ok(exc.description, "Exception must have a description");
    assert.ok(["high", "medium", "low"].includes(exc.severity), "Valid severity");
    assert.ok(exc.actionHref.startsWith("/parties"), "Action links must route to real module");
    assert.ok(exc.actionLabel, "Action label must exist");
  }
});

test("Recent Vouchers Activity - Chronological sort and date-range filtering (DASH-01)", () => {
  const vouchers = getRecentVouchers(15);
  assert.ok(vouchers.length > 0);

  // Sorted descending
  for (let i = 1; i < vouchers.length; i++) {
    const prevTime = new Date(vouchers[i - 1].date).getTime();
    const currTime = new Date(vouchers[i].date).getTime();
    assert.ok(
      prevTime >= currTime,
      `Vouchers must be sorted descending: ${vouchers[i - 1].voucherNo} vs ${vouchers[i].voucherNo}`
    );
  }

  // Filter vouchers for October 2024
  const octVouchers = vouchers.filter((v) => {
    const d = v.date.substring(0, 10);
    return d >= "2024-10-01" && d <= "2024-10-22";
  });
  assert.ok(octVouchers.length > 0, "Must have October vouchers");

  // Filter vouchers for single date with no records -> returns 0 (triggers ErpEmptyState)
  const emptyDateVouchers = vouchers.filter((v) => {
    const d = v.date.substring(0, 10);
    return d === "2024-10-22";
  });
  assert.equal(emptyDateVouchers.length, 0, "October 22 has 0 vouchers to demonstrate empty state");
});

test("Demo Bullion Rates - Label check in ErpTopBar (Step 2)", () => {
  const topBarPath = path.resolve(process.cwd(), "src/components/erp/ErpTopBar.tsx");
  const content = fs.readFileSync(topBarPath, "utf-8");

  // Must not claim live bullion ticker
  assert.ok(
    !content.includes("Live Bullion Rates:"),
    "ErpTopBar must not label demo metal rates as 'Live Bullion Rates'"
  );
  assert.ok(
    content.includes("Demo Metal Rates (Sample):") ||
      content.includes("Demo Metal Rates") ||
      content.includes("Sample rates — not live market prices"),
    "ErpTopBar must explicitly indicate sample demonstration metal rates"
  );
});
