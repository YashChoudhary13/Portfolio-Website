// dev-browser QA script: navigate, settle, screenshot a viewport at a scroll position.
// The daemon injects `browser`, `saveScreenshot`. Configure via the constants below
// (rewritten per shot by the QA loop).
const URL = "http://localhost:3000";
const SCROLL_Y = 0;
const NAME = "qa-hero.jpeg";

const page = await browser.getPage("qa");
await page.setViewportSize({ width: 1440, height: 900 });
if (page.url() !== URL) {
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  await new Promise((r) => setTimeout(r, 2500));
}
await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), SCROLL_Y);
await new Promise((r) => setTimeout(r, 1800));
const shot = await page.cua.screenshot({ name: NAME });
console.log(JSON.stringify(shot));
