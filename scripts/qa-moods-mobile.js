// QA: mood seams at 390px — first (vivid down) and last (vivid up) blends.
const page = await browser.getPage("qa");
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://localhost:3002/", { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 2800));

await page.evaluate(() => {
  const el = document.querySelector(".mood-blend");
  if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
});
await new Promise((r) => setTimeout(r, 1500));
const s1 = await page.cua.screenshot({ name: "qa-m-seam1.jpeg" });
console.log(JSON.stringify(s1));

await page.evaluate(() => {
  const els = document.querySelectorAll(".mood-blend");
  if (els[3]) els[3].scrollIntoView({ behavior: "instant", block: "center" });
});
await new Promise((r) => setTimeout(r, 1500));
const s4 = await page.cua.screenshot({ name: "qa-m-seam4.jpeg" });
console.log(JSON.stringify(s4));
