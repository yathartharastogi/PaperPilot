'use client';

import React from 'react';
import { SourceLink } from '../SourceLink';
import { FactBadge } from '../FactBadge';
import { DepthSelector, ExplanationDepth } from '../DepthSelector';
import { FileText, Target, Lightbulb, Award, TrendingUp, CheckCircle } from 'lucide-react';

interface ExecutiveBriefProps {
  data: any;
  onSelectSource?: (refId: string) => void;
}

export const ExecutiveBriefView: React.FC<ExecutiveBriefProps> = ({ data, onSelectSource }) => {
  const [depth, setDepth] = React.useState<ExplanationDepth>('undergrad');

  if (!data) return <div style={{ color: '#9ca3af', padding: '20px' }}>Loading Executive Brief...</div>;

  const firstSource = data.source_refs?.[0] || 'para_1';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} className="text-cyan-400" style={{ color: 'var(--accent-cyan)' }} />
            Executive Brief
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#9ca3af' }}>
            High-level research summary grounded in paper source text
          </p>
        </div>
        <DepthSelector currentDepth={depth} onDepthChange={setDepth} />
      </div>

      {/* Grid of Brief Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {/* Card 1: Problem Statement */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#f87171' }}>
              <Target size={16} />
              <span>Research Problem</span>
            </div>
            <SourceLink refId={firstSource} onSelectSource={onSelectSource} />
          </div>
          <p style={{ fontSize: '0.88rem', color: '#e5e7eb' }}>
            {data.problem_statement}
          </p>
          <div style={{ fontSize: '0.8rem', color: '#9ca3af', borderTop: '1px solid #374151', paddingTop: '8px', marginTop: 'auto' }}>
            <strong>Why it matters:</strong> {data.why_it_matters}
          </div>
        </div>

        {/* Card 2: Proposed Solution */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#60a5fa' }}>
              <Lightbulb size={16} />
              <span>Proposed Solution</span>
            </div>
            <SourceLink refId={data.source_refs?.[1] || firstSource} onSelectSource={onSelectSource} />
          </div>
          <p style={{ fontSize: '0.88rem', color: '#e5e7eb' }}>
            {data.proposed_solution}
          </p>
          <FactBadge type="stated" />
        </div>
      </div>

      {/* Main Contributions & Key Findings */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '1rem', color: '#34d399' }}>
            <Award size={18} />
            <span>Main Contributions</span>
          </div>
          <SourceLink refId={firstSource} onSelectSource={onSelectSource} />
        </div>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none' }}>
          {data.main_contributions?.map((c: string, idx: number) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: '#d1d5db' }}>
              <CheckCircle size={16} style={{ color: '#34d399', flexShrink: 0, marginTop: '2px' }} />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Practical Takeaway Card */}
      <div className="glass-panel" style={{ padding: '16px', borderLeft: '4px solid var(--accent-cyan)' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', marginBottom: '4px' }}>
          Practical Takeaway
        </div>
        <p style={{ fontSize: '0.9rem', color: '#f3f4f6', fontWeight: 500 }}>
          "{data.practical_takeaway}"
        </p>
      </div>
    </div>
  );
};
