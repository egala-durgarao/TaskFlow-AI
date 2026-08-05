import React, { useState } from 'react';
import { Zap, Eye, EyeOff, ArrowRight, Lock, Mail, Shield, Users, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';
import { useToast } from '../context/ToastContext';

const ROLE_CARDS = [
  {
    role: 'ADMIN',
    label: 'Administrator',
    email: 'victoria.admin@taskflow.ai',
    description: 'Full platform control, user management, analytics',
    icon: Shield,
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.1)',
    border: 'rgba(239, 68, 68, 0.25)'
  },
  {
    role: 'MANAGER',
    label: 'Project Manager',
    email: 'alex.morgan@taskflow.ai',
    description: 'Create projects, assign tasks, view reports',
    icon: Users,
    color: '#6366f1',
    bg: 'rgba(99, 102, 241, 0.1)',
    border: 'rgba(99, 102, 241, 0.25)'
  },
  {
    role: 'MEMBER',
    label: 'Team Member',
    email: 'elena.rostova@taskflow.ai',
    description: 'View assigned tasks, update progress',
    icon: UserCheck,
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.1)',
    border: 'rgba(16, 185, 129, 0.25)'
  },
  {
    role: 'VIEWER',
    label: 'Stakeholder',
    email: 'james.viewer@taskflow.ai',
    description: 'Read-only access to projects and reports',
    icon: Eye,
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.1)',
    border: 'rgba(245, 158, 11, 0.25)'
  }
];

export const LoginPage = () => {
  const { login, switchRole } = useAuth();
  const { navigateTo } = useTask();
  const { addToast } = useToast();

  const [email, setEmail] = useState('alex.morgan@taskflow.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState('MANAGER');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    const user = login(email, password);
    addToast(`Welcome back, ${user.name}!`, 'success');
    navigateTo('dashboard');
  };

  const handleRoleLogin = (card) => {
    setSelectedRole(card.role);
    setEmail(card.email);
    switchRole(card.role);
    addToast(`Signed in as ${card.label} (${card.email})`, 'success');
    navigateTo('dashboard');
  };

  const handleGoogleLogin = () => {
    login('alex.morgan@taskflow.ai', 'googlePass');
    addToast('Authenticated successfully with Google OAuth!', 'success');
    navigateTo('dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-primary)',
      padding: '2rem 1rem',
      position: 'relative'
    }}>
      {/* Background gradient orbs */}
      <div style={{
        position: 'absolute', top: '-15%', left: '-10%', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)',
        borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', right: '-10%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%)',
        borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none'
      }} />

      <div style={{ width: '100%', maxWidth: '480px', position: 'relative', zIndex: 1 }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            onClick={() => navigateTo('landing')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', marginBottom: '1rem' }}
          >
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', boxShadow: 'var(--shadow-glow)'
            }}>
              <Zap size={24} />
            </div>
            <span style={{ fontWeight: '800', fontSize: '1.35rem' }}>TaskFlow AI</span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.3rem' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Choose a role to explore the platform</p>
        </div>

        {/* Role Selection Cards */}
        <div className="card-glass" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
            ⚡ Quick Role Login
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {ROLE_CARDS.map(card => {
              const Icon = card.icon;
              const isSelected = selectedRole === card.role;
              return (
                <button
                  key={card.role}
                  onClick={() => handleRoleLogin(card)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.85rem',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSelected ? card.bg : 'transparent',
                    border: `1.5px solid ${isSelected ? card.border : 'var(--border-color)'}`,
                    cursor: 'pointer', transition: 'all 0.2s ease',
                    textAlign: 'left', width: '100%'
                  }}
                >
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '10px',
                    backgroundColor: card.bg, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={18} style={{ color: card.color }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                      {card.label}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                      {card.description}
                    </div>
                  </div>
                  <ArrowRight size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.25rem 0', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
          <span>OR SIGN IN WITH EMAIL</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
        </div>

        {/* Email Login Form */}
        <div className="card-glass" style={{ padding: '1.5rem' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Work Email</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  className="form-control"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">
                <span>Password</span>
                <button
                  type="button"
                  onClick={() => addToast('Password reset link sent to email!', 'info')}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontSize: '0.78rem', cursor: 'pointer' }}
                >
                  Forgot password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                Remember me for 30 days
              </label>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.7rem', fontSize: '0.92rem' }}>
              Sign In <ArrowRight size={18} />
            </button>
          </form>

          {/* Google OAuth */}
          <div style={{ marginTop: '1rem' }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleGoogleLogin}
              style={{ width: '100%', padding: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Continue with Google
            </button>
          </div>
        </div>

        {/* Footer link */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <button
            onClick={() => navigateTo('register')}
            style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontWeight: '700', cursor: 'pointer' }}
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};
