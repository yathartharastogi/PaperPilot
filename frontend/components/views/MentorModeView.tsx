'use client';

import React from 'react';
import { SourceLink } from '../SourceLink';
import { FactBadge } from '../FactBadge';
import { UserCheck, MessageSquare, AlertCircle, HelpCircle, User, Sparkles, CheckCircle2 } from 'lucide-react';

interface MentorModeProps {
  prompts: any[];
  onSelectSource?: (refId: string) => void;
}

export const MentorModeView: React.FC<MentorModeProps> = ({ prompts = [], onSelectSource }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Bar */}
      <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <UserCheck size={24} style={{ color: 'var(--accent-purple)' }} />
          Research Mentor & Peer Reviewer Mode
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '2px' }}>
          Simulates expert reviewer feedback, critical-thinking prompts, potential biases, and missing ablation experiments
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {prompts.map((p, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px', borderLeft: '4px solid var(--accent-purple)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: 'rgba(139, 92, 246, 0.2)', color: 'var(--accent-purple)', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={20} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ background: 'rgba(139, 92, 246, 0.2)', color: 'var(--accent-purple)', fontWeight: 800, fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                      {p.category?.replace(/_/g, ' ')}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Peer Reviewer #{idx + 1}</span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>{p.title}</h3>
                </div>
              </div>
              <SourceLink refId={p.source_refs?.[0] || 'para_1'} onSelectSource={onSelectSource} />
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '16px', borderRadius: '10px', border: '1px solid #1e293b' }}>
              <p style={{ fontSize: '0.92rem', color: '#f8fafc', lineHeight: 1.65, fontWeight: 500 }}>
                "{p.description}"
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px' }}>
              <FactBadge type="inferred" confidenceScore={0.88} />
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={12} /> High-Impact Mentor Inquiry
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
