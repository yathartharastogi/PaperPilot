import fitz  # PyMuPDF
import re
import uuid
from typing import List, Dict, Any, Tuple
from app.models.paper_schema import (
    CanonicalPaper, SectionNode, ParagraphNode, FigureNode,
    TableNode, EquationNode, BoundingBox, SourceRef
)

class PDFParser:
    def __init__(self):
        pass

    def parse_pdf(self, pdf_bytes: bytes, filename: str) -> CanonicalPaper:
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        paper_id = str(uuid.uuid4())

        title = filename.replace(".pdf", "").replace("_", " ").title()
        sections: List[SectionNode] = []
        figures: List[FigureNode] = []
        tables: List[TableNode] = []
        equations: List[EquationNode] = []
        sources_index: Dict[str, SourceRef] = {}

        current_section = SectionNode(
            section_id=f"sec_0",
            title="Abstract & Introduction",
            paragraphs=[]
        )

        para_count = 0
        fig_count = 0
        eq_count = 0

        for page_idx in range(len(doc)):
            page = doc[page_idx]
            page_num = page_idx + 1
            page_rect = page.rect

            # Extract text blocks with layout bounding boxes
            blocks = page.get_text("blocks")  # (x0, y0, x1, y1, text, block_no, block_type)
            
            for b in blocks:
                if len(b) < 5:
                    continue
                x0, y0, x1, y1, text, b_no, b_type = b[0], b[1], b[2], b[3], b[4], b[5], b[6]
                
                text_clean = text.strip()
                if not text_clean or len(text_clean) < 3:
                    continue

                bbox = BoundingBox(
                    x=round(x0, 2),
                    y=round(y0, 2),
                    width=round(x1 - x0, 2),
                    height=round(y1 - y0, 2)
                )

                # Heading detection heuristic
                if (len(text_clean) < 80 and 
                    (re.match(r'^(\d+\.|\d+\s+[A-Z]|Abstract|Introduction|Related Work|Method|Methodology|Model|Experiments|Results|Discussion|Conclusion|Limitations|Future Work)', text_clean, re.IGNORECASE))):
                    if current_section.paragraphs:
                        sections.append(current_section)
                    current_section = SectionNode(
                        section_id=f"sec_{len(sections)+1}",
                        title=text_clean,
                        paragraphs=[]
                    )
                    continue

                para_id = f"para_{para_count+1}"
                para_count += 1

                p_node = ParagraphNode(
                    para_id=para_id,
                    text=text_clean,
                    page=page_num,
                    bbox=bbox
                )
                current_section.paragraphs.append(p_node)

                # Index as source ref
                sources_index[para_id] = SourceRef(
                    ref_id=para_id,
                    target_type="paragraph",
                    page=page_num,
                    bbox=bbox,
                    text_snippet=text_clean[:120] + "..." if len(text_clean) > 120 else text_clean
                )

                # Detect LaTeX or equation patterns
                if ("=" in text_clean or "∑" in text_clean or "∫" in text_clean or "\\" in text_clean or "^" in text_clean) and len(text_clean) < 150:
                    eq_id = f"eq_{eq_count+1}"
                    eq_count += 1
                    equations.append(EquationNode(
                        eq_id=eq_id,
                        latex=text_clean,
                        page=page_num,
                        bbox=bbox,
                        explanation=f"Equation extracted from page {page_num}: {text_clean[:60]}",
                        variables={"x": "Input variable", "y": "Target output"},
                        intuition="Defines the core mathematical relationship for this block.",
                        analogy="Functions like a standard loss or transformation mapping."
                    ))
                    sources_index[eq_id] = SourceRef(
                        ref_id=eq_id,
                        target_type="equation",
                        page=page_num,
                        bbox=bbox,
                        text_snippet=text_clean
                    )

            # Image & figure detection
            image_list = page.get_images(full=True)
            for img_idx, img in enumerate(image_list):
                fig_id = f"fig_{fig_count+1}"
                fig_count += 1
                fig_bbox = BoundingBox(
                    x=50.0,
                    y=100.0 + (img_idx * 150.0),
                    width=round(page_rect.width - 100.0, 2),
                    height=200.0
                )
                figures.append(FigureNode(
                    figure_id=fig_id,
                    caption=f"Figure {fig_count} on Page {page_num}",
                    page=page_num,
                    bbox=fig_bbox,
                    image_url=None,
                    explanation=f"Visual representation extracted from page {page_num} illustrating architectural flow or performance metrics.",
                    why_it_matters="Provides concrete empirical or architectural evidence supporting the primary claims."
                ))
                sources_index[fig_id] = SourceRef(
                    ref_id=fig_id,
                    target_type="figure",
                    page=page_num,
                    bbox=fig_bbox,
                    text_snippet=f"Figure {fig_count} (Page {page_num})"
                )

        if current_section.paragraphs or not sections:
            sections.append(current_section)

        # Fallback if no sections extracted
        if not sections:
            sections = [
                SectionNode(
                    section_id="sec_1",
                    title="Overview",
                    paragraphs=[
                        ParagraphNode(
                            para_id="para_1",
                            text="Parsed document content.",
                            page=1,
                            bbox=BoundingBox(x=50.0, y=50.0, width=500.0, height=100.0)
                        )
                    ]
                )
            ]

        metadata = {
            "title": title,
            "filename": filename,
            "total_pages": len(doc),
            "total_sections": len(sections),
            "total_paragraphs": para_count
        }

        return CanonicalPaper(
            paper_id=paper_id,
            filename=filename,
            metadata=metadata,
            total_pages=len(doc),
            sections=sections,
            figures=figures,
            tables=tables,
            equations=equations,
            sources_index=sources_index
        )
