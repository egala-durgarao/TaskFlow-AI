import React from 'react';
import { Calendar, Clock, CheckCircle2, MessageSquare, Paperclip, MoreVertical, Eye, Trash2 } from 'lucide-react';
import { StatusBadge, PriorityBadge } from '../common/Badge';
import { Avatar } from '../common/Avatar';
import { useTask } from '../../context/TaskContext';

export const TaskCard = ({ task, onSelect, onDelete }) => {
  const { navigateTo } = useTask();

  const subtasksDone = task.subtasks ? task.subtasks.filter(st => st.completed).length : 0;
  const subtasksTotal = task.subtasks ? task.subtasks.length : 0;

  return (
    <div
      className="card-glass interactive"
      style={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        cursor: 'pointer',
        borderLeft: task.priority === 'Urgent' ? '3px solid var(--status-danger)' :
                   task.priority === 'High' ? '3px solid var(--status-warning)' : '1px solid var(--border-color)'
      }}
      onClick={() => onSelect ? onSelect(task.id) : navigateTo('taskdetail', task.id)}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {task.projectName}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <PriorityBadge priority={task.priority} />
        </div>
      </div>

      {/* Title & Description */}
      <div>
        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.35rem', lineHeight: '1.35' }}>
          {task.title}
        </h4>
        <p style={{
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: '1.4'
        }}>
          {task.description}
        </p>
      </div>

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
          {task.tags.map((tag, i) => (
            <span key={i} style={{
              fontSize: '0.7rem',
              fontWeight: '500',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-muted)',
              padding: '0.15rem 0.45rem',
              borderRadius: '4px',
              border: '1px solid var(--border-color)'
            }}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Bottom Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '0.6rem',
        borderTop: '1px solid var(--border-color)',
        fontSize: '0.78rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {subtasksTotal > 0 && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: subtasksDone === subtasksTotal ? 'var(--status-success)' : 'inherit' }}>
              <CheckCircle2 size={13} /> {subtasksDone}/{subtasksTotal}
            </span>
          )}
          {task.comments && task.comments.length > 0 && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <MessageSquare size={13} /> {task.comments.length}
            </span>
          )}
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <Calendar size={13} /> {task.dueDate}
          </span>
        </div>

        <Avatar user={task.assignee} size="sm" />
      </div>
    </div>
  );
};
