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
            page=2,
            bbox=BoundingBox(x=57.0, y=120.0, width=498.0, height=110.0),
            text_snippet="The goal of reducing sequential computation also forms the foundation of the Extended Neural GPU, ByteNet and ConvS2S..."
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
            title="2. Background & Related Work",
            paragraphs=[
                ParagraphNode(
                    para_id="para_3",
                    text="The goal of reducing sequential computation also forms the foundation of the Extended Neural GPU, ByteNet and ConvS2S, all of which use convolutional neural networks as basic building blocks. In these models, the number of operations required to relate signals from two arbitrary input or output positions grows in the distance between positions.",
                    page=2,
                    bbox=BoundingBox(x=57.0, y=120.0, width=498.0, height=110.0)
                ),
                ParagraphNode(
                    para_id="para_4",
                    text="Self-attention, sometimes called intra-attention, is an attention mechanism relating different positions of a single sequence in order to compute a representation of the sequence. Self-attention has been used successfully in a variety of tasks including reading comprehension and abstractive summarization.",
                    page=2,
                    bbox=BoundingBox(x=57.0, y=250.0, width=498.0, height=100.0)
                )
            ]
        ),
        SectionNode(
            section_id="sec_3",
            title="3. Model Architecture & Attention Mechanism",
            paragraphs=[
                ParagraphNode(
                    para_id="para_5",
                    text="Most competitive neural sequence transduction models have an encoder-decoder structure. Here, the encoder maps an input sequence of symbol representations (x1, ..., xn) to a sequence of continuous representations z = (z1, ..., zn). Given z, the decoder then generates an output sequence (y1, ..., ym) of symbols one element at a time.",
                    page=3,
                    bbox=BoundingBox(x=57.0, y=120.0, width=498.0, height=110.0)
                ),
                ParagraphNode(
                    para_id="para_6",
                    text="An attention function can be described as mapping a query and a set of key-value pairs to an output, where the query, keys, values, and output are all vectors. The output is computed as a weighted sum of the values, where the weight assigned to each value is computed by a compatibility function of the query with the corresponding key.",
                    page=3,
                    bbox=BoundingBox(x=57.0, y=250.0, width=498.0, height=110.0)
                )
            ]
        ),
        SectionNode(
            section_id="sec_4",
            title="4. Positional Encodings & Sublayers",
            paragraphs=[
                ParagraphNode(
                    para_id="para_7",
                    text="Since our model contains no recurrence and no convolution, in order for the model to make use of the order of the sequence, we must inject some information about the relative or absolute position of the tokens in the sequence.",
                    page=4,
                    bbox=BoundingBox(x=57.0, y=120.0, width=498.0, height=90.0)
                ),
                ParagraphNode(
                    para_id="para_8",
                    text="To this end, we add 'positional encodings' to the input embeddings at the bottoms of the encoder and decoder stacks. The positional encodings have the same dimension d_model as the embeddings, so that the two can be summed.",
                    page=4,
                    bbox=BoundingBox(x=57.0, y=220.0, width=498.0, height=90.0)
                )
            ]
        ),
        SectionNode(
            section_id="sec_5",
            title="5. Why Self-Attention & Path Length Complexity",
            paragraphs=[
                ParagraphNode(
                    para_id="para_9",
                    text="In this section we compare various aspects of self-attention layers to the recurrent and convolutional layers commonly used for mapping one variable-length sequence of symbol representations (x1, ..., xn) to another sequence of equal length (z1, ..., zn).",
                    page=5,
                    bbox=BoundingBox(x=57.0, y=120.0, width=498.0, height=100.0)
                ),
                ParagraphNode(
                    para_id="para_10",
                    text="One main factor is the total computational complexity per layer. Another is the amount of computation that can be parallelized, as measured by the minimum number of sequential operations required.",
                    page=5,
                    bbox=BoundingBox(x=57.0, y=230.0, width=498.0, height=90.0)
                )
            ]
        ),
        SectionNode(
            section_id="sec_6",
            title="6. Training Setup & Hyperparameters",
            paragraphs=[
                ParagraphNode(
                    para_id="para_11",
                    text="We trained on the standard WMT 2014 English-German dataset consisting of about 4.5 million sentence pairs. Sentences were encoded using byte-pair encoding, which has a shared source-target vocabulary of about 37000 tokens.",
                    page=6,
                    bbox=BoundingBox(x=57.0, y=120.0, width=498.0, height=100.0)
                ),
                ParagraphNode(
                    para_id="para_12",
                    text="We trained our models on one machine with 8 NVIDIA P100 GPUs. For our base models using the hyperparameters described throughout the paper, each training step took about 0.4 seconds. We trained the base models for a total of 100,000 steps or 12 hours.",
                    page=6,
                    bbox=BoundingBox(x=57.0, y=230.0, width=498.0, height=110.0)
                )
            ]
        ),
        SectionNode(
            section_id="sec_7",
            title="7. Results — Machine Translation",
            paragraphs=[
                ParagraphNode(
                    para_id="para_13",
                    text="On the WMT 2014 English-to-German translation task, the big transformer model (Transformer (big) in Table 2) outperforms the best previously reported models (including ensembles) by more than 2.0 BLEU, establishing a new state-of-the-art BLEU score of 28.4.",
                    page=7,
                    bbox=BoundingBox(x=57.0, y=120.0, width=498.0, height=110.0)
                ),
                ParagraphNode(
                    para_id="para_14",
                    text="On the WMT 2014 English-to-French translation task, our big model achieves a BLEU score of 41.8, outperforming all of the previously published single models, at less than 1/4 the training cost of the previous state-of-the-art model.",
                    page=7,
                    bbox=BoundingBox(x=57.0, y=240.0, width=498.0, height=110.0)
                )
            ]
        ),
        SectionNode(
            section_id="sec_8",
            title="8. Model Variations & Ablation Studies",
            paragraphs=[
                ParagraphNode(
                    para_id="para_15",
                    text="To evaluate the importance of different components of the Transformer, we varied our base model in different ways, measuring the change in performance on English-to-German translation on the development set, newstest2013.",
                    page=8,
                    bbox=BoundingBox(x=57.0, y=120.0, width=498.0, height=110.0)
                ),
                ParagraphNode(
                    para_id="para_16",
                    text="We observe that while single-head attention is 0.9 BLEU worse than the best setting, quality also drops off with too many heads. Key dimension d_k is also critical for matching inner vector dimension scaling.",
                    page=8,
                    bbox=BoundingBox(x=57.0, y=240.0, width=498.0, height=110.0)
                )
            ]
        ),
        SectionNode(
            section_id="sec_9",
            title="9. English Constituency Parsing",
            paragraphs=[
                ParagraphNode(
                    para_id="para_17",
                    text="To evaluate if the Transformer can generalize to other tasks we performed experiments on English constituency parsing. This task presents specific challenges: the output is subject to strong structural constraints and is significantly longer than the input.",
                    page=9,
                    bbox=BoundingBox(x=57.0, y=120.0, width=498.0, height=110.0)
                ),
                ParagraphNode(
                    para_id="para_18",
                    text="Our 4-layer Transformer with d_model = 1024 achieved an F1 score of 91.3 when trained on the WSJ portion of the Penn Treebank, outperforming all previously reported sequence-to-sequence models.",
                    page=9,
                    bbox=BoundingBox(x=57.0, y=240.0, width=498.0, height=110.0)
                )
            ]
        ),
        SectionNode(
            section_id="sec_10",
            title="10. Conclusion & Future Work",
            paragraphs=[
                ParagraphNode(
                    para_id="para_19",
                    text="In this work, we presented the Transformer, the first sequence transduction model based entirely on attention, replacing the recurrent layers most commonly used in encoder-decoder architectures with multi-headed self-attention.",
                    page=10,
                    bbox=BoundingBox(x=57.0, y=120.0, width=498.0, height=110.0)
                ),
                ParagraphNode(
                    para_id="para_20",
                    text="We are excited about the future of attention-based models and plan to apply them to other tasks, including image, audio, and video processing.",
                    page=10,
                    bbox=BoundingBox(x=57.0, y=240.0, width=498.0, height=90.0)
                )
            ]
        ),
        SectionNode(
            section_id="sec_11",
            title="11. References & Citations",
            paragraphs=[
                ParagraphNode(
                    para_id="para_21",
                    text="[1] Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, and Illia Polosukhin. 2017. Attention is all you need. In NIPS.",
                    page=11,
                    bbox=BoundingBox(x=57.0, y=120.0, width=498.0, height=90.0)
                ),
                ParagraphNode(
                    para_id="para_22",
                    text="[2] Dzmitry Bahdanau, Kyunghyun Cho, and Yoshua Bengio. 2014. Neural machine translation by jointly learning to align and translate. In ICLR.",
                    page=11,
                    bbox=BoundingBox(x=57.0, y=220.0, width=498.0, height=90.0)
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
            page=5,
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
        sources_index=sources_index
    )
