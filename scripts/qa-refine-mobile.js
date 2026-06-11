// QA: refinement pass mobile — nav icons in overlay, light band, hero cards.
const page = await browser.getPage("qa");
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e)));

await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://localhost:3002/", { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 3000));

// hero cards on mobile
await page.evaluate(() => window.scrollTo({ top: 560, behavior: "instant" }));
await new Promise((r) => setTimeout(r, 1400));
const cards = await page.cua.screenshot({ name: "qa-m-cards.jpeg" });
console.log("cards:", JSON.stringify(cards));

// light band seam
await page.evaluate(() => {
  const el = document.getElementById("experience");
  if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
});
await new Promise((r) => setTimeout(r, 1600));
const light = await page.cua.screenshot({ name: "qa-m-light.jpeg" });
console.log("light:", JSON.stringify(light));

// menu overlay with icon socials
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await new Promise((r) => setTimeout(r, 800));
await page.getByRole("button", { name: "Open menu" }).click();
await new Promise((r) => setTimeout(r, 1200));
const menu = await page.cua.screenshot({ name: "qa-m-menu.jpeg" });
console.log("menu:", JSON.stringify(menu));

// desktop nav icons
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:3002/projects", { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 2200));
const nav = await page.cua.screenshot({ name: "qa-d-nav.jpeg" });
console.log("nav:", JSON.stringify(nav));

console.log("console errors:", JSON.stringify(errors));
