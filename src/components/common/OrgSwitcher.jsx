import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Plus, Check } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export const OrgSwitcher = ({ isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const ref = useRef(null);
  const { currentOrg, organizations, switchOrg } = useWorkspace();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = organizations.filter(o =>
    o.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (org) => {
    switchOrg(org.id);
    setIsOpen(false);
    setSearchQuery('');
  };

  if (isCollapsed) {
    return (
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '34px', height: '34px', borderRadius: '9px',
          background: `${currentOrg.color}22`,
          border: `1px solid ${currentOrg.color}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: '1.1rem', flexShrink: 0
        }}
        title={currentOrg.name}
      >
        {currentOrg.logo}
      </div>
    );
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Switch organization"
        style={{
          display: 'flex', alignItems: 'center', gap: '0.6rem',
          width: '100%', padding: '0.5rem 0.65rem',
          background: 'transparent', border: 'none',
          cursor: 'pointer', borderRadius: 'var(--radius-md)',
          transition: 'background 0.15s ease', textAlign: 'left'
        }}
      >
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px',
          background: `${currentOrg.color}22`,
          border: `1px solid ${currentOrg.color}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem', flexShrink: 0
        }}>
          {currentOrg.logo}
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {currentOrg.name}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{currentOrg.plan}</div>
        </div>
        <ChevronDown size={14} style={{ color: 'var(--text-muted)', flexShrink: 0, transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }} />
      </button>

      {isOpen && (
        <div className="card-glass" style={{
          position: 'absolute', top: 'calc(100% + 0.35rem)', left: 0,
          width: '240px', padding: 0, zIndex: 1100,
          boxShadow: 'var(--shadow-lg)', animation: 'scaleUp 0.15s ease-out forwards',
          overflow: 'hidden'
        }} role="listbox" aria-label="Organizations">
          {/* Search */}
          <div style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-input)' }}>
              <Search size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search orgs..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '0.82rem' }}
                aria-label="Search organizations"
              />
            </div>
          </div>

          {/* Org List */}
          <div style={{ maxHeight: '220px', overflowY: 'auto', padding: '0.3rem' }}>
            {filtered.map(org => (
              <button
                key={org.id}
                onClick={() => handleSelect(org)}
                role="option"
                aria-selected={org.id === currentOrg.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.55rem',
                  width: '100%', padding: '0.5rem 0.55rem',
                  background: org.id === currentOrg.id ? 'rgba(99,102,241,0.1)' : 'transparent',
                  border: 'none', borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'background 0.15s ease',
                  fontSize: '0.84rem', color: 'var(--text-primary)'
                }}
              >
                <span style={{ fontSize: '1rem' }}>{org.logo}</span>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{org.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{org.memberCount} members</div>
                </div>
                {org.id === currentOrg.id && <Check size={14} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
