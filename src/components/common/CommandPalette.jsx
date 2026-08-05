import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search, LayoutDashboard, FolderKanban, CheckSquare, BarChart3,
  Users, Calendar, Activity, Settings, Bell, User, Plus, Sun, Moon,
  Zap, ArrowRight, Hash
} from 'lucide-react';
import { useTask } from '../../context/TaskContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const ALL_COMMANDS = [
  // Navigation
  { id: 'nav-dash', label: 'Go to Dashboard', section: 'Navigation', icon: LayoutDashboard, action: 'navigate', target: 'dashboard', shortcut: 'D' },
  { id: 'nav-proj', label: 'Go to Projects', section: 'Navigation', icon: FolderKanban, action: 'navigate', target: 'projects', shortcut: 'P' },
  { id: 'nav-tasks', label: 'Go to Tasks', section: 'Navigation', icon: CheckSquare, action: 'navigate', target: 'tasks', shortcut: 'T' },
  { id: 'nav-teams', label: 'Go to Teams', section: 'Navigation', icon: Users, action: 'navigate', target: 'teams' },
  { id: 'nav-cal', label: 'Go to Calendar', section: 'Navigation', icon: Calendar, action: 'navigate', target: 'calendar' },
  { id: 'nav-activity', label: 'Go to Activity', section: 'Navigation', icon: Activity, action: 'navigate', target: 'activity' },
  { id: 'nav-reports', label: 'Go to Reports', section: 'Navigation', icon: BarChart3, action: 'navigate', target: 'reports' },
  { id: 'nav-notif', label: 'Go to Notifications', section: 'Navigation', icon: Bell, action: 'navigate', target: 'notifications' },
  { id: 'nav-profile', label: 'Go to Profile', section: 'Navigation', icon: User, action: 'navigate', target: 'profile' },
  { id: 'nav-settings', label: 'Go to Settings', section: 'Navigation', icon: Settings, action: 'navigate', target: 'settings' },

  // Quick Actions
  { id: 'act-new-task', label: 'Create New Task', section: 'Quick Actions', icon: Plus, action: 'navigate', target: 'createtask', shortcut: 'C' },
  { id: 'act-theme', label: 'Toggle Theme', section: 'Quick Actions', icon: Sun, action: 'theme' },
];

export const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const { navigateTo, tasks, projects } = useTask();
  const { role } = useAuth();
  const { toggleTheme } = useTheme();

  // Build dynamic items from data
  const dynamicItems = [
    ...projects.map(p => ({
      id: `proj-${p.id}`, label: p.name, section: 'Projects',
      icon: FolderKanban, action: 'navigate', target: 'projects',
      detail: p.status
    })),
    ...tasks.slice(0, 6).map(t => ({
      id: `task-${t.id}`, label: t.title, section: 'Tasks',
      icon: CheckSquare, action: 'navigate-task', target: t.id,
      detail: t.status
    }))
  ];

  const allItems = [...ALL_COMMANDS, ...dynamicItems];

  // Filter by query
  const filtered = query.trim()
    ? allItems.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.section.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_COMMANDS; // Show commands only when no query

  // Group by section
  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  const flatItems = filtered;

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setFocusedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setFocusedIndex(0);
  }, [query]);

  const executeItem = useCallback((item) => {
    if (item.action === 'navigate') {
      navigateTo(item.target);
    } else if (item.action === 'navigate-task') {
      navigateTo('taskdetail', item.target);
    } else if (item.action === 'theme') {
      toggleTheme();
    }
    onClose();
  }, [navigateTo, toggleTheme, onClose]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => Math.min(prev + 1, flatItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && flatItems[focusedIndex]) {
      e.preventDefault();
      executeItem(flatItems[focusedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cmd-backdrop" onClick={onClose} role="dialog" aria-label="Command Palette" aria-modal="true">
      <div className="cmd-box" onClick={e => e.stopPropagation()}>
        {/* Search Input */}
        <div className="cmd-input-wrap">
          <Search size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search commands, pages, tasks, projects..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Command search"
          />
          <span className="kbd">ESC</span>
        </div>

        {/* Results */}
        <div ref={listRef} style={{ maxHeight: '340px', overflowY: 'auto', padding: '0.35rem 0' }} role="listbox">
          {flatItems.length === 0 ? (
            <div style={{ padding: '2rem 1.25rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              No results found for "{query}"
            </div>
          ) : (
            Object.entries(grouped).map(([section, items]) => (
              <div key={section}>
                <div className="cmd-section-label">{section}</div>
                {items.map((item) => {
                  const Icon = item.icon;
                  const globalIndex = flatItems.indexOf(item);
                  const isFocused = globalIndex === focusedIndex;
                  return (
                    <button
                      key={item.id}
                      className={`cmd-item ${isFocused ? 'focused' : ''}`}
                      onClick={() => executeItem(item)}
                      role="option"
                      aria-selected={isFocused}
                    >
                      <div className="cmd-icon"><Icon size={16} /></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '500' }}>{item.label}</div>
                        {item.detail && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{item.detail}</div>
                        )}
                      </div>
                      {item.shortcut && (
                        <div className="cmd-shortcut">
                          <span className="kbd">{item.shortcut}</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '0.5rem 1.25rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: '0.72rem', color: 'var(--text-muted)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span><span className="kbd">↑↓</span> Navigate</span>
            <span><span className="kbd">↵</span> Select</span>
            <span><span className="kbd">ESC</span> Close</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Zap size={12} /> TaskFlow AI
          </div>
        </div>
      </div>
    </div>
  );
};
