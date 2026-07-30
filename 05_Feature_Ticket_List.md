# Feature Ticket List
## PaperPilot — AI Research Briefing Agent

**Version:** 1.0
**Status:** Ready for build breakdown (Antigravity)

Priority key: **P0** = MVP blocker · **P1** = core v1 feature · **P2** = nice-to-have / can follow v1

---

## Epic 0 — Foundations & Infrastructure

| ID | Ticket | Priority | Notes |
|---|---|---|---|
| F-001 | Set up project repo, CI/CD, environments (dev/staging/prod) | P0 | |
| F-002 | Set up Postgres schema for users, papers, structured representations | P0 | See Technical Architecture Doc §3 |
| F-003 | Set up object storage bucket for PDFs + extracted figures | P0 | Signed URL access only — see Security Doc §7 |
| F-004 | Set up vector store (pgvector or Qdrant) for chunk embeddings | P0 | |
| F-005 | Set up task queue (Redis + BullMQ/Celery) for async processing | P0 | |
| F-006 | Implement authentication (OAuth + email/password) | P0 | See Security Doc §2 |
| F-007 | Implement role-based access control (Free/Pro/Admin) | P1 | See Security Doc §3 |
| F-008 | Implement rate limiting on upload/generation endpoints | P1 | See Security Doc §6 |
| F-009 | Set up secrets manager for API keys/credentials | P0 | |
| F-010 | Implement audit logging (auth events, resource access) | P1 | See Security Doc §8 |

---

## Epic 1 — Ingestion & Parsing Pipeline

| ID | Ticket | Priority | Notes |
|---|---|---|---|
| I-001 | PDF upload endpoint + file validation (type, size, malware scan) | P0 | |
| I-002 | Layout-aware text extraction (paragraphs, headings, page/bbox) | P0 | |
| I-003 | Figure extraction (image + caption + bbox) | P0 | |
| I-004 | Table extraction (structured data + caption + bbox) | P0 | |
| I-005 | Equation extraction (LaTeX + bbox) | P1 | |
| I-006 | OCR fallback for scanned/non-text PDFs | P1 | |
| I-007 | Vision-model pass for ambiguous figures/tables | P1 | |
| I-008 | Build canonical structured representation (JSON model) | P0 | Core data model — see Tech Arch Doc §3 |
| I-009 | Chunking + embedding pipeline for vector store | P0 | |
| I-010 | Processing status tracking + progress events to frontend | P0 | Powers upload screen progress UI |
| I-011 | Duplicate/re-upload detection via file hash (skip reprocessing) | P2 | Cost optimization |

---

## Epic 2 — Grounding & Citation Engine

| ID | Ticket | Priority | Notes |
|---|---|---|---|
| G-001 | Retrieval layer: fetch relevant chunks per generation task | P0 | |
| G-002 | Prompt templates enforcing `source_refs` in structured output | P0 | Critical path — see Tech Arch Doc §5 |
| G-003 | Post-generation validation (reject/flag ungrounded outputs) | P0 | |
| G-004 | Stated vs. Inferred tagging + confidence scoring | P0 | |
| G-005 | Source resolver endpoint (`/papers/:id/source/:refId`) | P0 | Powers "Show Source" everywhere |
| G-006 | Prompt-injection safeguards for untrusted PDF content | P0 | See Security Doc §7 |

---

## Epic 3 — Executive Brief

| ID | Ticket | Priority | Notes |
|---|---|---|---|
| E-001 | Generation job: problem, why it matters, solution, contributions, findings, takeaway | P0 | |
| E-002 | Depth-level variants (beginner/undergrad/grad/researcher) | P1 | |
| E-003 | Executive Brief UI (card layout + Show Source) | P0 | |

---

## Epic 4 — Claims & Evidence Explorer

| ID | Ticket | Priority | Notes |
|---|---|---|---|
| C-001 | Claim extraction pass over Results/Discussion sections | P0 | |
| C-002 | Link claims to supporting figures/tables/metrics | P0 | |
| C-003 | Claims Explorer UI (list/table + expandable detail) | P0 | |
| C-004 | Filter/sort by section | P2 | |

---

## Epic 5 — Limitations Analyzer

| ID | Ticket | Priority | Notes |
|---|---|---|---|
| L-001 | Extract author-stated limitations | P0 | |
| L-002 | AI-inference pass for unstated limitations + confidence scoring | P0 | |
| L-003 | Limitations Analyzer UI (two-column stated/inferred, visual distinction) | P0 | See Frontend Spec §4 |

