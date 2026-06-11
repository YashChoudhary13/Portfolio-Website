// QA: /projects/revo — ArchStack expansion, metrics band, rebalanced gallery, mobile pass.
const page = await browser.getPage("qa");
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e)));

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:3002/projects/revo", { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 3000));

// architecture stack — open the Service Worker layer
await page.evaluate(() => {
  const el = [...document.querySelectorAll("section")].find((s) =>
    s.getAttribute("aria-label") === "Architecture");
  if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
});
await new Promise((r) => setTimeout(r, 1600));
await page.getByRole("button", { name: /Service Worker/ }).click();
await new Promise((r) => setTimeout(r, 1000));
const arch = await page.cua.screenshot({ name: "qa-revo-arch.jpeg" });
console.log("arch:", JSON.stringify(arch));

// outcomes metrics band
await page.evaluate(() => {
  const el = [...document.querySelectorAll("section")].find((s) =>
    s.getAttribute("aria-label") === "Outcomes");
  if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
});
await new Promise((r) => setTimeout(r, 1800));
const met = await page.cua.screenshot({ name: "qa-revo-metrics.jpeg" });
console.log("metrics:", JSON.stringify(met));

// rebalanced gallery
await page.evaluate(() => {
  const el = [...document.querySelectorAll("section")].find((s) =>
    s.getAttribute("aria-label") === "Product views");
  if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
});
await new Promise((r) => setTimeout(r, 1800));
const gal = await page.cua.screenshot({ name: "qa-revo-gallery.jpeg" });
console.log("gallery:", JSON.stringify(gal));

// mobile pass — themex top + system flow expanded
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://localhost:3002/projects/themex", { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 2500));
const mtop = await page.cua.screenshot({ name: "qa-mex-mobile-top.jpeg" });
console.log("mobile top:", JSON.stringify(mtop));

await page.getByRole("button", { name: /Stripe/ }).first().click();
await new Promise((r) => setTimeout(r, 900));
await page.evaluate(() => window.scrollBy({ top: -120, behavior: "instant" }));
await new Promise((r) => setTimeout(r, 800));
const mflow = await page.cua.screenshot({ name: "qa-mex-mobile-flow.jpeg" });
console.log("mobile flow:", JSON.stringify(mflow));

console.log("console errors:", JSON.stringify(errors));
