import React from 'react';

export const Avatar = ({ user, size = 'md', showStatus = false }) => {
  const dimensions = size === 'xs' ? 22 : size === 'sm' ? 28 : size === 'lg' ? 48 : size === 'xl' ? 64 : 36;
  const statusSize = size === 'sm' ? 8 : 10;

  return (
    <div style={{ position: 'relative', display: 'inline-block', flexShrink: 0 }}>
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt={user.name || 'User'}
          style={{
            width: `${dimensions}px`,
            height: `${dimensions}px`,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid var(--border-color)'
          }}
        />
      ) : (
        <div style={{
          width: `${dimensions}px`,
          height: `${dimensions}px`,
          borderRadius: '50%',
          backgroundColor: 'var(--accent-primary)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '700',
          fontSize: size === 'sm' ? '0.75rem' : '0.9rem'
        }}>
          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
      )}

      {showStatus && (
        <span style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: `${statusSize}px`,
          height: `${statusSize}px`,
          borderRadius: '50%',
          backgroundColor: user?.status === 'online' ? 'var(--status-success)' :
                           user?.status === 'busy' ? 'var(--status-danger)' : 'var(--text-muted)',
          border: '2px solid var(--bg-secondary)'
        }} />
      )}
    </div>
  );
};
