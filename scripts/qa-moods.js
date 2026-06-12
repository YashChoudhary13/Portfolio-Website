// QA: alternating mood structure — all four blend seams, light diagram,
// dark experience, light about, teal contact. Desktop 1440.
const page = await browser.getPage("qa");
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e)));

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:3002/", { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 3500));

const shots = [];
async function shotAt(name, finder) {
  await page.evaluate(finder);
  await new Promise((r) => setTimeout(r, 1800));
  const s = await page.cua.screenshot({ name });
  shots.push(name);
  console.log(name, JSON.stringify(s));
}

// seam 1: knob band → aurora → light How I build
await shotAt("qa-seam1.jpeg", () => {
  const el = document.querySelector(".mood-blend");
  if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
});

// light diagram with active node
await shotAt("qa-arch-light.jpeg", () => {
  const el = [...document.querySelectorAll("section")].find((s) =>
    s.getAttribute("aria-label") === "How I build");
  if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
});

// seam 2: light → dark experience
await shotAt("qa-seam2.jpeg", () => {
  const els = document.querySelectorAll(".mood-blend");
  if (els[1]) els[1].scrollIntoView({ behavior: "instant", block: "center" });
});

// seam 3: dark experience → light about
await shotAt("qa-seam3.jpeg", () => {
  const els = document.querySelectorAll(".mood-blend");
  if (els[2]) els[2].scrollIntoView({ behavior: "instant", block: "center" });
});

// seam 4 (vivid): light about → dark teal contact
await shotAt("qa-seam4.jpeg", () => {
  const els = document.querySelectorAll(".mood-blend");
  if (els[3]) els[3].scrollIntoView({ behavior: "instant", block: "center" });
});

// contact in its teal aura
await shotAt("qa-contact-aura.jpeg", () => {
  const el = document.getElementById("contact");
  if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
});

console.log("console errors:", JSON.stringify(errors));
