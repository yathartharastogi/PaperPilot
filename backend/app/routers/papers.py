from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
from typing import Dict, Any, List
from app.models.paper_schema import CanonicalPaper, SourceRef
from app.services.pdf_parser import PDFParser
from app.services.llm_engine import GroundedLLMEngine
from app.services.grounding import GroundingEngine
from app.seed.seed_demo import get_demo_paper, DEMO_PAPER_ID

router = APIRouter(prefix="/papers", tags=["papers"])

# In-memory store for papers (ideal for hackathon rapid iteration)
papers_db: Dict[str, CanonicalPaper] = {}

# Initialize pre-seeded demo paper
demo_paper = get_demo_paper()
papers_db[DEMO_PAPER_ID] = demo_paper

pdf_parser = PDFParser()
llm_engine = GroundedLLMEngine()
grounding_engine = GroundingEngine()

@router.get("", response_model=List[Dict[str, Any]])
def list_papers():
    """Returns list of active uploaded and demo papers."""
    return [
        {
            "paper_id": p.paper_id,
            "filename": p.filename,
            "title": p.metadata.get("title", p.filename),
            "total_pages": p.total_pages,
            "is_demo": p.paper_id == DEMO_PAPER_ID
        }
        for p in papers_db.values()
    ]

@router.post("/upload", response_model=CanonicalPaper)
async def upload_paper(file: UploadFile = File(...)):
    """Uploads PDF, parses layout, extracts canonical JSON, and grounds insights."""
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    content = await file.read()
    if len(content) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    # 1. Layout-aware PDF extraction
    paper = pdf_parser.parse_pdf(content, file.filename)
    
    # 2. Grounded feature generation
    paper = llm_engine.generate_all_features(paper)

    papers_db[paper.paper_id] = paper
    return paper

@router.get("/{paper_id}", response_model=CanonicalPaper)
def get_paper(paper_id: str):
    if paper_id not in papers_db:
        raise HTTPException(status_code=404, detail="Paper not found.")
    return papers_db[paper_id]

@router.get("/{paper_id}/source/{ref_id}", response_model=SourceRef)
def get_source_ref(paper_id: str, ref_id: str):
    """Citation resolver endpoint powering 'Show Source' highlights."""
    if paper_id not in papers_db:
        raise HTTPException(status_code=404, detail="Paper not found.")
    paper = papers_db[paper_id]
    return grounding_engine.resolve_source(paper, ref_id)

@router.get("/{paper_id}/brief")
def get_executive_brief(paper_id: str):
    if paper_id not in papers_db:
        raise HTTPException(status_code=404, detail="Paper not found.")
    return papers_db[paper_id].executive_brief

@router.get("/{paper_id}/claims")
def get_claims(paper_id: str):
    if paper_id not in papers_db:
        raise HTTPException(status_code=404, detail="Paper not found.")
    return papers_db[paper_id].claims

@router.get("/{paper_id}/limitations")
def get_limitations(paper_id: str):
    if paper_id not in papers_db:
        raise HTTPException(status_code=404, detail="Paper not found.")
    return papers_db[paper_id].limitations

@router.get("/{paper_id}/figures")
def get_figures(paper_id: str):
    if paper_id not in papers_db:
        raise HTTPException(status_code=404, detail="Paper not found.")
    return {"figures": papers_db[paper_id].figures, "tables": papers_db[paper_id].tables}

@router.get("/{paper_id}/equations")
def get_equations(paper_id: str):
    if paper_id not in papers_db:
        raise HTTPException(status_code=404, detail="Paper not found.")
    return papers_db[paper_id].equations

@router.get("/{paper_id}/concept-map")
def get_concept_map(paper_id: str):
    if paper_id not in papers_db:
        raise HTTPException(status_code=404, detail="Paper not found.")
    return papers_db[paper_id].concept_map

@router.get("/{paper_id}/study-mode")
def get_study_mode(paper_id: str):
    if paper_id not in papers_db:
        raise HTTPException(status_code=404, detail="Paper not found.")
    return papers_db[paper_id].study_mode

@router.get("/{paper_id}/presentation")
def get_presentation(paper_id: str):
    if paper_id not in papers_db:
        raise HTTPException(status_code=404, detail="Paper not found.")
    return papers_db[paper_id].presentation_brief

@router.get("/{paper_id}/mentor")
def get_mentor(paper_id: str):
    if paper_id not in papers_db:
        raise HTTPException(status_code=404, detail="Paper not found.")
    return papers_db[paper_id].mentor_prompts

@router.post("/compare")
def compare_papers(paper_ids: List[str]):
    """Side-by-side comparison across 2 to 4 papers."""
    selected = [papers_db[pid] for pid in paper_ids if pid in papers_db]
    if not selected:
        raise HTTPException(status_code=400, detail="No valid papers selected for comparison.")

    comparison_result = []
    for p in selected:
        comparison_result.append({
            "paper_id": p.paper_id,
            "title": p.metadata.get("title", p.filename),
            "problem": p.executive_brief.problem_statement if p.executive_brief else "N/A",
            "solution": p.executive_brief.proposed_solution if p.executive_brief else "N/A",
            "key_claims_count": len(p.claims),
            "author_limitations_count": len(p.limitations.author_stated),
            "ai_inferred_limitations_count": len(p.limitations.ai_inferred)
        })
    return {"comparison": comparison_result}
