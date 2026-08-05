import React from 'react';
import {
  LayoutDashboard, FolderKanban, CheckSquare, BarChart3,
  Bell, User, Settings, LogOut, Sparkles, Zap,
  ChevronLeft, ChevronRight, Users, Calendar, Activity,
  PieChart, Eye
} from 'lucide-react';
import { useTask } from '../../context/TaskContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Avatar } from './Avatar';
import { OrgSwitcher } from './OrgSwitcher';
import { WorkspaceSelector } from './WorkspaceSelector';

const NAV_CONFIG = {
  ADMIN: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, shortcut: 'D' },
    { id: 'projects', label: 'All Projects', icon: FolderKanban, shortcut: 'P' },
    { id: 'tasks', label: 'All Tasks', icon: CheckSquare, shortcut: 'T' },
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'reports', label: 'Analytics', icon: PieChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ],
  MANAGER: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, shortcut: 'D' },
    { id: 'projects', label: 'My Projects', icon: FolderKanban, shortcut: 'P' },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, shortcut: 'T' },
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell, hasBadge: true },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ],
  MEMBER: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'notifications', label: 'Notifications', icon: Bell, hasBadge: true },
    { id: 'profile', label: 'Profile', icon: User },
  ],
  VIEWER: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'activity', label: 'Activity', icon: Activity },
  ]
};

export const Sidebar = ({ isCollapsed, toggleSidebar, mobileOpen, closeMobileSidebar }) => {
  const { activePage, navigateTo, notifications } = useTask();
  const { logout, role, currentUser } = useAuth();
  const { addToast } = useToast();

  const unreadCount = notifications.filter(n => !n.read).length;
  const navItems = NAV_CONFIG[role] || NAV_CONFIG.MEMBER;

  const handleNavClick = (id) => {
    navigateTo(id);
    if (closeMobileSidebar) closeMobileSidebar();
  };

  const handleLogout = () => {
    logout();
    addToast('Signed out successfully.', 'info');
    navigateTo('landing');
  };

  const roleBadge = {
    ADMIN: { label: 'Admin', color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
    MANAGER: { label: 'Manager', color: '#6366f1', bg: 'rgba(99,102,241,0.12)' },
    MEMBER: { label: 'Member', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
    VIEWER: { label: 'Viewer', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' }
  }[role] || { label: 'Member', color: '#10b981', bg: 'rgba(16,185,129,0.12)' };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className={`sidebar-backdrop ${mobileOpen ? 'visible' : ''}`}
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}
        style={{
          width: isCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
          height: '100vh',
          position: 'sticky',
          top: 0,
          backgroundColor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 900,
          flexShrink: 0,
          overflow: 'hidden'
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Brand + Org Switcher */}
        <div style={{
          padding: isCollapsed ? '0.7rem 0.5rem' : '0.7rem 0.75rem',
          borderBottom: '1px solid var(--border-color)',
          flexShrink: 0,
          display: 'flex', flexDirection: 'column', gap: '0.5rem'
        }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'space-between'
          }}>
            <OrgSwitcher isCollapsed={isCollapsed} />
            {!isCollapsed && (
              <button onClick={toggleSidebar} className="btn-icon" style={{ width: '26px', height: '26px', flexShrink: 0 }} aria-label="Collapse sidebar">
                <ChevronLeft size={15} />
              </button>
            )}
          </div>
          {!isCollapsed && <WorkspaceSelector isCollapsed={isCollapsed} />}
        </div>

        {/* User Role Badge */}
        {!isCollapsed && (
          <div style={{ padding: '0.6rem 0.75rem 0.35rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.55rem',
              padding: '0.45rem 0.65rem', borderRadius: 'var(--radius-md)',
              backgroundColor: roleBadge.bg, border: `1px solid ${roleBadge.color}33`
            }}>
              <Avatar user={currentUser} size="sm" />
              <div style={{ overflow: 'hidden', flex: 1 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser.name}</div>
                <div style={{ fontSize: '0.68rem', fontWeight: '600', color: roleBadge.color }}>{roleBadge.label}</div>
              </div>
            </div>
          </div>
        )}

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: '0.4rem 0.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            const badge = item.hasBadge && unreadCount > 0 ? unreadCount : null;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: isCollapsed ? 'center' : 'space-between',
                  padding: isCollapsed ? '0.6rem 0' : '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: 'none', cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  width: '100%',
                  fontWeight: isActive ? '600' : '500',
                  fontSize: '0.86rem'
                }}
                title={isCollapsed ? item.label : undefined}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Icon size={17} />
                  {!isCollapsed && <span>{item.label}</span>}
                </div>
                {!isCollapsed && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {badge && (
                      <span style={{
                        backgroundColor: 'var(--status-danger)', color: '#fff',
                        fontSize: '0.66rem', fontWeight: '700',
                        padding: '0.08rem 0.35rem', borderRadius: 'var(--radius-full)',
                        minWidth: '17px', textAlign: 'center'
                      }}>{badge}</span>
                    )}
                    {item.shortcut && <span className="kbd">{item.shortcut}</span>}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* AI Copilot Card */}
        {!isCollapsed && (
          <div style={{ padding: '0 0.6rem 0.5rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08))',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '0.65rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-primary)', fontWeight: '700', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                <Sparkles size={13} /> AI Copilot Active
              </div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: '1.35', margin: 0 }}>
                Press <span className="kbd" style={{ fontSize: '0.6rem' }}>Ctrl</span>+<span className="kbd" style={{ fontSize: '0.6rem' }}>K</span> to search anything
              </p>
            </div>
          </div>
        )}

        {/* Collapse Toggle when collapsed */}
        {isCollapsed && (
          <div style={{ padding: '0.35rem', display: 'flex', justifyContent: 'center' }}>
            <button onClick={toggleSidebar} className="btn-icon" style={{ width: '28px', height: '28px' }} aria-label="Expand sidebar">
              <ChevronRight size={15} />
            </button>
          </div>
        )}

        {/* Logout */}
        <div style={{ padding: '0.5rem', borderTop: '1px solid var(--border-color)', flexShrink: 0 }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              background: 'transparent', border: 'none',
              color: 'var(--text-muted)', cursor: 'pointer',
              padding: '0.4rem 0.55rem', fontSize: '0.82rem', fontWeight: '500',
              width: '100%', borderRadius: 'var(--radius-md)',
              transition: 'color 0.15s ease',
              justifyContent: isCollapsed ? 'center' : 'flex-start'
            }}
            title={isCollapsed ? 'Sign Out' : undefined}
          >
            <LogOut size={16} />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
