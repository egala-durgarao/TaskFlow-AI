import React from 'react';
import { Calendar, CheckSquare, Users, ArrowUpRight } from 'lucide-react';
import { StatusBadge, PriorityBadge } from '../common/Badge';
import { Avatar } from '../common/Avatar';
import { useTask } from '../../context/TaskContext';

export const ProjectCard = ({ project }) => {
  const { navigateTo } = useTask();

  return (
    <div
      className="card-glass interactive"
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer' }}
      onClick={() => navigateTo('tasks')}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: project.color || 'var(--accent-primary)'
          }} />
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            {project.key}
          </span>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>{project.name}</span>
          <ArrowUpRight size={18} style={{ color: 'var(--text-muted)' }} />
        </h3>
        <p style={{
          fontSize: '0.82rem',
          color: 'var(--text-secondary)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: '1.45'
        }}>
          {project.description}
        </p>
      </div>

      {/* Progress Bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.35rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Progress</span>
          <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{project.progress}%</span>
        </div>
        <div style={{ width: '100%', height: '7px', borderRadius: '10px', backgroundColor: 'var(--bg-elevated)', overflow: 'hidden' }}>
          <div style={{
            width: `${project.progress}%`,
            height: '100%',
            borderRadius: '10px',
            background: `linear-gradient(90deg, ${project.color || 'var(--accent-primary)'}, var(--accent-secondary))`,
            transition: 'width 0.4s ease'
          }} />
        </div>
      </div>

      {/* Card Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '0.75rem',
        borderTop: '1px solid var(--border-color)',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <CheckSquare size={14} /> {project.completedCount}/{project.tasksCount} Tasks
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Calendar size={14} /> {project.dueDate}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          {project.members && project.members.map((m, idx) => (
            <div key={idx} style={{ marginLeft: idx > 0 ? '-8px' : 0 }}>
              <Avatar user={m} size="sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
