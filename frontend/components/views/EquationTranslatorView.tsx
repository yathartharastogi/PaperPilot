'use client';

import React from 'react';
import { SourceLink } from '../SourceLink';
import { Sigma, Lightbulb, Compass, BookOpen } from 'lucide-react';

interface EquationTranslatorProps {
  equations: any[];
  onSelectSource?: (refId: string) => void;
}

export const EquationTranslatorView: React.FC<EquationTranslatorProps> = ({ equations = [], onSelectSource }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sigma size={20} style={{ color: 'var(--accent-purple)' }} />
          Equation Translator
        </h2>
        <p style={{ fontSize: '0.82rem', color: '#9ca3af' }}>
          Deconstruct mathematical formulations into variable definitions, conceptual intuition, and real-world analogies
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {equations.map((eq, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-purple)', textTransform: 'uppercase' }}>
                EQUATION #{idx + 1} — PAGE {eq.page}
              </span>
              <SourceLink refId={eq.eq_id} onSelectSource={onSelectSource} />
            </div>

            {/* Render Latex String */}
            <div style={{
              background: '#090d16',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid #1e293b',
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '1.1rem',
              color: '#a7f3d0'
            }}>
              {eq.latex}
            </div>

            <p style={{ fontSize: '0.88rem', color: '#e5e7eb' }}>
              {eq.explanation}
            </p>

            {/* Variable breakdown */}
            {eq.variables && (
              <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#93c5fd', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <BookOpen size={12} /> VARIABLE DEFINITIONS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', fontSize: '0.82rem' }}>
                  {Object.entries(eq.variables).map(([key, val]: [string, any], vIdx: number) => (
                    <div key={vIdx} style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '6px 10px', borderRadius: '4px' }}>
                      <strong style={{ color: 'var(--accent-cyan)' }}>{key}:</strong> {val}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              {/* Intuition */}
              <div style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-purple)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Lightbulb size={12} /> CONCEPTUAL INTUITION
                </div>
                <p style={{ fontSize: '0.82rem', color: '#d1d5db' }}>{eq.intuition}</p>
              </div>

              {/* Analogy */}
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-amber)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Compass size={12} /> REAL-WORLD ANALOGY
                </div>
                <p style={{ fontSize: '0.82rem', color: '#d1d5db' }}>{eq.analogy}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
