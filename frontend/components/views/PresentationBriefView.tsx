'use client';

import React from 'react';
import { Presentation, Copy, Check, Download } from 'lucide-react';

interface PresentationProps {
  data: any;
}

export const PresentationBriefView: React.FC<PresentationProps> = ({ data }) => {
  const [copied, setCopied] = React.useState(false);
  const slides = data?.slide_outlines || [];

  const handleCopyMarkdown = () => {
    let md = `# ${data?.title || 'Presentation Brief'}\n\n`;
    slides.forEach((slide: any) => {
      md += `## Slide ${slide.slide}: ${slide.title}\n`;
      slide.points?.forEach((pt: string) => {
        md += `- ${pt}\n`;
      });
      md += `\n`;
    });
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Presentation size={20} style={{ color: 'var(--accent-amber)' }} />
            Presentation Brief
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#9ca3af' }}>
            Presentation-ready slide outline formatted for meetings, classes, and hackathon pitches
          </p>
        </div>

        <button
          onClick={handleCopyMarkdown}
          style={{
            background: 'var(--accent-amber)',
            color: '#000',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? 'Copied Markdown!' : 'Copy as Markdown'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {slides.map((slide: any, idx: number) => (
          <div key={idx} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-amber)', textTransform: 'uppercase' }}>
              SLIDE #{slide.slide}
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f3f4f6' }}>
              {slide.title}
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '16px', color: '#d1d5db', fontSize: '0.88rem' }}>
              {slide.points?.map((pt: string, pIdx: number) => (
                <li key={pIdx}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
