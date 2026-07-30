'use client';

import React from 'react';
import { SourceLink } from '../SourceLink';
import { FactBadge } from '../FactBadge';
import { ShieldCheck, Layers, Award, TrendingUp, Filter } from 'lucide-react';

interface ClaimsExplorerProps {
  claims: any[];
  onSelectSource?: (refId: string) => void;
}

export const ClaimsExplorerView: React.FC<ClaimsExplorerProps> = ({ claims = [], onSelectSource }) => {
  const [selectedFilter, setSelectedFilter] = React.useState<string>('all');

  const sections = ['all', ...Array.from(new Set(claims.map(c => c.section_name || 'Results')))];
  const filteredClaims = selectedFilter === 'all'
    ? claims
    : claims.filter(c => (c.section_name || 'Results') === selectedFilter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={24} style={{ color: 'var(--accent-cyan)' }} />
            Claims & Evidence Explorer
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '2px' }}>
            Primary paper claims paired with supporting empirical evidence and exact source location
          </p>
        </div>

        {/* Section Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#0f172a', padding: '4px', borderRadius: '8px', border: '1px solid #1e293b' }}>
          <Filter size={14} style={{ color: '#94a3b8', marginLeft: '6px' }} />
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedFilter(sec)}
              style={{
                background: selectedFilter === sec ? 'var(--accent-cyan)' : 'transparent',
                color: selectedFilter === sec ? '#000' : '#94a3b8',
                border: 'none',
                padding: '4px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.78rem',
                textTransform: 'capitalize'
              }}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Claims Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredClaims.map((claim, idx) => {
          const sourceRef = claim.source_refs?.[0] || `para_${idx+1}`;
          return (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                borderLeft: '4px solid var(--accent-cyan)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))',
                    color: 'var(--accent-cyan)',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(6, 182, 212, 0.4)'
                  }}>
                    CLAIM #{idx + 1}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', background: '#0f172a', padding: '2px 8px', borderRadius: '4px' }}>
                    <Layers size={12} /> {claim.section_name || 'Results'}
                  </span>
                </div>
                <SourceLink refId={sourceRef} onSelectSource={onSelectSource} />
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.5 }}>
                "{claim.claim_text}"
              </h3>

              {/* Supporting Evidence Callout Box */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.7)',
                padding: '16px',
                borderRadius: '10px',
                borderLeft: '3px solid var(--accent-cyan)',
                border: '1px solid #1e293b',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-cyan)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <TrendingUp size={14} /> SUPPORTING EMPIRICAL EVIDENCE & METRICS
                </div>
                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, fontWeight: 500 }}>
                  {claim.evidence}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px' }}>
                <FactBadge type="stated" />
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Grounded in source {sourceRef}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
