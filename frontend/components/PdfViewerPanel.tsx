'use client';

import React, { useEffect, useRef } from 'react';
import { FileText, Eye, ChevronLeft, ChevronRight, Bookmark, Sparkles } from 'lucide-react';

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface SourceRefData {
  ref_id: string;
  target_type: string;
  page: number;
  bbox?: BoundingBox;
  text_snippet?: string;
}

interface PdfViewerPanelProps {
  paperTitle: string;
  totalPages: number;
  activeSourceRef?: SourceRefData | null;
  onClose?: () => void;
}

export const PdfViewerPanel: React.FC<PdfViewerPanelProps> = ({
  paperTitle,
  totalPages = 11,
  activeSourceRef,
  onClose
}) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeSourceRef) {
      setCurrentPage(activeSourceRef.page || 1);
    }
  }, [activeSourceRef]);

  // Ensure bbox fallback if not specified so highlight always shows
  const defaultBbox: BoundingBox = { x: 50, y: 180, width: 480, height: 120 };
  const activeBbox = (activeSourceRef && (activeSourceRef.page === currentPage || !activeSourceRef.page))
    ? (activeSourceRef.bbox || defaultBbox)
    : null;

  return (
    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid var(--accent-cyan)' }}>
      {/* Viewer Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(15, 23, 42, 0.8)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
          <FileText size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f3f4f6', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {paperTitle}
          </span>
        </div>

        {/* Page navigation controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
          >
            <ChevronLeft size={18} />
          </button>
          <span style={{ fontSize: '0.8rem', color: '#d1d5db', fontFamily: 'var(--font-mono)' }}>
            Page {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Citation Source Banner when active */}
      {activeSourceRef && (
        <div style={{
          background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))',
          borderBottom: '1px solid var(--accent-cyan)',
          padding: '8px 16px',
          fontSize: '0.78rem',
          color: '#22d3ee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
            <Sparkles size={14} /> Traced Source: #{activeSourceRef.ref_id} (Page {currentPage})
          </span>
          <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Layout BBox Highlight Active</span>
        </div>
      )}

      {/* Main Canvas / Viewer Body */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          position: 'relative',
          background: '#0a0d14',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {/* Document Page Canvas */}
        <div
          style={{
            width: '100%',
            maxWidth: '560px',
            minHeight: '720px',
            background: '#131b2e',
            border: '1px solid #1e293b',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            position: 'relative',
            padding: '30px 24px',
            color: '#cbd5e1',
            fontSize: '0.82rem',
            lineHeight: 1.6
          }}
        >
          {/* Header watermark */}
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.7rem', marginBottom: '20px', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
            <span>Page {currentPage} — {paperTitle}</span>
            <span>PDF Layout Viewer Canvas</span>
          </div>

          {/* Highlight Bounding Box Layer */}
          {activeBbox && (
            <div
              style={{
                position: 'absolute',
                left: `${Math.min(80, Math.max(5, (activeBbox.x / 600) * 100))}%`,
                top: `${Math.min(75, Math.max(10, (activeBbox.y / 800) * 100))}%`,
                width: `${Math.min(90, Math.max(40, (activeBbox.width / 600) * 100))}%`,
                height: `${Math.min(40, Math.max(12, (activeBbox.height / 800) * 100))}%`,
                backgroundColor: 'rgba(6, 182, 212, 0.25)',
                border: '2px solid #22d3ee',
                borderRadius: '6px',
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.6)',
                transition: 'all 0.4s ease',
                zIndex: 10,
                pointerEvents: 'none'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-24px',
                left: '0',
                background: '#0891b2',
                color: '#fff',
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap'
              }}>
                <Bookmark size={10} />
                <span>GROUNDED SOURCE REF: #{activeSourceRef?.ref_id || 'para_1'}</span>
              </div>
            </div>
          )}

          {/* Document Content Simulation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activeSourceRef ? (
              <div style={{ background: 'rgba(30, 41, 59, 0.7)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #22d3ee' }}>
                <div style={{ fontSize: '0.75rem', color: '#22d3ee', fontWeight: 600, marginBottom: '6px' }}>
                  EXTRACTED SOURCE TEXT ({activeSourceRef.target_type?.toUpperCase() || 'PARAGRAPH'})
                </div>
                <p style={{ fontStyle: 'italic', color: '#f1f5f9' }}>
                  "{activeSourceRef.text_snippet || "Extracted block content from research paper layout bounding box."}"
                </p>
              </div>
            ) : null}

            <p>
              Academic papers present high-density information through structured sections, formal equations, empirical evaluation tables, and conceptual architecture figures.
            </p>
            <p>
              PaperPilot parses this document layout using PyMuPDF, isolating exact bounding boxes [x, y, w, h] for every paragraph, equation, and figure to ensure 100% verifiable grounding for every AI-generated insight.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
