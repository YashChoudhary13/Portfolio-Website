# DESIGN ANALYSIS — hiartem.com reverse-engineering

> Deliverables 1–5 required before implementation. Companion: [CONTENT_MAP.md](CONTENT_MAP.md).

## 0. Evidence status

Sources used, in order of authority:

1. **Master spec** (user-provided) — itself a detailed decomposition of the reference:
   palette (#050505 / white / 65% white / sparing cyan-green), 120px+ display type,
   floating glass nav, 3 floating tilt cards, metrics, 4-state machined knob,
   editorial case studies, architecture diagram, timeline, huge-type contact.
2. **Resume** — all content (CONTENT_MAP.md).
3. **Genre knowledge** — established Awwwards dark-editorial conventions this
   reference belongs to (Lenis smoothing, mask reveals, magnetic hovers, grain).

**Verification queue — RESOLVED 2026-06-11 via frame-by-frame study of the
recording** (40 frames @1fps + 48 frames @8fps on the knob window):

- [x] **Typeface**: heavy sentence-case neo-grotesque (Helvetica Now/Inter
      Display genre), weight ~800, tracking ~-0.03em, leading ~0.95.
      **NOT uppercase, NOT expanded.** → switch display font to Inter
      (variable, opsz axis), drop wdth 118 + uppercase everywhere.
- [x] **Reference palette**: dark hero/story sections + LIGHT work sections.
      Master spec mandates all-dark (#050505) — spec governs palette;
      recording governs structure/motion/anatomy.
- [x] **Nav**: wide dark bar (rounded ~12px, not a pill), logo + links left
      cluster, right cluster "Say hi!" + social icons; persistent.
- [x] **Hero anatomy**: name on ONE line (display-xl), subline is ~22px gray
      BODY text (not display), 3 cards in a horizontal overlapping scatter
      BELOW the text (rest rotations ≈ -7°/3°/8°), each card = solid dark
      panel with a header strip (title row + hairline) and playful content
      (tinted pill chips / squiggle-path photos / objects).
- [x] **Metrics**: 3 columns w/ vertical hairlines; bold title carrying the
      number + gray sub-line (icons in reference → mono indices in ours).
- [x] **KNOB (critical)**: ~480px dial; near-black bezel ring; spun-metal
      face (starburst conic sheen = radial anisotropy ✓ our approach);
      green dot ON the face near rim points at active position; 4 detents
      at DIAGONALS (1=BL 225°, 2=TL 315°, 3=TR 45°, 4=BR 135°); fine tick
      ring + numbers live in the PAGE around the dial; active number
      darkens w/ emphasized tick. Content = LEFT-side ACCORDION (bold
      titles, hairline-separated; active expands gray body). Click cycles
      clockwise; clicking an accordion row drives the knob too. No section
      pinning.
- [x] **Projects**: cards have static header strip (name) + footer meta
      (category) — adopt strips on our editorial case-study frames.
- [x] **Testimonials**: draggable fanned card deck exists in reference —
      SKIPPED: no testimonial content in resume; nothing to invent.
- [x] **Contact**: CENTERED "Let's build something" display-xl on ambient
      teal→dark gradient; CTA = tilted (-8°) dark "Say hi!" sticker card
      (mailto); small gray caption + logo strip beneath (ours: socials).
- [x] **Reveals**: plain fade/rise dominates; no fancy per-line masks
      visible at 1fps — keep our mask-lines for display (premium-plus)
      but with sentence case.

---

## 1. Complete design analysis

### 1.1 Layout system

- **Canvas**: single dark page (#050505), full-bleed sections, no boxed page frame.
- **Grid**: 12-column fluid grid, `max-width: 100rem (1600px)`, gutter
  `clamp(1.25rem, 5vw, 5rem)`. Columns are layout *positions*, not card slots.
- **Asymmetry as identity**: headings hang left across 8–10 columns; body copy
  sits in a 4–5 column measure (`max-width ~34rem`), often offset to columns 6–10
  to create diagonal reading flow. Never centered-stack-of-cards.
- **Hairline structure**: 1px `rgba(255,255,255,0.08)` rules separate functional
  zones (metrics rows, timeline entries, footer meta). Borders do structural work
  decoration would otherwise do.
- **Depth layers** (back→front): base canvas → ambient glow fields (radial
  gradients, accent at 4–8% alpha) → grain overlay (2–3% opacity, fixed) →
  content → floating elements (cards, knob, nav).
- **Breakpoints**: 768 / 1024 / 1440. Mobile collapses to single column,
  preserves type scale hierarchy (48px+ display floor), tilt interactions degrade
  to static depth + entrance motion only.

### 1.2 Typography system

- **Display**: Archivo Variable, `wght 780–840`, `wdth 118`, tracking `-0.045em`,
  leading `0.92`, `text-wrap: balance`. Fluid scale:
  - `display-xl` `clamp(3rem, 1rem + 9.5vw, 10rem)` — hero name, contact CTA
  - `display-lg` `clamp(2.5rem, 0.9rem + 7vw, 7.5rem)` — section titles, metric numbers
  - `display-md` `clamp(2rem, 1rem + 4vw, 4.5rem)` — case-study titles, knob state titles
- **Eyebrow/meta**: IBM Plex Mono 500, `11px`, uppercase, tracking `0.22em`,
  `white/40` — section indices (`01 — METRICS`), tech labels, timeline dates.
  The mono is what makes it read *technical* rather than fashion-editorial.
- **Body**: Archivo 400, `16–18px`, leading `1.6`, `white/65`. Strong nouns may
  flip to `white/100`.
- **Numerals**: `font-variant-numeric: tabular-nums` for metrics and counters.
- **Hierarchy rule**: each viewport shows ONE dominant type element. Sections are
  composed around their display block; everything else recedes.

### 1.3 Spacing system

Base-8 ladder with deliberate jumps: `8 / 16 / 24 / 40 / 64 / 104 / 168 / 200`.

- Section padding-block: `clamp(6rem, 14vh, 12.5rem)`.
- Eyebrow → title: `24px`. Title → body: `40px`. Sibling blocks: `64–104px`.
- Whitespace carries the luxury signal: when in doubt, double the gap rather
  than add a divider, and add a divider rather than a box.

### 1.4 Color & surface system

| Token | Value | Use |
| --- | --- | --- |
| base | `#050505` | page |
| raised | `#0a0a0b` | knob stage, case-study wells |
| ink | `#fff` | display type, primary |
| ink-65 | `rgba(255,255,255,.65)` | body |
| ink-40 | `rgba(255,255,255,.40)` | eyebrows, meta |
| hairline | `rgba(255,255,255,.08)` | rules, glass borders |
| glass | `linear-gradient(145deg, w/7%, w/2%)` + `blur(24px) sat(140%)` | nav, cards |
| accent | `#66f0c2` | ≤1 use per viewport: live dots, data flows, hover underlines, selection |

Accent discipline is the difference between premium and startup-flashy: it never
fills surfaces, only marks *signal* (activity, focus, data movement).

### 1.5 Animation system

- **Two motion families**:
  1. *Springs* (Framer Motion) for everything cursor-driven: tilt, magnetic pulls,
     knob rotation. Config bands: gentle `{stiffness 120, damping 22, mass 1}`,
     responsive `{170, 26, 0.9}`, mechanical-snap `{300, 26, 1}` (knob detent —
     slight overshoot ≈ machined click).
  2. *Eased tweens* (GSAP/CSS) for scroll choreography: `--ease-out-expo
     cubic-bezier(0.16,1,0.3,1)`, durations 0.6–1.4s, staggers 60–90ms.
- **Reveal grammar** (consistent site-wide):
  - Display lines: per-line mask reveal — line wrapped in `overflow:hidden`,
    inner span rises from `y:110%` + slight `rotateZ 1.5°→0`, 0.9s expo, 80ms stagger.
  - Body/meta: fade-rise `y:24px→0, opacity 0→1`, 0.7s.
  - Media/blocks: scale `1.06→1` inside clipped frame + fade, 1.1s.
- **Exit choreography**: hero content parallaxes up ~10% and fades as you leave it.
- **Nothing bounces.** Overshoot only on the knob detent (mechanical), never on type.
- `prefers-reduced-motion`: all reveals collapse to opacity; tilt/parallax off.

### 1.6 Interaction system

- **Smooth scroll**: Lenis `lerp 0.1`, synced to GSAP ScrollTrigger via
  `gsap.ticker` (single rAF owner — no competing loops).
- **Cursor tilt** (cards): pointer position normalized to element center →
  springs drive `rotateX ±8°, rotateY ±10°` (perspective 1000px), children get
  `translateZ` 20–60px layering; sheen = radial gradient tracking cursor at 6–10%
  white; shadow translates opposite the tilt and deepens.
- **Magnetic elements** (nav links, CTA, social links): within proximity radius,
  element translates toward cursor up to 6–8px with gentle spring; text inside
  translates a further 30% (parallax-in-miniature).
- **Link hover**: stacked-duplicate text slide (`overflow:hidden`; spans shift
  `-100%`), 0.45s expo; or hairline → accent underline grow for body links.
- **Knob input**: click → next detent; drag/wheel → free rotation with velocity,
  released to nearest 90° detent. Cursor proximity raises specular intensity.

### 1.7 3D effects (knob — hero interaction of the site)

- **Geometry**: lathe-profiled cylinder: chamfered top face, machined rim with
  ~72 instanced grip ridges, recessed accent index dot, subtle top-face inset.
- **Material**: `MeshPhysicalMaterial{ metalness 1, roughness .32,
  anisotropy .9 (radial via anisotropyMap), clearcoat .25, clearcoatRoughness .2 }`
  with **procedural canvas textures** (radial streak roughness + normal) — true
  brushed aluminum, zero downloads.
- **Lighting**: procedural `<Environment frames={1} resolution={256}>` with
  Lightformers — overhead long rect strip (key reflection), two dim side strips,
  faint ring — produces the long anisotropic streak highlights; plus a
  cursor-tracked point light (the "dynamic reflections / cursor-driven lighting"
  requirement); `ContactShadows` beneath.
- **Physics**: rotation is a Framer Motion spring on a `MotionValue`; drag adds
  velocity; release snaps to nearest detent with mechanical-snap spring; tick
  sound-free but visually "clicks" via 1-frame 0.98 scale pulse on detent land.
- **DOM sync**: knob state (0–3) is React state; content panel transitions
  (`AnimatePresence` mode="popLayout": old state slides/fades down, new rises)
  share the knob's spring timing so the whole section feels like one machine.
- **Budget**: canvas `dpr [1, 2]`, no postprocessing, `frameloop="always"` only
  while section in view (IntersectionObserver gates `frameloop="never"`).

### 1.8 Hover effects taxonomy

| Target | Effect |
| --- | --- |
| Nav links | magnetic pull + text slide-swap |
| Nav container | none (stillness = confidence) |
| Hero cards | tilt + sheen + shadow shift + content translateZ |
| Metric rows | number flips `white→accent` underline grow (hairline) |
| Knob | specular intensify, cursor light follows, `scale 1.02` |
| Case-study visual | inner image `scale 1.04`, caption meta rises |
| Case-study title | slide-swap with arrow glyph entering from left |
| Timeline rows | row background `white/3%`, date column → accent |
| Contact CTA | magnetic + accent underline sweep |
| Social links | mono label slide-swap with `↗` |

### 1.9 Scroll effects

- Lenis global smoothing; anchor nav scrolls via Lenis `scrollTo` (offset for nav).
- **Hero**: content `yPercent: -10, opacity → .4` scrub as it exits; cards drift
  at differing parallax rates (depth illusion).
- **Metrics**: count-up triggers at 60% viewport entry (once); numbers roll
  through `tabular-nums` so layout never shifts.
- **Architecture**: ScrollTrigger scrub draws SVG connection paths
  (`stroke-dashoffset`), then accent flow-pulses loop along paths; nodes pop in
  sequenced by dependency order (frontend → backend → db/ai → deploy).
- **Experience**: timeline spine grows downward with scroll; entries mask-reveal
  as the spine passes them.
- **Contact**: huge type line-mask reveals; footer meta fades last.
- **Global**: section eyebrows + titles use shared `Reveal` primitives; no
  section appears without choreography, but scrub is reserved for hero exit,
  architecture, and timeline spine (overuse reads gimmicky).

### 1.10 Asset strategy

- **Fonts**: self-hosted via `next/font/google` (build-time, zero CLS):
  Archivo Variable (latin, wdth axis), IBM Plex Mono 400/500. No runtime font CDN.
- **Zero raster images.** All visuals are: CSS gradient glow fields, inline SVG
  (diagrams, project visuals, icons), runtime-generated canvas textures (brushed
  metal, grain), WebGL (knob). Nothing to optimize, nothing to lazy-load except
  the knob bundle.
- **Code-splitting**: `next/dynamic` `ssr:false` for the entire R3F knob canvas
  (three.js ~150KB gz stays out of the initial bundle); IntersectionObserver
  mounts it just-in-time.
- **OG/meta**: static OG image generated once (1200×630, dark, display type);
  SVG favicon (monogram "Y." white on #050505).

---

## 2. Section-by-section breakdown

### S0 — Navigation (persistent)
Glass pill, fixed top-center (`top: 1.25rem`), height 56px, radius 999px,
glass-panel surface. Left: wordmark `Yash Choudhary©` (mono, slide-swap hover).
Right: `Work / About / Contact` + accent-dot availability chip. Hide on
scroll-down (translateY -120%, 0.6s expo), show on scroll-up. Mobile: wordmark +
menu button → full-screen overlay, links mask-reveal staggered.

### S1 — Hero (100svh)
- Eyebrow row: `PORTFOLIO — 2026` left, `JAIPUR, IN (UTC+5:30)` right (mono).
- Display-xl block, 3 masked lines: `YASH` / `CHOUDHARY` / `FULL-STACK ENGINEER
  & AI SYSTEMS BUILDER` (third line display-md, ink-65).
- Body (col 7–10, ~30rem): GenAI internship, RAG systems in production, paid
  client delivery. One sentence, confident.
- **Three floating glass cards** anchored right/lower-right, overlapping the type
  block's right edge, each offset in x/y/z with independent idle float (±6px,
  6–9s periods, desynced) + cursor tilt + sheen + entrance: rise 60px, blur 8→0,
  staggered 120ms after headline lands. Content: mono index (`01`), title
  (AI Engineering / Full Stack Systems / Production Deployments), one-line meta.
- Bottom edge: scroll cue — mono `SCROLL` + 24px hairline that pulses downward.
- Exit: scrub parallax (1.5.9).

### S2 — Metrics
Eyebrow `01 — PROOF, NOT PROMISES`. Five hairline-separated rows, full-width:
display-lg tabular number left (`40K / 5 / 70% / 60% / 1.8s`), label + source
project right (mono + body). Count-up on entry (1.2s expo, once). Hover: 1.8
accent underline grow. Mobile: rows stack number-over-label.

### S3 — Control knob ★
Two-column stage on `raised` well (full-bleed band): left = knob canvas
(~560px square, ContactShadows below, faint accent glow behind), right = state
content. Around knob: 4 mono labels at 0/90/180/270° (`AI ENG / FULL STACK /
PROD SYS / PROJECTS`), active label `ink`, inactive `ink-25`; accent index dot
on knob points at active. Right panel per state: mono index (`STATE 01/04`),
display-md title, 2-line body, 3 mono chips. Interactions per 1.6/1.7.
Footer hint: mono `CLICK OR DRAG — IT'S A REAL KNOB`.

### S4 — Project showcase
Eyebrow `02 — SELECTED WORK`. Two full-width editorial case studies, alternating
orientation, each ~90vh min:
- **DeepVerify**: SVG/CSS hero visual — layered "detection console": image grid
  being scanned (animated accent scanline), 5 model chips voting, verdict meter.
  Problem → Architecture (mini pipeline diagram: upload → FastAPI → Redis queue →
  5-model ensemble → verdict) → Results (40K images / −12% FP / 1.8s avg).
  Stack chips: Next.js, FastAPI, PyTorch, Redis, Docker.
- **REVO**: browser-chrome mockup of a GitHub repo page with injected panel
  (pure CSS/SVG), cache-hit counter, 10:00→0:30 time collapse animation.
  Problem → Architecture (extension → REST API → cache → JSON export) →
  Results (70% fewer calls, 30s analysis). Stack: React, Vite, MV3, GitHub API.
Links: `LIVE ↗` / `GITHUB ↗` mono, magnetic.

### S5 — Architecture visualization
Eyebrow `03 — HOW I BUILD`. Full-width SVG diagram, 5 nodes (Frontend / Backend
/ Database / AI Layer / Deployment) as glass chips on a dotted grid field,
curved connection paths. Scroll scrub draws paths; accent pulses then loop
continuously (dash animation). Each node hover: lifts (shadow + translateY -4),
reveals its tech list (Next.js·React / Node·FastAPI / PostgreSQL·Redis /
RAG·PyTorch·LLM APIs / Docker·Vercel·Railway). Mobile: vertical flow.

### S6 — Experience
Eyebrow `04 — EXPERIENCE`. Left spine (1px hairline) grows with scroll; two
entries (Artifact Solutions internship / The MEX freelance) reveal as spine
passes: date column (mono), role + org (display-md), 3 bullets (body), chip row.
Live entry gets pulsing accent dot + `CURRENT`.

### S7 — About
Eyebrow `05 — ABOUT`. Editorial split: display-lg statement filling cols 1–8
("I ship systems, not demos." energy — drawn from CONTENT_MAP), body narrative
cols 8–12 offset lower (education, IBM AI/ML specialization, engineering
mindset). Backdrop: oversized outlined `Y.` watermark (stroke text, white/4%)
with slow parallax. No photo required — typographic self-portrait.

### S8 — Contact + footer
Eyebrow `06 — CONTACT`. Display-xl two-line CTA: `LET'S BUILD` /
`SOMETHING REAL` (second line ink-65 → hover accent sweep). Magnetic email
button (mono, glass pill). Social row: GITHUB / LINKEDIN / LEETCODE slide-swap
links. Footer meta row under hairline: `© 2026 YASH CHOUDHARY` · local time
(live, IST) · `BUILT WITH NEXT.JS + THREE.JS` · back-to-top magnetic `↑`.

---

## 3. Implementation plan

### 3.1 Architecture

- Next.js App Router, all sections client components composed in a single
  `page.tsx` (one-page site); `layout.tsx` holds fonts/meta/providers.
- **One rAF**: GSAP ticker drives Lenis; Framer springs run on their own
  optimized loop; R3F canvas isolated and view-gated.
- Shared primitives before sections: `Reveal` (line-mask + fade-rise variants),
  `Eyebrow`, `SectionHeading`, `Magnetic`, `TiltCard`, `SlideSwapLink`,
  `useCursor` (global normalized cursor MotionValues), `motion.ts` (spring bands,
  easings, durations — single source so the whole site shares one motion accent).

### 3.2 File tree

```
src/
  app/{layout.tsx, page.tsx, globals.css, icon.svg, opengraph-image.tsx}
  lib/{motion.ts, useCursor.ts, useInViewOnce.ts, content.ts}
  components/
    providers/SmoothScroll.tsx
    layout/{Nav.tsx, Footer.tsx}
    shared/{Reveal.tsx, Eyebrow.tsx, Magnetic.tsx, TiltCard.tsx,
            SlideSwapLink.tsx, Grain.tsx, GlowField.tsx, CountUp.tsx}
    sections/
      Hero.tsx  HeroCards.tsx
      Metrics.tsx
      knob/{KnobSection.tsx, KnobCanvas.tsx, KnobMesh.tsx, knobTextures.ts,
            KnobStatePanel.tsx, knobStates.ts}
      projects/{Projects.tsx, CaseStudy.tsx, DeepVerifyVisual.tsx, RevoVisual.tsx}
      architecture/{Architecture.tsx, archData.ts}
      Experience.tsx
      About.tsx
      Contact.tsx
```

`content.ts` centralizes copy from CONTENT_MAP.md — sections never hardcode facts.

### 3.3 Technique choices (per risk)

| Concern | Choice |
| --- | --- |
| Line-mask reveals | Manual line splitting (we control line breaks via spans) — no SplitText dependency |
| Count-up | Framer `animate()` on MotionValue → text, tabular-nums |
| Knob bundle | `next/dynamic(() => import('./KnobCanvas'), { ssr:false })` + IO mount; static fallback disc until ready |
| Brushed texture | OffscreenCanvas radial streaks → `CanvasTexture` (roughness+normal+anisotropy) |
| Arch diagram | Hand-authored SVG paths + ScrollTrigger scrub + CSS dash loops |
| Grain | 64px noise tile (canvas-generated data URI) fixed overlay, `mix-blend: overlay`, 3% |
| Reduced motion | `useReducedMotion()` short-circuits tilt/parallax/scrub |

### 3.4 Performance budget

- Initial JS (no knob): < 180KB gz. Knob chunk: ~160KB gz, lazy.
- LCP = hero display text (font preloaded, no image LCP). CLS ≈ 0 (fluid type, fixed canvas slot).
- 60fps: transforms/opacity only; `will-change` applied during animation only;
  canvas DPR ≤ 2; ContactShadows `frames={1}`-style cheap settings where possible.
- Lighthouse targets: Perf ≥ 90, A11y ≥ 95 (focus-visible styles, semantic
  landmarks, knob keyboard-operable: arrow keys rotate states, aria-live panel).

### 3.5 Verification workflow (when tooling recovers)

1. `npm run build` + dev-server smoke.
2. Frame-by-frame study of recording → tune verification-queue constants.
3. dev-browser screenshots per section ↔ reference comparison; refine spacing/motion/type.
4. Lighthouse + 60fps trace.

---

## 4. Asset list

| Asset | Source | Status |
| --- | --- | --- |
| Archivo Variable (latin, wght+wdth) | next/font/google, self-hosted at build | pending wiring |
| IBM Plex Mono 400/500 (latin) | next/font/google | pending wiring |
| Brushed-aluminum roughness/normal/anisotropy maps | runtime canvas (knobTextures.ts) | to build |
| Grain tile | runtime canvas → data URI | to build |
| Glow fields | CSS radial gradients | to build |
| Architecture diagram | hand-authored inline SVG | to build |
| DeepVerify console visual | inline SVG/CSS composition | to build |
| REVO browser mockup | inline SVG/CSS composition | to build |
| Favicon `icon.svg` | hand-authored monogram | to build |
| OG image | `opengraph-image.tsx` (next/og) | to build |
| Photography / stock / Lottie / video | — | **none used** |

## 5. Milestone plan (acceptance-gated)

| # | Milestone | Acceptance criteria |
| --- | --- | --- |
| 0 | Foundation | tokens+fonts+Lenis+ticker wiring; nav glass pill w/ hide-show + magnetic links; grain; builds clean |
| 1 | Hero | line-mask choreography ≤1.4s total; 3 cards tilt+sheen+float desynced; scrub exit; mobile stack |
| 2 | Metrics | count-up once at 60% entry; tabular alignment; hairline rhythm |
| 3 | Knob ★ | reads as machined aluminum; cursor light visibly moves reflections; drag inertia + 90° detent snap w/ overshoot; 4 states sync content panel; keyboard accessible; lazy chunk |
| 4 | Projects | both case studies w/ animated SVG visuals; editorial asymmetry; magnetic links |
| 5 | Architecture | scrub path-draw + looping pulses; node hovers; mobile vertical |
| 6 | Experience | spine growth scrub; entry reveals; CURRENT pulse |
| 7 | About | watermark parallax; editorial split |
| 8 | Contact/Footer | display-xl CTA; magnetic email; live IST clock; back-to-top |
| 9 | Polish | recording-verification pass; Lighthouse ≥90; 60fps trace; deploy to Vercel |

Each milestone ends with: PROJECT_STATE/TODO/CHANGELOG update + commit
(commits queue locally if git remains gated; see PROJECT_STATE).
