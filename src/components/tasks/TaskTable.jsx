import React, { useState } from 'react';
import { Eye, Edit, Trash2, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { StatusBadge, PriorityBadge } from '../common/Badge';
import { Avatar } from '../common/Avatar';
import { useTask } from '../../context/TaskContext';

export const TaskTable = ({ tasks, onViewTask, onEditTask, onDeleteTask }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [sortField, setSortField] = useState('dueDate');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    let aVal = a[sortField] || '';
    let bVal = b[sortField] || '';
    if (sortDirection === 'asc') return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });

  const totalPages = Math.ceil(sortedTasks.length / pageSize) || 1;
  const paginatedTasks = sortedTasks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  Task Title <ArrowUpDown size={13} />
                </div>
              </th>
              <th>Project</th>
              <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  Status <ArrowUpDown size={13} />
                </div>
              </th>
              <th onClick={() => handleSort('priority')} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  Priority <ArrowUpDown size={13} />
                </div>
              </th>
              <th onClick={() => handleSort('dueDate')} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  Due Date <ArrowUpDown size={13} />
                </div>
              </th>
              <th>Assignee</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTasks.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No tasks found matching current filter rules.
                </td>
              </tr>
            ) : (
              paginatedTasks.map(t => (
                <tr key={t.id}>
                  <td>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{t.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: #{t.id}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.82rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
                      {t.projectName}
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={t.status} />
                  </td>
                  <td>
                    <PriorityBadge priority={t.priority} />
                  </td>
                  <td>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t.dueDate}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <Avatar user={t.assignee} size="sm" />
                      <span style={{ fontSize: '0.82rem', fontWeight: '500' }}>{t.assignee?.name || 'Unassigned'}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <button
                        onClick={() => onViewTask(t.id)}
                        className="btn-icon"
                        style={{ width: '30px', height: '30px' }}
                        title="View Details"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => onEditTask(t)}
                        className="btn-icon"
                        style={{ width: '30px', height: '30px' }}
                        title="Edit Task"
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        onClick={() => onDeleteTask(t.id)}
                        className="btn-icon"
                        style={{ width: '30px', height: '30px', color: 'var(--status-danger)' }}
                        title="Delete Task"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.2rem' }}>
        <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          Showing <b>{paginatedTasks.length}</b> of <b>{tasks.length}</b> tasks
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="btn-secondary"
            style={{ padding: '0.4rem 0.75rem', opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <span style={{ fontSize: '0.85rem', fontWeight: '600', padding: '0 0.5rem' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="btn-secondary"
            style={{ padding: '0.4rem 0.75rem', opacity: currentPage === totalPages ? 0.5 : 1 }}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
