import React, { useState } from 'react';
import { Bell, CheckCircle2, MessageSquare, AlertTriangle, Info, Check, Filter } from 'lucide-react';
import { useTask } from '../context/TaskContext';
import { useToast } from '../context/ToastContext';

export const NotificationsPage = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, navigateTo } = useTask();
  const { addToast } = useToast();
  const [filter, setFilter] = useState('all'); // 'all' | 'unread' | 'mentions' | 'system'

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'mentions') return n.category === 'mention';
    if (filter === 'system') return n.category === 'system' || n.category === 'deadline';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  // Group by timeline
  const groups = {};
  filteredNotifications.forEach(notif => {
    const group = notif.group || 'Earlier';
    if (!groups[group]) groups[group] = [];
    groups[group].push(notif);
  });

  const groupOrder = ['Today', 'Yesterday', 'Earlier'];

  const getIconForType = (type, category) => {
    if (category === 'mention') return <MessageSquare size={16} />;
    if (category === 'deadline') return <AlertTriangle size={16} />;
    switch (type) {
      case 'success': return <CheckCircle2 size={16} />;
      case 'warning': return <AlertTriangle size={16} />;
      case 'comment': return <MessageSquare size={16} />;
      default: return <Info size={16} />;
    }
  };

  const getColorForType = (type) => {
    switch (type) {
      case 'success': return 'var(--status-success)';
      case 'warning': return 'var(--status-danger)';
      case 'comment': return 'var(--accent-cyan)';
      default: return 'var(--accent-primary)';
    }
  };

  const handleNotificationClick = (notif) => {
    if (!notif.read) {
      markNotificationRead(notif.id);
    }
    if (notif.linkTaskId) {
      navigateTo('taskdetail', notif.linkTaskId);
    } else if (notif.linkProjectId) {
      navigateTo('projects');
    }
  };

  return (
    <div className="page-container fade-in-up" style={{ maxWidth: '900px' }}>
      {/* Header */}
      <div className="page-header">
        <div className="page-title-group">
          <h1>
            <Bell size={26} style={{ color: 'var(--accent-primary)' }} />
            Notifications ({unreadCount} Unread)
          </h1>
          <p>Stay updated on task assignments, comments, deadline warnings, and project updates.</p>
        </div>

        <button
          className="btn-secondary"
          onClick={() => {
            markAllNotificationsRead();
            addToast('All notifications marked as read', 'success');
          }}
          disabled={unreadCount === 0}
        >
          <Check size={16} /> Mark All as Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="card-glass" style={{ padding: '0.6rem 1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Filter size={14} style={{ color: 'var(--text-muted)' }} />
        <button className={filter === 'all' ? 'btn-primary' : 'btn-secondary'} onClick={() => setFilter('all')} style={{ padding: '0.3rem 0.7rem', fontSize: '0.8rem' }}>
          All
        </button>
        <button className={filter === 'unread' ? 'btn-primary' : 'btn-secondary'} onClick={() => setFilter('unread')} style={{ padding: '0.3rem 0.7rem', fontSize: '0.8rem' }}>
          Unread
        </button>
        <button className={filter === 'mentions' ? 'btn-primary' : 'btn-secondary'} onClick={() => setFilter('mentions')} style={{ padding: '0.3rem 0.7rem', fontSize: '0.8rem' }}>
          Mentions
        </button>
        <button className={filter === 'system' ? 'btn-primary' : 'btn-secondary'} onClick={() => setFilter('system')} style={{ padding: '0.3rem 0.7rem', fontSize: '0.8rem' }}>
          System & Alerts
        </button>
      </div>

      {/* Notification List */}
      <div>
        {groupOrder.map(groupName => {
          const items = groups[groupName];
          if (!items || items.length === 0) return null;

          return (
            <div key={groupName} style={{ marginBottom: '1.75rem' }}>
              <h3 style={{
                fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-muted)',
                textTransform: 'uppercase', letterSpacing: '0.05em',
                marginBottom: '0.75rem', paddingLeft: '0.5rem'
              }}>
                {groupName}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {items.map(notif => {
                  const color = getColorForType(notif.type);
                  return (
                    <div
                      key={notif.id}
                      onClick={() => handleNotificationClick(notif)}
                      className="cmd-item"
                      style={{
                        padding: '1rem', borderRadius: 'var(--radius-md)',
                        backgroundColor: notif.read ? 'var(--bg-secondary)' : 'rgba(99, 102, 241, 0.05)',
                        border: '1px solid',
                        borderColor: notif.read ? 'var(--border-color)' : 'rgba(99, 102, 241, 0.3)',
                        cursor: (notif.linkTaskId || notif.linkProjectId) ? 'pointer' : 'default',
                        display: 'flex', alignItems: 'flex-start', gap: '0.85rem',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                        backgroundColor: `${color}18`, color: color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {getIconForType(notif.type, notif.category)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: notif.read ? '600' : '700', color: 'var(--text-primary)' }}>
                            {notif.title}
                          </h4>
                          <span style={{ fontSize: '0.72rem', color: notif.read ? 'var(--text-muted)' : 'var(--accent-primary)', fontWeight: notif.read ? '500' : '700' }}>
                            {notif.time}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                          {notif.message}
                        </p>
                      </div>
                      {!notif.read && (
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)', flexShrink: 0, marginTop: '0.4rem' }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filteredNotifications.length === 0 && (
          <div className="card-glass" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
            <Bell size={42} style={{ color: 'var(--text-muted)', opacity: 0.3, marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.25rem' }}>No notifications found</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};
