'use client';

import React from 'react';
import { SourceLink } from '../SourceLink';
import { GraduationCap, RotateCw, Check, X, BookMarked, HelpCircle } from 'lucide-react';

interface StudyModeProps {
  data: any;
  onSelectSource?: (refId: string) => void;
}

export const StudyModeView: React.FC<StudyModeProps> = ({ data, onSelectSource }) => {
  const [activeTab, setActiveTab] = React.useState<'flashcards' | 'quiz' | 'terms'>('flashcards');
  const [cardIndex, setCardIndex] = React.useState<number>(0);
  const [isFlipped, setIsFlipped] = React.useState<boolean>(false);

  const flashcards = data?.flashcards || [];
  const quizzes = data?.mcq_quizzes || [];
  const terms = data?.key_terms || {};

  const currentCard = flashcards[cardIndex];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GraduationCap size={20} style={{ color: 'var(--accent-emerald)' }} />
            Active Recall Study Mode
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#9ca3af' }}>
            Auto-generated flashcards, quizzes, and terminology definitions linked to paper sources
          </p>
        </div>

        {/* Study Tabs */}
        <div style={{ display: 'flex', background: 'var(--bg-surface)', padding: '3px', borderRadius: '8px', border: '1px solid #374151' }}>
          <button
            onClick={() => { setActiveTab('flashcards'); setIsFlipped(false); }}
            style={{
              background: activeTab === 'flashcards' ? 'var(--accent-emerald)' : 'transparent',
              color: activeTab === 'flashcards' ? '#000' : '#9ca3af',
              border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem'
            }}
          >
            Flashcards ({flashcards.length})
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            style={{
              background: activeTab === 'quiz' ? 'var(--accent-emerald)' : 'transparent',
              color: activeTab === 'quiz' ? '#000' : '#9ca3af',
              border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem'
            }}
          >
            MCQ Quiz ({quizzes.length})
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            style={{
              background: activeTab === 'terms' ? 'var(--accent-emerald)' : 'transparent',
              color: activeTab === 'terms' ? '#000' : '#9ca3af',
              border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem'
            }}
          >
            Key Terms
          </button>
        </div>
      </div>

      {/* Tab 1: Interactive Flashcards */}
      {activeTab === 'flashcards' && currentCard && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '560px',
              minHeight: '260px',
              padding: '30px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'center',
              border: isFlipped ? '2px solid var(--accent-emerald)' : '1px solid #374151',
              background: isFlipped ? 'rgba(16, 185, 129, 0.08)' : 'rgba(30, 41, 59, 0.7)',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af', fontSize: '0.75rem' }}>
              <span>FLASHCARD {cardIndex + 1} OF {flashcards.length}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-emerald)' }}>
                <RotateCw size={12} /> {isFlipped ? 'REVERSE (ANSWER)' : 'CLICK TO FLIP'}
              </span>
            </div>

            <div style={{ margin: 'auto 0' }}>
              {!isFlipped ? (
                <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f3f4f6' }}>
                  {currentCard.question}
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <p style={{ fontSize: '1.15rem', fontWeight: 700, color: '#a7f3d0' }}>
                    {currentCard.answer}
                  </p>
                  <p style={{ fontSize: '0.82rem', color: '#d1d5db' }}>
                    {currentCard.explanation}
                  </p>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <SourceLink refId={currentCard.source_refs?.[0] || 'para_1'} onSelectSource={onSelectSource} />
            </div>
          </div>

          {/* Flashcard Next/Prev Controls */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => { setCardIndex(prev => Math.max(0, prev - 1)); setIsFlipped(false); }}
              disabled={cardIndex === 0}
              style={{ background: '#1e293b', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', opacity: cardIndex === 0 ? 0.5 : 1 }}
            >
              Previous Card
            </button>
            <button
              onClick={() => { setCardIndex(prev => Math.min(flashcards.length - 1, prev + 1)); setIsFlipped(false); }}
              disabled={cardIndex === flashcards.length - 1}
              style={{ background: 'var(--accent-emerald)', border: 'none', color: '#000', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, opacity: cardIndex === flashcards.length - 1 ? 0.5 : 1 }}
            >
              Next Card
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: MCQ Quiz */}
      {activeTab === 'quiz' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {quizzes.map((q: any, idx: number) => (
            <div key={idx} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>QUESTION #{idx + 1}</span>
                <SourceLink refId={q.source_refs?.[0] || 'para_1'} onSelectSource={onSelectSource} />
              </div>

              <p style={{ fontSize: '1rem', fontWeight: 600, color: '#f3f4f6' }}>{q.question}</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                {q.options?.map((opt: string, oIdx: number) => {
                  const isCorrect = opt === q.answer;
                  return (
                    <div
                      key={oIdx}
                      style={{
                        background: 'rgba(15, 23, 42, 0.6)',
                        border: isCorrect ? '1px solid var(--accent-emerald)' : '1px solid #374151',
                        borderRadius: '6px',
                        padding: '10px 14px',
                        fontSize: '0.85rem',
                        color: isCorrect ? '#a7f3d0' : '#d1d5db',
                        fontWeight: isCorrect ? 600 : 400
                      }}
                    >
                      {opt} {isCorrect ? ' ✓' : ''}
                    </div>
                  );
                })}
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '10px', borderRadius: '6px', fontSize: '0.8rem', color: '#9ca3af' }}>
                <strong>Explanation:</strong> {q.explanation}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Key Terms */}
      {activeTab === 'terms' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {Object.entries(terms).map(([term, def]: [string, any], idx: number) => (
            <div key={idx} className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>{term}</div>
              <p style={{ fontSize: '0.85rem', color: '#d1d5db' }}>{def}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
