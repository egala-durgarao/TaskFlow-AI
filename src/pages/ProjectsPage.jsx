import React, { useState } from 'react';
import { Plus, Search, Filter, FolderKanban, LayoutGrid, List } from 'lucide-react';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectModal } from '../components/projects/ProjectModal';
import { useTask } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';

export const ProjectsPage = () => {
  const { projects } = useTask();
  const { role, currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.key.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="page-title-group">
          <h1>
            <FolderKanban size={26} style={{ color: 'var(--accent-primary)' }} />
            {role === 'ADMIN' ? 'All Projects' : 'My Projects'}
          </h1>
          <p>{role === 'ADMIN' ? 'All projects across the organization.' : 'Manage workspaces, team assignments, and milestones.'}</p>
        </div>

        {role !== 'MEMBER' && (
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> Create Project
          </button>
        )}
      </div>

      {/* Controls Bar */}
      <div className="card-glass" style={{ padding: '1rem 1.25rem', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        {/* Search */}
        <div className="search-box" style={{ maxWidth: '300px' }}>
          <Search size={16} />
          <input
            type="text"
            className="form-control"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters & View Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Category:</span>
            <select
              className="form-select"
              style={{ padding: '0.45rem 0.8rem', fontSize: '0.85rem', width: 'auto' }}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Engineering">Engineering</option>
              <option value="AI & Data">AI & Data</option>
              <option value="Security">Security</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Status:</span>
            <select
              className="form-select"
              style={{ padding: '0.45rem 0.8rem', fontSize: '0.85rem', width: 'auto' }}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="In Progress">In Progress</option>
              <option value="Planning">Planning</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.25rem', backgroundColor: 'var(--bg-elevated)', padding: '0.2rem', borderRadius: 'var(--radius-md)' }}>
            <button
              onClick={() => setViewMode('grid')}
              className="btn-icon"
              style={{ width: '32px', height: '32px', border: 'none', backgroundColor: viewMode === 'grid' ? 'var(--bg-card)' : 'transparent', color: viewMode === 'grid' ? 'var(--accent-primary)' : 'var(--text-muted)' }}
              title="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className="btn-icon"
              style={{ width: '32px', height: '32px', border: 'none', backgroundColor: viewMode === 'list' ? 'var(--bg-card)' : 'transparent', color: viewMode === 'list' ? 'var(--accent-primary)' : 'var(--text-muted)' }}
              title="List View"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid / List Display */}
      {filteredProjects.length === 0 ? (
        <div className="card-glass" style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <FolderKanban size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
          <h3>No projects found</h3>
          <p style={{ fontSize: '0.9rem', marginTop: '0.35rem' }}>Try clearing filters or search query to see all active projects.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr',
          gap: '1.5rem'
        }}>
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* Create Project Modal */}
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
