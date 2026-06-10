// Mobile viewport sweep: hero, knob, contact at iPhone-ish size.
const page = await browser.getPage("qa-mobile");
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 3000));
const hero = await page.cua.screenshot({ name: "m-hero.jpeg" });

await page.evaluate(() => {
  document
    .querySelector('section[aria-label="Capabilities — interactive control"]')
    ?.scrollIntoView({ behavior: "instant", block: "start" });
  window.scrollBy(0, 300);
});
await new Promise((r) => setTimeout(r, 2200));
const knob = await page.cua.screenshot({ name: "m-knob.jpeg" });

await page.evaluate(() => {
  document.querySelector("#contact")?.scrollIntoView({ behavior: "instant", block: "start" });
});
await new Promise((r) => setTimeout(r, 2200));
const contact = await page.cua.screenshot({ name: "m-contact.jpeg" });

console.log(JSON.stringify({ hero: hero.path, knob: knob.path, contact: contact.path }));
