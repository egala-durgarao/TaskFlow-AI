import React, { useState } from 'react';
import {
  Activity, CheckCircle2, Plus, MessageSquare, UserPlus,
  Settings, Zap, GitPullRequest, Rocket, Filter
} from 'lucide-react';
import { Avatar } from '../components/common/Avatar';
import { useTask } from '../context/TaskContext';

const ICON_MAP = {
  status: GitPullRequest,
  create: Plus,
  complete: CheckCircle2,
  comment: MessageSquare,
  user: UserPlus,
  sprint: Rocket,
  review: GitPullRequest,
  settings: Settings
};

const ICON_COLOR_MAP = {
  status: '#6366f1',
  create: '#10b981',
  complete: '#10b981',
  comment: '#06b6d4',
  user: '#8b5cf6',
  sprint: '#f59e0b',
  review: '#06b6d4',
  settings: '#64748b'
};

export const ActivityPage = () => {
  const { activities } = useTask();
  const [filterType, setFilterType] = useState('All');

  const filterOptions = ['All', 'Tasks', 'Projects', 'Comments', 'Users'];

  const filtered = activities.filter(act => {
    if (filterType === 'All') return true;
    if (filterType === 'Tasks') return ['status', 'create', 'complete', 'review'].includes(act.icon);
    if (filterType === 'Projects') return ['sprint', 'create'].includes(act.icon) && act.target?.includes('Sprint');
    if (filterType === 'Comments') return act.icon === 'comment';
    if (filterType === 'Users') return act.icon === 'user';
    return true;
  });

  // Group by timeline
  const groups = {};
  filtered.forEach(act => {
    const group = act.group || 'Earlier';
    if (!groups[group]) groups[group] = [];
    groups[group].push(act);
  });

  const groupOrder = ['Today', 'Yesterday', 'Earlier'];

  return (
    <div className="page-container fade-in-up" style={{ maxWidth: '900px' }}>
      {/* Header */}
      <div className="page-header">
        <div className="page-title-group">
          <h1>
            <Activity size={26} style={{ color: 'var(--accent-primary)' }} />
            Activity Timeline
          </h1>
          <p>A chronological feed of all actions across your workspace.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card-glass" style={{ padding: '0.6rem 1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Filter size={14} style={{ color: 'var(--text-muted)' }} />
        {filterOptions.map(opt => (
          <button
            key={opt}
            onClick={() => setFilterType(opt)}
            className={filterType === opt ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '0.3rem 0.7rem', fontSize: '0.8rem' }}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Timeline */}
      {groupOrder.map(groupName => {
        const items = groups[groupName];
        if (!items || items.length === 0) return null;

        return (
          <div key={groupName} style={{ marginBottom: '1.75rem' }}>
            <h3 style={{
              fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-muted)',
              textTransform: 'uppercase', letterSpacing: '0.05em',
              marginBottom: '0.75rem', paddingLeft: '0.5rem'
            }}>
              {groupName}
            </h3>

            <div>
              {items.map(act => {
                const IconComp = ICON_MAP[act.icon] || Zap;
                const iconColor = ICON_COLOR_MAP[act.icon] || 'var(--accent-primary)';

                return (
                  <div key={act.id} className="timeline-item">
                    <div className="timeline-dot" style={{ borderColor: iconColor, backgroundColor: `${iconColor}22` }}>
                      <IconComp size={10} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: iconColor }} />
                    </div>

                    <div className="card-glass" style={{ padding: '0.8rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                        <Avatar user={act.user} size="xs" />
                        <div style={{ flex: 1 }}>
                          <span style={{ fontWeight: '600', fontSize: '0.86rem' }}>{act.user?.name}</span>
                          <span style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}> {act.action} </span>
                          <span style={{ fontWeight: '600', fontSize: '0.86rem', color: 'var(--accent-primary)' }}>"{act.target}"</span>
                        </div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>{act.timestamp}</span>
                      </div>
                      {act.detail && (
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0.15rem 0 0 2.35rem' }}>{act.detail}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <div className="card-glass" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
          <Activity size={42} style={{ color: 'var(--text-muted)', opacity: 0.3, marginBottom: '0.75rem' }} />
          <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.25rem' }}>No activity found</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Try changing your filter to see more results.</p>
        </div>
      )}
    </div>
  );
};
