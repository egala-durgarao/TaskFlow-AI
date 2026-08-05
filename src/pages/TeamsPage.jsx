import React from 'react';
import { Users, Zap, Target, TrendingUp, MoreHorizontal, UserPlus, BarChart3 } from 'lucide-react';
import { Avatar } from '../components/common/Avatar';
import { MOCK_TEAMS } from '../data/mockData';
import { useTask } from '../context/TaskContext';

const ProgressRing = ({ progress, size = 44, strokeWidth = 4, color }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle className="progress-ring-bg" cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} />
      <circle
        className="progress-ring-fill"
        cx={size / 2} cy={size / 2} r={radius}
        strokeWidth={strokeWidth}
        stroke={color}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central"
        style={{ fontSize: '0.65rem', fontWeight: '700', fill: 'var(--text-primary)' }}>
        {progress}%
      </text>
    </svg>
  );
};

export const TeamsPage = () => {
  const { navigateTo } = useTask();

  return (
    <div className="page-container fade-in-up">
      {/* Header */}
      <div className="page-header">
        <div className="page-title-group">
          <h1>
            <Users size={26} style={{ color: 'var(--accent-primary)' }} />
            Team Management
          </h1>
          <p>View team capacity, sprint progress, and velocity metrics across all squads.</p>
        </div>
        <button className="btn-primary" onClick={() => {}}>
          <UserPlus size={16} /> Create Team
        </button>
      </div>

      {/* Teams Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.25rem' }}>
        {MOCK_TEAMS.map(team => (
          <div key={team.id} className="card-glass" style={{ padding: 0, overflow: 'hidden', transition: 'transform 0.2s ease, box-shadow 0.2s ease', cursor: 'pointer' }}>
            {/* Color bar */}
            <div style={{ height: '3px', background: team.color }} />

            <div style={{ padding: '1.25rem' }}>
              {/* Team Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.15rem' }}>{team.name}</h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>{team.description}</p>
                </div>
                <ProgressRing progress={team.progress} color={team.color} />
              </div>

              {/* Team Lead */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem', padding: '0.45rem 0.55rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-elevated)' }}>
                <Avatar user={team.lead} size="sm" />
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: '600' }}>{team.lead.name}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Team Lead</div>
                </div>
              </div>

              {/* Members */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex' }}>
                  {team.members.slice(0, 4).map((m, i) => (
                    <img key={m.id} src={m.avatar} alt={m.name}
                      style={{
                        width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover',
                        border: '2px solid var(--bg-card)',
                        marginLeft: i > 0 ? '-8px' : '0', position: 'relative', zIndex: 4 - i
                      }}
                      title={m.name}
                    />
                  ))}
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                  {team.members.length} members
                </span>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ textAlign: 'center', padding: '0.4rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-elevated)' }}>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>{team.velocity}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '600' }}>Velocity</div>
                </div>
                <div style={{ textAlign: 'center', padding: '0.4rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-elevated)' }}>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>{team.tasksCompleted}/{team.tasksTotal}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '600' }}>Tasks</div>
                </div>
                <div style={{ textAlign: 'center', padding: '0.4rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-elevated)' }}>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>{team.capacity.used}%</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '600' }}>Capacity</div>
                </div>
              </div>

              {/* Capacity Bar */}
              <div style={{ marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  <span>{team.currentSprint}</span>
                  <span>{team.capacity.used}/{team.capacity.total} pts</span>
                </div>
                <div style={{ height: '4px', backgroundColor: 'var(--bg-elevated)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${(team.capacity.used / team.capacity.total) * 100}%`,
                    background: team.color, borderRadius: '2px', transition: 'width 0.6s ease'
                  }} />
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-secondary" style={{ flex: 1, padding: '0.4rem 0.6rem', fontSize: '0.78rem' }}>
                  <BarChart3 size={13} /> View Board
                </button>
                <button className="btn-secondary" style={{ flex: 1, padding: '0.4rem 0.6rem', fontSize: '0.78rem' }}>
                  <Users size={13} /> Members
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
