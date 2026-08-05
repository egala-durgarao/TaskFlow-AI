import React, { useState } from 'react';
import {
  ArrowLeft, Calendar, Clock, CheckSquare, MessageSquare, Paperclip,
  Send, User, Plus, Trash2, Edit, History, Tag, Link as LinkIcon
} from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { StatusBadge, PriorityBadge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { useTask } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const TaskDetailPage = () => {
  const { tasks, selectedTaskId, updateTask, navigateTo } = useTask();
  const { currentUser, role } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview');
  const [commentText, setCommentText] = useState('');
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  const task = tasks.find(t => t.id === selectedTaskId) || tasks[0];

  if (!task) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
        <h2>Task Not Found</h2>
        <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigateTo('tasks')}>Back to Tasks</button>
      </div>
    );
  }

  const isViewer = role === 'VIEWER';

  // Toggle Subtask Completion
  const handleToggleSubtask = (stId) => {
    if (isViewer) return;
    const updatedSubtasks = task.subtasks.map(st => st.id === stId ? { ...st, completed: !st.completed } : st);
    updateTask(task.id, { subtasks: updatedSubtasks });
    addToast('Subtask status updated.', 'info');
  };

  // Add Subtask
  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim() || isViewer) return;
    const newSt = { id: `st-${Date.now()}`, title: newSubtaskTitle, completed: false };
    const updatedSubtasks = [...(task.subtasks || []), newSt];
    updateTask(task.id, { subtasks: updatedSubtasks });
    setNewSubtaskTitle('');
    addToast('Added new subtask.', 'success');
  };

  // Add Comment
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim() || isViewer) return;
    const newComm = {
      id: `c-${Date.now()}`,
      user: currentUser,
      text: commentText,
      createdAt: 'Just now'
    };
    const updatedComments = [...(task.comments || []), newComm];
    updateTask(task.id, { comments: updatedComments });
    setCommentText('');
    addToast('Comment posted.', 'success');
  };

  const completedSubtasks = (task.subtasks || []).filter(st => st.completed).length;
  const totalSubtasks = (task.subtasks || []).length;
  const progressPercent = totalSubtasks === 0 ? 0 : Math.round((completedSubtasks / totalSubtasks) * 100);

  return (
    <div className="page-container fade-in-up">
      <div style={{ marginBottom: '1rem' }}>
        <Breadcrumb items={[{ label: 'Tasks', page: 'tasks' }, { label: task.title }]} />
      </div>

      {/* Top Header Controls */}
      <div className="page-header" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={() => navigateTo('tasks')} style={{ padding: '0.4rem 0.75rem' }}>
            <ArrowLeft size={16} /> Back
          </button>
          <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {task.projectName} • #{task.id}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <PriorityBadge priority={task.priority} />
          {!isViewer ? (
            <select
              className="form-select"
              style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
              value={task.status}
              onChange={(e) => {
                updateTask(task.id, { status: e.target.value });
                addToast('Task status updated', 'success');
              }}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="In Review">In Review</option>
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue</option>
            </select>
          ) : (
            <StatusBadge status={task.status} />
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        
        {/* Main Content Area (Left) */}
        <div style={{ flex: '1 1 60%', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div className="card-glass" style={{ padding: '1.5rem 1.5rem 0', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, paddingBottom: '1.25rem' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.85rem', color: 'var(--text-primary)', lineHeight: '1.3' }}>
                {task.title}
              </h1>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                {task.description}
              </p>
            </div>

            {/* Tab Bar */}
            <div className="tab-bar">
              <button className={`tab-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
                Overview
              </button>
              <button className={`tab-item ${activeTab === 'subtasks' ? 'active' : ''}`} onClick={() => setActiveTab('subtasks')}>
                Subtasks <span style={{ backgroundColor: 'var(--bg-elevated)', padding: '0.1rem 0.35rem', borderRadius: '4px', fontSize: '0.7rem' }}>{totalSubtasks}</span>
              </button>
              <button className={`tab-item ${activeTab === 'comments' ? 'active' : ''}`} onClick={() => setActiveTab('comments')}>
                Activity <span style={{ backgroundColor: 'var(--bg-elevated)', padding: '0.1rem 0.35rem', borderRadius: '4px', fontSize: '0.7rem' }}>{task.comments?.length || 0}</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="card-glass" style={{ padding: '1.5rem', minHeight: '300px' }}>
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="fade-in-up">
                <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem' }}>Task Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Progress</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ flex: 1, height: '6px', backgroundColor: 'var(--bg-elevated)', borderRadius: '3px' }}>
                        <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: 'var(--accent-primary)', borderRadius: '3px', transition: 'width 0.3s ease' }} />
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>{progressPercent}%</span>
                    </div>
                  </div>
                  
                  <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Estimated Time</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{task.loggedHours || 0}h / {task.estimatedHours || 0}h logged</div>
                  </div>
                </div>

                {task.attachments?.length > 0 && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Paperclip size={16} style={{ color: 'var(--text-muted)' }} /> Attachments
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                      {task.attachments.map(att => (
                        <div key={att.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}>
                          <span style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{att.name}</span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{att.size}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SUBTASKS TAB */}
            {activeTab === 'subtasks' && (
              <div className="fade-in-up">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Checklist</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{completedSubtasks} of {totalSubtasks} completed</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {(task.subtasks || []).map(st => (
                    <div key={st.id} style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)', opacity: st.completed ? 0.6 : 1,
                      transition: 'all 0.2s ease'
                    }}>
                      <input
                        type="checkbox"
                        checked={st.completed}
                        onChange={() => handleToggleSubtask(st.id)}
                        disabled={isViewer}
                        style={{ width: '16px', height: '16px', cursor: isViewer ? 'default' : 'pointer' }}
                      />
                      <span style={{ flex: 1, fontSize: '0.88rem', fontWeight: '500', textDecoration: st.completed ? 'line-through' : 'none' }}>
                        {st.title}
                      </span>
                    </div>
                  ))}
                  {(!task.subtasks || task.subtasks.length === 0) && (
                    <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>No subtasks created.</div>
                  )}
                </div>

                {!isViewer && (
                  <form onSubmit={handleAddSubtask} style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Add a new subtask..."
                      value={newSubtaskTitle}
                      onChange={e => setNewSubtaskTitle(e.target.value)}
                    />
                    <button type="submit" className="btn-secondary"><Plus size={16} /> Add</button>
                  </form>
                )}
              </div>
            )}

            {/* COMMENTS/ACTIVITY TAB */}
            {activeTab === 'comments' && (
              <div className="fade-in-up">
                <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem' }}>Activity Feed</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
                  {task.history?.map((h, i) => (
                    <div key={`h-${i}`} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}><History size={13} /></div>
                      <div style={{ fontSize: '0.84rem' }}>
                        <span style={{ fontWeight: '600' }}>{h.user?.name}</span> <span style={{ color: 'var(--text-secondary)' }}>{h.action}</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>{h.timestamp}</span>
                      </div>
                    </div>
                  ))}

                  {(task.comments || []).map(c => (
                    <div key={c.id} style={{ display: 'flex', gap: '0.75rem' }}>
                      <Avatar user={c.user} size="sm" />
                      <div style={{ flex: 1, backgroundColor: 'var(--bg-secondary)', padding: '0.85rem', borderRadius: '0 var(--radius-md) var(--radius-md) var(--radius-md)', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                          <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>{c.user.name}</span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{c.createdAt}</span>
                        </div>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>{c.text}</p>
                      </div>
                    </div>
                  ))}
                  
                  {!task.history && (!task.comments || task.comments.length === 0) && (
                    <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>No activity to show.</div>
                  )}
                </div>

                {!isViewer && (
                  <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Write a comment..."
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                    />
                    <button type="submit" className="btn-primary"><Send size={16} /></button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ flex: '1 1 30%', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div className="card-glass" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '1rem' }}>People</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Assignee</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.5rem 0', borderRadius: 'var(--radius-md)' }}>
                {task.assignee ? (
                  <>
                    <Avatar user={task.assignee} size="sm" showStatus />
                    <div style={{ fontWeight: '600', fontSize: '0.86rem' }}>{task.assignee.name}</div>
                  </>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.86rem' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={14} /></div>
                    Unassigned
                  </div>
                )}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Reporter</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.5rem 0' }}>
                <Avatar user={task.creator} size="sm" />
                <div style={{ fontWeight: '600', fontSize: '0.86rem' }}>{task.creator?.name || 'System'}</div>
              </div>
            </div>
          </div>

          <div className="card-glass" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '1rem' }}>Details</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={14} /> Due Date</span>
                <span style={{ fontSize: '0.82rem', fontWeight: '600', color: task.status === 'Overdue' ? 'var(--status-danger)' : 'var(--text-primary)' }}>{task.dueDate}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={14} /> Created</span>
                <span style={{ fontSize: '0.82rem', fontWeight: '600' }}>{task.history?.[0]?.timestamp || 'Unknown'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><FolderKanban size={14} /> Project</span>
                <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--accent-primary)', cursor: 'pointer' }} onClick={() => navigateTo('projects')}>{task.projectName}</span>
              </div>
            </div>
          </div>

          {(task.tags?.length > 0 || task.dependencies?.length > 0) && (
            <div className="card-glass" style={{ padding: '1.25rem' }}>
              {task.tags?.length > 0 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Tag size={13} /> Tags</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {task.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '0.72rem', fontWeight: '600', backgroundColor: 'var(--bg-elevated)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {task.dependencies?.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><LinkIcon size={13} /> Dependencies</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {task.dependencies.map(dep => (
                      <div key={dep} style={{ fontSize: '0.78rem', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: '500' }}>#{dep}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
