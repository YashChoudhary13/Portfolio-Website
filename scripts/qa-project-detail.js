// QA: /projects/deepverify detail — hero, system flow interaction, arch stack,
// metrics, gallery, next + floating pill. Desktop 1440.
const page = await browser.getPage("qa");
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e)));

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:3001/projects/deepverify", { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 3000));

const hero = await page.cua.screenshot({ name: "qa-dv-hero.jpeg" });
console.log("hero:", JSON.stringify(hero));

// scroll to the system flow and click stage 04 (ensemble)
const flowBtn = page.getByRole("button", { name: /Model Ensemble/ }).first();
await flowBtn.scrollIntoViewIfNeeded();
await page.evaluate(() => window.scrollBy({ top: -200, behavior: "instant" }));
await new Promise((r) => setTimeout(r, 1500));
await flowBtn.click();
await new Promise((r) => setTimeout(r, 900));
const flow = await page.cua.screenshot({ name: "qa-dv-flow.jpeg" });
console.log("flow:", JSON.stringify(flow));

// challenge + solution
await page.evaluate(() => {
  const el = [...document.querySelectorAll("section")].find((s) =>
    s.getAttribute("aria-label") === "The challenge");
  if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
});
await new Promise((r) => setTimeout(r, 1500));
const chal = await page.cua.screenshot({ name: "qa-dv-challenge.jpeg" });
console.log("challenge:", JSON.stringify(chal));

// architecture stack — open second layer
await page.evaluate(() => {
  const el = [...document.querySelectorAll("section")].find((s) =>
    s.getAttribute("aria-label") === "Architecture");
  if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
});
await new Promise((r) => setTimeout(r, 1500));
const apiLayer = page.getByRole("button", { name: /API/ }).first();
await apiLayer.click();
await new Promise((r) => setTimeout(r, 900));
const arch = await page.cua.screenshot({ name: "qa-dv-arch.jpeg" });
console.log("arch:", JSON.stringify(arch));

// gallery
await page.evaluate(() => {
  const el = [...document.querySelectorAll("section")].find((s) =>
    s.getAttribute("aria-label") === "Product views");
  if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
});
await new Promise((r) => setTimeout(r, 1800));
const gal = await page.cua.screenshot({ name: "qa-dv-gallery.jpeg" });
console.log("gallery:", JSON.stringify(gal));

// bottom: learnings + next project + floating live pill
await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight - 1400, behavior: "instant" }));
await new Promise((r) => setTimeout(r, 1500));
const next = await page.cua.screenshot({ name: "qa-dv-next.jpeg" });
console.log("next:", JSON.stringify(next));

console.log("console errors:", JSON.stringify(errors));
