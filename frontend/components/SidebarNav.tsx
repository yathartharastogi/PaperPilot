'use client';

import React from 'react';
import {
  FileText, ShieldCheck, AlertTriangle, Image as ImageIcon,
  Sigma, Network, Columns, ChevronLeft, ChevronRight
} from 'lucide-react';

interface SidebarNavProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse
}) => {
  const navGroups = [
    {
      title: 'BRIEFING & CLAIMS',
      items: [
        { id: 'brief', label: 'Executive Brief', icon: FileText, badge: 'Core' },
        { id: 'claims', label: 'Claims Explorer', icon: ShieldCheck },
        { id: 'limitations', label: 'Limitations', icon: AlertTriangle, badge: 'Facts vs AI' }
      ]
    },
    {
      title: 'DEEP ANALYTICS',
      items: [
        { id: 'figures', label: 'Figures & Tables', icon: ImageIcon },
        { id: 'equations', label: 'Equation Translator', icon: Sigma },
        { id: 'concept-map', label: 'Concept Topology', icon: Network }
      ]
    },
    {
      title: 'COMPARISON',
      items: [
        { id: 'comparison', label: 'Paper Comparison', icon: Columns }
      ]
    }
  ];

  return (
    <aside style={{
      width: isCollapsed ? '64px' : '240px',
      flexShrink: 0,
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(16px)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 40,
      userSelect: 'none'
    }}>
      {/* Navigation Links */}
      <div style={{ padding: '16px 10px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {!isCollapsed && (
              <div style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                color: '#64748b',
                letterSpacing: '0.08em',
                padding: '0 10px 4px',
                textTransform: 'uppercase'
              }}>
                {group.title}
              </div>
            )}

            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  style={{
                    background: isActive ? 'linear-gradient(90deg, rgba(6, 182, 212, 0.18), rgba(59, 130, 246, 0.12))' : 'transparent',
                    color: isActive ? '#f8fafc' : '#94a3b8',
                    border: 'none',
                    borderLeft: isActive ? '3px solid var(--accent-cyan)' : '3px solid transparent',
                    borderRadius: isCollapsed ? '8px' : '0 8px 8px 0',
                    padding: isCollapsed ? '10px' : '9px 12px',
                    cursor: 'pointer',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isCollapsed ? 'center' : 'space-between',
                    gap: '10px',
                    transition: 'all 0.15s ease',
                    boxShadow: isActive ? 'inset 0 0 12px rgba(6, 182, 212, 0.1)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                    <Icon size={18} style={{ color: isActive ? 'var(--accent-cyan)' : '#64748b', flexShrink: 0 }} />
                    {!isCollapsed && (
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.label}
                      </span>
                    )}
                  </div>

                  {!isCollapsed && item.badge && (
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      background: isActive ? 'rgba(6, 182, 212, 0.25)' : 'rgba(30, 41, 59, 0.8)',
                      color: isActive ? 'var(--accent-cyan)' : '#64748b',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Collapse Toggle Footer */}
      <div style={{
        padding: '12px',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: isCollapsed ? 'center' : 'flex-end',
        background: 'rgba(15, 23, 42, 0.6)'
      }}>
        <button
          onClick={onToggleCollapse}
          style={{
            background: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid #1e293b',
            color: '#94a3b8',
            borderRadius: '6px',
            padding: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
};
