# Technical Architecture Document
## PaperPilot — AI Research Briefing Agent

**Version:** 1.0
**Status:** Draft for build (Antigravity)

---

## 1. System Overview

PaperPilot's architecture is built around one non-negotiable constraint from the PRD: **every generated statement must be traceable to a source location in the original paper.** This means the system is not a simple "upload → prompt LLM → show text" pipeline. It requires a structured extraction + grounding layer sitting between the raw PDF and every AI-generated feature.

```
[PDF Upload]
     │
     ▼
[Ingestion & Parsing Layer]  → layout-aware text/figure/table/equation extraction
     │
     ▼
[Structured Paper Representation]  → canonical JSON model w/ source anchors
     │
     ▼
[Grounding & Retrieval Layer]  → chunk store + embeddings + citation resolver
     │
     ▼
[Feature Generation Layer]  → LLM calls per feature (brief, claims, study mode, etc.)
     │
     ▼
[API Layer]  → REST/GraphQL endpoints per feature
     │
     ▼
[Frontend Dashboard]  → interactive UI consuming structured + generated data
```

---

## 2. Tech Stack (recommended defaults)

| Layer | Recommendation | Notes |
|---|---|---|
| Frontend | React + TypeScript (Next.js) | SSR for fast dashboard load, good ecosystem for graph/viz libs |
| Concept Map / Graph Viz | React Flow or D3.js | Interactive node-click → source highlight |
| Backend API | Node.js (NestJS) or Python (FastAPI) | FastAPI preferred if PDF/ML pipeline is Python-native |
| PDF Parsing | PyMuPDF (fitz) / pdfplumber + layout detection (e.g., LayoutParser) | Layout-aware, not naive `pdftotext` |
| OCR (scanned PDFs) | Tesseract or cloud OCR (fallback only) | Only invoked if native text extraction fails |
| LLM Provider | Anthropic Claude API (Sonnet for extraction/generation, Haiku for lightweight tasks like flashcard formatting) | Vision-capable model pass for figures/equations |
| Vector Store | pgvector (Postgres) or a dedicated vector DB (e.g., Qdrant) | Stores chunk embeddings for citation grounding |
| Primary DB | PostgreSQL | Papers, structured representations, users, tickets, study progress |
| Object Storage | S3-compatible bucket | Raw PDFs, extracted figure images |
| Task Queue | Redis + BullMQ / Celery | Async processing for parsing + multi-step generation |
| Auth | OAuth (Google) + email/password via a managed auth provider (e.g., Auth0/Clerk) or custom JWT | See Security & Access Document |

---

## 3. Structured Paper Representation (the core data model)

Every uploaded paper is converted into a canonical structured object. This is the single source of truth all features are generated from — no feature should be generated directly from raw PDF text without going through this layer.

```json
{
  "paper_id": "uuid",
  "metadata": { "title": "", "authors": [], "venue": "", "year": 0 },
  "sections": [
    {
      "section_id": "sec_1",
      "title": "Introduction",
      "paragraphs": [
        { "para_id": "p_1", "text": "...", "page": 1, "bbox": [x,y,w,h] }
      ]
    }
  ],
  "figures": [
    { "figure_id": "fig_1", "caption": "", "page": 3, "bbox": [...], "image_ref": "s3://..." }
  ],
  "tables": [
    { "table_id": "tab_1", "caption": "", "page": 4, "bbox": [...], "extracted_data": [[...]] }
  ],
  "equations": [
    { "eq_id": "eq_1", "latex": "", "page": 5, "bbox": [...] }
  ],
  "claims": [
    { "claim_id": "c_1", "text": "", "source_refs": ["p_1","fig_1"], "confidence": "stated" }
  ],
  "limitations": {
    "author_stated": [ { "text": "", "source_refs": ["p_9"] } ],
    "ai_inferred": [ { "text": "", "confidence_score": 0.0, "reasoning_refs": ["p_2","tab_1"] } ]
  },
  "datasets": [ { "name": "", "source_refs": [] } ],
  "future_work": [ { "text": "", "source_refs": [] } ]
}
```

**Key rule:** every leaf node that can be shown to a user carries `source_refs` pointing back to `para_id` / `figure_id` / `table_id` / `eq_id` with page + bounding box. This is what powers "Show Source."

---

## 4. Ingestion & Parsing Pipeline

1. **Upload** → PDF stored in object storage, job enqueued.
2. **Layout-aware extraction** → paragraphs, headings, figures, tables, equations extracted with page number + bounding box (not just raw text dump).
3. **Fallback OCR** → triggered only if the PDF has no extractable text layer (scanned document).
4. **Vision pass** → figures/tables/equations sent through a vision-capable LLM call to generate initial captions/structure where extraction is ambiguous (e.g., complex multi-panel figures).
5. **Structured representation build** → output normalized into the canonical JSON model (Section 3) and persisted.
6. **Chunking + embedding** → paragraphs chunked (e.g., 200–400 tokens) and embedded into the vector store, each chunk tagged with its `para_id`/section for later retrieval and citation resolution.

