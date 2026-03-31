// Demo receipt metadata for offline/local seeding.
// Images live in public/demo/receipts and are cached by the PWA after first use.
export const DEMO_RECEIPT_ASSETS: Array<{ id: string; note: string; mimeType: string; assetUrl: string }> = [
  { id: "rcpt_demo_1", note: "Office supplies — Office Depot", mimeType: "image/png", assetUrl: "/demo/receipts/office.png" },
  { id: "rcpt_demo_2", note: "Fuel — Shell", mimeType: "image/png", assetUrl: "/demo/receipts/gas.png" },
  { id: "rcpt_demo_3", note: "Business meal — Corner Restaurant", mimeType: "image/png", assetUrl: "/demo/receipts/restaurant.png" },
  { id: "rcpt_demo_4", note: "Hardware materials — Ace Hardware", mimeType: "image/png", assetUrl: "/demo/receipts/hardware.png" },
  { id: "rcpt_demo_5", note: "Groceries / client refreshments — Market Fresh", mimeType: "image/png", assetUrl: "/demo/receipts/grocery.png" },
];
