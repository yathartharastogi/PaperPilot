from typing import List, Optional, Dict, Any, Union
from pydantic import BaseModel, Field
from uuid import uuid4

class BoundingBox(BaseModel):
    x: float
    y: float
    width: float
    height: float

class SourceRef(BaseModel):
    ref_id: str
    target_type: str  # paragraph, figure, table, equation
    page: int
    bbox: Optional[BoundingBox] = None
    text_snippet: Optional[str] = None

class ParagraphNode(BaseModel):
    para_id: str
    text: str
    page: int
    bbox: Optional[BoundingBox] = None

class SectionNode(BaseModel):
    section_id: str
    title: str
    paragraphs: List[ParagraphNode] = []

class FigureNode(BaseModel):
    figure_id: str
    caption: str
    page: int
    bbox: Optional[BoundingBox] = None
    image_url: Optional[str] = None
    explanation: Optional[str] = None
    why_it_matters: Optional[str] = None

class TableNode(BaseModel):
    table_id: str
    caption: str
    page: int
    bbox: Optional[BoundingBox] = None
    extracted_data: Optional[List[List[str]]] = None
    explanation: Optional[str] = None

class EquationNode(BaseModel):
    eq_id: str
    latex: str
    page: int
    bbox: Optional[BoundingBox] = None
    explanation: Optional[str] = None
    variables: Optional[Dict[str, str]] = None
    intuition: Optional[str] = None
    analogy: Optional[str] = None

class ClaimNode(BaseModel):
    claim_id: str
    claim_text: str
    evidence: str
    source_refs: List[str] = []  # IDs pointing to para_id, figure_id, etc.
    section_name: Optional[str] = "Results"

class LimitationItem(BaseModel):
    id: str
    text: str
    type: str  # "stated" vs "inferred"
    confidence_score: Optional[float] = 1.0  # 1.0 for author stated, 0.0 - 1.0 for AI inferred
    source_refs: List[str] = []

class LimitationsData(BaseModel):
    author_stated: List[LimitationItem] = []
    ai_inferred: List[LimitationItem] = []

class ConceptNode(BaseModel):
    node_id: str
    label: str
    category: str  # Concept, Method, Dataset, Algorithm, Result, Conclusion
    description: str
    source_refs: List[str] = []

class ConceptEdge(BaseModel):
    edge_id: str
    source: str
    target: str
    relationship: str

class ConceptMapData(BaseModel):
    nodes: List[ConceptNode] = []
    edges: List[ConceptEdge] = []

class QuizQuestion(BaseModel):
    question_id: str
    question_type: str  # flashcard, mcq, true_false, fill_blank
    question: str
    options: Optional[List[str]] = None
    answer: str
    explanation: str
    source_refs: List[str] = []

class StudyModeData(BaseModel):
    flashcards: List[QuizQuestion] = []
    mcq_quizzes: List[QuizQuestion] = []
    true_false: List[QuizQuestion] = []
    key_terms: Dict[str, str] = {}

class ExecutiveBriefData(BaseModel):
    problem_statement: str
    why_it_matters: str
    proposed_solution: str
    main_contributions: List[str] = []
    key_findings: List[str] = []
    practical_takeaway: str
    source_refs: List[str] = []

class MentorPrompt(BaseModel):
    prompt_id: str
    category: str  # questions_to_ask, reviewer_concerns, possible_biases, missing_experiments, future_improvements
    title: str
    description: str
    type: str = "inferred"
    source_refs: List[str] = []

class PresentationBriefData(BaseModel):
    title: str
    slide_outlines: List[Dict[str, Any]] = []

class CanonicalPaper(BaseModel):
    paper_id: str
    filename: str
    metadata: Dict[str, Any] = Field(default_factory=dict)
    total_pages: int = 1
    sections: List[SectionNode] = []
    figures: List[FigureNode] = []
    tables: List[TableNode] = []
    equations: List[EquationNode] = []
    executive_brief: Optional[ExecutiveBriefData] = None
    claims: List[ClaimNode] = []
    limitations: LimitationsData = Field(default_factory=LimitationsData)
    concept_map: ConceptMapData = Field(default_factory=ConceptMapData)
    study_mode: StudyModeData = Field(default_factory=StudyModeData)
    mentor_prompts: List[MentorPrompt] = []
    presentation_brief: Optional[PresentationBriefData] = None
    sources_index: Dict[str, SourceRef] = Field(default_factory=dict)
