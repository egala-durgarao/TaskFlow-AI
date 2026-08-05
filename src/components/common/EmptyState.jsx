import React from 'react';
import { FolderKanban, CheckSquare, Bell, Search, Plus } from 'lucide-react';

export const EmptyState = ({ type = 'tasks', title, message, actionText, onAction }) => {
  const iconMap = {
    tasks: CheckSquare,
    projects: FolderKanban,
    notifications: Bell,
    search: Search
  };

  const Icon = iconMap[type] || CheckSquare;

  return (
    <div className="card-glass" style={{
      padding: '4rem 2rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '520px',
      margin: '2rem auto'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'rgba(99, 102, 241, 0.12)',
        color: 'var(--accent-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.25rem',
        border: '1px solid rgba(99, 102, 241, 0.25)'
      }}>
        <Icon size={32} />
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
        {title || (type === 'tasks' ? 'No tasks found' : type === 'projects' ? 'No projects yet' : 'All caught up!')}
      </h3>

      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', maxWidth: '380px', marginBottom: '1.5rem' }}>
        {message || (type === 'tasks' ? 'You don\'t have any tasks matching this view.' : 'Create your first project to organize backlog deliverables.')}
      </p>

      {actionText && onAction && (
        <button className="btn-primary" onClick={onAction}>
          <Plus size={16} /> {actionText}
        </button>
      )}
    </div>
  );
};
