// Re-shoot knob + about after fixes; collect console errors too.
const page = await browser.getPage("qa");
const logs = [];
page.on("pageerror", (err) => logs.push(`[pageerror] ${err.message}`));
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 3000));

await page.evaluate(() => {
  document
    .querySelector('section[aria-label="Capabilities — interactive control"]')
    ?.scrollIntoView({ behavior: "instant", block: "center" });
});
await new Promise((r) => setTimeout(r, 2500));
const k = await page.cua.screenshot({ name: "qa-knob-fix.jpeg" });

await page.evaluate(() => {
  document.querySelector("#about")?.scrollIntoView({ behavior: "instant", block: "start" });
  window.scrollBy(0, -40);
});
await new Promise((r) => setTimeout(r, 2200));
const a = await page.cua.screenshot({ name: "qa-about-fix.jpeg" });

console.log(JSON.stringify({ knob: k.path, about: a.path, logs }, null, 2));
