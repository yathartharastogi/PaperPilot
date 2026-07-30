# Frontend Specification Document
## PaperPilot — AI Research Briefing Agent

**Version:** 1.0
**Status:** Draft for build (Antigravity)

---

## 1. Design Principles (from PRD, applied to UI)

* **Evidence-first:** every generated statement is clickable → shows source. This is the single most important interaction pattern in the whole product.
* **Minimal, distraction-free:** dashboard over document-dump. No infinite scroll of summary text.
* **Stated vs. Inferred is always visually distinct** — never rely on text alone to communicate this.
* **Depth toggle:** beginner / undergraduate / graduate / researcher explanation levels available wherever explanatory text is shown.

---

## 2. Core Screens

### 2.1 Upload Screen
* Drag-and-drop PDF upload (single or multiple, for future Comparison mode).
* Upload progress + processing status ("Parsing paper…", "Extracting figures…", "Building brief…") — reflects async pipeline stages from backend.
* Recently uploaded papers list for returning users.

### 2.2 Paper Dashboard (landing view after processing)
* Central hub, not a summary wall. Card/tile layout linking to each mode:
  Executive Brief · Claims & Evidence · Limitations · Figures & Tables · Equations · Concept Map · Study Mode · Presentation Brief · Comparison · Mentor Mode.
* Persistent **PDF viewer panel** (collapsible side panel or split view) — this is where "Show Source" highlights render.
* Paper metadata header (title, authors, venue/year).

### 2.3 Executive Brief View
* Structured sections (Problem / Why it matters / Solution / Contributions / Key findings / Takeaway) as distinct cards, not one paragraph blob.
* Each section has a "Show Source" icon.
* Depth-level selector (beginner → researcher) re-renders text at chosen depth.

### 2.4 Claims & Evidence Explorer
* List/table of claims; each expandable to show supporting evidence, related figures/tables, metrics, and source location.
* Filter/sort by section (e.g., "Results," "Discussion").

### 2.5 Limitations Analyzer
* Two clearly separated columns or tabs: **"Stated by Authors"** and **"AI-Inferred."**
* AI-inferred items show a confidence score (e.g., a small meter/badge, not just a number) and are visually distinguished (e.g., dashed border, different accent color, "AI inference" tag) from stated items.

### 2.6 Figure & Table Explainer
* Gallery/grid of figures and tables extracted from the paper.
* Selecting one opens: the image/table itself, plain-language explanation, key trend callouts, "why it matters," and source page link.

### 2.7 Equation Translator
* List of extracted equations (rendered via LaTeX/MathJax).
* Each expandable to: variable definitions, what it accomplishes, intuition, real-world analogy.

### 2.8 Interactive Concept Map
* Node-graph visualization (concepts, methods, datasets, algorithms, results, conclusions as distinct node types/colors).
* Click a node → side panel with explanation + "Show Source."
* Zoom/pan; ability to filter node types on/off.

### 2.9 Study Mode
* Tabbed or swipeable interface: Flashcards / MCQ / True-False / Fill-in-the-blank / Key terms.
* Flashcard flip interaction; quiz progress tracker; each question links back to source content.
* Simple session summary at the end (score, areas to review).

### 2.10 Presentation Brief
* Outline view (Background / Problem / Methodology / Results / Limitations / Future Work) formatted for easy reading/export.
* "Export" action (e.g., copy as markdown, or download — ties to future export feature).

### 2.11 Paper Comparison
* Side-by-side column layout (2–4 papers) with aligned rows: objectives, methodology, datasets, performance, contributions, strengths, weaknesses, novelty.
* Each cell still supports "Show Source" back to its respective paper.

### 2.12 Research Mentor Mode
* Feed/list of critical-thinking prompts grouped by type: Questions to ask · Reviewer concerns · Possible biases · Missing experiments · Suggested improvements.
* Always tagged as AI-inferred (this entire mode is inference by nature) — visually consistent with the inferred styling from Limitations Analyzer.

---

## 3. Core Interaction Pattern: "Show Source"

This pattern must be implemented **identically** across every feature for consistency:

1. User hovers/clicks a "Show Source" icon next to any generated statement.
2. The PDF viewer panel scrolls/jumps to the relevant page.
3. The exact paragraph/figure/table/equation region is highlighted (using the `bbox` from the structured representation).
4. If the panel is collapsed, it auto-expands; a brief highlight animation draws attention to the highlighted region.

This should be built as a **shared component** (e.g., `<SourceLink refId={...} />`) reused across all 10 feature views rather than reimplemented per view.

---

## 4. Visual System for Fact vs. Inference

This is a core trust mechanism from the PRD and must be unmistakable, not subtle:

| Type | Suggested treatment |
|---|---|
| Author-stated (fact) | Solid border/background, neutral accent color, "Source: Paper" label |
| AI-inferred | Dashed border or distinct background tint, distinct accent color, "AI Inference" tag + confidence indicator |

This treatment should be defined once as a design token/utility (e.g., `.badge-stated`, `.badge-inferred`) and reused everywhere — Limitations Analyzer, Mentor Mode, any inferred content in Claims Explorer.

---

## 5. Design System Basics (starting point — refine with frontend-design guidance during build)

* **Typography:** clear hierarchy between UI chrome and paper-derived content; consider a distinct typeface/style for quoted/extracted paper text vs. AI-generated explanation text, to reinforce the fact/inference distinction visually.
* **Color:** neutral, low-distraction base palette; reserved accent colors specifically for "stated" vs. "inferred" states (don't reuse these accents elsewhere in the UI).
* **Layout:** dashboard/card-based, generous whitespace, no long unbroken text blocks — break every feature into scannable chunks.
* **Depth selector:** a persistent, consistent control (e.g., segmented control: Beginner / Undergrad / Grad / Researcher) available wherever explanatory text appears.

---

## 6. Responsive Considerations

* Primary experience is desktop/laptop (research workflow), but the dashboard and Study Mode (flashcards/quizzes) should be usable on tablet/mobile for on-the-go review.
* PDF viewer + content split-view collapses to a single-column, toggle-based view on smaller screens (view content OR PDF, with a quick switch) rather than a cramped split.
* Concept Map may need a simplified/list-fallback view on small screens given graph interactions are hard on touch/small viewports.

---

## 7. Empty/Loading/Error States (must be designed, not an afterthought)

* Per-feature loading states while async generation completes (features can complete at different times — don't block the whole dashboard on the slowest feature).
* Clear error state if parsing fails (e.g., corrupted PDF, scanned doc needing OCR fallback) with a retry action.
* Empty state for Comparison mode before a second paper is added.
