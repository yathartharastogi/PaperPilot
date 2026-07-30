'use client';

import React from 'react';
import { SourceLink } from '../SourceLink';
import { Network, GitCommit as NodeIcon, Info } from 'lucide-react';

interface ConceptMapProps {
  data: any;
  onSelectSource?: (refId: string) => void;
}

export const ConceptMapView: React.FC<ConceptMapProps> = ({ data, onSelectSource }) => {
  const nodes = data?.nodes || [];
  const edges = data?.edges || [];
  const [selectedNode, setSelectedNode] = React.useState<any>(nodes[0] || null);

  const getCategoryColor = (cat: string) => {
    switch (cat?.toLowerCase()) {
      case 'method': case 'algorithm': return '#3b82f6';
      case 'dataset': return '#10b981';
      case 'result': return '#f59e0b';
      case 'concept': case 'model': return '#8b5cf6';
      default: return '#06b6d4';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Network size={20} style={{ color: 'var(--accent-cyan)' }} />
          Interactive Concept Map
        </h2>
        <p style={{ fontSize: '0.82rem', color: '#9ca3af' }}>
          Visual graph topology connecting core ideas, methods, datasets, and conclusions
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Node Graph Grid Representation */}
        <div className="glass-panel" style={{ padding: '20px', minHeight: '380px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>
            Interactive Knowledge Topology
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', margin: 'auto 0' }}>
            {nodes.map((node: any) => {
              const color = getCategoryColor(node.category);
              const isSelected = selectedNode?.node_id === node.node_id;

              return (
                <div
                  key={node.node_id}
                  onClick={() => setSelectedNode(node)}
                  style={{
                    background: isSelected ? color : 'rgba(30, 41, 59, 0.8)',
                    border: `2px solid ${color}`,
                    borderRadius: '12px',
                    padding: '12px 18px',
                    cursor: 'pointer',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    boxShadow: isSelected ? `0 0 15px ${color}` : 'none',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>{node.label}</span>
                  <span style={{ fontSize: '0.68rem', opacity: 0.85, textTransform: 'uppercase' }}>
                    {node.category}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Relationships list */}
          <div style={{ borderTop: '1px solid #374151', paddingTop: '10px', fontSize: '0.75rem', color: '#9ca3af', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {edges.map((e: any, idx: number) => (
              <span key={idx} style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '4px 8px', borderRadius: '4px' }}>
                Node #{e.source} → <em>{e.relationship}</em> → Node #{e.target}
              </span>
            ))}
          </div>
        </div>

        {/* Selected Node Details Panel */}
        {selectedNode && (
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', borderLeft: `4px solid ${getCategoryColor(selectedNode.category)}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{
                background: getCategoryColor(selectedNode.category),
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.7rem',
                padding: '2px 8px',
                borderRadius: '4px',
                textTransform: 'uppercase'
              }}>
                {selectedNode.category}
              </span>
              <SourceLink refId={selectedNode.source_refs?.[0] || 'para_1'} onSelectSource={onSelectSource} />
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f3f4f6' }}>
              {selectedNode.label}
            </h3>

            <p style={{ fontSize: '0.88rem', color: '#d1d5db' }}>
              {selectedNode.description}
            </p>

            <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '12px', borderRadius: '8px', marginTop: 'auto' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Info size={12} /> GROUNDED ANCHOR
              </div>
              <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                Click "Show Source" to scroll the PDF viewer panel directly to the paragraph defining {selectedNode.label}.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
