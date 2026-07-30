# PaperPilot — AI Research Briefing Agent (Hackathon Edition)

PaperPilot is an evidence-backed AI research briefing assistant that transforms academic PDFs into interactive, verifiable learning experiences. It features **100% factual citation grounding**, linking every summary point, claim, equation, and limitation back to the exact page and bounding box in the original PDF viewer canvas.

---

## Key Features

1. **Executive Brief:** Grounded high-level summary with problem, solution, contributions, key findings, and practical takeaways.
2. **Claims & Evidence Explorer:** Primary claims paired with supporting empirical evidence and section filters.
3. **Limitations Analyzer:** Two-column strict visual separation of **Author-Stated** facts vs. **AI-Inferred** weaknesses with confidence scores.
4. **Figure & Table Explainer:** Parsed figures and extracted interactive tables with plain-language trend analysis.
5. **Equation Translator:** Latex math rendered into variable definitions, conceptual intuition, and real-world analogies.
6. **Interactive Concept Map:** Node-graph topology connecting concepts, algorithms, datasets, and conclusions.
7. **Study Mode:** Interactive active-recall flashcards with flip state, MCQ quizzes, and key terms.
8. **Presentation Brief:** Outline slides formatted for pitches, classes, or meetings with Markdown export.
9. **Research Mentor Mode:** Reviewer concerns, critical-thinking prompts, and missing ablation experiment analysis.
10. **Paper Comparison Mode:** Side-by-side comparative analysis of research objectives across multiple papers.

---

## Quick Start (Zero Paid API Keys Required)

### 1. Start the Backend API (FastAPI)
```bash
cd backend
python -m uvicorn app.main:app --reload --port 8000
```
Backend API will run at `http://localhost:8000` (docs available at `http://localhost:8000/docs`).

### 2. Start the Frontend App (Next.js)
```bash
cd frontend
npm run dev
```
Frontend Dashboard will open at `http://localhost:3000`.

---

## Local Docker Infrastructure (Optional)
To launch Postgres (with `pgvector`), Redis, and MinIO storage locally:
```bash
docker-compose up -d
```
