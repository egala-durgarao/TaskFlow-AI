import React from 'react';

export const StatusBadge = ({ status }) => {
  let badgeClass = 'badge-secondary';

  switch (status?.toLowerCase()) {
    case 'completed':
    case 'done':
      badgeClass = 'badge-success';
      break;
    case 'in progress':
      badgeClass = 'badge-info';
      break;
    case 'in review':
      badgeClass = 'badge-warning';
      break;
    case 'overdue':
      badgeClass = 'badge-danger';
      break;
    case 'to do':
    case 'planning':
      badgeClass = 'badge-secondary';
      break;
    default:
      badgeClass = 'badge-secondary';
  }

  return (
    <span className={`badge ${badgeClass}`}>
      <span className="badge-dot"></span>
      {status}
    </span>
  );
};

export const PriorityBadge = ({ priority }) => {
  let color = '#94a3b8';
  let bg = 'rgba(148, 163, 184, 0.12)';

  switch (priority?.toLowerCase()) {
    case 'urgent':
      color = '#ef4444';
      bg = 'rgba(239, 68, 68, 0.15)';
      break;
    case 'high':
      color = '#f59e0b';
      bg = 'rgba(245, 158, 11, 0.15)';
      break;
    case 'medium':
      color = '#6366f1';
      bg = 'rgba(99, 102, 241, 0.15)';
      break;
    case 'low':
      color = '#10b981';
      bg = 'rgba(16, 185, 129, 0.15)';
      break;
    default:
      break;
  }

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.35rem',
      padding: '0.2rem 0.55rem',
      borderRadius: '6px',
      fontSize: '0.75rem',
      fontWeight: '600',
      color: color,
      backgroundColor: bg,
      border: `1px solid ${color}33`
    }}>
      {priority}
    </span>
  );
};
