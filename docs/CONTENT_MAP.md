# Content Map — resume → site sections

Source of truth: RESUME.pdf (Yash Choudhary, June 2026). Every claim on the site
must trace back to a line here. No invented metrics.

## Identity

- Name: **Yash Choudhary**
- Role line: **Full-Stack Engineer & AI Systems Builder**
- Location: Jaipur, India (IST / UTC+5:30)
- Email: yashchoudhary13@outlook.com
- GitHub: github.com/yashchoudhary13
- LinkedIn: linkedin.com/in/yashchoudhary13
- LeetCode: leetcode.com/u/yashchoudhary13

## Hero supporting copy (facts to communicate)

- Ongoing GenAI internship (Artifact Solutions, Feb 2026–present)
- RAG-based LLM workflows, function calling, structured outputs
- Paid client delivery shipped to production (The MEX Restaurant, Ireland)
- Full-stack: React/Next.js/TypeScript/Node/PostgreSQL/FastAPI

## Hero floating cards

1. **AI Engineering** — RAG · LLM pipelines · PyTorch
2. **Full Stack Systems** — Next.js · Node · PostgreSQL
3. **Production Deployments** — Docker · CI/CD · Paid client work

## Metrics (verbatim from resume)

| Metric | Source |
| --- | --- |
| 40K images processed | DeepVerify — custom CNN trained on 40K balanced images |
| 5-model ensemble | DeepVerify — EfficientNetB0, ResNet50, Xception, MobileNetV2 + custom CNN |
| 12% fewer false positives | DeepVerify ensemble |
| 1.8s average detection time | DeepVerify async FastAPI + Redis pipeline |
| 70% API call reduction | REVO caching layer |
| 10 min → 30 s analysis time | REVO |
| 60% faster order confirmation | The MEX — WebSocket updates |
| 32+ menu items, live Stripe checkout | The MEX |

## Knob states (Section 3)

1. **AI Engineering** — RAG workflows, function calling, structured outputs, prompt/retrieval optimization, output evaluation (internship)
2. **Full Stack** — React, Next.js, TypeScript, Node/Express, FastAPI, PostgreSQL, Redis, Drizzle ORM, WebSockets, JWT/RBAC
3. **Production Systems** — Docker, GitHub Actions, Nginx, Vercel, Railway, Render; paid client delivery; privacy-compliant data handling
4. **Featured Projects** — DeepVerify + REVO teasers linking to case studies

## Case study 1 — DeepVerify (Dec 2025)

- One-liner: Multi-model deepfake detection platform
- Problem: single-model detectors produce too many false positives on synthetic imagery
- Architecture: Next.js front end → async FastAPI inference API → Redis queue →
  5-model PyTorch ensemble (EfficientNetB0, ResNet50, Xception, MobileNetV2, custom CNN) → Dockerized deployment
- Results: 40K training images (20K real / 20K synthetic), −12% false positives,
  1.8s avg detection, concurrent uploads
- Stack badges: Next.js, FastAPI, PyTorch, Redis, Docker

## Case study 2 — REVO (Oct 2025)

- One-liner: GitHub repository analyzer as a Chrome extension
- Problem: evaluating an unfamiliar repo takes ~10 minutes of manual reading
- Architecture: Manifest V3 extension → React UI injected into GitHub pages →
  GitHub REST API with caching layer → structured JSON exports for LLM summarization
- Results: 70% fewer API calls, 10 min → 30 s analysis, LLM-ready exports
- Stack badges: React, Vite, Manifest V3, GitHub REST API

## Experience timeline

1. **Feb 2026 – Present — Full Stack & Generative AI Intern**, Artifact Solutions Pvt. Ltd. (Remote)
   - RAG-based LLM workflows with function calling + structured outputs
   - Prompt/retrieval optimization: accuracy up, token cost + latency down
   - Responsible AI: privacy compliance, output evaluation
2. **Aug 2025 – Nov 2025 — Freelance Full Stack Developer (paid client)**, The MEX Restaurant, Ireland (Remote)
   - Order management platform: Stripe embedded checkout, real-time tracking, 32+ items
   - Node/Express REST API, JWT, RBAC, PostgreSQL + Drizzle ORM
   - WebSocket updates → 60% faster order confirmations

## About

- B.Tech CSE (AI/ML), JECRC University, Jaipur, 2022–2026
- IBM AI & Machine Learning Specialization (14-course series, 2022–2025)
- Angle: engineer who ships — paid client work in production while still in school,
  now building RAG systems in a GenAI internship. Systems thinking over framework chasing.

## Contact

- Primary CTA: email yashchoudhary13@outlook.com
- Secondary: GitHub, LinkedIn, LeetCode
- Footer: location + "available for work" signal
