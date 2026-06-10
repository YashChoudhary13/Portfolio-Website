# PROJECT_STATE

> Single source of truth for build status. Read this first every session.
> Companion docs: [TODO.md](TODO.md) · [CHANGELOG.md](CHANGELOG.md) ·
> [docs/DESIGN_ANALYSIS.md](docs/DESIGN_ANALYSIS.md) · [docs/CONTENT_MAP.md](docs/CONTENT_MAP.md)

## Current phase

**All milestones 0–9 COMPLETE. Site is build-clean, visually QA'd against the
reference recording, and Lighthouse-verified. Awaiting user go-ahead for
Vercel deployment** (external action — not taken unilaterally).

## Verified quality gates

| Gate | Result |
| --- | --- |
| `npm run build` | clean — 218 kB first load, three.js in lazy knob chunk |
| Lighthouse (prod, headless) | Perf 90 · A11y 95 · BP 100 · SEO 100 · CLS 0 · TBT 140ms |
| Hydration | clean (TickRing float-drift fixed) |
| Console errors | none |
| Visual QA | all 8 sections screenshot-verified desktop (1440) + mobile (390): hero, metrics, knob (+detent interaction), projects, architecture, experience, about, contact |
| Reference match | recording studied frame-by-frame (40 @1fps + 48 @8fps); structure/anatomy adopted in spec's dark palette — see DESIGN_ANALYSIS §0 resolutions |

## Architecture facts (for future sessions)

- Copy lives ONLY in src/lib/content.ts (traces to docs/CONTENT_MAP.md → resume)
- Motion constants ONLY in src/lib/motion.ts (springs: gentle/responsive/snap;
  expo tweens for scroll reveals)
- Lenis + GSAP single-ticker wiring in providers/SmoothScroll.tsx (context
  exposes the instance; Nav/Footer scrollTo through it)
- Knob: sections/knob/* — primitives-based geometry (LATHE NORMALS WERE BROKEN
  — do not revert to latheGeometry for the face), procedural equirect env set
  as scene.environment, radial UV-space anisotropyMap, diagonal detents
  (1=BL −135°, 2=TL −45°, 3=TR 45°, 4=BR 135°), accordion drives shortest-path
  rotation, canvas mounts at 600px proximity / frameloop pauses off-view
- QA harness: scripts/qa-*.js run via `dev-browser --headless run <file>`
  (file-based; piping stdin to a backgrounded process hangs)
- Lighthouse: set CHROME_PATH to ms-playwright chromium, `npx lighthouse@12`

## Deferred / optional

- Vercel deploy (ready: metadataBase reads NEXT_PUBLIC_SITE_URL / VERCEL_URL)
- hiartem.com live-DOM inspection (recording proved sufficient)
- Optional polish backlog in TODO.md §Backlog

## Resume point

Project complete pending deploy decision. If deploying: `vercel` CLI or
Vercel MCP tools; set NEXT_PUBLIC_SITE_URL after domain assignment.
