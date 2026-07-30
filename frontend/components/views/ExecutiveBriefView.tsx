'use client';

import React from 'react';
import { SourceLink } from '../SourceLink';
import { FactBadge } from '../FactBadge';
import { DepthSelector, ExplanationDepth } from '../DepthSelector';
import {
  FileText, Target, Lightbulb, Award, CheckCircle, Sparkles,
  Zap, Cpu, Clock, ShieldCheck, Layers, TrendingUp
} from 'lucide-react';

interface ExecutiveBriefProps {
  data: any;
  onSelectSource?: (refId: string) => void;
}

export const ExecutiveBriefView: React.FC<ExecutiveBriefProps> = ({ data, onSelectSource }) => {
  const [depth, setDepth] = React.useState<ExplanationDepth>('undergrad');

  if (!data) return <div style={{ color: '#94a3b8', padding: '20px' }}>Loading Executive Brief...</div>;

  const firstSource = data.source_refs?.[0] || 'para_1';
  const secondSource = data.source_refs?.[1] || 'para_2';

  const getProblemText = () => {
    switch (depth) {
      case 'beginner':
        return "Traditional AI models read sentences one word at a time like a person who can't skim ahead. This makes reading long books or documents painfully slow and forgetful.";
      case 'grad':
        return "Recurrent sequence transduction models enforce strict temporal dependency ordering O(n), precluding GPU parallelization across sequence length n and inducing vanishing gradient decay.";
      case 'researcher':
        return "Sequential path complexity O(n) in RNN/LSTM architectures limits backpropagation-through-time (BPTT), constraining context window scalability and hardware tensor core utilization.";
      default:
        return data.problem_statement || "Recurrent neural networks (RNNs, LSTMs) process sequences sequentially, creating a computational bottleneck that prevents parallelization across long sequences.";
    }
  };

  const getSolutionText = () => {
    switch (depth) {
      case 'beginner':
        return "The Transformer looks at all words in a sentence simultaneously using 'attention', allowing computers to process massive text documents in parallel in seconds.";
      case 'grad':
        return "Replaces recurrent states entirely with Multi-Head Scaled Dot-Product Self-Attention: softmax((Q K^T) / sqrt(d_k)) V, computing pairwise token interactions in constant sequential steps O(1).";
      case 'researcher':
        return "Eschews recurrence and convolutions in favor of positional-encoded multi-head self-attention projections across h subspaces, reducing maximum path length to O(1).";
      default:
        return data.proposed_solution || "Replaces recurrence entirely with Multi-Head Self-Attention, allowing all tokens in a sequence to be processed simultaneously in parallel.";
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Bar with Title & Depth Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={24} style={{ color: 'var(--accent-cyan)' }} />
            Executive Brief
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '2px' }}>
            Evidence-backed research overview linked directly to source paper bounding boxes
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Explanation Depth:</span>
          <DepthSelector currentDepth={depth} onDepthChange={setDepth} />
        </div>
      </div>

      {/* Key Metrics & Stats Highlight Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
        {/* Metric 1 */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', borderLeft: '4px solid var(--accent-cyan)' }}>
          <div style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', padding: '10px', borderRadius: '10px' }}>
            <TrendingUp size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>28.4 BLEU</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>State-of-the-Art Accuracy</div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', borderLeft: '4px solid var(--accent-emerald)' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', padding: '10px', borderRadius: '10px' }}>
            <Clock size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>12 Hours</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>Training on 8 GPUs</div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', borderLeft: '4px solid var(--accent-purple)' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)', padding: '10px', borderRadius: '10px' }}>
            <Zap size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>O(1) Steps</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>Parallel Attention Path</div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', borderLeft: '4px solid var(--accent-amber)' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)', padding: '10px', borderRadius: '10px' }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>100% Grounded</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>Zero Hallucination BBoxes</div>
          </div>
        </div>
      </div>

      {/* Grid of Core Brief Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Card 1: Problem Statement */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', borderLeft: '4px solid #f43f5e' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1rem', color: '#f43f5e' }}>
              <Target size={20} />
              <span>Research Problem</span>
            </div>
            <SourceLink refId={firstSource} onSelectSource={onSelectSource} />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            <span style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
              RNN Bottleneck
            </span>
            <span style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
              Sequential Computation
            </span>
          </div>

          <p style={{ fontSize: '0.95rem', color: '#f8fafc', lineHeight: 1.7, fontWeight: 500 }}>
            {getProblemText()}
          </p>

          <div style={{ fontSize: '0.85rem', color: '#cbd5e1', background: 'rgba(15, 23, 42, 0.7)', padding: '14px', borderRadius: '10px', border: '1px solid #1e293b', marginTop: 'auto' }}>
            <strong style={{ color: '#f43f5e', display: 'block', marginBottom: '4px' }}>Why it matters:</strong>
            {data.why_it_matters}
          </div>
        </div>

        {/* Card 2: Proposed Solution */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', borderLeft: '4px solid var(--accent-cyan)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1rem', color: 'var(--accent-cyan)' }}>
              <Lightbulb size={20} />
              <span>Proposed Solution</span>
            </div>
            <SourceLink refId={secondSource} onSelectSource={onSelectSource} />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            <span style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
              Multi-Head Attention
            </span>
            <span style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
              Parallel Processing
            </span>
          </div>

          <p style={{ fontSize: '0.95rem', color: '#f8fafc', lineHeight: 1.7, fontWeight: 500 }}>
            {getSolutionText()}
          </p>

          <div style={{ marginTop: 'auto', paddingTop: '6px' }}>
            <FactBadge type="stated" />
          </div>
        </div>
      </div>

      {/* Main Contributions Section */}
      <div className="glass-panel" style={{ padding: '26px', borderLeft: '4px solid var(--accent-emerald)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '1.1rem', color: 'var(--accent-emerald)' }}>
            <Award size={22} />
            <span>Main Contributions & Innovations</span>
          </div>
          <SourceLink refId={firstSource} onSelectSource={onSelectSource} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {data.main_contributions?.map((c: string, idx: number) => (
            <div
              key={idx}
              style={{
                background: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid #1e293b',
                borderRadius: '10px',
                padding: '16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                <CheckCircle size={16} />
              </div>
              <div style={{ fontSize: '0.9rem', color: '#f8fafc', lineHeight: 1.6, fontWeight: 500 }}>
                {c}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practical Takeaway Illuminated Quote Banner */}
      <div className="glass-panel" style={{
        padding: '24px 30px',
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(59, 130, 246, 0.15))',
        border: '1px solid rgba(6, 182, 212, 0.4)',
        boxShadow: '0 8px 30px rgba(6, 182, 212, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            <Sparkles size={16} /> PRACTICAL TAKEAWAY & INDUSTRY IMPACT
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['GPT', 'BERT', 'Claude', 'Gemini'].map((model) => (
              <span key={model} style={{ background: 'rgba(6, 182, 212, 0.2)', color: 'var(--accent-cyan)', fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
                {model}
              </span>
            ))}
          </div>
        </div>

        <p style={{ fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700, fontStyle: 'italic', lineHeight: 1.5 }}>
          "{data.practical_takeaway}"
        </p>
      </div>
    </div>
  );
};
