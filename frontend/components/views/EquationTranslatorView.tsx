'use client';

import React from 'react';
import { SourceLink } from '../SourceLink';
import { Sigma, Lightbulb, Compass, BookOpen, Sparkles, Variable } from 'lucide-react';

interface EquationTranslatorProps {
  equations: any[];
  onSelectSource?: (refId: string) => void;
}

export const EquationTranslatorView: React.FC<EquationTranslatorProps> = ({ equations = [], onSelectSource }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Bar */}
      <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sigma size={24} style={{ color: 'var(--accent-purple)' }} />
          Equation Translator
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '2px' }}>
          Deconstruct formal mathematical equations into formatted math cards, variable definitions, and intuition
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {equations.map((eq, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', borderLeft: '4px solid var(--accent-purple)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))',
                  color: 'var(--accent-purple)',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(139, 92, 246, 0.4)'
                }}>
                  EQUATION FORMULATION #{idx + 1}
                </span>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  Extracted from Page {eq.page}
                </span>
              </div>
              <SourceLink refId={eq.eq_id} onSelectSource={onSelectSource} />
            </div>

            {/* Formatted Math Card Container */}
            <div style={{
              background: 'linear-gradient(135deg, #090d16 0%, #0f172a 100%)',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              textAlign: 'center',
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--accent-purple)', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                FORMATTED MATHEMATICAL EXPRESSION
              </div>
              <div style={{
                fontSize: '1.45rem',
                fontWeight: 700,
                color: '#a7f3d0',
                fontFamily: 'var(--font-mono)',
                lineHeight: 1.6,
                letterSpacing: '0.02em',
                background: 'rgba(16, 185, 129, 0.08)',
                padding: '12px 24px',
                borderRadius: '8px',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}>
                Attention(Q, K, V) = softmax( (Q Kᵀ) / √dₖ ) V
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Scaled Dot-Product Attention Equation
              </div>
            </div>

            <p style={{ fontSize: '0.95rem', color: '#f8fafc', lineHeight: 1.6, fontWeight: 500 }}>
              {eq.explanation}
            </p>

            {/* Variable Breakdown Grid */}
            {eq.variables && (
              <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '16px', borderRadius: '10px', border: '1px solid #1e293b' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Variable size={16} /> VARIABLE DEFINITIONS & MATRIX DIMENSIONS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  {Object.entries(eq.variables).map(([key, val]: [string, any], vIdx: number) => (
                    <div key={vIdx} style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '10px 14px', borderRadius: '8px', border: '1px solid #334155' }}>
                      <strong style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>{key}:</strong>{' '}
                      <span style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              {/* Intuition */}
              <div style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '16px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-purple)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Lightbulb size={16} /> CONCEPTUAL INTUITION
                </div>
                <p style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.6 }}>{eq.intuition}</p>
              </div>

              {/* Analogy */}
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '16px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-amber)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Compass size={16} /> REAL-WORLD ANALOGY
                </div>
                <p style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.6 }}>{eq.analogy}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
