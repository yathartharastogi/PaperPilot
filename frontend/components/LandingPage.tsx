'use client';

import React from 'react';
import {
  Sparkles, ArrowRight, ShieldCheck, FileText, ExternalLink, Network,
  GraduationCap, Sigma, AlertTriangle, Presentation, UserCheck, Columns, Upload, BookOpen
} from 'lucide-react';

interface LandingPageProps {
  onStartUpload: () => void;
  onLaunchDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartUpload, onLaunchDemo }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      {/* Landing Header */}
      <header style={{
        height: '70px',
        borderBottom: '1px solid var(--border-color)',
        padding: '0 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(16px)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
            padding: '8px',
            borderRadius: '10px',
            color: '#fff',
            display: 'flex',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)'
          }}>
            <Sparkles size={22} />
          </div>
          <span style={{ fontSize: '1.35rem', fontWeight: 800 }} className="gradient-text">
            PaperPilot
          </span>
          <span style={{
            fontSize: '0.72rem',
            background: 'rgba(6, 182, 212, 0.12)',
            color: 'var(--accent-cyan)',
            padding: '3px 10px',
            borderRadius: '12px',
            border: '1px solid var(--accent-cyan)',
            fontWeight: 600
          }}>
            v1.0 Hackathon Build
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={onLaunchDemo}
            style={{
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid var(--border-color)',
              color: '#d1d5db',
              padding: '8px 18px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              transition: 'all 0.2s ease'
            }}
          >
            Explore Dashboard
          </button>
          <button
            onClick={onStartUpload}
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #2563eb)',
              color: '#fff',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 20px rgba(6, 182, 212, 0.4)'
            }}
          >
            <Upload size={16} />
            <span>Upload Paper PDF</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        padding: '90px 20px 60px',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }}>
        {/* Ticker Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(6, 182, 212, 0.1)',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          padding: '6px 16px',
          borderRadius: '30px',
          fontSize: '0.82rem',
          color: '#22d3ee',
          fontWeight: 600
        }}>
          <ShieldCheck size={16} />
          <span>Factual Citation Grounding & Layout Bounding Box Tracing</span>
        </div>

        {/* Hero Title */}
        <h1 style={{
          fontSize: '3.6rem',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          maxWidth: '900px'
        }}>
          Understand Academic Research Papers in Minutes.{' '}
          <span className="gradient-text">Grounded in Fact.</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '1.2rem',
          color: '#94a3b8',
          maxWidth: '740px',
          lineHeight: 1.6
        }}>
          PaperPilot transforms dense research PDFs into interactive, verifiable briefs. Every generated claim, formula, and flashcard links directly to exact bounding boxes in the source paper canvas.
        </p>

        {/* CTA Button Group */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={onStartUpload}
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              color: '#fff',
              border: 'none',
              padding: '14px 32px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 6px 30px rgba(6, 182, 212, 0.45)',
              transition: 'all 0.2s ease'
            }}
          >
            <Upload size={18} />
            <span>Upload Your Paper PDF</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={onLaunchDemo}
            style={{
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid var(--border-color)',
              color: '#f8fafc',
              padding: '14px 28px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <BookOpen size={18} />
            <span>Launch Benchmark Demo</span>
          </button>
        </div>
      </section>

      {/* Feature Demos / Key Value Props Grid */}
      <section style={{ padding: '40px 20px 80px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
            Built for Factual Integrity & Retention
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            Never rely on unverified AI text compression again
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Feature 1 */}
          <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ExternalLink size={22} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc' }}>100% Traceable "Show Source"</h3>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Clicking "Show Source" on any claim or flashcard immediately scrolls the split PDF viewer canvas to the exact page and renders a glowing bounding-box overlay over the supporting paragraph.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)', width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={22} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc' }}>Fact vs. Inference Trust Engine</h3>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Strict visual badge system separating author-stated facts (solid cyan badge) from AI-inferred limitations or reviewer concerns (dashed purple badge + confidence score).
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={22} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc' }}>10 Interactive Briefing Modes</h3>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Executive Brief, Claims Explorer, Limitations Analyzer, Figure/Table Explainer, Equation Translator, Concept Topology, Active Recall Study Mode, Presentation Brief, Mentor Mode, and Comparison.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border-color)',
        padding: '24px 40px',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.85rem'
      }}>
        PaperPilot — Grounded AI Research Briefing Agent &copy; 2026. Built with FastAPI & Next.js.
      </footer>
    </div>
  );
};
