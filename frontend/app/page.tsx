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
import { MentorModeView } from '../components/views/MentorModeView';
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
          {activeTab === 'mentor' && <MentorModeView prompts={paper?.mentor_prompts} onSelectSource={handleSelectSource} />}
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
    mentor_prompts: [{ prompt_id: 'm_1', category: 'questions_to_ask', title: 'Linear Attention Extensions', description: 'How could linear attention reduce quadratic O(n^2) scaling?', source_refs: ['para_3'] }]
  };
}
