import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Hash } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export const WorkspaceSelector = ({ isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const { currentWorkspace, workspaces, switchWorkspace } = useWorkspace();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isCollapsed) return null;

  return (
    <div ref={ref} style={{ position: 'relative', padding: '0 0.55rem' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Switch workspace"
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          width: '100%', padding: '0.4rem 0.6rem',
          background: 'var(--bg-elevated)', border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-sm)', cursor: 'pointer', textAlign: 'left',
          fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)',
          transition: 'all 0.15s ease'
        }}
      >
        <span>{currentWorkspace.icon}</span>
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {currentWorkspace.name}
        </span>
        <ChevronDown size={12} style={{ flexShrink: 0, transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }} />
      </button>

      {isOpen && (
        <div className="card-glass" style={{
          position: 'absolute', top: 'calc(100% + 0.3rem)', left: '0.55rem', right: '0.55rem',
          padding: '0.3rem', zIndex: 1100,
          boxShadow: 'var(--shadow-lg)', animation: 'scaleUp 0.12s ease-out forwards'
        }} role="listbox">
          {workspaces.map(ws => (
            <button
              key={ws.id}
              onClick={() => { switchWorkspace(ws.id); setIsOpen(false); }}
              role="option"
              aria-selected={ws.id === currentWorkspace.id}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                width: '100%', padding: '0.4rem 0.5rem',
                background: ws.id === currentWorkspace.id ? 'rgba(99,102,241,0.1)' : 'transparent',
                border: 'none', borderRadius: 'var(--radius-sm)',
                cursor: 'pointer', textAlign: 'left',
                fontSize: '0.82rem', color: 'var(--text-primary)',
                transition: 'background 0.1s ease'
              }}
            >
              <span>{ws.icon}</span>
              <span style={{ flex: 1, fontWeight: '500' }}>{ws.name}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{ws.taskCount}</span>
              {ws.id === currentWorkspace.id && <Check size={13} style={{ color: 'var(--accent-primary)' }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
