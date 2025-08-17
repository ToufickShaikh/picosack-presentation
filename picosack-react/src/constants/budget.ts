// Central budget definition for the presentation
export const BUDGETS = {
  // Research & product definition: small team, 6-8 weeks of scoped work
  rd: 120_000, // ₹1.20L — HW architecture, component selection, basic firmware prototype

  // Pilot: small field pilot with 8-12 units, shipping and logistics
  pilot: 80_000, // ₹0.80L — prototype builds, field testing, travel/support

  // Soft launch & marketing / minor certifications (packaging, small PR)
  launch: 75_000, // ₹0.75L

  // Hardware design (schematic, PCB, BOM optimization)
  hardwareDesign: 250_000, // ₹2.50L — professional CAD, DFM/QC prep

  // Hardware development: component procurement, small-batch assembly, firmware polish
  hardwareDevelopment: 220_000, // ₹2.20L

  // Casing & mechanical: industrial design and a small injection-mold/tooling demo
  casingDesign: 30_000, // ₹0.30L

  // Testing & compliance: IPC-A-600 checks, test fixtures, lab fees
  ipcA600Testing: 160_000, // ₹1.60L
};

export const TOTAL_BUDGET = Object.values(BUDGETS).reduce((a, b) => a + b, 0);
export const TIME_TO_MARKET = '6 months';

export const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`;
