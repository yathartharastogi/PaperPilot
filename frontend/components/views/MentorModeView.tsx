'use client';

import React from 'react';
import { SourceLink } from '../SourceLink';
import { FactBadge } from '../FactBadge';
import { UserCheck, MessageSquare, AlertCircle, HelpCircle } from 'lucide-react';

interface MentorModeProps {
  prompts: any[];
  onSelectSource?: (refId: string) => void;
}

export const MentorModeView: React.FC<MentorModeProps> = ({ prompts = [], onSelectSource }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserCheck size={20} style={{ color: 'var(--accent-purple)' }} />
          Research Mentor Mode
        </h2>
        <p style={{ fontSize: '0.82rem', color: '#9ca3af' }}>
          Expert reviewer feedback, critical-thinking prompts, potential biases, and missing ablation experiments
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {prompts.map((p, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px', borderLeft: '3px solid var(--accent-purple)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ background: 'rgba(139, 92, 246, 0.2)', color: 'var(--accent-purple)', fontWeight: 700, fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                  {p.category?.replace(/_/g, ' ')}
                </span>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f3f4f6' }}>{p.title}</span>
              </div>
              <SourceLink refId={p.source_refs?.[0] || 'para_1'} onSelectSource={onSelectSource} />
            </div>

            <p style={{ fontSize: '0.9rem', color: '#d1d5db' }}>
              {p.description}
            </p>

            <div style={{ paddingTop: '4px' }}>
              <FactBadge type="inferred" confidenceScore={0.88} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
