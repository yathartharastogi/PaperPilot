from typing import Dict
from app.models.paper_schema import (
    CanonicalPaper, SectionNode, ParagraphNode, FigureNode, TableNode, EquationNode,
    ExecutiveBriefData, ClaimNode, LimitationItem, LimitationsData, ConceptMapData,
    ConceptNode, ConceptEdge, StudyModeData, QuizQuestion, MentorPrompt,
    PresentationBriefData, BoundingBox, SourceRef
)

DEMO_PAPER_ID = "demo-attention-is-all-you-need"

def get_demo_paper() -> CanonicalPaper:
    sources_index = {
        "para_1": SourceRef(
            ref_id="para_1",
            target_type="paragraph",
            page=1,
            bbox=BoundingBox(x=57.0, y=280.0, width=498.0, height=85.0),
            text_snippet="The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder..."
        ),
        "para_2": SourceRef(
            ref_id="para_2",
            target_type="paragraph",
            page=1,
            bbox=BoundingBox(x=57.0, y=380.0, width=498.0, height=90.0),
            text_snippet="We propose the Transformer, a model architecture eschewing recurrence and relying entirely on an attention mechanism to draw global dependencies..."
        ),
        "para_3": SourceRef(
            ref_id="para_3",
            target_type="paragraph",
            page=3,
            bbox=BoundingBox(x=57.0, y=120.0, width=240.0, height=110.0),
            text_snippet="An attention function can be described as mapping a query and a set of key-value pairs to an output, where the query, keys, values, and output are all vectors..."
        ),
        "fig_1": SourceRef(
            ref_id="fig_1",
            target_type="figure",
            page=3,
            bbox=BoundingBox(x=315.0, y=100.0, width=235.0, height=350.0),
            text_snippet="Figure 1: The Transformer - model architecture."
        ),
        "eq_1": SourceRef(
            ref_id="eq_1",
            target_type="equation",
            page=4,
            bbox=BoundingBox(x=57.0, y=210.0, width=498.0, height=45.0),
            text_snippet="Attention(Q, K, V) = softmax( (Q K^T) / sqrt(d_k) ) V"
        )
    }

    sections = [
        SectionNode(
            section_id="sec_1",
            title="1. Introduction & Abstract",
            paragraphs=[
                ParagraphNode(
                    para_id="para_1",
                    text="The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose the Transformer, a model architecture eschewing recurrence and relying entirely on an attention mechanism to draw global dependencies between input and output.",
                    page=1,
                    bbox=BoundingBox(x=57.0, y=280.0, width=498.0, height=85.0)
                ),
                ParagraphNode(
                    para_id="para_2",
                    text="The Transformer allows for significantly more parallelization and can reach a new state of the art in translation quality after being trained for as little as twelve hours on eight P100 GPUs.",
                    page=1,
                    bbox=BoundingBox(x=57.0, y=380.0, width=498.0, height=90.0)
                )
            ]
        ),
        SectionNode(
            section_id="sec_2",
            title="3. Model Architecture",
            paragraphs=[
                ParagraphNode(
                    para_id="para_3",
                    text="An attention function can be described as mapping a query and a set of key-value pairs to an output, where the query, keys, values, and output are all vectors. The output is computed as a weighted sum of the values, where the weight assigned to each value is computed by a compatibility function of the query with the corresponding key.",
                    page=3,
                    bbox=BoundingBox(x=57.0, y=120.0, width=240.0, height=110.0)
                )
            ]
        )
    ]

    figures = [
        FigureNode(
            figure_id="fig_1",
            caption="Figure 1: The Transformer model architecture featuring Multi-Head Attention and Positional Encoding layers.",
            page=3,
            bbox=BoundingBox(x=315.0, y=100.0, width=235.0, height=350.0),
            image_url=None,
            explanation="The diagram shows the encoder (left) and decoder (right) stacks. The encoder consists of multi-head self-attention and feed-forward sublayers. The decoder adds a third sublayer performing multi-head attention over the encoder output.",
            why_it_matters="Illustrates how sequence transduction can be performed entirely without recurrent connections."
        )
    ]

    tables = [
        TableNode(
            table_id="tab_1",
            caption="Table 1: Maximum path lengths, memory size, and unroll complexity per layer for different sequence operations.",
            page=6,
            bbox=BoundingBox(x=57.0, y=150.0, width=498.0, height=180.0),
            extracted_data=[
                ["Layer Type", "Complexity per Layer", "Sequential Operations", "Maximum Path Length"],
                ["Self-Attention", "O(n^2 · d)", "O(1)", "O(1)"],
                ["Recurrent", "O(n · d^2)", "O(n)", "O(n)"],
                ["Convolutional", "O(k · n · d^2)", "O(1)", "O(log_k(n))"]
            ],
            explanation="Demonstrates that self-attention layers connect all positions with a constant number of sequentially executed operations O(1), whereas recurrent layers require O(n) sequential steps."
        )
    ]

    equations = [
        EquationNode(
            eq_id="eq_1",
            latex="\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{Q K^T}{\\sqrt{d_k}}\\right) V",
            page=4,
            bbox=BoundingBox(x=57.0, y=210.0, width=498.0, height=45.0),
            explanation="Scaled Dot-Product Attention: computes dot products of queries with all keys, divides each by sqrt(d_k), and applies a softmax function to obtain weights for values.",
            variables={
                "Q": "Query matrix",
                "K": "Key matrix",
                "V": "Value matrix",
                "d_k": "Dimensionality of keys"
            },
            intuition="Scaling by 1/sqrt(d_k) prevents dot products from growing excessively large in high dimensions, preventing softmax gradient saturation.",
            analogy="Like querying a database index where Q is your search string, K are index tags, and V are actual search result contents."
        )
    ]

    executive_brief = ExecutiveBriefData(
        problem_statement="Recurrent neural networks (RNNs, LSTMs) process sequences sequentially, creating a computational bottleneck that prevents parallelization across long sequences.",
        why_it_matters="Sequential processing makes training large language models prohibitively slow and struggles to retain long-range dependencies across distant words.",
        proposed_solution="Replaces recurrence entirely with Multi-Head Self-Attention, allowing all tokens in a sequence to be processed simultaneously in parallel.",
        main_contributions=[
            "First sequence transduction model relying entirely on self-attention without RNNs or convolutions.",
            "Achieved state-of-the-art BLEU score of 28.4 on WMT 2014 English-to-German translation.",
            "Drastically reduced training time from weeks to 12 hours on 8 GPUs."
        ],
        key_findings=[
            "Self-attention reduces sequential path length from O(n) to O(1).",
            "Multi-Head Attention allows the model to jointly attend to information from different representation subspaces."
        ],
        practical_takeaway="The Transformer architecture became the foundational blueprint for modern LLMs (GPT, BERT, Claude, Gemini).",
        source_refs=["para_1", "para_2"]
    )

    claims = [
        ClaimNode(
            claim_id="claim_1",
            claim_text="The Transformer achieves superior translation quality while requiring significantly less time to train.",
            evidence="Reached 28.4 BLEU on WMT 2014 En-De after 12 hours of training on 8 P100 GPUs, outperforming previous ensemble baselines.",
            source_refs=["para_2"],
            section_name="Results"
        ),
        ClaimNode(
            claim_id="claim_2",
            claim_text="Self-attention layers connect all positions with a constant number of sequential operations O(1).",
            evidence="Table 1 compares sequential operation complexity: Self-attention O(1) vs Recurrent O(n).",
            source_refs=["para_3"],
            section_name="Model Architecture"
        )
    ]

    limitations = LimitationsData(
        author_stated=[
            LimitationItem(
                id="lim_stated_1",
                text="Computational memory complexity of self-attention scales quadratically O(n^2) with sequence length n.",
                type="stated",
                confidence_score=1.0,
                source_refs=["para_3"]
            )
        ],
        ai_inferred=[
            LimitationItem(
                id="lim_inferred_1",
                text="Requires absolute positional encodings since self-attention inherently possesses no order awareness.",
                type="inferred",
                confidence_score=0.92,
                source_refs=["para_1", "fig_1"]
            ),
            LimitationItem(
                id="lim_inferred_2",
                text="High GPU VRAM footprint during inference due to caching key-value states across attention heads.",
                type="inferred",
                confidence_score=0.85,
                source_refs=["para_2"]
            )
        ]
    )

    concept_map = ConceptMapData(
        nodes=[
            ConceptNode(node_id="c_1", label="Transformer", category="Model", description="Attention-only architecture.", source_refs=["para_1"]),
            ConceptNode(node_id="c_2", label="Self-Attention", category="Method", description="Computes token-to-token similarity matrix.", source_refs=["para_3"]),
            ConceptNode(node_id="c_3", label="Multi-Head Attention", category="Algorithm", description="Parallel attention heads.", source_refs=["fig_1"]),
            ConceptNode(node_id="c_4", label="Positional Encoding", category="Concept", description="Injects token order signals.", source_refs=["para_1"]),
            ConceptNode(node_id="c_5", label="WMT 2014 Benchmark", category="Dataset", description="Translation test dataset.", source_refs=["para_2"])
        ],
        edges=[
            ConceptEdge(edge_id="e_1", source="c_1", target="c_2", relationship="replaces RNN with"),
            ConceptEdge(edge_id="e_2", source="c_2", target="c_3", relationship="extends to"),
            ConceptEdge(edge_id="e_3", source="c_1", target="c_4", relationship="uses"),
            ConceptEdge(edge_id="e_4", source="c_1", target="c_5", relationship="evaluated on")
        ]
    )

    study_mode = StudyModeData(
        flashcards=[
            QuizQuestion(
                question_id="flash_1",
                question_type="flashcard",
                question="What is the sequential operation complexity of a Self-Attention layer compared to a Recurrent layer?",
                answer="Self-attention is O(1) sequential steps, whereas Recurrent is O(n) sequential steps.",
                explanation="Because self-attention compares all token pairs in parallel, sequence length n does not force sequential unrolling.",
                source_refs=["para_3"]
            ),
            QuizQuestion(
                question_id="flash_2",
                question_type="flashcard",
                question="Why is scaling by 1/sqrt(d_k) necessary in Scaled Dot-Product Attention?",
                answer="To prevent dot products from growing large in high dimensions, which would push softmax into regions with extremely small gradients.",
                explanation="Without scaling, large key dimensions cause softmax saturation and vanishing gradients.",
                source_refs=["eq_1"]
            )
        ],
        mcq_quizzes=[
            QuizQuestion(
                question_id="mcq_1",
                question_type="mcq",
                question="What BLEU score did the Transformer achieve on the WMT 2014 English-to-German translation benchmark?",
                options=["24.1 BLEU", "28.4 BLEU", "31.0 BLEU", "35.2 BLEU"],
                answer="28.4 BLEU",
                explanation="Outperformed previous state-of-the-art models including ensembles while training significantly faster.",
                source_refs=["para_2"]
            )
        ],
        true_false=[
            QuizQuestion(
                question_id="tf_1",
                question_type="true_false",
                question="The original Transformer architecture uses convolutional layers to capture local context.",
                options=["True", "False"],
                answer="False",
                explanation="The Transformer eschews recurrence and convolutions entirely, relying solely on self-attention mechanisms.",
                source_refs=["para_1"]
            )
        ],
        key_terms={
            "Self-Attention": "An attention mechanism relating different positions of a single sequence to compute a representation of the sequence.",
            "Multi-Head Attention": "Linearly projecting queries, keys, and values h times with different learned linear projections to attend to information jointly.",
            "Positional Encoding": "Sinusoidal or learned vectors added to input embeddings to convey sequence order information."
        }
    )

    mentor_prompts = [
        MentorPrompt(
            prompt_id="m_1",
            category="questions_to_ask",
            title="Linear Attention Extensions",
            description="Since standard self-attention requires quadratic O(n^2) compute, how could sparse or kernelized attention reduce scaling for 100k+ token contexts?",
            type="inferred",
            source_refs=["para_3"]
        ),
        MentorPrompt(
            prompt_id="m_2",
            category="reviewer_concerns",
            title="Hardware Dependability",
            description="Results were obtained on NVIDIA P100 GPUs; how do these parallelism advantages translate to memory-constrained edge hardware?",
            type="inferred",
            source_refs=["para_2"]
        )
    ]

    presentation_brief = PresentationBriefData(
        title="Presentation Brief: Attention Is All You Need",
        slide_outlines=[
            {"slide": 1, "title": "The Bottleneck of RNNs", "points": ["Sequential O(n) training prevents parallel computing", "Vanishing gradients across long sequences"]},
            {"slide": 2, "title": "The Transformer Architecture", "points": ["Replaces recurrence entirely with Self-Attention", "Multi-Head Attention captures diverse sub-space features"]},
            {"slide": 3, "title": "Results & Impact", "points": ["28.4 BLEU score on WMT 2014 En-De", "Trained in 12 hours on 8 GPUs", "Foundation for modern LLM architecture"]}
        ]
    )

    return CanonicalPaper(
        paper_id=DEMO_PAPER_ID,
        filename="Attention_Is_All_You_Need.pdf",
        metadata={"title": "Attention Is All You Need", "authors": ["A. Vaswani et al."], "year": 2017},
        total_pages=11,
        sections=sections,
        figures=figures,
        tables=tables,
        equations=equations,
        executive_brief=executive_brief,
        claims=claims,
        limitations=limitations,
        concept_map=concept_map,
        study_mode=study_mode,
        mentor_prompts=mentor_prompts,
        presentation_brief=presentation_brief,
        sources_index=sources_index
    )