---

## Epic 6 — Figure & Table Explainer

| ID | Ticket | Priority | Notes |
|---|---|---|---|
| FT-001 | Per-figure explanation generation (what/trends/why/takeaway) | P1 | |
| FT-002 | Per-table explanation generation | P1 | |
| FT-003 | Figure/Table gallery + detail view UI | P1 | |

---

## Epic 7 — Equation Translator

| ID | Ticket | Priority | Notes |
|---|---|---|---|
| EQ-001 | Per-equation generation (variables, purpose, intuition, analogy) | P1 | |
| EQ-002 | LaTeX rendering (MathJax/KaTeX) in UI | P1 | |
| EQ-003 | Equation list + detail UI | P1 | |

---

## Epic 8 — Interactive Concept Map

| ID | Ticket | Priority | Notes |
|---|---|---|---|
| M-001 | Graph extraction pass (nodes + edges w/ source_refs) | P1 | |
| M-002 | Graph rendering (React Flow/D3) w/ node type styling | P1 | |
| M-003 | Node click → explanation panel + Show Source | P1 | |
| M-004 | Filter node types on/off, zoom/pan | P2 | |
| M-005 | Mobile/small-screen fallback (list view) | P2 | |

---

## Epic 9 — Study Mode

| ID | Ticket | Priority | Notes |
|---|---|---|---|
| S-001 | Flashcard generation per section | P1 | |
| S-002 | MCQ + True/False generation | P1 | |
| S-003 | Fill-in-the-blank generation | P2 | |
| S-004 | Key terminology extraction/definitions | P1 | |
| S-005 | Study Mode UI (flashcard flip, quiz flow, progress tracker) | P1 | |
| S-006 | Session summary (score, review areas) | P2 | |

---

## Epic 10 — Presentation Brief

| ID | Ticket | Priority | Notes |
|---|---|---|---|
| P-001 | Compose presentation outline from Brief/Limitations/Future Work outputs | P1 | |
| P-002 | Presentation Brief UI + export (copy as markdown / download) | P1 | |

---

## Epic 11 — Paper Comparison

| ID | Ticket | Priority | Notes |
|---|---|---|---|
| CP-001 | Multi-paper upload flow | P1 | Cap at 3–4 papers for v1 |
| CP-002 | Structured representation alignment/diff across papers | P1 | |
| CP-003 | Side-by-side comparison UI | P1 | |

---

## Epic 12 — Research Mentor Mode

| ID | Ticket | Priority | Notes |
|---|---|---|---|
| RM-001 | Inference pass: questions to ask, reviewer concerns, biases, missing experiments, future improvements | P1 | Always tagged "inferred" |
| RM-002 | Mentor Mode UI (grouped feed) | P1 | |

---

## Epic 13 — Cross-Cutting Frontend

| ID | Ticket | Priority | Notes |
|---|---|---|---|
| FE-001 | Upload screen (drag-drop, progress states) | P0 | |
| FE-002 | Paper Dashboard (hub linking all modes + PDF viewer panel) | P0 | |
| FE-003 | Shared `<SourceLink>` component (Show Source pattern) | P0 | Reused across all features |
| FE-004 | Stated vs. Inferred design tokens/components | P0 | |
| FE-005 | Depth-level selector component (shared) | P1 | |
| FE-006 | Per-feature loading/empty/error states | P1 | |
| FE-007 | Responsive layout pass (tablet/mobile for Study Mode + dashboard) | P2 | |

---

## Epic 14 — Account & Billing (if monetized in v1)

| ID | Ticket | Priority | Notes |
|---|---|---|---|
| A-001 | Free vs. Pro tier gating (upload caps, feature access) | P1 | |
| A-002 | Billing integration (e.g., Stripe) for Pro tier | P2 | |
| A-003 | Usage dashboard (uploads used, generations used) | P2 | |

---

## Suggested Build Order (MVP → v1 → v1.1)

1. **MVP (P0 only):** Epics 0, 1, 2, 3, 4, 5, 13 (core loop: upload → structured extraction → Executive Brief + Claims + Limitations with full Show Source grounding).
2. **v1 (P0 + P1):** add Figure/Table Explainer, Equation Translator, Concept Map, Study Mode, Presentation Brief, Comparison, Mentor Mode.
3. **v1.1 (P2):** polish — filters, session summaries, mobile responsiveness, usage dashboards, billing.
