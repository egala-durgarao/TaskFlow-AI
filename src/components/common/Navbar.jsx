import React, { useState, useEffect, useRef } from 'react';
import { Search, Sun, Moon, Bell, Sparkles, Menu, Plus, Shield, Users, UserCheck, ChevronDown, X, Eye } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useTask } from '../../context/TaskContext';
import { useToast } from '../../context/ToastContext';
import { Avatar } from './Avatar';

const ROLE_OPTIONS = [
  { role: 'ADMIN', label: 'Admin', icon: Shield, color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
  { role: 'MANAGER', label: 'Manager', icon: Users, color: '#6366f1', bg: 'rgba(99,102,241,0.12)' },
  { role: 'MEMBER', label: 'Member', icon: UserCheck, color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
  { role: 'VIEWER', label: 'Viewer', icon: Eye, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' }
];

export const Navbar = ({ toggleMobileSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, role, switchRole } = useAuth();
  const { notifications, markNotificationRead, markAllNotificationsRead, navigateTo } = useTask();
  const { addToast } = useToast();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const roleRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfileMenu(false);
      if (roleRef.current && !roleRef.current.contains(e.target)) setShowRoleSwitcher(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadNotifications = notifications.filter(n => !n.read);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addToast(`Searching for "${searchQuery}"...`, 'info');
      navigateTo('tasks');
    }
  };

  const handleAICopilot = () => {
    addToast('TaskFlow AI: Analyzed 24 tasks. 3 urgent issues require team review.', 'info', 4500);
  };

  const handleSwitchRole = (r) => {
    switchRole(r.role);
    setShowRoleSwitcher(false);
    addToast(`Switched to ${r.label} view`, 'success');
    navigateTo('dashboard');
  };

  const currentRoleOption = ROLE_OPTIONS.find(r => r.role === role) || ROLE_OPTIONS[1];

  return (
    <header style={{
      height: 'var(--navbar-height)',
      backgroundColor: 'var(--glass-bg)',
      backdropFilter: 'var(--backdrop-blur)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 800,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.5rem',
      gap: '0.75rem'
    }}>
      {/* Left: Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, maxWidth: '440px' }}>
        <button onClick={toggleMobileSidebar} className="btn-icon" style={{ display: 'flex' }}>
          <Menu size={20} />
        </button>
        <form onSubmit={handleSearchSubmit} className="search-box">
          <Search size={16} />
          <input
            type="text"
            className="form-control"
            placeholder="Search tasks, projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        {/* Role Switcher Pill */}
        <div ref={roleRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.35rem 0.7rem', borderRadius: 'var(--radius-full)',
              backgroundColor: currentRoleOption.bg,
              border: `1px solid ${currentRoleOption.color}44`,
              color: currentRoleOption.color, fontSize: '0.78rem',
              fontWeight: '700', cursor: 'pointer', transition: 'all 0.15s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <currentRoleOption.icon size={14} />
            {currentRoleOption.label}
            <ChevronDown size={12} />
          </button>

          {showRoleSwitcher && (
            <div className="card-glass" style={{
              position: 'absolute', top: 'calc(100% + 0.4rem)', right: 0,
              width: '200px', padding: '0.4rem',
              boxShadow: 'var(--shadow-lg)', zIndex: 1000,
              animation: 'scaleUp 0.15s ease-out forwards'
            }}>
              <div style={{ padding: '0.4rem 0.6rem 0.5rem', fontSize: '0.72rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Switch Role
              </div>
              {ROLE_OPTIONS.map(r => {
                const Icon = r.icon;
                const isActive = r.role === role;
                return (
                  <button
                    key={r.role}
                    onClick={() => handleSwitchRole(r)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.55rem',
                      width: '100%', padding: '0.5rem 0.6rem',
                      background: isActive ? r.bg : 'transparent',
                      border: 'none', borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer', color: isActive ? r.color : 'var(--text-primary)',
                      fontSize: '0.84rem', fontWeight: isActive ? '700' : '500',
                      transition: 'background 0.15s ease'
                    }}
                  >
                    <Icon size={15} style={{ color: r.color }} />
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Create (not for MEMBER) */}
        {role !== 'MEMBER' && (
          <button
            className="btn-primary"
            onClick={() => navigateTo('createtask')}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
          >
            <Plus size={15} /> New Task
          </button>
        )}

        {/* AI Copilot */}
        <button
          onClick={handleAICopilot}
          className="btn-icon"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))', borderColor: 'rgba(99,102,241,0.4)', color: 'var(--accent-primary)', width: '34px', height: '34px' }}
          title="AI Copilot"
        >
          <Sparkles size={16} />
        </button>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="btn-icon" style={{ width: '34px', height: '34px' }} title={`${theme === 'dark' ? 'Light' : 'Dark'} Mode`}>
          {theme === 'dark' ? <Sun size={16} style={{ color: '#f59e0b' }} /> : <Moon size={16} style={{ color: '#6366f1' }} />}
        </button>

        {/* Notification Bell */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="btn-icon"
            style={{ position: 'relative', width: '34px', height: '34px' }}
          >
            <Bell size={16} />
            {unreadNotifications.length > 0 && (
              <span style={{
                position: 'absolute', top: '3px', right: '3px',
                width: '8px', height: '8px', borderRadius: '50%',
                backgroundColor: 'var(--status-danger)',
                border: '2px solid var(--bg-secondary)'
              }} />
            )}
          </button>

          {showNotifications && (
            <div className="card-glass" style={{
              position: 'absolute', top: 'calc(100% + 0.4rem)', right: 0,
              width: '320px', padding: 0,
              boxShadow: 'var(--shadow-lg)', zIndex: 1000,
              animation: 'scaleUp 0.15s ease-out forwards'
            }}>
              <div style={{ padding: '0.75rem 0.9rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>Notifications ({unreadNotifications.length})</span>
                <button
                  onClick={() => { markAllNotificationsRead(); addToast('All read', 'info'); }}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontSize: '0.73rem', cursor: 'pointer', fontWeight: '600' }}
                >
                  Mark all read
                </button>
              </div>
              <div style={{ maxHeight: '260px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.84rem' }}>No notifications</div>
                ) : (
                  notifications.slice(0, 4).map(n => (
                    <div
                      key={n.id}
                      onClick={() => { markNotificationRead(n.id); setShowNotifications(false); navigateTo('notifications'); }}
                      style={{
                        padding: '0.65rem 0.9rem', borderBottom: '1px solid var(--border-color)',
                        cursor: 'pointer', backgroundColor: n.read ? 'transparent' : 'rgba(99,102,241,0.06)',
                        transition: 'background-color 0.15s ease'
                      }}
                    >
                      <div style={{ fontWeight: '600', fontSize: '0.8rem', marginBottom: '0.1rem' }}>{n.title}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.76rem', lineHeight: '1.3' }}>{n.message}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', marginTop: '0.25rem' }}>{n.time}</div>
                    </div>
                  ))
                )}
              </div>
              <div style={{ padding: '0.5rem', textAlign: 'center', borderTop: '1px solid var(--border-color)' }}>
                <button
                  onClick={() => { setShowNotifications(false); navigateTo('notifications'); }}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer' }}
                >
                  View All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div ref={profileRef} style={{ position: 'relative' }}>
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Avatar user={currentUser} size="md" showStatus={true} />
          </div>

          {showProfileMenu && (
            <div className="card-glass" style={{
              position: 'absolute', top: 'calc(100% + 0.4rem)', right: 0,
              width: '200px', padding: '0.4rem',
              boxShadow: 'var(--shadow-lg)', zIndex: 1000,
              animation: 'scaleUp 0.15s ease-out forwards'
            }}>
              <div style={{ padding: '0.5rem 0.65rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.25rem' }}>
                <div style={{ fontWeight: '700', fontSize: '0.86rem' }}>{currentUser.name}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.73rem' }}>{currentUser.roleLabel}</div>
              </div>
              <button
                onClick={() => { setShowProfileMenu(false); navigateTo('profile'); }}
                style={{ width: '100%', textAlign: 'left', padding: '0.45rem 0.65rem', background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '0.84rem', cursor: 'pointer', borderRadius: '6px' }}
              >
                Profile & Account
              </button>
              <button
                onClick={() => { setShowProfileMenu(false); navigateTo('settings'); }}
                style={{ width: '100%', textAlign: 'left', padding: '0.45rem 0.65rem', background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '0.84rem', cursor: 'pointer', borderRadius: '6px' }}
              >
                Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
