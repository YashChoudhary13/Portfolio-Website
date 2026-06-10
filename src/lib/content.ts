/**
 * All site copy, centralized. Every fact traces to docs/CONTENT_MAP.md
 * (which traces to the resume). Sections must not hardcode copy.
 */

export const identity = {
  name: "Yash Choudhary",
  role: "Full-Stack Engineer & AI Systems Builder",
  location: "Jaipur, IN",
  timezone: "UTC+5:30",
  email: "yashchoudhary13@outlook.com",
  available: true,
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/yashchoudhary13" },
  { label: "LinkedIn", href: "https://linkedin.com/in/yashchoudhary13" },
  { label: "LeetCode", href: "https://leetcode.com/u/yashchoudhary13" },
] as const;

export const nav = [
  { label: "Work", target: "#work" },
  { label: "About", target: "#about" },
  { label: "Contact", target: "#contact" },
] as const;

export const hero = {
  eyebrowLeft: "Portfolio — 2026",
  eyebrowRight: "Jaipur, IN (UTC+5:30)",
  name: "Yash Choudhary",
  subline:
    "Full-stack engineer & AI systems builder — building RAG-powered LLM workflows at a GenAI internship and shipping production platforms clients pay for.",
  cards: [
    { index: "01", title: "AI Engineering" },
    { index: "02", title: "Full Stack Systems" },
    { index: "03", title: "Production Deployments" },
  ],
} as const;

export const metrics = [
  {
    value: 40,
    suffix: "K",
    label: "Images processed",
    source: "DeepVerify — custom CNN training set",
  },
  {
    value: 5,
    suffix: "",
    label: "Model ensemble",
    source: "DeepVerify — EfficientNet · ResNet · Xception · MobileNet · CNN",
  },
  {
    value: 70,
    suffix: "%",
    label: "API calls eliminated",
    source: "REVO — caching layer",
  },
  {
    value: 60,
    suffix: "%",
    label: "Faster order confirmation",
    source: "The MEX — WebSocket pipeline",
  },
  {
    value: 1.8,
    suffix: "s",
    decimals: 1,
    label: "Average detection time",
    source: "DeepVerify — async FastAPI + Redis",
  },
] as const;

export const knobStates = [
  {
    label: "AI Eng",
    title: "AI Engineering",
    body: "RAG workflows with function calling and structured outputs, built for domain-specific business use at a GenAI internship. Prompt and retrieval tuning that raises accuracy while cutting token cost and latency.",
    chips: ["RAG", "Function calling", "PyTorch"],
  },
  {
    label: "Full Stack",
    title: "Full Stack",
    body: "React, Next.js and TypeScript on the front; Node, Express and FastAPI behind. PostgreSQL with Drizzle, Redis, WebSockets, JWT and RBAC — schema design through real-time delivery.",
    chips: ["Next.js", "Node · FastAPI", "PostgreSQL · Redis"],
  },
  {
    label: "Prod Sys",
    title: "Production Systems",
    body: "Dockerized services with GitHub Actions, Nginx, and deployments across Vercel, Railway and Render. Paid client delivery with privacy-compliant data handling — built to stay up.",
    chips: ["Docker", "GitHub Actions", "CI/CD"],
  },
  {
    label: "Projects",
    title: "Featured Projects",
    body: "DeepVerify, a five-model deepfake detection platform with 1.8s verdicts. REVO, a Chrome extension that reads a GitHub repo in 30 seconds instead of 10 minutes.",
    chips: ["DeepVerify", "REVO", "The MEX"],
  },
] as const;

export const projects = [
  {
    id: "deepverify",
    index: "01",
    name: "DeepVerify",
    tagline: "Multi-model deepfake detection",
    category: "ML systems / Computer vision",
    date: "Dec 2025",
    problem: "Single-model detectors misfire on synthetic imagery — too many false positives to trust in production.",
    architecture: "Next.js front end → async FastAPI inference API → Redis queue → five-model PyTorch ensemble → Dockerized deployment.",
    results: [
      { value: "40K", label: "balanced training images" },
      { value: "−12%", label: "false positives vs single model" },
      { value: "1.8s", label: "average detection time" },
    ],
    stack: ["Next.js", "FastAPI", "PyTorch", "Redis", "Docker"],
    links: [
      { label: "GitHub", href: "https://github.com/yashchoudhary13" },
    ],
  },
  {
    id: "revo",
    index: "02",
    name: "REVO",
    tagline: "GitHub repository analyzer — Chrome extension",
    category: "Developer tools / Browser extension",
    date: "Oct 2025",
    problem: "Evaluating an unfamiliar repository costs ten minutes of manual reading before you know if it's worth your time.",
    architecture: "Manifest V3 extension injecting a React UI into GitHub pages → GitHub REST API behind a caching layer → structured JSON exports for LLM summarization.",
    results: [
      { value: "70%", label: "fewer API calls" },
      { value: "30s", label: "analysis, down from 10 min" },
      { value: "JSON", label: "LLM-ready structured exports" },
    ],
    stack: ["React", "Vite", "Manifest V3", "GitHub REST API"],
    links: [
      { label: "GitHub", href: "https://github.com/yashchoudhary13" },
    ],
  },
] as const;

export const architecture = {
  nodes: [
    { id: "frontend", label: "Frontend", tech: ["Next.js", "React", "Tailwind"] },
    { id: "backend", label: "Backend", tech: ["Node.js", "Express", "FastAPI"] },
    { id: "database", label: "Database", tech: ["PostgreSQL", "Redis", "Drizzle"] },
    { id: "ai", label: "AI Layer", tech: ["RAG", "PyTorch", "LLM APIs"] },
    { id: "deploy", label: "Deployment", tech: ["Docker", "Vercel", "Railway"] },
  ],
} as const;

export const experience = [
  {
    period: "Feb 2026 — Present",
    current: true,
    role: "Full Stack & Generative AI Intern",
    org: "Artifact Solutions Pvt. Ltd.",
    mode: "Remote",
    points: [
      "Builds RAG-based LLM workflows with function calling and structured outputs for domain-specific business use cases.",
      "Optimizes prompts and retrieval pipelines — higher answer accuracy, lower token cost and latency.",
      "Implements responsible AI practice: privacy-compliant data handling and output evaluation.",
    ],
    chips: ["RAG", "LLM APIs", "Prompt engineering"],
  },
  {
    period: "Aug 2025 — Nov 2025",
    current: false,
    role: "Freelance Full Stack Developer",
    org: "The MEX Restaurant · Ireland",
    mode: "Paid client · Remote",
    points: [
      "Delivered an order management platform with Stripe embedded checkout and real-time tracking across 32+ menu items.",
      "Built a Node/Express REST API with JWT auth, RBAC, and PostgreSQL schema design on Drizzle ORM.",
      "WebSocket updates cut order confirmation delays by 60% and improved staff workflow.",
    ],
    chips: ["Stripe", "WebSockets", "PostgreSQL"],
  },
] as const;

export const about = {
  statement: "I ship systems, not demos.",
  paragraphs: [
    "Paid client work in production before graduating; now building RAG systems inside a GenAI internship. B.Tech in Computer Science (AI/ML) at JECRC University, backed by IBM's 14-course AI & Machine Learning specialization.",
    "The throughline is systems thinking — schema to socket, model to deployment. Pick the boring, reliable tool; measure the result; ship.",
  ],
} as const;

export const contact = {
  lines: ["Let's build", "something real"],
  body: "Open to full-time roles and serious freelance work.",
} as const;
