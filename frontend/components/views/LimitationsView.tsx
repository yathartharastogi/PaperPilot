'use client';

import React from 'react';
import { SourceLink } from '../SourceLink';
import { FactBadge } from '../FactBadge';
import { AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';

interface LimitationsProps {
  data: any;
  onSelectSource?: (refId: string) => void;
}

export const LimitationsView: React.FC<LimitationsProps> = ({ data, onSelectSource }) => {
  const authorStated = data?.author_stated || [];
  const aiInferred = data?.ai_inferred || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={20} style={{ color: 'var(--accent-amber)' }} />
          Limitations Analyzer
        </h2>
        <p style={{ fontSize: '0.82rem', color: '#9ca3af' }}>
          Strict separation of author-stated limitations from AI-inferred potential gaps
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Column 1: Author Stated */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #374151', paddingBottom: '10px' }}>
            <CheckCircle2 size={18} style={{ color: 'var(--accent-cyan)' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f3f4f6' }}>
              Stated by Authors
            </h3>
          </div>

          {authorStated.length === 0 ? (
            <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>No explicit author limitations declared.</p>
          ) : (
            authorStated.map((item: any, idx: number) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--fact-border)',
                  borderRadius: '8px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <FactBadge type="stated" />
                  <SourceLink refId={item.source_refs?.[0] || 'para_1'} onSelectSource={onSelectSource} />
                </div>
                <p style={{ fontSize: '0.88rem', color: '#e5e7eb' }}>
                  {item.text}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Column 2: AI Inferred */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #374151', paddingBottom: '10px' }}>
            <Sparkles size={18} style={{ color: 'var(--accent-purple)' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f3f4f6' }}>
              AI-Inferred Weaknesses
            </h3>
          </div>

          {aiInferred.length === 0 ? (
            <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>No inferred limitations generated.</p>
          ) : (
            aiInferred.map((item: any, idx: number) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px dashed var(--inferred-border)',
                  borderRadius: '8px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <FactBadge type="inferred" confidenceScore={item.confidence_score} />
                  <SourceLink refId={item.source_refs?.[0] || 'para_1'} onSelectSource={onSelectSource} />
                </div>
                <p style={{ fontSize: '0.88rem', color: '#e5e7eb' }}>
                  {item.text}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
