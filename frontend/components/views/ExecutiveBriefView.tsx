'use client';

import React from 'react';
import { SourceLink } from '../SourceLink';
import { FactBadge } from '../FactBadge';
import { DepthSelector, ExplanationDepth } from '../DepthSelector';
import { FileText, Target, Lightbulb, Award, CheckCircle, Sparkles } from 'lucide-react';

interface ExecutiveBriefProps {
  data: any;
  onSelectSource?: (refId: string) => void;
}

export const ExecutiveBriefView: React.FC<ExecutiveBriefProps> = ({ data, onSelectSource }) => {
  const [depth, setDepth] = React.useState<ExplanationDepth>('undergrad');

  if (!data) return <div style={{ color: '#94a3b8', padding: '20px' }}>Loading Executive Brief...</div>;

  const firstSource = data.source_refs?.[0] || 'para_1';
  const secondSource = data.source_refs?.[1] || 'para_2';

  // Dynamic explanation text per depth level
  const getProblemText = () => {
    switch (depth) {
      case 'beginner':
        return "Traditional AI models read sentences one word at a time, like a person who can't skim ahead. This makes reading long books or documents painfully slow and forgetful.";
      case 'grad':
        return "Recurrent sequence transduction models ($h_t = f(h_{t-1}, x_t)$) enforce strict temporal dependency ordering $O(n)$, precluding GPU parallelization across sequence length $n$ and inducing vanishing gradient decay.";
      case 'researcher':
        return "Sequential path complexity $O(n)$ in RNN/LSTM architectures limits backpropagation-through-time (BPTT), constraining context window scalability and hardware tensor core utilization.";
      default:
        return data.problem_statement || "Recurrent neural networks (RNNs, LSTMs) process sequences sequentially, creating a computational bottleneck that prevents parallelization across long sequences.";
    }
  };

  const getSolutionText = () => {
    switch (depth) {
      case 'beginner':
        return "The Transformer looks at all words in a sentence simultaneously using 'attention', allowing computers to process massive text documents in parallel in seconds.";
      case 'grad':
        return "Replaces recurrent states entirely with Multi-Head Scaled Dot-Product Self-Attention: $\\text{softmax}((Q K^T) / \\sqrt{d_k}) V$, computing pairwise token interactions in constant sequential steps $O(1)$.";
      case 'researcher':
        return "Eschews recurrence and convolutions in favor of positional-encoded multi-head self-attention projections across $h$ subspaces, reducing maximum path length to $O(1)$.";
      default:
        return data.proposed_solution || "Replaces recurrence entirely with Multi-Head Self-Attention, allowing all tokens in a sequence to be processed simultaneously in parallel.";
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Header Bar with Title & Depth Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={22} style={{ color: 'var(--accent-cyan)' }} />
            Executive Brief
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '2px' }}>
            Evidence-backed research overview linked directly to source paper bounding boxes
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>Explanation Depth:</span>
          <DepthSelector currentDepth={depth} onDepthChange={setDepth} />
        </div>
      </div>

      {/* Grid of Brief Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Card 1: Problem Statement */}
        <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px', borderLeft: '4px solid #f43f5e' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.95rem', color: '#f43f5e' }}>
              <Target size={18} />
              <span>Research Problem</span>
            </div>
            <SourceLink refId={firstSource} onSelectSource={onSelectSource} />
          </div>

          <p style={{ fontSize: '0.92rem', color: '#f1f5f9', lineHeight: 1.65, fontWeight: 500 }}>
            {getProblemText()}
          </p>

          <div style={{ fontSize: '0.82rem', color: '#cbd5e1', background: 'rgba(15, 23, 42, 0.6)', padding: '10px 14px', borderRadius: '8px', border: '1px solid #1e293b', marginTop: 'auto' }}>
            <strong style={{ color: '#f43f5e' }}>Why it matters:</strong> {data.why_it_matters}
          </div>
        </div>

        {/* Card 2: Proposed Solution */}
        <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px', borderLeft: '4px solid var(--accent-cyan)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.95rem', color: 'var(--accent-cyan)' }}>
              <Lightbulb size={18} />
              <span>Proposed Solution</span>
            </div>
            <SourceLink refId={secondSource} onSelectSource={onSelectSource} />
          </div>

          <p style={{ fontSize: '0.92rem', color: '#f1f5f9', lineHeight: 1.65, fontWeight: 500 }}>
            {getSolutionText()}
          </p>

          <div style={{ marginTop: 'auto', paddingTop: '4px' }}>
            <FactBadge type="stated" />
          </div>
        </div>
      </div>

      {/* Main Contributions Card */}
      <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--accent-emerald)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '1.05rem', color: 'var(--accent-emerald)' }}>
            <Award size={20} />
            <span>Main Contributions & Innovations</span>
          </div>
          <SourceLink refId={firstSource} onSelectSource={onSelectSource} />
        </div>

        <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
          {data.main_contributions?.map((c: string, idx: number) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#f1f5f9', background: 'rgba(15, 23, 42, 0.5)', padding: '12px 16px', borderRadius: '8px', border: '1px solid #1e293b' }}>
              <CheckCircle size={18} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ lineHeight: 1.5 }}>{c}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Practical Takeaway Quote Card */}
      <div className="glass-panel" style={{
        padding: '22px 28px',
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12), rgba(59, 130, 246, 0.12))',
        border: '1px solid rgba(6, 182, 212, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          <Sparkles size={14} /> PRACTICAL TAKEAWAY
        </div>
        <p style={{ fontSize: '1.05rem', color: '#f8fafc', fontWeight: 600, fontStyle: 'italic', lineHeight: 1.5 }}>
          "{data.practical_takeaway}"
        </p>
      </div>
    </div>
  );
};
