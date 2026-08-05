import React from 'react';
import { TaskCard } from './TaskCard';
import { Plus, MoreHorizontal } from 'lucide-react';
import { useTask } from '../../context/TaskContext';

export const TaskKanban = ({ tasks, onSelectTask, onAddTask }) => {
  const { updateTaskStatus } = useTask();

  const columns = [
    { id: 'To Do', title: 'To Do', color: '#8b5cf6' },
    { id: 'In Progress', title: 'In Progress', color: '#6366f1' },
    { id: 'In Review', title: 'In Review', color: '#06b6d4' },
    { id: 'Completed', title: 'Completed', color: '#10b981' }
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      updateTaskStatus(taskId, targetStatus);
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.25rem',
      alignItems: 'start'
    }}>
      {columns.map(col => {
        const colTasks = tasks.filter(t => t.status === col.id || (col.id === 'To Do' && t.status === 'Overdue'));

        return (
          <div
            key={col.id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col.id)}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              minHeight: '520px'
            }}
          >
            {/* Column Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: col.color }} />
                <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)' }}>{col.title}</h3>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-secondary)',
                  padding: '0.1rem 0.5rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)'
                }}>
                  {colTasks.length}
                </span>
              </div>

              <button
                onClick={() => onAddTask(col.id)}
                className="btn-icon"
                style={{ width: '28px', height: '28px' }}
                title={`Add Task to ${col.title}`}
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Tasks Container */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
              {colTasks.length === 0 ? (
                <div style={{
                  padding: '2.5rem 1rem',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                  fontSize: '0.82rem',
                  border: '2px dashed var(--border-color)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  Drop tasks here
                </div>
              ) : (
                colTasks.map(t => (
                  <div
                    key={t.id}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('taskId', t.id)}
                  >
                    <TaskCard task={t} onSelect={onSelectTask} />
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
