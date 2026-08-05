import React, { useState } from 'react';
import { Settings, Moon, Sun, Globe, Bell, Shield, Users, Save, Sparkles, Command, EyeOff, LayoutTemplate } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { MOCK_USERS } from '../data/mockData';

export const SettingsPage = () => {
  const { theme, toggleTheme, setTheme } = useTheme();
  const { addToast } = useToast();
  const { preferences, updatePreference, role } = useAuth();

  const [language, setLanguage] = useState('English (US)');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(false);

  const handleSaveSettings = () => {
    addToast('Preferences and settings saved successfully!', 'success');
  };

  const ToggleRow = ({ icon: Icon, title, desc, checked, onChange, disabled = false }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', opacity: disabled ? 0.6 : 1 }}>
      <div style={{ display: 'flex', gap: '0.85rem' }}>
        <Icon size={18} style={{ color: 'var(--text-muted)', marginTop: '0.1rem' }} />
        <div>
          <div style={{ fontWeight: '600', fontSize: '0.88rem' }}>{title}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{desc}</div>
        </div>
      </div>
      <label className="toggle-switch">
        <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
        <span className="toggle-slider"></span>
      </label>
    </div>
  );

  return (
    <div className="page-container fade-in-up" style={{ maxWidth: '960px' }}>
      {/* Header */}
      <div className="page-header">
        <div className="page-title-group">
          <h1>
            <Settings size={26} style={{ color: 'var(--accent-primary)' }} />
            Settings & Preferences
          </h1>
          <p>Configure appearance, AI features, notifications, and privacy options.</p>
        </div>

        <button className="btn-primary" onClick={handleSaveSettings}>
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Appearance & Workspace */}
          <div className="card-glass" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
              Appearance & Workspace
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '0.85rem' }}>
                  {theme === 'dark' ? <Moon size={18} style={{ color: 'var(--text-muted)' }}/> : <Sun size={18} style={{ color: 'var(--text-muted)' }} />}
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.88rem' }}>Color Theme</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Toggle glassmorphic dark mode.</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--bg-elevated)', padding: '0.2rem', borderRadius: 'var(--radius-md)' }}>
                  <button onClick={() => setTheme('light')} className={theme === 'light' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', border: 'none' }}>Light</button>
                  <button onClick={() => setTheme('dark')} className={theme === 'dark' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', border: 'none' }}>Dark</button>
                </div>
              </div>

              <ToggleRow
                icon={LayoutTemplate} title="Compact Layout Mode" desc="Reduce padding to fit more data on screen."
                checked={preferences.compactMode} onChange={(e) => updatePreference('compactMode', e.target.checked)}
              />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.85rem' }}>
                  <Globe size={18} style={{ color: 'var(--text-muted)', marginTop: '0.1rem' }} />
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.88rem' }}>Language Region</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Set primary interface language.</div>
                  </div>
                </div>
                <select className="form-select" value={language} onChange={(e) => setLanguage(e.target.value)} style={{ width: '130px', padding: '0.4rem', fontSize: '0.8rem' }}>
                  <option>English (US)</option>
                  <option>Spanish (ES)</option>
                  <option>French (FR)</option>
                  <option>Japanese (JP)</option>
                </select>
              </div>
            </div>
          </div>

          {/* AI Features (Enterprise Only) */}
          <div className="card-glass" style={{ padding: '1.5rem', border: '1px solid rgba(139, 92, 246, 0.3)', background: 'linear-gradient(135deg, rgba(99,102,241,0.03), rgba(139,92,246,0.03))' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} style={{ color: 'var(--accent-secondary)' }} /> AI Copilot Features
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <ToggleRow
                icon={Sparkles} title="Smart Suggestions" desc="AI predicts next tasks based on workflow patterns."
                checked={preferences.aiSuggestions} onChange={(e) => updatePreference('aiSuggestions', e.target.checked)}
              />
              <ToggleRow
                icon={Command} title="Keyboard Shortcuts" desc="Enable global hotkeys like Ctrl+K for search."
                checked={preferences.keyboardShortcuts} onChange={(e) => updatePreference('keyboardShortcuts', e.target.checked)}
              />
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Notifications */}
          <div className="card-glass" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
              Notifications & Alerts
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <ToggleRow icon={Bell} title="Push Notifications" desc="Real-time alerts for mentions and assignments." checked={pushAlerts} onChange={(e) => setPushAlerts(e.target.checked)} />
              <ToggleRow icon={Bell} title="Email Summaries" desc="Daily digest of overdue tasks and activity." checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} />
              <ToggleRow icon={Bell} title="Slack Integration" desc="Sync alerts directly to your Slack workspace." checked={slackAlerts} onChange={(e) => setSlackAlerts(e.target.checked)} />
            </div>
          </div>

          {/* Privacy & Permissions */}
          <div className="card-glass" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={18} style={{ color: 'var(--status-danger)' }} /> Privacy & Security
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <ToggleRow
                icon={EyeOff} title="Private Profile" desc="Hide your email and activity from Viewer roles."
                checked={false} onChange={() => {}} disabled={role === 'VIEWER'}
              />
              <ToggleRow
                icon={Users} title="Team Discovery" desc="Allow other orgs to find your public projects."
                checked={true} onChange={() => {}} disabled={role !== 'ADMIN'}
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
