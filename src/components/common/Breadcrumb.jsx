import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useTask } from '../../context/TaskContext';

export const Breadcrumb = ({ items = [] }) => {
  const { navigateTo } = useTask();

  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
      <button
        onClick={() => navigateTo('dashboard')}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.3rem',
          padding: 0
        }}
      >
        <Home size={14} />
        <span>Home</span>
      </button>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight size={14} style={{ color: 'var(--text-muted)', opacity: 0.6 }} />
          {item.page ? (
            <button
              onClick={() => navigateTo(item.page, item.param)}
              style={{
                background: 'none',
                border: 'none',
                color: idx === items.length - 1 ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: idx === items.length - 1 ? '600' : '400',
                cursor: 'pointer',
                padding: 0
              }}
            >
              {item.label}
            </button>
          ) : (
            <span style={{ color: idx === items.length - 1 ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: idx === items.length - 1 ? '600' : '400' }}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
