'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';

interface SourceLinkProps {
  refId: string;
  onSelectSource?: (refId: string) => void;
  label?: string;
}

export const SourceLink: React.FC<SourceLinkProps> = ({
  refId,
  onSelectSource,
  label = "Show Source"
}) => {
  return (
    <button
      className="source-link-btn"
      onClick={() => onSelectSource && onSelectSource(refId)}
      title={`Trace back to source reference: ${refId}`}
    >
      <span>{label}</span>
      <ExternalLink size={12} />
    </button>
  );
};