---

## 5. Grounding & Citation Architecture (critical path)

This is what enforces the PRD's "factual grounding" requirement. Every feature generation call follows this pattern:

1. **Retrieve** relevant chunks from the vector store for the specific sub-task (e.g., "extract claims from Results section").
2. **Generate with constrained context** — the LLM is only given the retrieved, source-tagged chunks, and is instructed to output structured JSON where every claim/point includes the `source_refs` of the chunks it used.
3. **Validate** — a post-generation check confirms every output item has at least one valid `source_refs` entry that exists in the structured representation. Items that fail validation are either discarded or explicitly flagged as ungrounded (should not happen in normal flow; used as a safety net).
4. **Label AI inference vs. fact** — any output the LLM produces that is *not* a direct restatement (e.g., inferred limitations, reviewer concerns, mentor-mode questions) is tagged `type: "inferred"` with a `confidence_score`. Author-stated content is tagged `type: "stated"`.

This distinction (`stated` vs `inferred`) is a first-class field in the API response for every feature — the frontend uses it to render different visual treatment (see Frontend Specification Document).

---

## 6. Feature Generation Layer

Each of the 10 PRD features maps to a backend generation job that consumes the structured representation:

| Feature | Generation approach |
|---|---|
| Executive Brief | Single grounded generation pass over full structured doc |
| Claims & Evidence Explorer | Per-claim extraction pass over Results/Discussion sections, joined with figures/tables |
| Limitations Analyzer | Two passes: extract explicit "Limitations" section content (stated) + separate inference pass over methodology/experiments (inferred) |
| Figure & Table Explainer | Per-figure/table generation using image + caption + surrounding paragraph context |
| Equation Translator | Per-equation generation using LaTeX + surrounding text context |
| Concept Map | Graph-extraction pass producing nodes + edges with `source_refs` per node |
| Study Mode | Generation pass per section producing flashcards/quiz items, each tagged with source |
| Presentation Brief | Reuses Executive Brief + Limitations + Future Work outputs, reformatted |
| Paper Comparison | Runs structured representation diff/alignment across 2+ papers' canonical JSON |
| Research Mentor Mode | Inference-only pass (always tagged `inferred`) over methodology + limitations |

All generation jobs run async via the task queue and are cached per `paper_id` + feature so re-opening a paper doesn't re-trigger LLM calls.

---

## 7. API Layer (high-level)

RESTful resource design (illustrative):

```
POST   /papers                     → upload paper, kicks off ingestion job
GET    /papers/:id                 → structured representation + status
GET    /papers/:id/brief           → Executive Brief
GET    /papers/:id/claims          → Claims & Evidence
GET    /papers/:id/limitations     → stated + inferred limitations
GET    /papers/:id/figures/:figId  → figure explanation
GET    /papers/:id/equations/:eqId → equation translation
GET    /papers/:id/concept-map     → graph nodes/edges
GET    /papers/:id/study-mode      → flashcards/quiz/etc.
GET    /papers/:id/presentation    → presentation outline
POST   /papers/compare             → { paper_ids: [] } → comparison result
GET    /papers/:id/mentor          → mentor-mode prompts/questions
GET    /papers/:id/source/:refId   → resolves a source_ref to page/bbox/text for highlighting
```

`GET /papers/:id/source/:refId` is the endpoint powering every "Show Source" click across the whole product — it's the single resolver from any `source_ref` back to the exact location in the PDF viewer.

---

## 8. Scalability & Performance Considerations

* Ingestion is the heaviest cost step — queue-based, horizontally scalable workers.
* Cache structured representation and all generated features per paper; identical re-uploads (hash match) should skip reprocessing.
* Vector search scoped per-paper (namespace by `paper_id`) to keep retrieval fast and avoid cross-paper leakage.
* Large papers (30+ pages) may need section-level lazy generation (generate Executive Brief immediately, generate Concept Map / Study Mode on-demand) rather than blocking on full processing.
* Paper Comparison mode scales the LLM context linearly with paper count — cap v1 comparison at a small fixed number of papers (e.g., 3–4) to bound cost and latency.

---

## 9. Third-Party Dependencies

| Service | Purpose |
|---|---|
| Anthropic Claude API | Core extraction, generation, and vision passes |
| Object storage (S3-compatible) | Raw PDF + extracted figure image storage |
| Vector DB / pgvector | Embedding storage and retrieval for grounding |
| OCR provider (fallback) | Only for scanned/non-text PDFs |
| Auth provider | User authentication (see Security & Access Document) |
