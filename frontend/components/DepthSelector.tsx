'use client';

import React from 'react';

export type ExplanationDepth = 'beginner' | 'undergrad' | 'grad' | 'researcher';

interface DepthSelectorProps {
  currentDepth: ExplanationDepth;
  onDepthChange: (depth: ExplanationDepth) => void;
}

export const DepthSelector: React.FC<DepthSelectorProps> = ({ currentDepth, onDepthChange }) => {
  const depths: { id: ExplanationDepth; label: string }[] = [
    { id: 'beginner', label: 'Beginner' },
    { id: 'undergrad', label: 'Undergrad' },
    { id: 'grad', label: 'Graduate' },
    { id: 'researcher', label: 'Researcher' }
  ];

  return (
    <div className="depth-selector">
      {depths.map((d) => (
        <button
          key={d.id}
          className={`depth-btn ${currentDepth === d.id ? 'active' : ''}`}
          onClick={() => onDepthChange(d.id)}
        >
          {d.label}
        </button>
      ))}
    </div>
  );
};
