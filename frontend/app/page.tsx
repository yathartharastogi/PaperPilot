'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText, Upload, ShieldCheck, AlertTriangle, Image as ImageIcon,
  Sigma, Network, GraduationCap, Presentation, UserCheck, Columns,
  PanelRightOpen, PanelRightClose, Sparkles, BookOpen, Layers
} from 'lucide-react';

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

export default function PaperPilotDashboard() {
  const [activeTab, setActiveTab] = useState<string>('brief');
  const [paper, setPaper] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [isPdfPanelOpen, setIsPdfPanelOpen] = useState<boolean>(true);
  const [activeSourceRef, setActiveSourceRef] = useState<any>(null);

  // Fetch pre-seeded demo paper on initial load
  useEffect(() => {
    fetchPaper('demo-attention-is-all-you-need');
  }, []);

  const fetchPaper = async (paperId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/papers/${paperId}`);
      if (res.ok) {
        const data = await res.json();
        setPaper(data);
      } else {
        // Fallback offline mock data if backend not connected
        setPaper(getMockDemoData());
      }
    } catch (e) {
      setPaper(getMockDemoData());
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/papers/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const newPaper = await res.json();
        setPaper(newPaper);
      } else {
        alert('Upload failed or backend service offline. Displaying fallback parse.');
      }
    } catch (e) {
      alert('Backend connection error. Running in mock offline mode.');
    } finally {
      setUploading(false);
    }
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
        setActiveSourceRef({ ref_id: refId, page: 1, target_type: 'paragraph' });
      }
    } catch (e) {
      setActiveSourceRef({ ref_id: refId, page: 1, target_type: 'paragraph' });
    }
  };

  if (loading && !paper) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)' }}>
        Loading PaperPilot Dashboard...
      </div>
    );
  }

  const paperTitle = paper?.metadata?.title || paper?.filename || 'Attention Is All You Need';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      {/* Navbar Header */}
      <header style={{
        height: '60px',
        borderBottom: '1px solid var(--border-color)',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(17, 24, 39, 0.8)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
            padding: '6px',
            borderRadius: '8px',
            color: '#fff',
            display: 'flex'
          }}>
            <Sparkles size={20} />
          </div>
          <span style={{ fontSize: '1.15rem', fontWeight: 800, background: 'linear-gradient(to right, #22d3ee, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            PaperPilot
          </span>
          <span style={{ fontSize: '0.7rem', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', padding: '2px 8px', borderRadius: '12px', border: '1px solid var(--accent-cyan)' }}>
            Grounded AI Briefing
          </span>
        </div>

        {/* Action Controls: PDF Upload + Toggle PDF Split Panel */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{
            background: 'linear-gradient(135deg, #06b6d4, #2563eb)',
            color: '#fff',
            padding: '6px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.82rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 10px rgba(6, 182, 212, 0.3)'
          }}>
            <Upload size={14} />
            <span>{uploading ? 'Processing PDF...' : 'Upload Research PDF'}</span>
            <input type="file" accept=".pdf" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>

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
            <span>{isPdfPanelOpen ? 'Hide PDF Viewer' : 'Show PDF Viewer'}</span>
          </button>
        </div>
      </header>

      {/* Feature Modes Navigation Bar */}
      <nav style={{
        background: 'rgba(15, 23, 42, 0.9)',
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
                color: isActive ? '#000' : '#9ca3af',
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
        {/* Left Feature Mode View Container */}
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

// Fallback mock data for 100% offline demonstration if API is offline
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
    figures: [
      { figure_id: 'fig_1', caption: 'Figure 1: The Transformer model architecture.', page: 3, explanation: 'Shows encoder and decoder self-attention stacks.' }
    ],
    tables: [
      { table_id: 'tab_1', caption: 'Table 1: Sequential operations complexity.', page: 6, explanation: 'Compares Self-Attention O(1) vs Recurrent O(n) sequential steps.' }
    ],
    equations: [
      { eq_id: 'eq_1', latex: 'Attention(Q, K, V) = softmax( (Q K^T) / sqrt(d_k) ) V', page: 4, explanation: 'Scaled Dot-Product Attention equation.' }
    ],
    concept_map: {
      nodes: [
        { node_id: 'c_1', label: 'Transformer', category: 'Model', description: 'Attention-only architecture.', source_refs: ['para_1'] },
        { node_id: 'c_2', label: 'Self-Attention', category: 'Method', description: 'Computes token similarity matrix.', source_refs: ['para_3'] }
      ],
      edges: [{ edge_id: 'e_1', source: 'c_1', target: 'c_2', relationship: 'replaces RNN with' }]
    },
    study_mode: {
      flashcards: [
        { question: 'What is the sequential operation complexity of Self-Attention vs Recurrent layers?', answer: 'Self-attention is O(1) sequential steps vs O(n) for Recurrent.', explanation: 'Self-attention connects all token pairs in parallel.', source_refs: ['para_3'] }
      ],
      mcq_quizzes: [
        { question: 'What BLEU score did the Transformer achieve on WMT 2014 En-De?', options: ['24.1', '28.4', '31.0'], answer: '28.4', explanation: 'Outperformed previous state of the art.', source_refs: ['para_2'] }
      ],
      key_terms: { 'Self-Attention': 'Relating different positions of a single sequence to compute a representation.' }
    },
    mentor_prompts: [
      { prompt_id: 'm_1', category: 'questions_to_ask', title: 'Linear Attention Extensions', description: 'How could linear attention reduce quadratic O(n^2) scaling?', source_refs: ['para_3'] }
    ],
    presentation_brief: {
      title: 'Presentation Brief: Attention Is All You Need',
      slide_outlines: [
        { slide: 1, title: 'The Bottleneck of RNNs', points: ['Sequential training prevents parallel processing', 'Vanishing gradients'] }
      ]
    }
  };
}
