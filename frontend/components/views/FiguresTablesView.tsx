'use client';

import React from 'react';
import { SourceLink } from '../SourceLink';
import { Image as ImageIcon, Table as TableIcon, HelpCircle } from 'lucide-react';

interface FiguresTablesProps {
  data: any;
  onSelectSource?: (refId: string) => void;
}

export const FiguresTablesView: React.FC<FiguresTablesProps> = ({ data, onSelectSource }) => {
  const figures = data?.figures || [];
  const tables = data?.tables || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ImageIcon size={20} style={{ color: 'var(--accent-cyan)' }} />
          Figures & Tables Explainer
        </h2>
        <p style={{ fontSize: '0.82rem', color: '#9ca3af' }}>
          Visual artifacts parsed from paper layout paired with plain-language trend explanations
        </p>
      </div>

      {/* Figures Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#93c5fd' }}>Extracted Figures</h3>
        {figures.map((fig: any, idx: number) => (
          <div key={idx} className="glass-panel" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f3f4f6' }}>{fig.caption}</span>
              <SourceLink refId={fig.figure_id} onSelectSource={onSelectSource} />
            </div>

            <div style={{
              background: '#0a0d14',
              borderRadius: '8px',
              padding: '20px',
              border: '1px solid #1e293b',
              textAlign: 'center',
              color: '#64748b'
            }}>
              <ImageIcon size={40} style={{ margin: '0 auto 8px', color: 'var(--accent-cyan)' }} />
              <div style={{ fontSize: '0.8rem' }}>Visual Figure Render — Page {fig.page}</div>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '12px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '4px' }}>EXPLANATION & TRENDS</div>
              <p style={{ fontSize: '0.85rem', color: '#d1d5db' }}>{fig.explanation}</p>
            </div>
          </div>
        ))}

        {/* Tables Section */}
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#93c5fd', marginTop: '10px' }}>Extracted Tables</h3>
        {tables.map((tab: any, idx: number) => (
          <div key={idx} className="glass-panel" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f3f4f6' }}>{tab.caption}</span>
              <SourceLink refId={tab.table_id} onSelectSource={onSelectSource} />
            </div>

            {tab.extracted_data && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                  <tbody>
                    {tab.extracted_data.map((row: string[], rIdx: number) => (
                      <tr key={rIdx} style={{ borderBottom: '1px solid #374151', background: rIdx === 0 ? 'rgba(30, 41, 59, 0.8)' : 'transparent' }}>
                        {row.map((cell: string, cIdx: number) => (
                          <td key={cIdx} style={{ padding: '8px 12px', color: rIdx === 0 ? 'var(--accent-cyan)' : '#d1d5db', fontWeight: rIdx === 0 ? 600 : 400 }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '12px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '4px' }}>TABLE TAKEAWAY</div>
              <p style={{ fontSize: '0.85rem', color: '#d1d5db' }}>{tab.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
