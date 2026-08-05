import React, { useState } from 'react';
import { Plus, Search, Filter, LayoutGrid, Table, CheckSquare, Inbox } from 'lucide-react';
import { TaskKanban } from '../components/tasks/TaskKanban';
import { TaskTable } from '../components/tasks/TaskTable';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { Modal } from '../components/common/Modal';
import { useTask } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const TasksPage = () => {
  const { tasks, deleteTask, updateTask, navigateTo } = useTask();
  const { role, currentUser } = useAuth();
  const { addToast } = useToast();

  // MEMBER only sees their assigned tasks
  const visibleTasks = role === 'MEMBER'
    ? tasks.filter(t => t.assignee?.id === currentUser.id)
    : tasks;

  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'table'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Modal & Edit Dialog states
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = visibleTasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleDeleteConfirm = () => {
    if (deleteTargetId) {
      deleteTask(deleteTargetId);
      addToast('Task deleted successfully.', 'danger');
      setDeleteTargetId(null);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      updateTask(editingTask.id, editingTask);
      addToast(`Task "${editingTask.title}" updated successfully!`, 'success');
      setEditingTask(null);
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="page-title-group">
          <h1>
            <CheckSquare size={26} style={{ color: 'var(--accent-primary)' }} />
            {role === 'MEMBER' ? 'My Tasks' : 'Task Management Hub'}
          </h1>
          <p>{role === 'MEMBER' ? 'Tasks assigned to you across all projects.' : 'Organize backlog issues, assign team members, and track sprint execution.'}</p>
        </div>

        {role !== 'MEMBER' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button className="btn-primary" onClick={() => navigateTo('createtask')}>
              <Plus size={18} /> New Task
            </button>
          </div>
        )}
      </div>

      {/* Controls & Filter Bar */}
      <div className="card-glass" style={{ padding: '1rem 1.25rem', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        {/* Search Input */}
        <div className="search-box" style={{ maxWidth: '320px' }}>
          <Search size={16} />
          <input
            type="text"
            className="form-control"
            placeholder="Search by title, project, description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Multi-Filters & Kanban / Table Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Status:</span>
            <select
              className="form-select"
              style={{ padding: '0.45rem 0.8rem', fontSize: '0.85rem', width: 'auto' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="In Review">In Review</option>
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Priority:</span>
            <select
              className="form-select"
              style={{ padding: '0.45rem 0.8rem', fontSize: '0.85rem', width: 'auto' }}
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.25rem', backgroundColor: 'var(--bg-elevated)', padding: '0.2rem', borderRadius: 'var(--radius-md)' }}>
            <button
              onClick={() => setViewMode('kanban')}
              className="btn-icon"
              style={{ width: '34px', height: '34px', border: 'none', backgroundColor: viewMode === 'kanban' ? 'var(--bg-card)' : 'transparent', color: viewMode === 'kanban' ? 'var(--accent-primary)' : 'var(--text-muted)' }}
              title="Kanban Board View"
            >
              <LayoutGrid size={17} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className="btn-icon"
              style={{ width: '34px', height: '34px', border: 'none', backgroundColor: viewMode === 'table' ? 'var(--bg-card)' : 'transparent', color: viewMode === 'table' ? 'var(--accent-primary)' : 'var(--text-muted)' }}
              title="Data Table View"
            >
              <Table size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      {filteredTasks.length === 0 ? (
        <div className="card-glass" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
          <Inbox size={48} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem', opacity: 0.4 }} />
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.3rem' }}>No tasks found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            {searchQuery || statusFilter !== 'All' || priorityFilter !== 'All'
              ? 'Try adjusting your search or filters.'
              : role === 'MEMBER' ? 'No tasks have been assigned to you yet.' : 'Create your first task to get started.'}
          </p>
          {role !== 'MEMBER' && !searchQuery && statusFilter === 'All' && priorityFilter === 'All' && (
            <button className="btn-primary" onClick={() => navigateTo('createtask')} style={{ marginTop: '1rem' }}>
              <Plus size={16} /> Create Task
            </button>
          )}
        </div>
      ) : viewMode === 'kanban' ? (
        <TaskKanban
          tasks={filteredTasks}
          onSelectTask={(id) => navigateTo('taskdetail', id)}
          onAddTask={() => navigateTo('createtask')}
        />
      ) : (
        <TaskTable
          tasks={filteredTasks}
          onViewTask={(id) => navigateTo('taskdetail', id)}
          onEditTask={(task) => setEditingTask(task)}
          onDeleteTask={(id) => setDeleteTargetId(id)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        message="Are you sure you want to permanently delete this task? This action cannot be undone."
      />

      {/* Quick Edit Task Modal */}
      {editingTask && (
        <Modal
          isOpen={true}
          onClose={() => setEditingTask(null)}
          title="Edit Task"
          footer={
            <>
              <button className="btn-secondary" onClick={() => setEditingTask(null)}>Cancel</button>
              <button className="btn-primary" onClick={handleEditSubmit}>Save Changes</button>
            </>
          }
        >
          <form onSubmit={handleEditSubmit}>
            <div className="form-group">
              <label className="form-label">Task Title</label>
              <input
                type="text"
                className="form-control"
                value={editingTask.title}
                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={editingTask.description}
                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={editingTask.status}
                  onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="In Review">In Review</option>
                  <option value="Completed">Completed</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  className="form-select"
                  value={editingTask.priority}
                  onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                >
                  <option value="Urgent">Urgent</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
