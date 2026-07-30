'use client';

import React from 'react';
import { SourceLink } from '../SourceLink';
import { Image as ImageIcon, Table as TableIcon, Layers, Cpu, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface FiguresTablesProps {
  data: any;
  onSelectSource?: (refId: string) => void;
}

export const FiguresTablesView: React.FC<FiguresTablesProps> = ({ data, onSelectSource }) => {
  const figures = data?.figures || [];
  const tables = data?.tables || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Bar */}
      <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ImageIcon size={24} style={{ color: 'var(--accent-cyan)' }} />
          Figures & Tables Explainer
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '2px' }}>
          Interactive visual architectural diagrams and parsed data tables with plain-language trend analysis
        </p>
      </div>

      {/* Figures Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={18} /> Extracted Figures & Architecture Diagrams
        </h3>
        {figures.map((fig: any, idx: number) => (
          <div key={idx} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', borderLeft: '4px solid var(--accent-cyan)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>{fig.caption}</span>
              <SourceLink refId={fig.figure_id} onSelectSource={onSelectSource} />
            </div>

            {/* Rich Interactive SVG Architecture Diagram Box */}
            <div style={{
              background: 'linear-gradient(135deg, #090d16 0%, #0f172a 100%)',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                TRANSFORMER ENCODER-DECODER ARCHITECTURE TOPOLOGY
              </div>

              {/* Visual Flow Infographic Diagram */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', width: '100%', padding: '10px 0' }}>
                {/* Encoder Stack Box */}
                <div style={{ background: 'rgba(6, 182, 212, 0.12)', border: '1px solid var(--accent-cyan)', borderRadius: '10px', padding: '16px 20px', textAlign: 'center', minWidth: '180px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>ENCODER STACK (Nx=6)</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', margin: '6px 0' }}>Multi-Head Attention</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Feed Forward Neural Net</div>
                </div>

                <ArrowRight size={24} style={{ color: 'var(--accent-cyan)' }} />

                {/* Positional Encoding Container */}
                <div style={{ background: 'rgba(139, 92, 246, 0.12)', border: '1px solid var(--accent-purple)', borderRadius: '10px', padding: '16px 20px', textAlign: 'center', minWidth: '180px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-purple)', textTransform: 'uppercase' }}>POSITIONAL ENCODING</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', margin: '6px 0' }}>Sinusoidal Vectors</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Token Order Injection</div>
                </div>

                <ArrowRight size={24} style={{ color: 'var(--accent-purple)' }} />

                {/* Decoder Stack Box */}
                <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid var(--accent-emerald)', borderRadius: '10px', padding: '16px 20px', textAlign: 'center', minWidth: '180px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-emerald)', textTransform: 'uppercase' }}>DECODER STACK (Nx=6)</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', margin: '6px 0' }}>Masked Multi-Head Attention</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Softmax Output Linear</div>
                </div>
              </div>
            </div>

            {/* Explanation & Trend Takeaway */}
            <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '16px', borderRadius: '10px', border: '1px solid #1e293b' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '6px', textTransform: 'uppercase' }}>EXPLANATION & TREND ANALYSIS</div>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6 }}>{fig.explanation}</p>
            </div>
          </div>
        ))}

        {/* Tables Section */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8', marginTop: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TableIcon size={18} /> Extracted Data Tables & Path Complexity
        </h3>
        {tables.map((tab: any, idx: number) => (
          <div key={idx} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', borderLeft: '4px solid var(--accent-emerald)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>{tab.caption}</span>
              <SourceLink refId={tab.table_id} onSelectSource={onSelectSource} />
            </div>

            {/* Styled Modern Data Table */}
            {tab.extracted_data && (
              <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid #1e293b' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(30, 41, 59, 0.9)', borderBottom: '2px solid var(--accent-emerald)' }}>
                      {tab.extracted_data[0]?.map((col: string, cIdx: number) => (
                        <th key={cIdx} style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tab.extracted_data.slice(1).map((row: string[], rIdx: number) => {
                      const isSelfAttention = row[0]?.toLowerCase().includes('self-attention');
                      return (
                        <tr key={rIdx} style={{
                          borderBottom: '1px solid #1e293b',
                          background: isSelfAttention ? 'rgba(16, 185, 129, 0.12)' : 'rgba(15, 23, 42, 0.5)'
                        }}>
                          {row.map((cell: string, cIdx: number) => (
                            <td key={cIdx} style={{ padding: '12px 16px', color: isSelfAttention ? '#a7f3d0' : '#cbd5e1', fontWeight: isSelfAttention ? 700 : 400 }}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '16px', borderRadius: '10px', border: '1px solid #1e293b' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-emerald)', marginBottom: '6px', textTransform: 'uppercase' }}>KEY TABLE TAKEAWAY</div>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6 }}>{tab.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
