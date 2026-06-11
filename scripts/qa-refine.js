// QA: refinement pass — cross-route anchor nav, light band, hero cards,
// diagram fixes. Desktop 1440.
const page = await browser.getPage("qa");
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e)));

await page.setViewportSize({ width: 1440, height: 900 });

// ── 1. THE critical check: /projects → click About → lands at About ──
await page.goto("http://localhost:3002/projects", { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 2500));
await page.getByRole("navigation").getByText("About", { exact: true }).click();
await new Promise((r) => setTimeout(r, 3200));
const aboutPos = await page.evaluate(() => {
  const el = document.getElementById("about");
  return {
    url: location.pathname,
    scrollY: Math.round(window.scrollY),
    aboutTop: el ? Math.round(el.getBoundingClientRect().top) : null,
  };
});
console.log("about-nav:", JSON.stringify(aboutPos));
const shotAbout = await page.cua.screenshot({ name: "qa-nav-about.jpeg" });
console.log("about shot:", JSON.stringify(shotAbout));

// ── 2. /projects → Experience ──
await page.goto("http://localhost:3002/projects/deepverify", { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 2500));
await page.getByRole("navigation").getByText("Experience", { exact: true }).click();
await new Promise((r) => setTimeout(r, 3200));
const expPos = await page.evaluate(() => {
  const el = document.getElementById("experience");
  return {
    url: location.pathname,
    scrollY: Math.round(window.scrollY),
    expTop: el ? Math.round(el.getBoundingClientRect().top) : null,
  };
});
console.log("experience-nav:", JSON.stringify(expPos));
const shotExp = await page.cua.screenshot({ name: "qa-nav-experience.jpeg" });
console.log("experience shot:", JSON.stringify(shotExp));

// ── 3. hero with new cards ──
await page.goto("http://localhost:3002/", { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 3500));
await page.evaluate(() => window.scrollTo({ top: 320, behavior: "instant" }));
await new Promise((r) => setTimeout(r, 1200));
const shotCards = await page.cua.screenshot({ name: "qa-hero-cards.jpeg" });
console.log("cards:", JSON.stringify(shotCards));

// ── 4. architecture diagram (default backend active, tech text fits) ──
await page.evaluate(() => {
  const el = [...document.querySelectorAll("section")].find((s) =>
    s.getAttribute("aria-label") === "How I build");
  if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
});
await new Promise((r) => setTimeout(r, 2200));
const shotArch = await page.cua.screenshot({ name: "qa-refine-arch.jpeg" });
console.log("arch:", JSON.stringify(shotArch));

// ── 5. light band — experience + about seam ──
await page.evaluate(() => {
  const el = document.getElementById("experience");
  if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
});
await new Promise((r) => setTimeout(r, 1800));
const shotLight = await page.cua.screenshot({ name: "qa-light-experience.jpeg" });
console.log("light exp:", JSON.stringify(shotLight));

await page.evaluate(() => {
  const el = document.getElementById("about");
  if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
});
await new Promise((r) => setTimeout(r, 1800));
const shotLight2 = await page.cua.screenshot({ name: "qa-light-about.jpeg" });
console.log("light about:", JSON.stringify(shotLight2));

console.log("console errors:", JSON.stringify(errors));
