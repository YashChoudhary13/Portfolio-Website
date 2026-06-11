/**
 * Deep case-study content for the /projects experience. Every metric and
 * architecture fact traces to docs/CONTENT_MAP.md (which traces to the
 * resume). The homepage stays curated via lib/content.ts — this file owns
 * the archive: full system stories for each build.
 *
 * Data is intentionally serializable (strings/numbers only) so server
 * routes can pass a CaseStudy straight into client components.
 */

export type FlowStage = {
  id: string;
  label: string;
  /** one-line role of the stage, mono caption under the label */
  sub: string;
  detail: {
    body: string;
    /** internals revealed when the stage is selected */
    points: readonly string[];
  };
};

export type ArchLayer = {
  id: string;
  name: string;
  /** mono caption, e.g. "FASTAPI · ASYNC" */
  tech: string;
  body: string;
  items: readonly { label: string; note: string }[];
};

export type Decision = {
  title: string;
  body: string;
  tradeoff: string;
};

export type Metric = {
  /** number → CountUp roll-in; string → rendered as-is */
  value: number | string;
  suffix?: string;
  decimals?: number;
  label: string;
  note: string;
};

export type GalleryFrame =
  | {
      kind: "board";
      title: string;
      caption: string;
      columns: readonly {
        name: string;
        tickets: readonly { id: string; meta: string; live?: boolean }[];
      }[];
    }
  | {
      kind: "bars";
      title: string;
      caption: string;
      bars: readonly {
        label: string;
        value: number; // 0..1
        display: string;
        accent?: boolean;
      }[];
      footer?: { label: string; value: string; meta?: string };
    }
  | {
      kind: "log";
      title: string;
      caption: string;
      lines: readonly {
        time: string;
        text: string;
        tone: "dim" | "default" | "bright" | "accent";
      }[];
    }
  | {
      kind: "json";
      title: string;
      caption: string;
      code: string;
    };

export type CaseStudy = {
  slug: string;
  index: string;
  name: string;
  category: string;
  date: string;
  timeline: string;
  role: string;
  status: "live" | "shipped";
  statusLabel: string;
  /** one-sentence outcome, leads the index row */
  outcome: string;
  /** hero subline — what it is, why it exists, why it matters */
  heroSub: string;
  live: {
    /** "LIVE PRODUCT" / "PUBLIC BUILD" / "PRIVATE CLIENT BUILD" */
    badge: string;
    /** domain or short descriptor shown large in the panel */
    label: string;
    cta: string;
    href: string;
    external: boolean;
  };
  flow: readonly FlowStage[];
  challenge: {
    statement: string;
    body: string;
    points: readonly string[];
  };
  solution: {
    intro: string;
    decisions: readonly Decision[];
  };
  archLayers: readonly ArchLayer[];
  metrics: readonly Metric[];
  gallery: readonly GalleryFrame[];
  learnings: readonly { title: string; body: string }[];
  stack: readonly string[];
  nextSlug: string;
};

