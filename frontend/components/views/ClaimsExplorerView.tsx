'use client';

import React from 'react';
import { SourceLink } from '../SourceLink';
import { FactBadge } from '../FactBadge';
import { ShieldCheck, ArrowRight, Layers } from 'lucide-react';

interface ClaimsExplorerProps {
  claims: any[];
  onSelectSource?: (refId: string) => void;
}

export const ClaimsExplorerView: React.FC<ClaimsExplorerProps> = ({ claims = [], onSelectSource }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={20} style={{ color: 'var(--accent-cyan)' }} />
          Claims & Evidence Explorer
        </h2>
        <p style={{ fontSize: '0.82rem', color: '#9ca3af' }}>
          Primary paper claims paired with supporting evidence, metrics, and exact source references
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {claims.map((claim, idx) => {
          const sourceRef = claim.source_refs?.[0] || `para_${idx+1}`;
          return (
            <div key={idx} className="glass-panel" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    background: 'rgba(6, 182, 212, 0.2)',
                    color: 'var(--accent-cyan)',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}>
                    CLAIM #{idx + 1}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Layers size={12} /> {claim.section_name || 'Results'}
                  </span>
                </div>
                <SourceLink refId={sourceRef} onSelectSource={onSelectSource} />
              </div>

              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f3f4f6' }}>
                "{claim.claim_text}"
              </p>

              <div style={{
                background: 'rgba(15, 23, 42, 0.5)',
                padding: '12px',
                borderRadius: '8px',
                borderLeft: '3px solid var(--accent-cyan)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>
                  Supporting Empirical Evidence
                </span>
                <p style={{ fontSize: '0.85rem', color: '#d1d5db' }}>
                  {claim.evidence}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px' }}>
                <FactBadge type="stated" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
