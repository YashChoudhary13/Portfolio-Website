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
  { label: "Projects", target: "/projects" },
  { label: "Experience", target: "#experience" },
  { label: "About", target: "#about" },
  { label: "Contact", target: "#contact" },
] as const;

export const hero = {
  eyebrowLeft: "Portfolio — 2026",
  eyebrowRight: "Jaipur, IN (UTC+5:30)",
  name: "Yash Choudhary",
  subline:
    "Full-stack engineer & AI systems builder — building RAG-powered LLM workflows at a GenAI internship and shipping production platforms clients pay for.",
  /** whole card navigates; hash targets scroll, routes push */
  cards: [
    {
      index: "01",
      title: "What I build",
      href: "#capabilities",
      cta: "See the capabilities",
    },
    {
      index: "02",
      title: "Current focus",
      href: "/projects",
      cta: "Open the projects",
    },
    {
      index: "03",
      title: "Life off screen",
      href: "#about",
      cta: "More about me",
    },
  ],
} as const;

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
    body: "DeepVerify's five-model detection pipeline, REVO's thirty-second repository analyzer, The MEX's real-time order platform — each has a full case study on the Projects page.",
    chips: ["DeepVerify", "REVO", "The MEX"],
  },
] as const;

export const architecture = {
  hint: "Select a layer to look inside — request paths, caches, pipelines.",
  nodes: [
    {
      id: "frontend",
      label: "Frontend",
      tech: ["Next.js", "React", "Tailwind"],
      detail: {
        summary:
          "Server-rendered React with motion treated as a first-class layer, not a decoration pass.",
        flow: ["Route request", "RSC render", "Selective hydration", "Motion layer"],
        facts: ["Next.js App Router", "React + TypeScript", "Tailwind CSS", "Framer Motion · GSAP"],
      },
    },
    {
      id: "backend",
      label: "Backend",
      tech: ["Node.js", "Express", "FastAPI"],
      detail: {
        summary:
          "REST and realtime services with auth enforced at the boundary — every route knows who's asking before logic runs.",
        flow: ["JWT verify", "RBAC gate", "Validation", "Service logic", "WebSocket fanout"],
        facts: ["Node.js · Express", "FastAPI — async Python", "JWT · RBAC", "REST + WebSockets"],
      },
    },
    {
      id: "database",
      label: "Database",
      tech: ["PostgreSQL", "Redis", "Drizzle"],
      detail: {
        summary:
          "Typed schema from the API down to the socket, with a cache in front of every hot path.",
        flow: ["Drizzle schema", "Pooled queries", "Redis cache", "Invalidation"],
        facts: ["PostgreSQL", "Redis — cache + queues", "Drizzle ORM — typed schema"],
      },
    },
    {
      id: "ai",
      label: "AI Layer",
      tech: ["RAG", "PyTorch", "LLM APIs"],
      detail: {
        summary:
          "Retrieval-augmented pipelines tuned for answer accuracy per token — built daily at a GenAI internship.",
        flow: ["Query", "Embed", "Retrieve", "Rerank", "Generate", "Validate"],
        facts: ["RAG pipelines", "Function calling", "Structured outputs", "PyTorch"],
      },
    },
    {
      id: "deploy",
      label: "Deployment",
      tech: ["Docker", "Vercel", "Railway"],
      detail: {
        summary:
          "Every push walks the same path to production — containerized, checked, and shipped the same way each time.",
        flow: ["Push", "CI checks", "Docker build", "Deploy", "Health checks"],
        facts: ["GitHub Actions", "Docker", "Nginx", "Vercel · Railway · Render"],
      },
    },
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
