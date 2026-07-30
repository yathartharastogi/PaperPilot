'use client';

import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface FactBadgeProps {
  type: 'stated' | 'inferred' | string;
  confidenceScore?: number;
}

export const FactBadge: React.FC<FactBadgeProps> = ({ type, confidenceScore = 1.0 }) => {
  if (type === 'stated') {
    return (
      <span className="badge-fact">
        <CheckCircle2 size={12} />
        <span>Source: Author Stated</span>
      </span>
    );
  }

  const confidencePct = Math.round((confidenceScore || 0.85) * 100);

  return (
    <span className="badge-inferred" title={`AI Inferred with ${confidencePct}% confidence`}>
      <Sparkles size={12} />
      <span>AI Inference ({confidencePct}%)</span>
    </span>
  );
};
