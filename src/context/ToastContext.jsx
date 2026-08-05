import React, { createContext, useContext, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4);
    const newToast = { id, message, type };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
        maxWidth: '380px',
        width: '100%',
        pointerEvents: 'none'
      }}>
        {toasts.map(toast => (
          <div
            key={toast.id}
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              gap: '0.75rem',
              padding: '0.85rem 1.1rem',
              borderRadius: '10px',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(16px)',
              animation: 'fadeIn 0.2s ease-out forwards',
              borderLeft: toast.type === 'success' ? '4px solid var(--status-success)' :
                         toast.type === 'danger' ? '4px solid var(--status-danger)' :
                         toast.type === 'warning' ? '4px solid var(--status-warning)' :
                         '4px solid var(--accent-primary)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', fontWeight: '500' }}>
              {toast.type === 'success' && <CheckCircle2 size={18} style={{ color: 'var(--status-success)' }} />}
              {toast.type === 'danger' && <AlertCircle size={18} style={{ color: 'var(--status-danger)' }} />}
              {toast.type === 'warning' && <AlertTriangle size={18} style={{ color: 'var(--status-warning)' }} />}
              {toast.type === 'info' && <Info size={18} style={{ color: 'var(--accent-primary)' }} />}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
