# PROJECT_STATE

> Single source of truth for build status. Read this first every session.
> Companion docs: [TODO.md](TODO.md) · [CHANGELOG.md](CHANGELOG.md) ·
> [docs/DESIGN_ANALYSIS.md](docs/DESIGN_ANALYSIS.md) · [docs/CONTENT_MAP.md](docs/CONTENT_MAP.md)

## Current phase

**Milestones 0–8 CODE-COMPLETE. Milestone 9 (verification & polish) blocked
on tooling.** Phase 0 analysis complete (docs/DESIGN_ANALYSIS.md, five
deliverables); recording frame-study deferred (see verification queue §0).
All sections written: Hero, Metrics, Knob (R3F), Projects, Architecture,
Experience, About, Contact, Footer — composed in src/app/page.tsx.

## Environment blocker — RESOLVED

The permission-classifier outage cleared mid-session. Since then:
`git init` + 2 commits (74253e0 root, 63e8f99 refinement), `npm run build`
passing (218 kB first load, three.js lazily chunked), ffmpeg frames extracted
(40 @1fps + 48 @8fps knob window), verification queue in DESIGN_ANALYSIS §0
fully resolved, reference-matched refinement pass applied (Inter, nav bar
anatomy, hero scatter, metrics columns, knob accordion + diagonal detents +
bezel, case-study strips, contact sticker CTA).

Remaining: dev-browser visual QA loop (in progress) → Lighthouse/60fps →
opengraph-image → Vercel deploy.

## Status snapshot

| Area | Status |
| --- | --- |
| Deps | Installed: next@15.5, react@19.2, tailwind v4, framer-motion@12.40, gsap@3.15, lenis@1.3.23, three@0.184, @react-three/fiber@9.6, @react-three/drei@10.7 |
| Configs | tsconfig / next.config / postcss / .gitignore done |
| Analysis | **DONE** — docs/DESIGN_ANALYSIS.md (5 deliverables + verification queue) |
| Content | **DONE** — docs/CONTENT_MAP.md |
| Tokens | globals.css done (aligned with analysis §1.2–1.4) |
| Foundation code | IN PROGRESS — motion.ts, providers, Nav, shared primitives, layout/page |
| Sections | not started (order: hero → metrics → knob → projects → arch → exp → about → contact) |
| Git | NOT initialized (gated) — commits queued in CHANGELOG entries |
| Build verification | NOT run yet (gated) — code written carefully; full build+QA pass queued |

## Key decisions

- Fonts: Archivo Variable (wght+wdth 118) display+body, IBM Plex Mono labels —
  identity to be confirmed against recording (verification queue §0)
- Knob: MeshPhysicalMaterial anisotropy + procedural canvas textures +
  Lightformer studio + cursor point light; spring detents (stiffness 300/damping 26)
- Zero raster assets; all visuals CSS/SVG/canvas/WebGL; knob lazy via next/dynamic
- Motion: two families — springs (cursor-driven) / expo tweens (scroll reveals);
  constants centralized in src/lib/motion.ts
- content.ts centralizes all copy from CONTENT_MAP.md

## Resume point

Everything through M8 is written; nothing has been compiled or rendered yet.
FIRST ACTION next session (or on classifier recovery):
1. `npm run build` → fix whatever surfaces (springs/TS/Tailwind v4 guesses
   are untested)
2. `git init` + initial commit
3. ffmpeg frame extraction → DESIGN_ANALYSIS §0 verification queue →
   per-section visual QA in milestone order (dev server + dev-browser)
4. Lighthouse / 60fps / opengraph-image / deploy
