import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useTask } from '../../context/TaskContext';
import { useToast } from '../../context/ToastContext';
import { MOCK_USERS } from '../../data/mockData';

export const ProjectModal = ({ isOpen, onClose }) => {
  const { addProject } = useTask();
  const { addToast } = useToast();

  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Engineering');
  const [priority, setPriority] = useState('High');
  const [dueDate, setDueDate] = useState('2026-09-30');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addProject({
      name,
      key: key.toUpperCase() || name.substring(0, 4).toUpperCase(),
      description,
      category,
      priority,
      status: 'In Progress',
      dueDate,
      lead: MOCK_USERS[0],
      members: [MOCK_USERS[0], MOCK_USERS[1]]
    });

    addToast(`Project "${name}" created successfully!`, 'success');
    onClose();
    // Reset form
    setName('');
    setKey('');
    setDescription('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Project"
      maxWidth="560px"
      footer={
        <>
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit}>Create Project</button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Project Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. NextGen Mobile App"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!key) setKey(e.target.value.substring(0, 4).toUpperCase());
              }}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Project Key *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. NMA"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            placeholder="Outline the core deliverables, architecture goals, and milestone deadlines..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Engineering">Engineering</option>
              <option value="AI & Data">AI & Data</option>
              <option value="Design">Design</option>
              <option value="Security">Security</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Priority</label>
            <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Target Due Date</label>
            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};
