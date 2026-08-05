import React, { useState } from 'react';
import { User, Mail, Shield, Key, Save, Camera, Check, Trophy, Star, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Avatar } from '../components/common/Avatar';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const ProfilePage = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [department, setDepartment] = useState(currentUser.department);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setCurrentUser(prev => ({ ...prev, name, email, department }));
    addToast('Profile details updated successfully!', 'success');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      addToast('New passwords do not match.', 'warning');
      return;
    }
    addToast('Security password changed successfully.', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="page-container fade-in-up" style={{ maxWidth: '960px' }}>
      {/* Header */}
      <div className="page-header">
        <div className="page-title-group">
          <h1>
            <User size={26} style={{ color: 'var(--accent-primary)' }} />
            User Profile
          </h1>
          <p>Manage your account, view your achievements, and update security preferences.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        
        {/* Left Column: Profile Card & Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Profile Card */}
          <div className="card-glass" style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1rem' }}>
              <Avatar user={currentUser} size="xl" showStatus />
              <button
                className="btn-icon"
                style={{
                  position: 'absolute', bottom: 0, right: 0,
                  backgroundColor: 'var(--accent-primary)', color: '#fff',
                  border: '2px solid var(--bg-secondary)', width: '28px', height: '28px'
                }}
                title="Change Avatar"
              >
                <Camera size={14} />
              </button>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.25rem' }}>{currentUser.name}</h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{currentUser.roleLabel} • {currentUser.department}</div>
            <span style={{
              display: 'inline-flex', padding: '0.25rem 0.6rem',
              borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(99, 102, 241, 0.1)',
              color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: '700'
            }}>
              {currentUser.role}
            </span>
          </div>

          {/* Stats & Achievements */}
          <div className="card-glass" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Trophy size={16} style={{ color: 'var(--status-warning)' }} /> Achievements
            </h3>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ flex: 1, backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--status-success)' }}>{currentUser.completedTaskCount || 0}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600', marginTop: '0.25rem' }}>Tasks Done</div>
              </div>
              <div style={{ flex: 1, backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-primary)' }}>{currentUser.joinDate ? new Date(currentUser.joinDate).getFullYear() : '2024'}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600', marginTop: '0.25rem' }}>Joined</div>
              </div>
            </div>

            <h4 style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>Badges</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {currentUser.achievements?.map((ach, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.5rem', backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)' }}>
                  <Star size={14} style={{ color: 'var(--status-warning)' }} />
                  <span style={{ fontSize: '0.82rem', fontWeight: '500' }}>{ach}</span>
                </div>
              ))}
              {(!currentUser.achievements || currentUser.achievements.length === 0) && (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No badges earned yet.</div>
              )}
            </div>

            <h4 style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-muted)', margin: '1.25rem 0 0.85rem' }}>Skills</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {currentUser.skills?.map(skill => (
                <span key={skill} style={{
                  fontSize: '0.75rem', fontWeight: '600',
                  padding: '0.25rem 0.6rem', borderRadius: '4px',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--status-success)', border: '1px solid rgba(16, 185, 129, 0.2)'
                }}>
                  {skill}
                </span>
              ))}
              {(!currentUser.skills || currentUser.skills.length === 0) && (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No skills listed.</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Forms */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Profile Details Form */}
          <div className="card-glass" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '1.25rem' }}>Personal Information</h3>
            <form onSubmit={handleUpdateProfile}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="text" className="form-input" style={{ paddingLeft: '2.5rem' }} value={name} onChange={e => setName(e.target.value)} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="email" className="form-input" style={{ paddingLeft: '2.5rem' }} value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Department</label>
                <input type="text" className="form-input" value={department} onChange={e => setDepartment(e.target.value)} required />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="submit" className="btn-primary">
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Security Form */}
          <div className="card-glass" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={18} style={{ color: 'var(--status-danger)' }} /> Security Settings
            </h3>
            <form onSubmit={handleChangePassword}>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <div style={{ position: 'relative' }}>
                  <Key size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="password" className="form-input" style={{ paddingLeft: '2.5rem' }} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">New Password</label>
                <div style={{ position: 'relative' }}>
                  <Key size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="password" className="form-input" style={{ paddingLeft: '2.5rem' }} value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <div style={{ position: 'relative' }}>
                  <Key size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="password" className="form-input" style={{ paddingLeft: '2.5rem' }} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="submit" className="btn-secondary" style={{ color: 'var(--status-danger)', borderColor: 'var(--status-danger)' }}>
                  Update Password
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
