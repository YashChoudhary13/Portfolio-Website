// QA: /projects index — desktop top, hover preview, full-page state, console errors.
const page = await browser.getPage("qa");
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e)));

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:3001/projects", { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 3000));

const top = await page.cua.screenshot({ name: "qa-projects-top.jpeg" });
console.log("top:", JSON.stringify(top));

// hover the second row (REVO) to trigger the cursor preview
await page.evaluate(() => window.scrollTo({ top: 500, behavior: "instant" }));
await new Promise((r) => setTimeout(r, 1200));
const rows = page.locator('a[href^="/projects/"]');
const count = await rows.count();
console.log("project links found:", count);
const revo = page.locator('a[href="/projects/revo"]').first();
const box = await revo.boundingBox();
if (box) {
  await page.mouse.move(box.x + box.width * 0.35, box.y + box.height / 2, { steps: 8 });
  await new Promise((r) => setTimeout(r, 900));
}
const hover = await page.cua.screenshot({ name: "qa-projects-hover.jpeg" });
console.log("hover:", JSON.stringify(hover));

console.log("console errors:", JSON.stringify(errors));