export const caseStudies: readonly CaseStudy[] = [
  // ────────────────────────────────────────────────────────── DeepVerify
  {
    slug: "deepverify",
    index: "01",
    name: "DeepVerify",
    category: "ML Systems / Computer Vision",
    date: "Dec 2025",
    timeline: "Nov — Dec 2025",
    role: "Solo build",
    status: "shipped",
    statusLabel: "Shipped · Public build",
    outcome:
      "Five convolutional models vote on every image — synthetic media flagged in 1.8 seconds.",
    heroSub:
      "A deepfake detection platform built on one premise: no single detector deserves your trust. Five CNN architectures examine every upload in parallel, and their agreement — or disagreement — becomes the verdict.",
    live: {
      badge: "Public build",
      label: "github.com/yashchoudhary13",
      cta: "Open repository",
      href: "https://github.com/yashchoudhary13",
      external: true,
    },
    flow: [
      {
        id: "upload",
        label: "Upload",
        sub: "Concurrent intake",
        detail: {
          body: "Drag-and-drop console accepting multiple images at once. Each upload becomes an independent job with its own lifecycle — nothing blocks while models work.",
          points: [
            "Client-side type and size validation before any byte leaves the browser",
            "Parallel uploads — each image is a separate job",
            "Job ID returned immediately; the UI tracks status from there",
          ],
        },
      },
      {
        id: "gateway",
        label: "FastAPI Gateway",
        sub: "Async intake",
        detail: {
          body: "A fully async FastAPI service normalizes the image and hands the job off without holding the request open against GPU-bound work.",
          points: [
            "Non-blocking endpoints — intake stays fast under load",
            "Preprocessing: resize, normalize, face-region crop",
            "Job pushed to the queue; the API never waits on inference",
          ],
        },
      },
      {
        id: "queue",
        label: "Redis Queue",
        sub: "Decoupled inference",
        detail: {
          body: "Redis sits between the API and the models. The request path stays responsive no matter how deep the inference backlog gets.",
          points: [
            "Jobs queued with status tracking — queued, running, done",
            "Workers pull at their own pace; bursts don't take the API down",
            "Results cached so repeat lookups never touch the models",
          ],
        },
      },
      {
        id: "ensemble",
        label: "Model Ensemble",
        sub: "5 CNNs in parallel",
        detail: {
          body: "Five architectures with five different failure modes examine the same image: EfficientNet-B0, ResNet-50, Xception, MobileNet-V2, and a custom CNN trained on 40K balanced images.",
          points: [
            "EfficientNet-B0 · ResNet-50 · Xception · MobileNet-V2 · custom CNN",
            "Custom model trained on 40K images — 20K real, 20K synthetic",
            "Diverse architectures overfit to different generation artifacts",
          ],
        },
      },
      {
        id: "verdict",
        label: "Weighted Verdict",
        sub: "Vote fusion",
        detail: {
          body: "Per-model probabilities are fused into one weighted verdict. Disagreement between models is treated as signal, not noise — it shows up in the confidence score.",
          points: [
            "Weighted fusion of five independent probabilities",
            "12% fewer false positives than the best single model",
            "Model spread surfaces as a confidence band, not a hidden average",
          ],
        },
      },
      {
        id: "report",
        label: "Report",
        sub: "1.8s average",
        detail: {
          body: "The verdict comes back with the full per-model breakdown and timing — an answer you can interrogate, not a black-box yes/no.",
          points: [
            "Final verdict with confidence percentage",
            "Per-model probability breakdown",
            "1.8s average detection time, end to end",
          ],
        },
      },
    ],
    challenge: {
      statement: "One model lies confidently.",
      body: "Single-model detectors look great on their own test set, then misfire in production — each architecture overfits to the artifacts of whatever generators it trained against. And inference this heavy can't sit on the request path.",
      points: [
        "A single CNN locks onto one family of generation artifacts — confident and wrong on the next one",
        "Five models per image is heavy compute; running it synchronously freezes every upload",
        "Skewed training data silently biases verdicts — the set had to stay balanced at 40K scale",
      ],
    },
    solution: {
      intro:
        "Three decisions shaped the system — each one traded raw simplicity for production behavior.",
      decisions: [
        {
          title: "An ensemble, not a bigger model",
          body: "Five diverse architectures vote on every image. Where one model's blind spot begins, another's training takes over — disagreement itself becomes a usable signal.",
          tradeoff:
            "5× inference cost per image — bought back with parallel workers behind the queue.",
        },
        {
          title: "A queue between the API and the models",
          body: "Redis decouples intake from inference. Uploads return instantly with a job ID; workers chew through the backlog at their own pace.",
          tradeoff:
            "Results are eventual, not inline — acceptable when the answer lands in seconds.",
        },
        {
          title: "Balance the data before tuning the models",
          body: "The custom CNN trained on 40K images split exactly 20K real / 20K synthetic. Keeping that balance moved accuracy more than any architecture tweak.",
          tradeoff: "Curation time over raw dataset volume.",
        },
      ],
    },
    archLayers: [
      {
        id: "interface",
        name: "Interface",
        tech: "NEXT.JS · REACT",
        body: "Upload console and verdict report. Optimistic job rows track status from queued to done without a reload.",
        items: [
          { label: "Upload console", note: "drag-and-drop, multi-file" },
          { label: "Job status", note: "polls the queue state per job" },
          { label: "Verdict report", note: "per-model breakdown + timing" },
        ],
      },
      {
        id: "api",
        name: "API",
        tech: "FASTAPI · ASYNC",
        body: "Async Python service owning intake, preprocessing and orchestration. Never blocks on the models.",
        items: [
          { label: "Async endpoints", note: "non-blocking intake path" },
          { label: "Preprocessing", note: "resize · normalize · face crop" },
          { label: "Job dispatch", note: "hands off to Redis, returns ID" },
        ],
      },
      {
        id: "queue",
        name: "Queue",
        tech: "REDIS",
        body: "Job broker and result cache. The shock absorber between user-facing latency and GPU-bound work.",
        items: [
          { label: "Job queue", note: "queued → running → done" },
          { label: "Status store", note: "live state per job ID" },
          { label: "Result cache", note: "repeat verdicts skip inference" },
        ],
      },
      {
        id: "inference",
        name: "Inference",
        tech: "PYTORCH · 5 MODELS",
        body: "The ensemble: four proven architectures plus a custom CNN, run in parallel and fused into a weighted verdict.",
        items: [
          { label: "EfficientNet-B0 / ResNet-50", note: "transfer-learned" },
          { label: "Xception / MobileNet-V2", note: "transfer-learned" },
          { label: "Custom CNN", note: "trained on 40K balanced images" },
        ],
      },
      {
        id: "infra",
        name: "Infrastructure",
        tech: "DOCKER",
        body: "API and workers containerized separately — reproducible builds, independent scaling.",
        items: [
          { label: "API container", note: "stateless, scales wide" },
          { label: "Worker containers", note: "scale with inference load" },
          { label: "One compose up", note: "full stack, anywhere" },
        ],
      },
    ],
    metrics: [
      {
        value: 40,
        suffix: "K",
        label: "Training images",
        note: "balanced — 20K real / 20K synthetic",
      },
      {
        value: 5,
        label: "Model ensemble",
        note: "EfficientNet · ResNet · Xception · MobileNet · custom CNN",
      },
      {
        value: "−12%",
        label: "False positives",
        note: "versus the best single model",
      },
      {
        value: 1.8,
        suffix: "s",
        decimals: 1,
        label: "Average detection",
        note: "async FastAPI + Redis pipeline",
      },
    ],
    gallery: [
      {
        kind: "board",
        title: "Inference queue",
        caption:
          "Jobs move queued → running → done while the API stays untouched.",
        columns: [
          {
            name: "QUEUED",
            tickets: [
              { id: "img_4823", meta: "waiting · pos 1" },
              { id: "img_4824", meta: "waiting · pos 2" },
            ],
          },
          {
            name: "RUNNING",
            tickets: [
              { id: "img_4821", meta: "ensemble · 5 models", live: true },
              { id: "img_4822", meta: "preprocess", live: true },
            ],
          },
          {
            name: "DONE",
            tickets: [
              { id: "img_4818", meta: "real · 0.94" },
              { id: "img_4819", meta: "synthetic · 0.97" },
              { id: "img_4820", meta: "real · 0.89" },
            ],
          },
        ],
      },
      {
        kind: "bars",
        title: "Ensemble verdict",
        caption:
          "Five independent probabilities, one weighted answer — spread is signal.",
        bars: [
          { label: "EFFICIENTNET-B0", value: 0.82, display: "0.82" },
          { label: "RESNET-50", value: 0.74, display: "0.74" },
          { label: "XCEPTION", value: 0.9, display: "0.90", accent: true },
          { label: "MOBILENET-V2", value: 0.66, display: "0.66" },
          { label: "CUSTOM CNN", value: 0.87, display: "0.87" },
        ],
        footer: {
          label: "VERDICT",
          value: "SYNTHETIC — 96.8% CONFIDENCE",
          meta: "1.8s",
        },
      },
      {
        kind: "json",
        title: "API response",
        caption: "An answer you can interrogate — every model on the record.",
        code: `{
  "job_id": "img_4821",
  "verdict": "synthetic",
  "confidence": 0.968,
  "models": {
    "efficientnet_b0": 0.82,
    "resnet50": 0.74,
    "xception": 0.90,
    "mobilenet_v2": 0.66,
    "custom_cnn": 0.87
  },
  "latency_s": 1.8
}`,
      },
    ],
    learnings: [
      {
        title: "Disagreement is information",
        body: "When five models split on an image, that spread says more than any single confidence score. Designing the verdict to expose it — instead of averaging it away — made the output trustworthy.",
      },
      {
        title: "Queues are a UX feature",
        body: "Redis wasn't a performance trick. It's the reason uploading feels instant while five CNNs grind in the background — latency you can't remove, you can move.",
      },
      {
        title: "Data discipline beats architecture",
        body: "Keeping the training set balanced at 20K/20K moved the metrics more than any clever layer ever did. The boring work was the high-leverage work.",
      },
    ],
    stack: ["Next.js", "FastAPI", "PyTorch", "Redis", "Docker"],
    nextSlug: "revo",
  },

  // ──────────────────────────────────────────────────────────────── REVO
  {
    slug: "revo",
    index: "02",
    name: "REVO",
    category: "Developer Tools / Browser Extension",
    date: "Oct 2025",
    timeline: "Sep — Oct 2025",
    role: "Solo build",
    status: "shipped",
    statusLabel: "Shipped · Public build",
    outcome:
      "Reads a GitHub repository in 30 seconds — the ten-minute evaluation skim, automated.",
    heroSub:
      "A Manifest V3 Chrome extension that injects a React analysis panel directly into GitHub. One click turns an unfamiliar repository into a structured brief — and exports it as JSON an LLM can summarize.",
    live: {
      badge: "Public build",
      label: "github.com/yashchoudhary13",
      cta: "Open repository",
      href: "https://github.com/yashchoudhary13",
      external: true,
    },
    flow: [
      {
        id: "page",
        label: "GitHub Page",
        sub: "Route detection",
        detail: {
          body: "The extension watches GitHub's client-side navigation and recognizes repository routes — including SPA transitions that never trigger a page load.",
          points: [
            "Repo URL pattern matching across SPA navigations",
            "Activates only on repository pages — zero footprint elsewhere",
          ],
        },
      },
      {
        id: "inject",
        label: "Inject",
        sub: "React panel mount",
        detail: {
          body: "A content script mounts the React panel into GitHub's DOM without disturbing the page — styles isolated, layout untouched.",
          points: [
            "Isolated mount point — GitHub's CSS never bleeds in",
            "Survives GitHub's DOM churn and theme changes",
            "Panel renders inside the page, not in a detached popup",
          ],
        },
      },
      {
        id: "fetch",
        label: "Fetch",
        sub: "GitHub REST API",
        detail: {
          body: "The service worker orchestrates REST calls for everything the skim would have read: tree, languages, commit activity, contributors.",
          points: [
            "File tree and structure",
            "Language breakdown",
            "Commit cadence and contributor activity",
          ],
        },
      },
      {
        id: "cache",
        label: "Cache",
        sub: "70% fewer calls",
        detail: {
          body: "Every response is cached before anything else is fetched. Revisits and overlapping analyses hit storage, not the network — and the rate limit stays distant.",
          points: [
            "Request dedupe across panel opens",
            "70% reduction in API calls",
            "Rate-limit headroom preserved for big repos",
          ],
        },
      },
      {
        id: "analyze",
        label: "Analyze",
        sub: "Signals, not noise",
        detail: {
          body: "Raw API payloads become evaluation signals: how the repo is structured, how alive it is, what it's written in, where the activity concentrates.",
          points: [
            "Structure and entry-point mapping",
            "Activity and maintenance signals",
            "The ten-minute skim, compressed to thirty seconds",
          ],
        },
      },
      {
        id: "export",
        label: "Export",
        sub: "LLM-ready JSON",
        detail: {
          body: "The analysis exports as structured JSON — built for machine consumption, so an LLM can take over the summary where the panel leaves off.",
          points: [
            "Stable, structured schema",
            "Paste-ready for LLM summarization",
            "The tool composes instead of dead-ending",
          ],
        },
      },
    ],
    challenge: {
      statement: "Ten minutes per repo doesn't scale.",
      body: "Evaluating an unfamiliar repository means reading file trees, commit history and docs before you learn whether it deserved the time. Automating that inside Chrome's Manifest V3 rules — on a site you don't control — is the hard part.",
      points: [
        "GitHub's REST API is rate-limited — naive fetching burns the budget on one large repo",
        "MV3 service workers are ephemeral — no long-lived background state to lean on",
        "GitHub's DOM isn't yours: it ships changes and navigates as an SPA without reloading",
      ],
    },
    solution: {
      intro:
        "The system is shaped by its constraints — rate limits, worker lifecycles, and someone else's DOM.",
      decisions: [
        {
          title: "Cache before fetch",
          body: "Every API response lands in the cache layer first; every read checks it before touching the network. That single discipline cut API calls by 70%.",
          tradeoff:
            "A staleness window on repo metadata — harmless for evaluation, fatal to avoid for rate limits.",
        },
        {
          title: "Embrace the MV3 lifecycle",
          body: "Instead of fighting service-worker teardown, every handler is stateless and every piece of state lives in extension storage. The worker can die mid-session and nothing is lost.",
          tradeoff:
            "No in-memory shortcuts — every handler pays a storage read.",
        },
        {
          title: "Export for machines, not just eyes",
          body: "The analysis isn't a dead-end UI. Structured JSON export means an LLM — or any other tool — can pick up exactly where the panel stops.",
          tradeoff:
            "Schema discipline up front, before the first export existed.",
        },
      ],
    },
    archLayers: [
      {
        id: "content",
        name: "Content Script",
        tech: "REACT · TYPESCRIPT",
        body: "The piece living inside GitHub's pages: route detection, panel mount, render.",
        items: [
          { label: "Route watcher", note: "SPA-aware repo detection" },
          { label: "Panel mount", note: "isolated from GitHub's styles" },
          { label: "Analysis UI", note: "React, rendered in-page" },
        ],
      },
      {
        id: "worker",
        name: "Service Worker",
        tech: "MANIFEST V3",
        body: "Stateless orchestrator for everything the content script can't do — fetching, caching, message routing.",
        items: [
          { label: "Fetch orchestration", note: "REST calls, batched" },
          { label: "Message bus", note: "content script ↔ worker" },
          { label: "Stateless handlers", note: "survive worker teardown" },
        ],
      },
      {
        id: "cache",
        name: "Cache Layer",
        tech: "EXTENSION STORAGE",
        body: "The reason the rate limit never bites: dedupe, persist, serve.",
        items: [
          { label: "Response cache", note: "keyed per endpoint + repo" },
          { label: "Request dedupe", note: "one flight per resource" },
          { label: "70% fewer calls", note: "measured against no-cache" },
        ],
      },
      {
        id: "analysis",
        name: "Analysis Engine",
        tech: "SIGNAL EXTRACTION",
        body: "Turns raw payloads into the brief a senior engineer would have skimmed for.",
        items: [
          { label: "Structure map", note: "tree → entry points" },
          { label: "Activity signals", note: "cadence, contributors" },
          { label: "Language profile", note: "what it's really written in" },
        ],
      },
      {
        id: "export",
        name: "Export",
        tech: "STRUCTURED JSON",
        body: "Machine-readable output so the analysis composes with LLMs and other tooling.",
        items: [
          { label: "Stable schema", note: "versioned shape" },
          { label: "One-click export", note: "clipboard or file" },
          { label: "LLM-ready", note: "built to be summarized" },
        ],
      },
    ],
    metrics: [
      {
        value: "−70%",
        label: "API calls",
        note: "caching layer vs naive fetching",
      },
      {
        value: 30,
        suffix: "s",
        label: "Full analysis",
        note: "down from ~10 minutes of manual reading",
      },
      {
        value: "JSON",
        label: "Structured export",
        note: "LLM-ready output schema",
      },
      {
        value: "MV3",
        label: "Manifest V3",
        note: "stateless service-worker architecture",
      },
    ],
    gallery: [
      {
        kind: "bars",
        title: "Repo signals",
        caption: "The evaluation skim, quantified — structure, language, activity.",
        bars: [
          { label: "TYPESCRIPT", value: 0.71, display: "71%", accent: true },
          { label: "JAVASCRIPT", value: 0.18, display: "18%" },
          { label: "CSS", value: 0.08, display: "8%" },
          { label: "OTHER", value: 0.03, display: "3%" },
        ],
        footer: {
          label: "ANALYSIS",
          value: "COMPLETE — 0:30",
          meta: "10:00 MANUAL",
        },
      },
      {
        kind: "log",
        title: "Cache layer",
        caption: "Second visit, near-zero network — the rate limit never notices.",
        lines: [
          { time: "00.00", text: "GET /repos/{owner}/{repo} — MISS · fetched", tone: "default" },
          { time: "00.21", text: "GET /repos/{repo}/languages — MISS · fetched", tone: "default" },
          { time: "00.40", text: "GET /repos/{repo}/commits — MISS · fetched", tone: "default" },
          { time: "04.12", text: "GET /repos/{owner}/{repo} — HIT · storage", tone: "accent" },
          { time: "04.12", text: "GET /repos/{repo}/languages — HIT · storage", tone: "accent" },
          { time: "04.13", text: "GET /repos/{repo}/commits — HIT · storage", tone: "accent" },
          { time: "04.13", text: "network calls saved: 70%", tone: "bright" },
        ],
      },
      {
        kind: "json",
        title: "Structured export",
        caption: "Built to be eaten by an LLM — the analysis composes onward.",
        code: `{
  "repo": "owner/project",
  "structure": {
    "entry_points": ["src/index.ts"],
    "modules": 24
  },
  "languages": { "typescript": 0.71 },
  "activity": {
    "cadence": "weekly",
    "contributors": 6
  },
  "generated_in": "30s"
}`,
      },
    ],
    learnings: [
      {
        title: "Other people's DOM is a hostile runtime",
        body: "GitHub ships UI changes without asking and navigates without reloading. Defensive selectors, SPA route observation and an isolated mount were the difference between a tool and a toy.",
      },
      {
        title: "The fastest API call is the one you never make",
        body: "The cache layer did more for REVO than any clever fetching strategy — 70% of the network simply disappeared, and the rate limit went from constraint to footnote.",
      },
      {
        title: "Build outputs machines can eat",
        body: "The JSON export turned REVO from a panel you read into a pipeline stage. Structured output is what lets a small tool compose into bigger workflows.",
      },
    ],
    stack: ["React", "Vite", "Manifest V3", "GitHub REST API"],
    nextSlug: "themex",
  },

  // ───────────────────────────────────────────────────────────── The MEX
  {
    slug: "themex",
    index: "03",
    name: "The MEX",
    category: "Commerce Platform / Client Work",
    date: "Nov 2025",
    timeline: "Aug — Nov 2025",
    role: "Freelance full-stack — paid client",
    status: "live",
    statusLabel: "In production · Ireland",
    outcome:
      "A restaurant's order pipeline rebuilt end to end — confirmations land 60% faster over live WebSockets.",
    heroSub:
      "An order management platform for The MEX Restaurant in Ireland: Stripe embedded checkout, 32+ menu items, role-gated staff tools — and a kitchen that knows the moment a customer pays.",
    live: {
      badge: "Private client build",
      label: "In production — Ireland",
      cta: "Request a walkthrough",
      href: "mailto:yashchoudhary13@outlook.com?subject=The%20MEX%20walkthrough",
      external: false,
    },
    flow: [
      {
        id: "storefront",
        label: "Storefront",
        sub: "32+ items",
        detail: {
          body: "The customer-facing menu: browse, build an order, check out — without ever leaving the page.",
          points: [
            "32+ menu items with live availability",
            "Cart state held client-side until checkout",
            "Order status visible to the customer in real time",
          ],
        },
      },
      {
        id: "api",
        label: "REST API",
        sub: "JWT · RBAC",
        detail: {
          body: "A Node/Express API where every route knows who's asking. Customers, staff and admin share one API — the roles decide what it answers.",
          points: [
            "JWT authentication on every request",
            "Role-based access control at the route boundary",
            "Validation before anything touches the database",
          ],
        },
      },
      {
        id: "payments",
        label: "Stripe",
        sub: "Embedded checkout",
        detail: {
          body: "Stripe's embedded checkout keeps payment inside the storefront. Confirmation arrives by webhook — the source of truth is Stripe, not the client.",
          points: [
            "Embedded checkout — no redirect, no broken flow",
            "Webhook-confirmed payment state",
            "The kitchen is only told after the money is real",
          ],
        },
      },
      {
        id: "data",
        label: "PostgreSQL",
        sub: "Drizzle ORM",
        detail: {
          body: "Orders, menu, roles — one typed schema from the API to the database, designed before the first endpoint existed.",
          points: [
            "Drizzle ORM — schema as typed source of truth",
            "Order lifecycle modeled as explicit states",
            "Menu and roles versioned alongside orders",
          ],
        },
      },
      {
        id: "realtime",
        label: "WebSockets",
        sub: "Event fanout",
        detail: {
          body: "The moment an order changes state, every connected screen knows. No polling loops, no refresh button, no stale kitchen board.",
          points: [
            "Order events pushed to kitchen and customer",
            "60% faster order confirmation vs the polling flow",
            "One event stream drives every live surface",
          ],
        },
      },
      {
        id: "kitchen",
        label: "Kitchen Board",
        sub: "Live order view",
        detail: {
          body: "Staff see orders the instant they're paid, move them through prep, and the customer's screen follows along live.",
          points: [
            "New → in prep → ready, driven by events",
            "Role-gated: staff tools never reach customers",
            "Confirmation delay cut by 60% — staff workflow rebuilt around it",
          ],
        },
      },
    ],
    challenge: {
      statement: "A kitchen can't wait on polling.",
      body: "This was a paid client with a live restaurant, not a demo. Orders were confirming on a polling delay, payment had to feel seamless, and three very different audiences — customers, staff, admin — needed the same platform without seeing each other's controls.",
      points: [
        "Polling meant the kitchen learned about paid orders seconds late — and staff felt every second",
        "Checkout had to stay inside the storefront: a redirect is where food orders go to die",
        "One API, three audiences — customer, staff, admin — with no accidental crossover",
      ],
    },
    solution: {
      intro:
        "Client work rewards boring, reliable choices — made early and enforced everywhere.",
      decisions: [
        {
          title: "Push, don't poll",
          body: "WebSocket events fan out the instant an order changes state. Confirmations now land 60% faster, and the kitchen board is never stale.",
          tradeoff:
            "Connection lifecycle to manage — reconnects, dropped sockets, ordering.",
        },
        {
          title: "Stripe embedded, not redirected",
          body: "Checkout renders inside the storefront and payment truth arrives by webhook. The customer never leaves; the kitchen never acts on an unpaid order.",
          tradeoff:
            "A tighter Stripe integration surface to own and maintain.",
        },
        {
          title: "RBAC at the API boundary",
          body: "JWT plus role checks on every route. One API serves three audiences, and the type system plus middleware make crossover impossible rather than unlikely.",
          tradeoff: "More middleware up front — fewer surprises forever.",
        },
      ],
    },
    archLayers: [
      {
        id: "storefront",
        name: "Storefront",
        tech: "REACT · TYPESCRIPT",
        body: "Customer-facing menu, cart and live order tracking.",
        items: [
          { label: "Menu", note: "32+ items, live availability" },
          { label: "Cart + checkout", note: "Stripe embedded in-page" },
          { label: "Order tracking", note: "live over WebSocket" },
        ],
      },
      {
        id: "api",
        name: "API",
        tech: "NODE · EXPRESS",
        body: "REST service with auth at the boundary — every route role-checked before logic runs.",
        items: [
          { label: "JWT auth", note: "verified on every request" },
          { label: "RBAC middleware", note: "customer / staff / admin" },
          { label: "Order lifecycle", note: "explicit state transitions" },
        ],
      },
      {
        id: "data",
        name: "Data",
        tech: "POSTGRESQL · DRIZZLE",
        body: "Typed schema as the contract — orders, menu, users, roles.",
        items: [
          { label: "Drizzle schema", note: "typed end to end" },
          { label: "Order states", note: "modeled, not implied" },
          { label: "Menu + roles", note: "first-class tables" },
        ],
      },
      {
        id: "payments",
        name: "Payments",
        tech: "STRIPE",
        body: "Embedded checkout in the storefront; webhooks as the only source of payment truth.",
        items: [
          { label: "Embedded checkout", note: "no redirect" },
          { label: "Webhooks", note: "payment state, confirmed" },
          { label: "Paid-only fanout", note: "kitchen sees real orders" },
        ],
      },
      {
        id: "realtime",
        name: "Realtime",
        tech: "WEBSOCKETS",
        body: "One event stream driving the kitchen board and the customer's order view.",
        items: [
          { label: "Event fanout", note: "order state → every screen" },
          { label: "Kitchen board", note: "new → in prep → ready" },
          { label: "60% faster", note: "confirmation vs polling" },
        ],
      },
    ],
    metrics: [
      {
        value: 60,
        suffix: "%",
        label: "Faster confirmation",
        note: "WebSocket push vs the old polling flow",
      },
      {
        value: 32,
        suffix: "+",
        label: "Menu items live",
        note: "with Stripe embedded checkout",
      },
      {
        value: 3,
        label: "Audiences, one API",
        note: "customer · staff · admin via JWT + RBAC",
      },
      {
        value: "0→1",
        label: "Scoped, built, shipped",
        note: "solo delivery for a paying client",
      },
    ],
    gallery: [
      {
        kind: "board",
        title: "Kitchen order board",
        caption:
          "Orders arrive the instant they're paid and move through prep live.",
        columns: [
          {
            name: "NEW",
            tickets: [
              { id: "#1042", meta: "2 items · paid", live: true },
              { id: "#1043", meta: "1 item · paid", live: true },
            ],
          },
          {
            name: "IN PREP",
            tickets: [
              { id: "#1040", meta: "4 items" },
              { id: "#1041", meta: "3 items" },
            ],
          },
          {
            name: "READY",
            tickets: [
              { id: "#1038", meta: "handed off" },
              { id: "#1039", meta: "awaiting pickup" },
            ],
          },
        ],
      },
      {
        kind: "log",
        title: "Order event stream",
        caption:
          "One WebSocket stream drives every screen — kitchen, counter, customer.",
        lines: [
          { time: "19:42:03", text: "order.created — #1042 · 2 items", tone: "default" },
          { time: "19:42:05", text: "payment.succeeded — stripe webhook", tone: "bright" },
          { time: "19:42:05", text: "ws.push → kitchen · order confirmed", tone: "accent" },
          { time: "19:42:05", text: "ws.push → customer · status: confirmed", tone: "accent" },
          { time: "19:48:11", text: "order.status — #1042 · in prep", tone: "default" },
          { time: "19:57:40", text: "order.status — #1042 · ready", tone: "bright" },
        ],
      },
      {
        kind: "log",
        title: "RBAC in practice",
        caption: "One API, three audiences — the middleware draws the lines.",
        lines: [
          { time: "REQ", text: "POST /api/orders · role: customer → 201", tone: "default" },
          { time: "REQ", text: "GET /api/kitchen/board · role: staff → 200", tone: "default" },
          { time: "REQ", text: "GET /api/kitchen/board · role: customer → 403", tone: "dim" },
          { time: "REQ", text: "PATCH /api/menu/14 · role: admin → 200", tone: "default" },
          { time: "REQ", text: "PATCH /api/menu/14 · role: staff → 403", tone: "dim" },
          { time: "JWT", text: "every route verifies before logic runs", tone: "accent" },
        ],
      },
    ],
    learnings: [
      {
        title: "Real-time is a product feature, not plumbing",
        body: "Cutting confirmation delay by 60% didn't just make a number better — it changed how staff worked a dinner rush. The WebSocket layer was the most user-visible thing in the system.",
      },
      {
        title: "Client work compresses you",
        body: "A paying client with a live restaurant turns every decision honest: scope it, build it, ship it, stand behind it. The deadline pressure produced cleaner architecture, not messier.",
      },
      {
        title: "Boring tools, calm production",
        body: "Postgres, Express, JWT, Stripe — nothing exotic anywhere in the stack. Chosen precisely so production stays quiet while the restaurant is loud.",
      },
    ],
    stack: ["React", "Node · Express", "PostgreSQL · Drizzle", "Stripe", "WebSockets"],
    nextSlug: "deepverify",
  },
] as const;

/** /projects index page copy */
export const projectsIndex = {
  eyebrowLeft: "Projects — Archive",
  eyebrowRight: "03 builds · 2025 — 2026",
  lines: ["Built like", "products."],
  sub: "Every system here ran in front of real users — a paying client, a live queue, someone else's DOM. Open one and walk the architecture, the decisions, and the numbers.",
  footNote: "Two of these are on the homepage. The full story of each lives here.",
  footCtaLabel: "Start a conversation",
} as const;

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getNextCaseStudy(cs: CaseStudy): CaseStudy {
  return getCaseStudy(cs.nextSlug) ?? caseStudies[0];
}
