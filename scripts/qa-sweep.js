// Sweep every section: scroll into view, settle, screenshot.
// Then exercise the knob: click to advance a detent and re-shoot.
const page = await browser.getPage("qa");
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 3000));

const targets = [
  ["metrics", 'section[aria-label="Results"]'],
  ["knob", 'section[aria-label="Capabilities — interactive control"]'],
  ["projects", "#work"],
  ["architecture", 'section[aria-label="How I build"]'],
  ["experience", 'section[aria-label="Experience"]'],
  ["about", "#about"],
  ["contact", "#contact"],
];

const saved = [];
for (const [name, sel] of targets) {
  await page.evaluate((s) => {
    document.querySelector(s)?.scrollIntoView({ behavior: "instant", block: "start" });
    window.scrollBy(0, -60);
  }, sel);
  await new Promise((r) => setTimeout(r, 2200));
  const shot = await page.cua.screenshot({ name: `qa-${name}.jpeg` });
  saved.push(shot.path);
}

// knob interaction: scroll back, click the dial center, capture the result
await page.evaluate(() => {
  document
    .querySelector('section[aria-label="Capabilities — interactive control"]')
    ?.scrollIntoView({ behavior: "instant", block: "center" });
});
await new Promise((r) => setTimeout(r, 1500));
const dial = await page.evaluate(() => {
  const el = document.querySelector('[role="slider"]');
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
});
await page.mouse.click(dial.x, dial.y);
await new Promise((r) => setTimeout(r, 1400));
const shot2 = await page.cua.screenshot({ name: "qa-knob-state2.jpeg" });
saved.push(shot2.path);

console.log(JSON.stringify(saved, null, 2));
