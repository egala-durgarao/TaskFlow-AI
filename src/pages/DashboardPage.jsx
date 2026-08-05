import React from 'react';
import {
  CheckSquare, CheckCircle2, Clock, AlertTriangle, Calendar as CalendarIcon,
  Sparkles, Plus, ArrowRight, TrendingUp, Activity, Users, FolderKanban, Shield, BarChart3, Target, Eye
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { TaskStatusPieChart } from '../components/charts/TaskStatusPieChart';
import { ProductivityLineChart } from '../components/charts/ProductivityLineChart';
import { Avatar } from '../components/common/Avatar';
import { StatusBadge, PriorityBadge } from '../components/common/Badge';
import { useTask } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import { MOCK_REPORT_STATS, MOCK_USERS } from '../data/mockData';

// ──────────────── PRODUCTIVITY SCORE WIDGET ────────────────
const ProductivityScore = ({ score, trend }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: '0.75rem',
    padding: '0.6rem 1rem', borderRadius: 'var(--radius-full)',
    background: 'var(--bg-elevated)', border: '1px solid var(--border-color)'
  }}>
    <div style={{
      width: '36px', height: '36px', borderRadius: '50%',
      background: 'conic-gradient(var(--accent-primary) 0%, var(--accent-primary) 85%, transparent 85%, transparent 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative'
    }}>
      <div style={{
        width: '28px', height: '28px', borderRadius: '50%',
        background: 'var(--bg-elevated)', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-primary)'
      }}>
        {score}
      </div>
    </div>
    <div>
      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Productivity Score</div>
      <div style={{ fontSize: '0.82rem', fontWeight: '700', color: trend > 0 ? 'var(--status-success)' : 'var(--status-danger)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% this week
      </div>
    </div>
  </div>
);

// ──────────────── ADMIN Dashboard ────────────────
const AdminDashboard = ({ tasks, projects, navigateTo }) => {
  const totalUsers = MOCK_USERS.length;
  const totalProjects = projects.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed' || t.status === 'Done').length;

  return (
    <div className="page-container fade-in-up">
      <div className="page-header">
        <div className="page-title-group">
          <h1><Shield size={26} style={{ color: '#ef4444' }} /> Platform Overview</h1>
          <p>Organization-wide metrics, users, and system health.</p>
        </div>
        <ProductivityScore score={92} trend={+4} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
        <StatCard title="Total Users" value={totalUsers} change="Active accounts" icon={Users} color="#6366f1" />
        <StatCard title="Total Projects" value={totalProjects} change={`${projects.filter(p => p.status === 'In Progress').length} active`} trend="up" icon={FolderKanban} color="#8b5cf6" />
        <StatCard title="All Tasks" value={totalTasks} change={`${completedTasks} completed`} trend="up" icon={CheckSquare} color="#10b981" />
        <StatCard title="Completion Rate" value={`${totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%`} change="Organization avg" icon={BarChart3} color="#f59e0b" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>
        <div className="card-glass" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700' }}>Team Velocity Trend</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Weekly throughput across all teams</p>
            </div>
          </div>
          <ProductivityLineChart data={MOCK_REPORT_STATS.weeklyVelocity} />
        </div>
        <div className="card-glass" style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700' }}>Task Distribution</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status breakdown across platform</p>
          </div>
          <TaskStatusPieChart data={MOCK_REPORT_STATS.statusBreakdown} />
        </div>
      </div>
    </div>
  );
};

// ──────────────── MANAGER Dashboard ────────────────
const ManagerDashboard = ({ tasks, projects, activities, navigateTo, currentUser }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed' || t.status === 'Done').length;
  const pendingTasks = tasks.filter(t => t.status === 'In Progress' || t.status === 'To Do' || t.status === 'In Review').length;
  const overdueTasks = tasks.filter(t => t.status === 'Overdue').length;
  const dueTodayTasks = tasks.filter(t => t.dueDate === '2026-08-04' || t.dueDate === '2026-08-06').length;

  // Personalized Greeting based on time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="page-container fade-in-up">
      <div className="page-header">
        <div className="page-title-group">
          <h1>{greeting}, {currentUser.name.split(' ')[0]} 👋</h1>
          <p>Here is your team's velocity and priority overview.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ProductivityScore score={85} trend={+12} />
          <button className="btn-primary" onClick={() => navigateTo('createtask')}><Plus size={16} /> Create Task</button>
        </div>
      </div>

      <div className="card-glass" style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12))',
        borderColor: 'rgba(99,102,241,0.3)',
        marginBottom: '1.75rem', padding: '1.25rem 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '46px', height: '46px', borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)', flexShrink: 0
          }}><Sparkles size={22} /></div>
          <div>
            <h4 style={{ fontSize: '0.98rem', fontWeight: '700', marginBottom: '0.2rem' }}>AI Priority Forecast</h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>1 task ("Database Query Indexes") is overdue and blocking the SmartFlow v2.0 release.</p>
          </div>
        </div>
        <button className="btn-primary" onClick={() => navigateTo('tasks')} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          Resolve Now <ArrowRight size={15} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
        <StatCard title="Total Tasks" value={totalTasks} change="+12% this week" trend="up" icon={CheckSquare} color="var(--accent-primary)" />
        <StatCard title="Completed" value={completedTasks} change="85% target" trend="up" icon={CheckCircle2} color="var(--status-success)" />
        <StatCard title="In Progress" value={pendingTasks} subtext="Across active projects" icon={Clock} color="var(--accent-cyan)" />
        <StatCard title="Overdue" value={overdueTasks} change="-2 from yesterday" trend="up" icon={AlertTriangle} color="var(--status-danger)" />
        <StatCard title="Due Today" value={dueTodayTasks} subtext="High priority" icon={CalendarIcon} color="var(--status-warning)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>
        <div className="card-glass" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700' }}>Approaching Deadlines</h3>
            <button className="btn-secondary" style={{ padding: '0.3rem 0.7rem', fontSize: '0.78rem' }} onClick={() => navigateTo('tasks')}>View All</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {tasks.filter(t => t.status !== 'Completed' && t.status !== 'Done').slice(0, 4).map(t => (
              <div key={t.id} onClick={() => navigateTo('taskdetail', t.id)} className="cmd-item" style={{
                borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem',
                border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', fontSize: '0.88rem' }}>{t.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{t.projectName} • Due {t.dueDate}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <PriorityBadge priority={t.priority} />
                  <StatusBadge status={t.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-glass" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Activity size={18} style={{ color: 'var(--accent-primary)' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700' }}>Recent Activity</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {activities.slice(0, 5).map(act => (
              <div key={act.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.86rem' }}>
                <Avatar user={act.user} size="sm" />
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: '700' }}>{act.user?.name} </span>
                  <span style={{ color: 'var(--text-secondary)' }}>{act.action} </span>
                  <span style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>"{act.target}"</span>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{act.detail} • {act.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────── MEMBER Dashboard ────────────────
const MemberDashboard = ({ tasks, navigateTo, currentUser }) => {
  const myTasks = tasks.filter(t => t.assignee?.id === currentUser.id);
  const myCompleted = myTasks.filter(t => t.status === 'Completed' || t.status === 'Done').length;
  const myInProgress = myTasks.filter(t => t.status === 'In Progress').length;
  const myToDo = myTasks.filter(t => t.status === 'To Do').length;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="page-container fade-in-up">
      <div className="page-header">
        <div className="page-title-group">
          <h1>{greeting}, {currentUser.name.split(' ')[0]} 👋</h1>
          <p>Here are your assigned tasks and current focus areas.</p>
        </div>
        <ProductivityScore score={78} trend={-2} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
        <StatCard title="My Tasks" value={myTasks.length} subtext="Assigned to you" icon={CheckSquare} color="var(--accent-primary)" />
        <StatCard title="Completed" value={myCompleted} change={`${myTasks.length > 0 ? Math.round((myCompleted / myTasks.length) * 100) : 0}% done`} trend="up" icon={CheckCircle2} color="var(--status-success)" />
        <StatCard title="In Progress" value={myInProgress} subtext="Currently working" icon={Clock} color="var(--accent-cyan)" />
        <StatCard title="To Do" value={myToDo} subtext="Not yet started" icon={CalendarIcon} color="var(--status-warning)" />
      </div>

      <div className="card-glass" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700' }}>My Assigned Tasks</h3>
          <button className="btn-secondary" style={{ padding: '0.3rem 0.7rem', fontSize: '0.78rem' }} onClick={() => navigateTo('tasks')}>View All</button>
        </div>
        {myTasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            <CheckCircle2 size={46} style={{ marginBottom: '1rem', opacity: 0.3 }} />
            <p style={{ fontSize: '1rem', fontWeight: '700' }}>No tasks assigned yet</p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>Your manager will assign tasks to you.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {myTasks.map(t => (
              <div key={t.id} onClick={() => navigateTo('taskdetail', t.id)} className="cmd-item" style={{
                borderRadius: 'var(--radius-md)', padding: '0.8rem 1rem',
                border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{t.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{t.projectName} • Due {t.dueDate}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <PriorityBadge priority={t.priority} />
                  <StatusBadge status={t.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ──────────────── VIEWER Dashboard ────────────────
const ViewerDashboard = ({ projects, activities, navigateTo, currentUser }) => {
  return (
    <div className="page-container fade-in-up">
      <div className="page-header">
        <div className="page-title-group">
          <h1>Welcome, {currentUser.name} <Eye size={22} style={{ color: 'var(--text-muted)', verticalAlign: 'middle', marginLeft: '0.25rem' }} /></h1>
          <p>Read-only overview of project progress and team activities.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>
        <div className="card-glass" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '1.25rem' }}>Project Status</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {projects.map(p => (
              <div key={p.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', marginBottom: '0.4rem', fontWeight: '600' }}>
                  <span>{p.name}</span>
                  <span>{p.progress}%</span>
                </div>
                <div style={{ height: '6px', backgroundColor: 'var(--bg-elevated)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${p.progress}%`, height: '100%', backgroundColor: p.color, borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card-glass" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Activity size={18} style={{ color: 'var(--accent-primary)' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700' }}>Recent Activity</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {activities.slice(0, 5).map(act => (
              <div key={act.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.86rem' }}>
                <Avatar user={act.user} size="sm" />
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: '700' }}>{act.user?.name} </span>
                  <span style={{ color: 'var(--text-secondary)' }}>{act.action} </span>
                  <span style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>"{act.target}"</span>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{act.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────── Main Dashboard Export ────────────────
export const DashboardPage = () => {
  const { tasks, projects, activities, navigateTo } = useTask();
  const { currentUser, role } = useAuth();

  if (role === 'ADMIN') {
    return <AdminDashboard tasks={tasks} projects={projects} navigateTo={navigateTo} />;
  }

  if (role === 'MEMBER') {
    return <MemberDashboard tasks={tasks} navigateTo={navigateTo} currentUser={currentUser} />;
  }

  if (role === 'VIEWER') {
    return <ViewerDashboard projects={projects} activities={activities} navigateTo={navigateTo} currentUser={currentUser} />;
  }

  // Default: MANAGER
  return <ManagerDashboard tasks={tasks} projects={projects} activities={activities} navigateTo={navigateTo} currentUser={currentUser} />;
};
