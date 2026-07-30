'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText, Upload, ShieldCheck, AlertTriangle, Image as ImageIcon,
  Sigma, Network, GraduationCap, Presentation, UserCheck, Columns,
  PanelRightOpen, PanelRightClose, Sparkles, Home, ArrowLeft
} from 'lucide-react';

import { LandingPage } from '../components/LandingPage';
import { UploadScreen } from '../components/UploadScreen';
import { PdfViewerPanel } from '../components/PdfViewerPanel';
import { ExecutiveBriefView } from '../components/views/ExecutiveBriefView';
import { ClaimsExplorerView } from '../components/views/ClaimsExplorerView';
import { LimitationsView } from '../components/views/LimitationsView';
import { FiguresTablesView } from '../components/views/FiguresTablesView';
import { EquationTranslatorView } from '../components/views/EquationTranslatorView';
import { ConceptMapView } from '../components/views/ConceptMapView';
import { StudyModeView } from '../components/views/StudyModeView';
import { PresentationBriefView } from '../components/views/PresentationBriefView';
import { MentorModeView } from '../components/views/MentorModeView';
import { PaperComparisonView } from '../components/views/PaperComparisonView';

export default function PaperPilotApp() {
  const [viewState, setViewState] = useState<'landing' | 'upload' | 'dashboard'>('landing');
  const [activeTab, setActiveTab] = useState<string>('brief');
  const [paper, setPaper] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPdfPanelOpen, setIsPdfPanelOpen] = useState<boolean>(true);
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      {/* Dashboard Top Header */}
      <header style={{
        height: '60px',
        borderBottom: '1px solid var(--border-color)',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        {/* Brand & Landing Back */}
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

          <div style={{ height: '20px', width: '1px', background: 'var(--border-color)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} style={{ color: 'var(--accent-cyan)' }} />
            <span style={{ fontSize: '1.1rem', fontWeight: 800 }} className="gradient-text">
              PaperPilot
            </span>
          </div>
        </div>

        {/* Paper Title Badge & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            fontSize: '0.82rem',
            fontWeight: 600,
            color: '#f8fafc',
            background: 'rgba(30, 41, 59, 0.6)',
            padding: '4px 12px',
            borderRadius: '6px',
            border: '1px solid var(--border-color)',
            maxWidth: '320px',
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
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 10px rgba(6, 182, 212, 0.3)'
            }}
          >
            <Upload size={14} />
            <span>Upload New PDF</span>
          </button>

          <button
            onClick={() => setIsPdfPanelOpen(!isPdfPanelOpen)}
            style={{
              background: 'var(--bg-card)',
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
            <span>{isPdfPanelOpen ? 'Hide PDF' : 'Show PDF'}</span>
          </button>
        </div>
      </header>

      {/* Feature Modes Navigation Bar */}
      <nav style={{
        background: 'rgba(15, 23, 42, 0.95)',
        borderBottom: '1px solid var(--border-color)',
        padding: '8px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        overflowX: 'auto'
      }}>
        {[
          { id: 'brief', label: 'Executive Brief', icon: FileText },
          { id: 'claims', label: 'Claims Explorer', icon: ShieldCheck },
          { id: 'limitations', label: 'Limitations', icon: AlertTriangle },
          { id: 'figures', label: 'Figures & Tables', icon: ImageIcon },
          { id: 'equations', label: 'Equations', icon: Sigma },
          { id: 'concept-map', label: 'Concept Map', icon: Network },
          { id: 'study', label: 'Study Mode', icon: GraduationCap },
          { id: 'presentation', label: 'Presentation', icon: Presentation },
          { id: 'mentor', label: 'Mentor Mode', icon: UserCheck },
          { id: 'comparison', label: 'Comparison', icon: Columns }
        ].map((mode) => {
          const Icon = mode.icon;
          const isActive = activeTab === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setActiveTab(mode.id)}
              style={{
                background: isActive ? 'var(--accent-cyan)' : 'transparent',
                color: isActive ? '#000' : '#94a3b8',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={14} />
              <span>{mode.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Main Workspace Split View */}
      <main style={{ flex: 1, display: 'flex', padding: '20px', gap: '20px', overflow: 'hidden' }}>
        {/* Left Feature View */}
        <div style={{ flex: 1, minWidth: 0, overflowY: 'auto', paddingRight: '4px' }}>
          {activeTab === 'brief' && <ExecutiveBriefView data={paper?.executive_brief} onSelectSource={handleSelectSource} />}
          {activeTab === 'claims' && <ClaimsExplorerView claims={paper?.claims} onSelectSource={handleSelectSource} />}
          {activeTab === 'limitations' && <LimitationsView data={paper?.limitations} onSelectSource={handleSelectSource} />}
          {activeTab === 'figures' && <FiguresTablesView data={{ figures: paper?.figures, tables: paper?.tables }} onSelectSource={handleSelectSource} />}
          {activeTab === 'equations' && <EquationTranslatorView equations={paper?.equations} onSelectSource={handleSelectSource} />}
          {activeTab === 'concept-map' && <ConceptMapView data={paper?.concept_map} onSelectSource={handleSelectSource} />}
          {activeTab === 'study' && <StudyModeView data={paper?.study_mode} onSelectSource={handleSelectSource} />}
          {activeTab === 'presentation' && <PresentationBriefView data={paper?.presentation_brief} />}
          {activeTab === 'mentor' && <MentorModeView prompts={paper?.mentor_prompts} onSelectSource={handleSelectSource} />}
          {activeTab === 'comparison' && <PaperComparisonView papers={[paper]} />}
        </div>

        {/* Right Collapsible PDF Viewer Split Panel */}
        {isPdfPanelOpen && (
          <div style={{ width: '460px', flexShrink: 0 }}>
            <PdfViewerPanel
              paperTitle={paperTitle}
              totalPages={paper?.total_pages || 11}
              activeSourceRef={activeSourceRef}
              onClose={() => setIsPdfPanelOpen(false)}
            />
          </div>
        )}
      </main>
    </div>
  );
}

function getMockDemoData() {
  return {
    paper_id: 'demo-attention-is-all-you-need',
    filename: 'Attention_Is_All_You_Need.pdf',
    metadata: { title: 'Attention Is All You Need', authors: ['A. Vaswani et al.'] },
    total_pages: 11,
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
    tables: [{ table_id: 'tab_1', caption: 'Table 1: Sequential operations complexity.', page: 6, explanation: 'Compares Self-Attention O(1) vs Recurrent O(n) sequential steps.' }],
    equations: [{ eq_id: 'eq_1', latex: 'Attention(Q, K, V) = softmax( (Q K^T) / sqrt(d_k) ) V', page: 4, explanation: 'Scaled Dot-Product Attention equation.' }],
    concept_map: {
      nodes: [
        { node_id: 'c_1', label: 'Transformer', category: 'Model', description: 'Attention-only architecture.', source_refs: ['para_1'] },
        { node_id: 'c_2', label: 'Self-Attention', category: 'Method', description: 'Computes token similarity matrix.', source_refs: ['para_3'] }
      ],
      edges: [{ edge_id: 'e_1', source: 'c_1', target: 'c_2', relationship: 'replaces RNN with' }]
    },
    study_mode: {
      flashcards: [{ question: 'What is the sequential operation complexity of Self-Attention vs Recurrent layers?', answer: 'Self-attention is O(1) sequential steps vs O(n) for Recurrent.', explanation: 'Self-attention connects all token pairs in parallel.', source_refs: ['para_3'] }],
      mcq_quizzes: [{ question: 'What BLEU score did the Transformer achieve on WMT 2014 En-De?', options: ['24.1', '28.4', '31.0'], answer: '28.4', explanation: 'Outperformed previous state of the art.', source_refs: ['para_2'] }],
      key_terms: { 'Self-Attention': 'Relating different positions of a single sequence to compute a representation.' }
    },
    mentor_prompts: [{ prompt_id: 'm_1', category: 'questions_to_ask', title: 'Linear Attention Extensions', description: 'How could linear attention reduce quadratic O(n^2) scaling?', source_refs: ['para_3'] }],
    presentation_brief: {
      title: 'Presentation Brief: Attention Is All You Need',
      slide_outlines: [{ slide: 1, title: 'The Bottleneck of RNNs', points: ['Sequential training prevents parallel processing', 'Vanishing gradients'] }]
    }
  };
}
