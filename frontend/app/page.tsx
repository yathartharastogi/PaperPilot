'use client';

import React, { useState } from 'react';
import {
  Upload, PanelRightOpen, PanelRightClose, Sparkles, Home
} from 'lucide-react';

import { LandingPage } from '../components/LandingPage';
import { UploadScreen } from '../components/UploadScreen';
import { SidebarNav } from '../components/SidebarNav';
import { PdfViewerPanel } from '../components/PdfViewerPanel';
import { ExecutiveBriefView } from '../components/views/ExecutiveBriefView';
import { ClaimsExplorerView } from '../components/views/ClaimsExplorerView';
import { LimitationsView } from '../components/views/LimitationsView';
import { FiguresTablesView } from '../components/views/FiguresTablesView';
import { EquationTranslatorView } from '../components/views/EquationTranslatorView';
import { ConceptMapView } from '../components/views/ConceptMapView';
import { PaperComparisonView } from '../components/views/PaperComparisonView';

export default function PaperPilotApp() {
  const [viewState, setViewState] = useState<'landing' | 'upload' | 'dashboard'>('landing');
  const [activeTab, setActiveTab] = useState<string>('brief');
  const [paper, setPaper] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPdfPanelOpen, setIsPdfPanelOpen] = useState<boolean>(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [activeSourceRef, setActiveSourceRef] = useState<any>(null);

  // Fetch benchmark demo paper
  const loadDemoPaper = async () => {
    setLoading(true);
    setViewState('dashboard');
    try {
      const res = await fetch('/api/papers/demo-attention-is-all-you-need');
      if (res.ok) {
        const data = await res.json();
        setPaper(data);
      } else {
        setPaper(getMockDemoData());
      }
    } catch (e) {
      setPaper(getMockDemoData());
    } finally {
      setLoading(false);
    }
  };

  const handlePaperProcessed = (processedPaper: any) => {
    setPaper(processedPaper);
    setViewState('dashboard');
  };

  const handleSelectSource = async (refId: string) => {
    setIsPdfPanelOpen(true);
    if (!paper) return;

    try {
      const res = await fetch(`/api/papers/${paper.paper_id}/source/${refId}`);
      if (res.ok) {
        const sourceData = await res.json();
        setActiveSourceRef(sourceData);
      } else {
        setActiveSourceRef({ ref_id: refId, page: 1, target_type: 'paragraph', bbox: { x: 57, y: 280, width: 498, height: 85 } });
      }
    } catch (e) {
      setActiveSourceRef({ ref_id: refId, page: 1, target_type: 'paragraph', bbox: { x: 57, y: 280, width: 498, height: 85 } });
    }
  };

  // 1. Landing View State
  if (viewState === 'landing') {
    return (
      <LandingPage
        onStartUpload={() => setViewState('upload')}
        onLaunchDemo={loadDemoPaper}
      />
    );
  }

  // 2. Upload Screen View State
  if (viewState === 'upload') {
    return (
      <UploadScreen
        onBack={() => setViewState('landing')}
        onPaperProcessed={handlePaperProcessed}
      />
    );
  }

  // 3. Main Analysis Dashboard View State
  const paperTitle = paper?.metadata?.title || paper?.filename || 'Attention Is All You Need';

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)', overflow: 'hidden' }}>
      {/* Clean Minimalist Header */}
      <header style={{
        height: '56px',
        borderBottom: '1px solid var(--border-color)',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(12px)',
        zIndex: 50,
        flexShrink: 0
      }}>
        {/* Brand & Home Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => setViewState('landing')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              fontWeight: 600
            }}
          >
            <Home size={16} />
            <span>Home</span>
          </button>

          <div style={{ height: '18px', width: '1px', background: 'var(--border-color)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', padding: '5px', borderRadius: '6px', color: '#fff', display: 'flex' }}>
              <Sparkles size={16} />
            </div>
            <span style={{ fontSize: '1.1rem', fontWeight: 800 }} className="gradient-text">
              PaperPilot
            </span>
          </div>
        </div>

        {/* Paper Title & Main Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            fontSize: '0.82rem',
            fontWeight: 600,
            color: '#f8fafc',
            background: 'rgba(30, 41, 59, 0.6)',
            padding: '4px 12px',
            borderRadius: '6px',
            border: '1px solid var(--border-color)',
            maxWidth: '300px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {paperTitle}
          </div>

          <button
            onClick={() => setViewState('upload')}
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #2563eb)',
              color: '#fff',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 10px rgba(6, 182, 212, 0.3)'
            }}
          >
            <Upload size={14} />
            <span>Upload Paper</span>
          </button>

          <button
            onClick={() => setIsPdfPanelOpen(!isPdfPanelOpen)}
            style={{
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid var(--border-color)',
              color: '#d1d5db',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {isPdfPanelOpen ? <PanelRightClose size={16} /> : <PanelRightOpen size={16} />}
            <span>{isPdfPanelOpen ? 'Hide Reader' : 'Show Reader'}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout (Sidebar + Mode Canvas + Split PDF Reader) */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Modern Left Sidebar Navigation */}
        <SidebarNav
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Middle Mode Canvas Container */}
        <div style={{ flex: 1, minWidth: 0, overflowY: 'auto', padding: '24px 28px' }}>
          {activeTab === 'brief' && <ExecutiveBriefView data={paper?.executive_brief} onSelectSource={handleSelectSource} />}
          {activeTab === 'claims' && <ClaimsExplorerView claims={paper?.claims} onSelectSource={handleSelectSource} />}
          {activeTab === 'limitations' && <LimitationsView data={paper?.limitations} onSelectSource={handleSelectSource} />}
          {activeTab === 'figures' && <FiguresTablesView data={{ figures: paper?.figures, tables: paper?.tables }} onSelectSource={handleSelectSource} />}
          {activeTab === 'equations' && <EquationTranslatorView equations={paper?.equations} onSelectSource={handleSelectSource} />}
          {activeTab === 'concept-map' && <ConceptMapView data={paper?.concept_map} onSelectSource={handleSelectSource} />}
          {activeTab === 'comparison' && <PaperComparisonView papers={[paper]} />}
        </div>

        {/* Right Collapsible PDF Viewer Split Panel */}
        {isPdfPanelOpen && (
          <div style={{ width: '460px', flexShrink: 0, padding: '16px 16px 16px 0' }}>
            <PdfViewerPanel
              paper={paper}
              paperTitle={paperTitle}
              totalPages={paper?.total_pages || 11}
              activeSourceRef={activeSourceRef}
              onClose={() => setIsPdfPanelOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function getMockDemoData() {
  return {
    paper_id: 'demo-attention-is-all-you-need',
    filename: 'Attention_Is_All_You_Need.pdf',
    metadata: { title: 'Attention Is All You Need', authors: ['A. Vaswani et al.'] },
    total_pages: 11,
    sections: [
      {
        title: '1. Introduction & Abstract',
        paragraphs: [
          {
            para_id: 'para_1',
            page: 1,
            text: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose the Transformer, a model architecture eschewing recurrence and relying entirely on an attention mechanism to draw global dependencies between input and output.'
          },
          {
            para_id: 'para_2',
            page: 1,
            text: 'The Transformer allows for significantly more parallelization and can reach a new state of the art in translation quality after being trained for as little as twelve hours on eight P100 GPUs.'
          }
        ]
      },
      {
        title: '2. Background & Related Work',
        paragraphs: [
          {
            para_id: 'para_3',
            page: 2,
            text: 'The goal of reducing sequential computation also forms the foundation of the Extended Neural GPU, ByteNet and ConvS2S, all of which use convolutional neural networks as basic building blocks. In these models, the number of operations required to relate signals from two arbitrary input or output positions grows in the distance between positions.'
          },
          {
            para_id: 'para_4',
            page: 2,
            text: 'Self-attention, sometimes called intra-attention, is an attention mechanism relating different positions of a single sequence in order to compute a representation of the sequence. Self-attention has been used successfully in a variety of tasks including reading comprehension and abstractive summarization.'
          }
        ]
      },
      {
        title: '3. Model Architecture & Attention Mechanism',
        paragraphs: [
          {
            para_id: 'para_5',
            page: 3,
            text: 'Most competitive neural sequence transduction models have an encoder-decoder structure. Here, the encoder maps an input sequence of symbol representations (x1, ..., xn) to a sequence of continuous representations z = (z1, ..., zn). Given z, the decoder then generates an output sequence (y1, ..., ym) of symbols one element at a time.'
          },
          {
            para_id: 'para_6',
            page: 3,
            text: 'An attention function can be described as mapping a query and a set of key-value pairs to an output, where the query, keys, values, and output are all vectors. The output is computed as a weighted sum of the values, where the weight assigned to each value is computed by a compatibility function of the query with the corresponding key.'
          }
        ]
      },
      {
        title: '4. Positional Encodings & Sublayers',
        paragraphs: [
          {
            para_id: 'para_7',
            page: 4,
            text: 'Since our model contains no recurrence and no convolution, in order for the model to make use of the order of the sequence, we must inject some information about the relative or absolute position of the tokens in the sequence.'
          },
          {
            para_id: 'para_8',
            page: 4,
            text: 'To this end, we add "positional encodings" to the input embeddings at the bottoms of the encoder and decoder stacks. The positional encodings have the same dimension d_model as the embeddings, so that the two can be summed.'
          }
        ]
      },
      {
        title: '5. Why Self-Attention & Path Length Complexity',
        paragraphs: [
          {
            para_id: 'para_9',
            page: 5,
            text: 'In this section we compare various aspects of self-attention layers to the recurrent and convolutional layers commonly used for mapping one variable-length sequence of symbol representations (x1, ..., xn) to another sequence of equal length (z1, ..., zn).'
          },
          {
            para_id: 'para_10',
            page: 5,
            text: 'One main factor is the total computational complexity per layer. Another is the amount of computation that can be parallelized, as measured by the minimum number of sequential operations required.'
          }
        ]
      },
      {
        title: '6. Training Setup & Hyperparameters',
        paragraphs: [
          {
            para_id: 'para_11',
            page: 6,
            text: 'We trained on the standard WMT 2014 English-German dataset consisting of about 4.5 million sentence pairs. Sentences were encoded using byte-pair encoding, which has a shared source-target vocabulary of about 37000 tokens.'
          },
          {
            para_id: 'para_12',
            page: 6,
            text: 'We trained our models on one machine with 8 NVIDIA P100 GPUs. For our base models using the hyperparameters described throughout the paper, each training step took about 0.4 seconds. We trained the base models for a total of 100,000 steps or 12 hours.'
          }
        ]
      },
      {
        title: '7. Results — Machine Translation',
        paragraphs: [
          {
            para_id: 'para_13',
            page: 7,
            text: 'On the WMT 2014 English-to-German translation task, the big transformer model (Transformer (big) in Table 2) outperforms the best previously reported models (including ensembles) by more than 2.0 BLEU, establishing a new state-of-the-art BLEU score of 28.4.'
          },
          {
            para_id: 'para_14',
            page: 7,
            text: 'On the WMT 2014 English-to-French translation task, our big model achieves a BLEU score of 41.8, outperforming all of the previously published single models, at less than 1/4 the training cost of the previous state-of-the-art model.'
          }
        ]
      },
      {
        title: '8. Model Variations & Ablation Studies',
        paragraphs: [
          {
            para_id: 'para_15',
            page: 8,
            text: 'To evaluate the importance of different components of the Transformer, we varied our base model in different ways, measuring the change in performance on English-to-German translation on the development set, newstest2013.'
          },
          {
            para_id: 'para_16',
            page: 8,
            text: 'We observe that while single-head attention is 0.9 BLEU worse than the best setting, quality also drops off with too many heads. Key dimension d_k is also critical for matching inner vector dimension scaling.'
          }
        ]
      },
      {
        title: '9. English Constituency Parsing',
        paragraphs: [
          {
            para_id: 'para_17',
            page: 9,
            text: 'To evaluate if the Transformer can generalize to other tasks we performed experiments on English constituency parsing. This task presents specific challenges: the output is subject to strong structural constraints and is significantly longer than the input.'
          },
          {
            para_id: 'para_18',
            page: 9,
            text: 'Our 4-layer Transformer with d_model = 1024 achieved an F1 score of 91.3 when trained on the WSJ portion of the Penn Treebank, outperforming all previously reported sequence-to-sequence models.'
          }
        ]
      },
      {
        title: '10. Conclusion & Future Work',
        paragraphs: [
          {
            para_id: 'para_19',
            page: 10,
            text: 'In this work, we presented the Transformer, the first sequence transduction model based entirely on attention, replacing the recurrent layers most commonly used in encoder-decoder architectures with multi-headed self-attention.'
          },
          {
            para_id: 'para_20',
            page: 10,
            text: 'We are excited about the future of attention-based models and plan to apply them to other tasks, including image, audio, and video processing.'
          }
        ]
      },
      {
        title: '11. References & Citations',
        paragraphs: [
          {
            para_id: 'para_21',
            page: 11,
            text: '[1] Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, and Illia Polosukhin. 2017. Attention is all you need. In NIPS.'
          },
          {
            para_id: 'para_22',
            page: 11,
            text: '[2] Dzmitry Bahdanau, Kyunghyun Cho, and Yoshua Bengio. 2014. Neural machine translation by jointly learning to align and translate. In ICLR.'
          }
        ]
      }
    ],
    executive_brief: {
      problem_statement: 'Recurrent neural networks (RNNs) process sequences sequentially, creating a severe computational bottleneck.',
      why_it_matters: 'Sequential computing prevents hardware parallelization across GPUs and degrades on long sequences.',
      proposed_solution: 'Replaces recurrence entirely with Multi-Head Self-Attention, allowing tokens to be computed in parallel.',
      main_contributions: [
        'First sequence transduction model relying entirely on self-attention.',
        'Achieved state-of-the-art BLEU score of 28.4 on WMT 2014 En-De.',
        'Drastically reduced training time to 12 hours on 8 GPUs.'
      ],
      practical_takeaway: 'Laid the architectural foundation for all modern Large Language Models.',
      source_refs: ['para_1', 'para_2']
    },
    claims: [
      {
        claim_text: 'The Transformer achieves superior translation quality while requiring significantly less time to train.',
        evidence: 'Reached 28.4 BLEU on WMT 2014 En-De after 12 hours of training on 8 P100 GPUs.',
        source_refs: ['para_2'],
        section_name: 'Results'
      }
    ],
    limitations: {
      author_stated: [
        { text: 'Memory complexity of self-attention scales quadratically O(n^2) with sequence length.', type: 'stated', confidence_score: 1.0, source_refs: ['para_3'] }
      ],
      ai_inferred: [
        { text: 'Requires explicit positional encodings since attention inherently possesses no word order awareness.', type: 'inferred', confidence_score: 0.92, source_refs: ['para_1'] }
      ]
    },
    figures: [{ figure_id: 'fig_1', caption: 'Figure 1: The Transformer model architecture.', page: 3, explanation: 'Shows encoder and decoder self-attention stacks.' }],
    tables: [{ table_id: 'tab_1', caption: 'Table 1: Sequential operations complexity.', page: 5, explanation: 'Compares Self-Attention O(1) vs Recurrent O(n) sequential steps.' }],
    equations: [{ eq_id: 'eq_1', latex: 'Attention(Q, K, V) = softmax( (Q K^T) / sqrt(d_k) ) V', page: 4, explanation: 'Scaled Dot-Product Attention equation.' }],
    concept_map: {
      nodes: [
        { node_id: 'c_1', label: 'Transformer', category: 'Model', description: 'Attention-only architecture.', source_refs: ['para_1'] },
        { node_id: 'c_2', label: 'Self-Attention', category: 'Method', description: 'Computes token similarity matrix.', source_refs: ['para_3'] }
      ],
      edges: [{ edge_id: 'e_1', source: 'c_1', target: 'c_2', relationship: 'replaces RNN with' }]
    }
  };
}
