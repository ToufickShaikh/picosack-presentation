// Central budget definition for the presentation
export const BUDGETS = {
  // Existing
  rd: 150_000,
  pilot: 150_000,
  launch: 100_000,
  // New additions
  hardwareDesign: 350_000,           // picked upper bound of 3–3.5L to avoid ambiguity
  hardwareDevelopment: 450_000,      // 4.5L
  casingDesign: 50_000,              // 0.5L
  ipcA600Testing: 300_000,           // 3L
};

export const TOTAL_BUDGET = Object.values(BUDGETS).reduce((a, b) => a + b, 0);
export const TIME_TO_MARKET = '6 months';

export const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`;
