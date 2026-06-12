# PROJECT_STATE

> Single source of truth for build status. Read this first every session.
> Companion docs: [TODO.md](TODO.md) · [CHANGELOG.md](CHANGELOG.md) ·
> [docs/DESIGN_ANALYSIS.md](docs/DESIGN_ANALYSIS.md) · [docs/CONTENT_MAP.md](docs/CONTENT_MAP.md)

## Current phase

**Milestones 0–11 COMPLETE.** M10 added the Projects expansion (/projects
archive + case studies + explorable workflow diagram). M11 was the
refinement pass: reliable cross-route anchor nav (lib/anchor.ts +
AnchorScroll), homepage slimmed to Hero → Capabilities → How I build →
Experience → About → Contact (Proof + Selected-work sections removed),
the Experience+About light "paper" band (.theme-light scoped var
override), human hero cards that navigate, SVG social icons, diagram
spacing/overflow fixes with Backend selected by default. Build-clean,
visually QA'd. **Awaiting user go-ahead for Vercel deployment** (external
action — not taken unilaterally).

## Verified quality gates

| Gate | Result |
| --- | --- |
| `npm run build` | clean — 226 kB first load (/), 220–221 kB (/projects*), all 10 pages static/SSG, three.js in lazy knob chunk |
| M10 multi-agent review | 5-dimension review + adversarial verify (73 agents): all confirmed findings fixed (reduced-motion gating for framer/SMIL pulses, --font-archivo → --font-display, bg tokens, SystemFlow lg-only pipeline, pill/footer overlap, preview clamp, aria-controls) |
| M10 visual QA | dev-browser screenshots: /projects (top/hover preview), deepverify (hero/flow/challenge/gallery/learnings), revo (archstack/metrics/gallery), themex mobile (hero/flow), homepage workflow interaction (backend/AI) — console clean everywhere |
| Lighthouse (prod, headless) | Perf 90 · A11y 95 · BP 100 · SEO 100 · CLS 0 · TBT 140ms |
| Hydration | clean (TickRing float-drift fixed) |
| Console errors | none |
| Visual QA | all 8 sections screenshot-verified desktop (1440) + mobile (390): hero, metrics, knob (+detent interaction), projects, architecture, experience, about, contact |
| Reference match | recording studied frame-by-frame (40 @1fps + 48 @8fps); structure/anatomy adopted in spec's dark palette — see DESIGN_ANALYSIS §0 resolutions |

## Architecture facts (for future sessions)

- Copy lives ONLY in src/lib/content.ts (traces to docs/CONTENT_MAP.md → resume);
  case-study copy lives in src/lib/caseStudies.ts (same traceability rule,
  serializable — server routes pass CaseStudy objects into client components)
- /projects routes: app/projects/page.tsx (index) + app/projects/[slug]/page.tsx
  (SSG, generateStaticParams). Components under components/projects/* —
  ProjectsIndex (cursor preview), detail/* (ProjectHero, LivePanel inline+
  floating pill, SystemFlow, ArchStack, MetricsBand, Gallery frame kinds
  board/bars/log/json, NextProject, ProjectDetail composition)
- Nav is route-aware: hash targets lenis-scroll on "/"; from other routes
  the target goes through lib/anchor.ts (module store) and AnchorScroll —
  mounted ONLY on the homepage — consumes it after mount + 2 rAFs (also
  honors /#hash deep links). SmoothScroll resets Lenis to top on pathname
  change EXCEPT when a hash is present. template.tsx = opacity-only route
  fade (transforms would break fixed-position children)
- Homepage M11/11.1: sections numbered 01–05 (Capabilities #capabilities,
  How I build, Experience #experience, About #about, Contact #contact);
  Proof + Selected-work sections deleted (content.ts no longer exports
  metrics/projects). Mood rhythm: dark (Hero+Knob) → LIGHT How-I-build →
  dark Experience → LIGHT About → dark Contact (teal aura). Light scope =
  .theme-light CSS-var override; every dark↔light seam is a MoodBlend
  aurora (shared/MoodBlend.tsx + .mood-blend CSS — glow radii tuned to
  zero out at the paper edge; pass exact surface colors per instance).
  RULE: inside light-scoped sections AND the Architecture diagram use
  token utilities / var()-based styles only — no raw white-alpha (the
  diagram SVG uses style={{fill/stroke: var(...)}} because var() in SVG
  presentation ATTRIBUTES is unreliable)
- Live-product links: caseStudies[slug].live.href — currently GitHub profile /
  mailto placeholders-of-record; swap to real product URLs when they exist
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
