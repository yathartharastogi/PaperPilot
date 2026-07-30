# Product Requirements Document (PRD)
## PaperPilot — AI Research Briefing Agent

**Version:** 1.0
**Status:** Draft for build (Antigravity)
**Owner:** Product

---

## 1. Overview

PaperPilot is an AI-powered Research Paper Briefing Agent that helps students, researchers, and hackathon teams understand academic papers quickly without sacrificing accuracy. It goes beyond summarization by transforming an uploaded paper into an interactive, evidence-backed learning experience.

Every uploaded paper is treated as **structured knowledge**, not plain text. The system identifies the paper's core problem, methodology, experiments, claims, limitations, datasets, results, and future work, then generates multiple learning-friendly outputs from that structured understanding.

**Core principle: factual grounding.** Every generated insight must be traceable back to the original paper. Users can click any summary point, claim, flashcard, or explanation and immediately see the exact paragraph, figure, table, or section it was derived from. The interface clearly distinguishes author-stated facts from AI-inferred insights.

---

## 2. Problem Statement

Reading and internalizing an academic paper is slow, and generic "chat with PDF" tools produce summaries that are hard to verify, don't support retention, and don't help users think critically about the work. Students and researchers need something that behaves like an expert mentor: fast, structured, verifiable, and pedagogically useful — not just a text compressor.

---

## 3. Goals

* Reduce the time required to understand a research paper from hours to minutes.
* Help users **retain** information instead of passively reading summaries.
* Encourage critical thinking by exposing evidence, limitations, and assumptions.
* Produce outputs that are presentation-ready and study-friendly.
* Maintain complete transparency by linking every generated statement to its source.

### Non-Goals (v1)
* Not a general-purpose "chat with any PDF" tool — scope is academic/research papers.
* Not a citation manager or reference-graph tool (e.g., not replacing Zotero/Mendeley).
* Not a paper-writing or paraphrasing assistant.
* No real-time multi-user collaborative annotation in v1.

---

## 4. Target Users / Personas

| Persona | Need |
|---|---|
| Undergraduate student | Understand assigned papers fast, generate study material for exams |
| Graduate researcher | Extract claims/evidence quickly, compare papers for literature review |
| Hackathon team member | Get a presentation-ready brief before a pitch or demo |
| Reviewer / mentor figure use case | Surface reviewer-style critical questions and gaps |

---

## 5. Core User Flow

1. User uploads one or more research papers (PDFs).
2. System parses and analyzes the document, building a structured representation of the paper (problem, method, experiments, claims, results, limitations, datasets, future work).
3. User lands on an **interactive dashboard**, not a wall of text.
4. User explores different learning modes based on their need (brief, claims, study mode, presentation, etc.).
5. Every generated insight has a **"Show Source"** action that highlights the exact supporting text/figure/table in the original paper viewer.

---

## 6. Primary Features

### 6.1 Executive Brief
Concise overview: research problem, why it matters, proposed solution, main contributions, key findings, practical takeaway.

### 6.2 Claims & Evidence Explorer
Extracts primary claims, each paired with: supporting evidence, experiments, tables/figures, reported metrics, and exact source location. Answers "why is this claim made?" for every claim.

### 6.3 Limitations Analyzer
Two labeled categories:
- **Author-stated limitations** — directly mentioned by the authors.
- **AI-inferred limitations** — potential weaknesses identified by the AI, clearly labeled as inferred, with a confidence score.

### 6.4 Figure & Table Explainer
For every important figure/table: what it represents, important trends, why it matters, key takeaway in plain language.

### 6.5 Equation Translator
Converts equations into intuitive explanations: variable definitions, what the equation accomplishes, conceptual intuition, a real-world analogy.

### 6.6 Interactive Concept Map
Visual knowledge graph connecting core concepts, methods, datasets, algorithms, results, and conclusions. Clicking a node reveals its explanation and source.

### 6.7 Study Mode
Auto-generates flashcards, multiple-choice quizzes, true/false questions, fill-in-the-blanks, active recall prompts, and key terminology definitions.

### 6.8 Presentation Brief
Presentation-ready outline: background, problem statement, methodology, results, limitations, future work. Built for meetings, classes, or hackathon discussions.

### 6.9 Paper Comparison
Upload multiple papers → side-by-side comparison of research objectives, methodologies, datasets, performance, contributions, strengths, weaknesses, novelty.

### 6.10 Research Mentor Mode
Generates: questions to ask while reading, potential reviewer concerns, possible biases, missing experiments, suggested future improvements.

---

## 7. Design Principles

* Evidence-first experience — nothing is asserted without a traceable source.
* Minimal, distraction-free interface.
* Interactive instead of static (no giant scrollable summary walls).
* Every AI-generated statement must be verifiable via "Show Source."
* Clear visual distinction between **facts** (author-stated) and **AI inferences**.
* Multiple explanation depth levels: beginner, undergraduate, graduate, researcher.

---

## 8. Success Criteria

A student using PaperPilot should be able to:
* Understand a paper in under 10 minutes.
* Confidently explain its main contributions.
* Quickly identify strengths and weaknesses.
* Automatically generate study material.
* Prepare presentation notes with minimal effort.
* Trust the output because every insight is linked to the original source.

**North-star feeling:** less "Chat with PDF," more "expert research mentor who read the paper with you and can point to exactly where every claim comes from."

---

## 9. Key Risks & Open Questions

| Risk | Mitigation direction |
|---|---|
| LLM hallucinating claims not in the source | Mandatory citation-grounding pipeline (see Technical Architecture Doc); reject ungrounded outputs |
| Poor PDF parsing on multi-column academic layouts | Use layout-aware PDF parsing, not naive text extraction |
| Equation/figure extraction accuracy | Combine OCR + layout detection + vision-capable LLM pass |
| Cost of processing large papers / multiple papers (comparison mode) | Cache structured representation per paper; chunk + reuse |
| Users trusting AI-inferred limitations as fact | Strong visual/UI distinction + confidence scores (see Frontend Spec) |

Open questions to resolve during build: max paper length/page count supported in v1, max number of papers in Comparison mode, whether OCR is needed for scanned (non-native-text) PDFs.
