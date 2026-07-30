'use client';

import React from 'react';
import { Columns, Plus, CheckCircle2, XCircle, TrendingUp, Zap, Clock } from 'lucide-react';

interface PaperComparisonProps {
  papers: any[];
}

export const PaperComparisonView: React.FC<PaperComparisonProps> = ({ papers = [] }) => {
  const currentPaper = papers[0] || {};

  const comparisonData = [
    {
      metric: 'Architecture Paradigm',
      current: 'Multi-Head Self-Attention',
      baseline1: 'Recurrent Neural Network (LSTM)',
      baseline2: 'Convolutional Sequence-to-Sequence'
    },
    {
      metric: 'BLEU Score (WMT 14 En-De)',
      current: '28.4 BLEU (State of the Art)',
      baseline1: '24.6 BLEU',
      baseline2: '25.2 BLEU'
    },
    {
      metric: 'Training Latency',
      current: '12 Hours (8 GPUs)',
      baseline1: '3.5 Days (8 GPUs)',
      baseline2: '2.0 Days (8 GPUs)'
    },
    {
      metric: 'Sequential Path Length',
      current: 'O(1) Constant Parallel Steps',
      baseline1: 'O(n) Sequential Steps',
      baseline2: 'O(log_k(n)) Steps'
    },
    {
      metric: 'Long-Range Dependency Retention',
      current: 'Direct pairwise attention',
      baseline1: 'Vanishing gradient decay',
      baseline2: 'Hierarchical receptive field'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Bar */}
      <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Columns size={24} style={{ color: 'var(--accent-cyan)' }} />
          Paper Comparison Mode
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '2px' }}>
          Side-by-side comparative matrix comparing research objectives, performance metrics, and sequence path length across papers
        </p>
      </div>

      {/* Comparative Cards Grid */}
      <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #1e293b', boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: 'rgba(30, 41, 59, 0.9)', borderBottom: '2px solid var(--accent-cyan)' }}>
              <th style={{ padding: '16px', textAlign: 'left', color: 'var(--accent-cyan)', fontWeight: 800, width: '25%' }}>
                DIMENSION / METRIC
              </th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#f8fafc', fontWeight: 800, width: '35%', background: 'rgba(6, 182, 212, 0.15)', borderLeft: '2px solid var(--accent-cyan)' }}>
                {currentPaper.metadata?.title || 'Attention Is All You Need'} (Selected)
              </th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#94a3b8', fontWeight: 700, width: '20%' }}>
                GNMT + LSTM Baseline
              </th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#94a3b8', fontWeight: 700, width: '20%' }}>
                ConvS2S Baseline
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #1e293b', background: idx % 2 === 0 ? 'rgba(15, 23, 42, 0.6)' : 'transparent' }}>
                <td style={{ padding: '16px', fontWeight: 700, color: '#f8fafc' }}>
                  {row.metric}
                </td>
                <td style={{ padding: '16px', color: '#22d3ee', fontWeight: 700, background: 'rgba(6, 182, 212, 0.08)', borderLeft: '2px solid var(--accent-cyan)' }}>
                  {row.current}
                </td>
                <td style={{ padding: '16px', color: '#cbd5e1' }}>
                  {row.baseline1}
                </td>
                <td style={{ padding: '16px', color: '#cbd5e1' }}>
                  {row.baseline2}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
