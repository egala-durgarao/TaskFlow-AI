import React, { useState } from 'react';
import { BarChart3, Download, Calendar, TrendingUp, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { TaskStatusPieChart } from '../components/charts/TaskStatusPieChart';
import { ProductivityLineChart } from '../components/charts/ProductivityLineChart';
import { PriorityBarChart } from '../components/charts/PriorityBarChart';
import { useTask } from '../context/TaskContext';
import { useToast } from '../context/ToastContext';
import { MOCK_REPORT_STATS, MOCK_USERS } from '../data/mockData';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Legend, Cell
} from 'recharts';

export const ReportsPage = () => {
  const { navigateTo } = useTask();
  const { addToast } = useToast();
  const [timeRange, setTimeRange] = useState('weekly'); // 'weekly' | 'monthly' | 'quarterly'

  const handleDownloadPDF = () => {
    addToast('Generating executive PDF report...', 'info');
    setTimeout(() => {
      addToast('Download completed: TaskFlow_Executive_Report_Aug2026.pdf', 'success', 4000);
    }, 1500);
  };

  return (
    <div className="page-container fade-in-up">
      {/* Header */}
      <div className="page-header">
        <div className="page-title-group">
          <h1>
            <BarChart3 size={26} style={{ color: 'var(--accent-primary)' }} />
            Analytics & Reports Hub
          </h1>
          <p>Comprehensive sprint performance, team velocity, task distribution, and executive metrics.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'inline-flex', backgroundColor: 'var(--bg-card)', padding: '0.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <button
              className={timeRange === 'weekly' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setTimeRange('weekly')}
              style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem', border: 'none' }}
            >
              Weekly
            </button>
            <button
              className={timeRange === 'monthly' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setTimeRange('monthly')}
              style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem', border: 'none' }}
            >
              Monthly
            </button>
          </div>

          <button className="btn-primary" onClick={handleDownloadPDF}>
            <Download size={16} /> Export PDF Report
          </button>
        </div>
      </div>

      {/* KPI Overview Summary Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '1.75rem'
      }}>
        <div className="card-glass" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sprint Completion Rate</span>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--status-success)', marginTop: '0.2rem' }}>92.4%</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>+4.2% higher than target</span>
        </div>

        <div className="card-glass" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Avg Cycle Time</span>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-primary)', marginTop: '0.2rem' }}>2.4 Days</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>From To Do to Completed</span>
        </div>

        <div className="card-glass" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>On-time Delivery Rate</span>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>96.8%</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>38 tasks completed on schedule</span>
        </div>

        <div className="card-glass" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AI Optimized Hours</span>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-secondary)', marginTop: '0.2rem' }}>148 Hrs</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Saved in automated scheduling</span>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '1.5rem',
        marginBottom: '1.75rem'
      }}>
        {/* Productivity Line Chart */}
        <div className="card-glass" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.35rem' }}>Sprint Throughput Velocity</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Actual tasks completed vs planned velocity</p>
          <ProductivityLineChart data={MOCK_REPORT_STATS.weeklyVelocity} />
        </div>

        {/* Task Status Donut Chart */}
        <div className="card-glass" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.35rem' }}>Task Distribution by Status</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Breakdown across all active projects</p>
          <TaskStatusPieChart data={MOCK_REPORT_STATS.statusBreakdown} />
        </div>
      </div>

      {/* Advanced Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem',
        marginBottom: '1.75rem'
      }}>
        {/* Sprint Burndown Area Chart */}
        <div className="card-glass" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.35rem' }}>Sprint Burndown</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Remaining vs Ideal task volume</p>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <AreaChart data={MOCK_REPORT_STATS.burndownData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRemaining" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} />
                <RechartsTooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="remaining" stroke="var(--accent-primary)" fillOpacity={1} fill="url(#colorRemaining)" name="Remaining Tasks" strokeWidth={3} />
                <Area type="monotone" dataKey="ideal" stroke="var(--text-muted)" fill="none" name="Ideal Trend" strokeDasharray="5 5" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Member Workload Bar Chart */}
        <div className="card-glass" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.35rem' }}>Team Workload & Capacity</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Assigned tasks vs capacity per member</p>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={MOCK_REPORT_STATS.workloadByMember} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} />
                <RechartsTooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="tasks" name="Current Tasks" fill="var(--accent-cyan)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="capacity" name="Total Capacity" fill="rgba(99, 102, 241, 0.2)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Third Charts Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Priority Bar Chart */}
        <div className="card-glass" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.35rem' }}>Task Distribution by Priority</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Urgent and High priority backlog items</p>
          <PriorityBarChart data={MOCK_REPORT_STATS.priorityWorkload} />
        </div>

        {/* Team Performance Leaderboard */}
        <div className="card-glass" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '1rem' }}>Team Member Workload & Efficiency</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {MOCK_USERS.map((user, idx) => (
              <div key={user.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0.9rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img src={user.avatar} alt={user.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.88rem' }}>{user.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.role}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--status-success)' }}>{12 - idx * 2} Tasks Done</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{98 - idx * 3}% efficiency</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
