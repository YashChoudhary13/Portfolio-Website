// Reload the page collecting console errors/warnings + page errors.
const page = await browser.getPage("qa");
const logs = [];
page.on("console", (msg) => {
  const t = msg.type();
  if (t === "error" || t === "warning") logs.push(`[${t}] ${msg.text()}`);
});
page.on("pageerror", (err) => logs.push(`[pageerror] ${err.message}`));
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 4000));
console.log(JSON.stringify(logs, null, 2));
