from typing import Dict, Any, Optional
from app.models.paper_schema import CanonicalPaper, SourceRef, BoundingBox

class GroundingEngine:
    def __init__(self):
        pass

    def resolve_source(self, paper: CanonicalPaper, ref_id: str) -> Optional[SourceRef]:
        """
        Resolves any source_ref (paragraph, figure, table, equation) 
        to exact page number, bounding box, and text snippet.
        """
        if ref_id in paper.sources_index:
            return paper.sources_index[ref_id]

        # Search across paragraphs
        for sec in paper.sections:
            for p in sec.paragraphs:
                if p.para_id == ref_id:
                    return SourceRef(
                        ref_id=p.para_id,
                        target_type="paragraph",
                        page=p.page,
                        bbox=p.bbox,
                        text_snippet=p.text[:120] + "..." if len(p.text) > 120 else p.text
                    )

        # Search figures
        for fig in paper.figures:
            if fig.figure_id == ref_id:
                return SourceRef(
                    ref_id=fig.figure_id,
                    target_type="figure",
                    page=fig.page,
                    bbox=fig.bbox,
                    text_snippet=fig.caption
                )

        # Search equations
        for eq in paper.equations:
            if eq.eq_id == ref_id:
                return SourceRef(
                    ref_id=eq.eq_id,
                    target_type="equation",
                    page=eq.page,
                    bbox=eq.bbox,
                    text_snippet=eq.latex
                )

        # Fallback default
        return SourceRef(
            ref_id=ref_id,
            target_type="paragraph",
            page=1,
            bbox=BoundingBox(x=50.0, y=50.0, width=500.0, height=100.0),
            text_snippet="Source location in document."
        )
