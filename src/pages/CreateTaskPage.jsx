import React, { useState } from 'react';
import { CheckSquare, ArrowLeft, Save, Sparkles } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { useTask } from '../context/TaskContext';
import { useToast } from '../context/ToastContext';
import { MOCK_USERS } from '../data/mockData';

export const CreateTaskPage = () => {
  const { projects, addTask, navigateTo } = useTask();
  const { addToast } = useToast();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState(projects[0]?.id || 'proj-1');
  const [status, setStatus] = useState('In Progress');
  const [priority, setPriority] = useState('High');
  const [category, setCategory] = useState('Frontend');
  const [assigneeId, setAssigneeId] = useState(MOCK_USERS[0].id);
  const [dueDate, setDueDate] = useState('2026-08-15');
  const [estimatedHours, setEstimatedHours] = useState(12);
  const [tags, setTags] = useState('UI, Component, React');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const selectedProj = projects.find(p => p.id === projectId);
    const selectedAssignee = MOCK_USERS.find(u => u.id === assigneeId);

    addTask({
      title,
      description,
      projectId,
      projectName: selectedProj ? selectedProj.name : 'General Project',
      status,
      priority,
      category,
      assignee: selectedAssignee,
      dueDate,
      estimatedHours: Number(estimatedHours),
      tags
    });

    addToast(`Task "${title}" created successfully!`, 'success');
    navigateTo('tasks');
  };

  return (
    <div className="page-container" style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <Breadcrumb items={[{ label: 'Tasks', page: 'tasks' }, { label: 'Create New Task' }]} />
      </div>

      <div className="page-header">
        <div className="page-title-group">
          <h1>
            <CheckSquare size={26} style={{ color: 'var(--accent-primary)' }} />
            Create New Task
          </h1>
          <p>Fill out task details, assign team members, and configure priority milestones.</p>
        </div>

        <button className="btn-secondary" onClick={() => navigateTo('tasks')}>
          <ArrowLeft size={16} /> Cancel
        </button>
      </div>

      <div className="card-glass" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form-group">
            <label className="form-label">Task Title *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Implement Dark Glassmorphic Design Tokens in CSS"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Project & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Project *</label>
              <select
                className="form-select"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.key})</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="AI & Data">AI & Data</option>
                <option value="Design">Design</option>
                <option value="Security">Security</option>
                <option value="Product">Product</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Task Description</label>
            <textarea
              className="form-control"
              placeholder="Provide context, acceptance criteria, technical requirements, or link design assets..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          {/* Status & Priority & Assignee */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Initial Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Assigned User</label>
              <select
                className="form-select"
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
              >
                {MOCK_USERS.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Due Date & Estimated Hours & Tags */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Target Due Date</label>
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Estimated Hours</label>
              <input
                type="number"
                className="form-control"
                value={estimatedHours}
                onChange={(e) => setEstimatedHours(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tags (comma separated)</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Design, CSS, HighPriority"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
            <button type="button" className="btn-secondary" onClick={() => navigateTo('tasks')}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Save size={16} /> Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
