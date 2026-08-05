import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({ title, value, change, trend = 'up', icon: Icon, color = 'var(--accent-primary)', subtext }) => {
  return (
    <div className="card-glass interactive" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '80px',
        height: '80px',
        background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
        pointerEvents: 'none'
      }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-secondary)' }}>{title}</span>
        {Icon && (
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: `${color}18`,
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon size={20} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.4rem' }}>
        <h2 style={{ fontSize: '1.85rem', fontWeight: '800', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>{value}</h2>
        {change && (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.2rem',
            fontSize: '0.8rem',
            fontWeight: '600',
            color: trend === 'up' ? 'var(--status-success)' : 'var(--status-danger)'
          }}>
            {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {change}
          </span>
        )}
      </div>

      {subtext && (
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{subtext}</p>
      )}
    </div>
  );
};
