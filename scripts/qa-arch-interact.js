// QA: homepage workflow section — click Backend node, capture lit paths + panel.
const page = await browser.getPage("qa");
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e)));

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:3002/", { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 2500));

await page.evaluate(() => {
  const el = [...document.querySelectorAll("section")].find((s) =>
    s.getAttribute("aria-label") === "How I build");
  if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
});
await new Promise((r) => setTimeout(r, 2200));
const before = await page.cua.screenshot({ name: "qa-arch-before.jpeg" });
console.log("before:", JSON.stringify(before));

// click the Backend node (SVG g role=button)
const backend = page.getByRole("button", { name: /Backend — show internals/ });
await backend.click();
await new Promise((r) => setTimeout(r, 1000));
const after = await page.cua.screenshot({ name: "qa-arch-backend.jpeg" });
console.log("after:", JSON.stringify(after));

// click AI layer
const ai = page.getByRole("button", { name: /AI Layer — show internals/ });
await ai.click();
await new Promise((r) => setTimeout(r, 1000));
const ai2 = await page.cua.screenshot({ name: "qa-arch-ai.jpeg" });
console.log("ai:", JSON.stringify(ai2));

console.log("console errors:", JSON.stringify(errors));
