# TODO

## Phase 0 — Reference analysis ✓ (with deferred verification)

- [x] Parse resume → docs/CONTENT_MAP.md
- [x] Deliverables 1–5 → docs/DESIGN_ANALYSIS.md
- [ ] **DEFERRED (tooling outage):** extract frames from recording + inspect
      hiartem.com live → resolve verification queue (DESIGN_ANALYSIS §0)

## Milestones 0–8 — Code complete ✓ (visual QA pending)

- [x] M0 Foundation: tokens, fonts, Lenis+GSAP ticker, glass nav (hide/show,
      magnetic links, mobile overlay), grain, motion.ts, content.ts
- [x] M1 Hero: mask-line display block, 3 tilt cards (sheen, counter-shadow,
      desynced float), scrub exit, scroll cue
- [x] M2 Metrics: hairline ledger, count-up once, hover accent underline
- [x] M3 Knob ★: lathe aluminum + anisotropy maps, Lightformer studio,
      cursor key light, click/drag/keyboard detents w/ momentum, state panel,
      lazy R3F chunk, frameloop view-gating
- [x] M4 Projects: DeepVerify console SVG + REVO browser mock, editorial
      alternating case studies
- [x] M5 Architecture: scroll-drawn paths, SMIL data pulses, node grid,
      mobile vertical flow
- [x] M6 Experience: scroll-grown spine, reveals, CURRENT pulse
- [x] M7 About: outlined watermark parallax, editorial split
- [x] M8 Contact/Footer: display-xl CTA, magnetic email pill, live IST clock

## Milestone 9 — Verification & polish (IN PROGRESS — blocker cleared)

- [x] `npm run build` passing (fix: src/types/globals.d.ts for css imports)
- [x] git init + commits 74253e0, 63e8f99
- [x] Frame-by-frame recording study → verification queue resolved
- [x] Reference-matched refinement pass (typography/nav/hero/metrics/knob/
      projects/contact)
- [ ] Dev server + dev-browser: per-section visual QA, in milestone order
- [ ] Lighthouse ≥ 90 + 60fps trace; bundle check (three.js stays lazy)
- [ ] opengraph-image.tsx
- [ ] Vercel deploy

## Known self-review items (fixed during pass)

- [x] Reveal delay was dead (variant transition precedence) → custom prop
- [x] motion.create() in render → useMemo
- [x] Architecture hooks-in-map → FlowPath component
