'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  FileText, ChevronLeft, ChevronRight, Bookmark, Sparkles, ZoomIn,
  ZoomOut, Maximize2, Layers, Image as ImageIcon, Table as TableIcon, Sigma
} from 'lucide-react';

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
  paper: any;
  paperTitle: string;
  totalPages: number;
  activeSourceRef?: SourceRefData | null;
  onClose?: () => void;
}

export const PdfViewerPanel: React.FC<PdfViewerPanelProps> = ({
  paper,
  paperTitle,
  totalPages = 11,
  activeSourceRef,
  onClose
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const containerRef = useRef<HTMLDivElement>(null);

  // Synchronize page when active source ref is clicked
  useEffect(() => {
    if (activeSourceRef && activeSourceRef.page) {
      setCurrentPage(activeSourceRef.page);
    }
  }, [activeSourceRef]);

  // Gather all contents for the current page
  const pageParagraphs: any[] = [];
  const pageSections: string[] = [];

  paper?.sections?.forEach((sec: any) => {
    sec.paragraphs?.forEach((p: any) => {
      if (p.page === currentPage) {
        pageParagraphs.push({ ...p, sectionTitle: sec.title });
        if (!pageSections.includes(sec.title)) {
          pageSections.push(sec.title);
        }
      }
    });
  });

  const pageFigures = paper?.figures?.filter((f: any) => f.page === currentPage) || [];
  const pageTables = paper?.tables?.filter((t: any) => t.page === currentPage) || [];
  const pageEquations = paper?.equations?.filter((eq: any) => eq.page === currentPage) || [];

  // Determine active bounding box overlay
  const activeBbox = (activeSourceRef && (activeSourceRef.page === currentPage || !activeSourceRef.page))
    ? activeSourceRef.bbox
    : null;

  return (
    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid rgba(6, 182, 212, 0.4)' }}>
      {/* PDF Reader Header Bar */}
      <div style={{
        padding: '10px 16px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(12px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
          <FileText size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {paperTitle}
          </span>
        </div>

        {/* Zoom & Page Navigation Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '6px', padding: '2px 6px' }}>
            <button
              onClick={() => setZoomLevel(prev => Math.max(70, prev - 10))}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex' }}
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <span style={{ fontSize: '0.72rem', color: '#cbd5e1', fontFamily: 'var(--font-mono)', width: '36px', textAlign: 'center' }}>
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(140, prev + 10))}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex' }}
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              style={{ background: 'transparent', border: 'none', color: currentPage === 1 ? '#475569' : '#94a3b8', cursor: currentPage === 1 ? 'default' : 'pointer' }}
            >
              <ChevronLeft size={18} />
            </button>
            <span style={{ fontSize: '0.8rem', color: '#f8fafc', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              style={{ background: 'transparent', border: 'none', color: currentPage === totalPages ? '#475569' : '#94a3b8', cursor: currentPage === totalPages ? 'default' : 'pointer' }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Active Source Ref Banner */}
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
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
            <Sparkles size={14} /> ACTIVE CITATION: #{activeSourceRef.ref_id} (Page {currentPage})
          </span>
          <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Layout BBox Traced</span>
        </div>
      )}

      {/* Main Document Reader Viewport */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 16px',
          background: '#070a12',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Authentic PDF Document Page Sheet */}
        <div
          style={{
            width: '100%',
            maxWidth: '520px',
            minHeight: '680px',
            background: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '10px',
            boxShadow: '0 12px 35px rgba(0,0,0,0.6)',
            position: 'relative',
            padding: '36px 28px',
            color: '#cbd5e1',
            fontSize: `${0.82 * (zoomLevel / 100)}rem`,
            lineHeight: 1.65,
            transition: 'all 0.2s ease'
          }}
        >
          {/* Document Top Margin Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: '#64748b',
            fontSize: '0.68rem',
            marginBottom: '20px',
            borderBottom: '1px solid #1e293b',
            paddingBottom: '8px',
            fontWeight: 500
          }}>
            <span>{paperTitle}</span>
            <span>Page {currentPage} of {totalPages}</span>
          </div>

          {/* Glowing Bounding Box Overlay Layer */}
          {activeBbox && (
            <div
              className="pulsing-bbox"
              style={{
                position: 'absolute',
                left: `${Math.min(85, Math.max(5, (activeBbox.x / 600) * 100))}%`,
                top: `${Math.min(80, Math.max(8, (activeBbox.y / 800) * 100))}%`,
                width: `${Math.min(90, Math.max(45, (activeBbox.width / 600) * 100))}%`,
                height: `${Math.min(45, Math.max(14, (activeBbox.height / 800) * 100))}%`,
                backgroundColor: 'rgba(6, 182, 212, 0.25)',
                border: '2px solid #22d3ee',
                borderRadius: '6px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 20,
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
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
              }}>
                <Bookmark size={10} />
                <span>GROUNDED SOURCE REF: #{activeSourceRef?.ref_id}</span>
              </div>
            </div>
          )}

          {/* Real Section Headers & Paragraph Blocks for Current Page */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {pageSections.map((secTitle, sIdx) => (
              <h3 key={sIdx} style={{ fontSize: '1rem', fontWeight: 800, color: '#f8fafc', borderBottom: '1px solid #334155', paddingBottom: '4px', marginTop: sIdx > 0 ? '12px' : 0 }}>
                {secTitle}
              </h3>
            ))}

            {pageParagraphs.map((p: any) => {
              const isTargetPara = activeSourceRef?.ref_id === p.para_id;
              return (
                <div
                  key={p.para_id}
                  style={{
                    background: isTargetPara ? 'rgba(6, 182, 212, 0.12)' : 'transparent',
                    borderLeft: isTargetPara ? '3px solid var(--accent-cyan)' : 'none',
                    paddingLeft: isTargetPara ? '10px' : '0',
                    borderRadius: '4px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <p style={{ color: isTargetPara ? '#f8fafc' : '#cbd5e1', fontWeight: isTargetPara ? 500 : 400 }}>
                    {p.text}
                  </p>
                </div>
              );
            })}

            {/* Figures on this page */}
            {pageFigures.map((fig: any) => (
              <div key={fig.figure_id} style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '16px', textAlign: 'center', margin: '10px 0' }}>
                <ImageIcon size={36} style={{ color: 'var(--accent-cyan)', margin: '0 auto 8px' }} />
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>{fig.caption}</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>{fig.explanation}</div>
              </div>
            ))}

            {/* Tables on this page */}
            {pageTables.map((tab: any) => (
              <div key={tab.table_id} style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '14px', margin: '10px 0' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <TableIcon size={14} /> {tab.caption}
                </div>
                {tab.extracted_data && (
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                    <tbody>
                      {tab.extracted_data.map((row: string[], rIdx: number) => (
                        <tr key={rIdx} style={{ borderBottom: '1px solid #1e293b', background: rIdx === 0 ? 'rgba(30, 41, 59, 0.7)' : 'transparent' }}>
                          {row.map((cell: string, cIdx: number) => (
                            <td key={cIdx} style={{ padding: '6px 8px', color: rIdx === 0 ? '#38bdf8' : '#cbd5e1' }}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}

            {/* Equations on this page */}
            {pageEquations.map((eq: any) => (
              <div key={eq.eq_id} style={{ background: '#080d1a', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '8px', padding: '12px', textAlign: 'center', margin: '10px 0' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--accent-purple)', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>
                  EQUATION FORMULATION #{eq.eq_id}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: '#a7f3d0' }}>
                  {eq.latex}
                </div>
              </div>
            ))}

            {/* Fallback layout representation if page paragraphs empty */}
            {pageParagraphs.length === 0 && pageFigures.length === 0 && pageTables.length === 0 && pageEquations.length === 0 && (
              <div style={{ textAlign: 'center', color: '#64748b', padding: '40px 0' }}>
                <FileText size={32} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
                <p style={{ fontSize: '0.85rem' }}>Page {currentPage} Layout Content</p>
                <p style={{ fontSize: '0.75rem', marginTop: '4px' }}>Extracted PyMuPDF text blocks for page {currentPage}.</p>
              </div>
            )}
          </div>

          {/* Document Footer Margin */}
          <div style={{ marginTop: '30px', paddingTop: '10px', borderTop: '1px solid #1e293b', color: '#475569', fontSize: '0.65rem', textAlign: 'center' }}>
            PaperPilot Grounded Layout Reader — Page {currentPage}
          </div>
        </div>
      </div>
    </div>
  );
};
