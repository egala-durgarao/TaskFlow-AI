import React from 'react';
import { Zap, Globe, Share2, MessageCircle, Heart } from 'lucide-react';
import { useTask } from '../../context/TaskContext';

export const Footer = () => {
  const { navigateTo } = useTask();

  return (
    <footer style={{
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      padding: '3rem 2rem 2rem',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          {/* Col 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <Zap size={18} />
              </div>
              <span style={{ fontWeight: '800', fontSize: '1.2rem' }}>TaskFlow AI</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6' }}>
              Enterprise smart team task management platform. Plan, track, and ship high-impact software faster with AI assistance.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li><button onClick={() => navigateTo('dashboard')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Dashboard</button></li>
              <li><button onClick={() => navigateTo('projects')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Projects Hub</button></li>
              <li><button onClick={() => navigateTo('tasks')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Task Management</button></li>
              <li><button onClick={() => navigateTo('reports')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Analytics & Reports</button></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Solutions</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li>Software Companies</li>
              <li>Startups & Agile Teams</li>
              <li>Students & Academics</li>
              <li>Freelancers & Agency</li>
              <li>Small Business Operations</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Connect</h4>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
              <button className="btn-icon" title="Community Hub"><Globe size={18} /></button>
              <button className="btn-icon" title="Social Channels"><Share2 size={18} /></button>
              <button className="btn-icon" title="Developer Support"><MessageCircle size={18} /></button>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} TaskFlow AI Platform. All rights reserved.
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
          Engineered with precision for modern SaaS teams. Built with React, Vite & Modern CSS.
        </div>
      </div>
    </footer>
  );
};
