import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Zap, CheckSquare, AlertTriangle, TrendingUp, HelpCircle, MessageSquare } from 'lucide-react';
import { useTask } from '../../context/TaskContext';
import { useAuth } from '../../context/AuthContext';

const SUGGESTIONS = [
  { id: 'sum', label: "Summarize today's work", icon: TrendingUp },
  { id: 'overdue', label: "What's overdue?", icon: AlertTriangle },
  { id: 'next', label: 'Suggest next task', icon: CheckSquare },
  { id: 'explain', label: 'Explain my dashboard', icon: HelpCircle }
];

const generateAIResponse = (prompt, tasks, activities, currentUser) => {
  const lower = prompt.toLowerCase();

  if (lower.includes('summarize') || lower.includes('today')) {
    const todayActs = activities.filter(a => a.group === 'Today');
    if (todayActs.length === 0) return "It's been a quiet day so far. No activities logged yet today.";
    return `Here's your day so far:\n\n${todayActs.map((a, i) => `${i + 1}. **${a.user?.name}** ${a.action} "${a.target}" — ${a.timestamp}`).join('\n')}\n\nTotal: ${todayActs.length} activities today. Keep up the momentum! 🚀`;
  }

  if (lower.includes('overdue')) {
    const overdue = tasks.filter(t => t.status === 'Overdue');
    if (overdue.length === 0) return "Great news! No overdue tasks right now. 🎉";
    return `⚠️ **${overdue.length} overdue task(s):**\n\n${overdue.map(t => `• **${t.title}** — Due ${t.dueDate} (Assigned to ${t.assignee?.name})`).join('\n')}\n\nRecommendation: Reassign or escalate these items.`;
  }

  if (lower.includes('next') || lower.includes('suggest')) {
    const urgent = tasks.filter(t => t.status !== 'Completed' && t.status !== 'Done' && t.priority === 'Urgent');
    const high = tasks.filter(t => t.status !== 'Completed' && t.status !== 'Done' && t.priority === 'High');
    const pick = urgent[0] || high[0] || tasks.find(t => t.status === 'To Do');
    if (!pick) return "All caught up! No pending tasks to suggest.";
    return `🎯 **Suggested next task:**\n\n**${pick.title}**\nPriority: ${pick.priority} • Project: ${pick.projectName}\nDue: ${pick.dueDate}\n\nThis is the highest priority item you should focus on.`;
  }

  if (lower.includes('explain') || lower.includes('dashboard')) {
    return `📊 **Dashboard Overview:**\n\nYour dashboard shows:\n• **Stat Cards** — Key metrics like total tasks, completed, in-progress, overdue\n• **Charts** — Velocity trend and task status distribution\n• **Priority Tasks** — Your most urgent items needing attention\n• **Activity Feed** — Recent team actions\n\nTip: Use the role switcher in the navbar to see different dashboard views!`;
  }

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return `Hey ${currentUser.name}! 👋 I'm your TaskFlow AI Copilot. I can help you:\n\n• Summarize today's work\n• Find overdue tasks\n• Suggest what to work on next\n• Explain dashboard features\n\nJust ask me anything!`;
  }

  return `I can help with:\n\n• **"Summarize today"** — Get a recap of activities\n• **"What's overdue?"** — Find overdue tasks\n• **"Suggest next task"** — Smart priority recommendation\n• **"Explain dashboard"** — Learn about UI features\n\nTry one of these or ask me anything about your workspace!`;
};

export const AICopilot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 'welcome', role: 'ai', text: "Hi! I'm your TaskFlow AI Copilot. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const { tasks, activities } = useTask();
  const { currentUser } = useAuth();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = (text) => {
    const prompt = text || input;
    if (!prompt.trim()) return;

    const userMsg = { id: `u-${Date.now()}`, role: 'user', text: prompt };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = generateAIResponse(prompt, tasks, activities, currentUser);
      const aiMsg = { id: `ai-${Date.now()}`, role: 'ai', text: response };
      setMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        className="ai-fab"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close AI Copilot' : 'Open AI Copilot'}
        title="AI Copilot"
      >
        <span className="pulse-ring" />
        {isOpen ? <X size={22} /> : <Sparkles size={22} />}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="ai-panel" role="dialog" aria-label="AI Copilot Chat">
          {/* Header */}
          <div style={{
            padding: '0.85rem 1rem', borderBottom: '1px solid var(--border-color)',
            display: 'flex', alignItems: 'center', gap: '0.6rem'
          }}>
            <div style={{
              width: '30px', height: '30px', borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', flexShrink: 0
            }}>
              <Zap size={16} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '700', fontSize: '0.88rem' }}>TaskFlow Copilot</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--status-success)', fontWeight: '600' }}>● Online</div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: 'var(--text-muted)', padding: '0.25rem'
            }} aria-label="Close">
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {messages.map(msg => (
              <div key={msg.id} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '88%'
              }}>
                <div style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  backgroundColor: msg.role === 'user'
                    ? 'var(--accent-primary)'
                    : 'var(--bg-elevated)',
                  color: msg.role === 'user' ? '#ffffff' : 'var(--text-primary)',
                  fontSize: '0.84rem',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div style={{ padding: '0 0.85rem 0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {SUGGESTIONS.map(s => (
                <button
                  key={s.id}
                  onClick={() => handleSend(s.label)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                    padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-card)', color: 'var(--text-secondary)',
                    fontSize: '0.74rem', fontWeight: '500', cursor: 'pointer',
                    transition: 'all 0.15s ease', whiteSpace: 'nowrap'
                  }}
                >
                  <s.icon size={12} /> {s.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '0.65rem 0.85rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              style={{
                flex: 1, background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '0.5rem 0.75rem', fontSize: '0.84rem',
                color: 'var(--text-primary)', outline: 'none'
              }}
              aria-label="Message input"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              style={{
                width: '34px', height: '34px', borderRadius: 'var(--radius-md)',
                background: input.trim() ? 'var(--accent-primary)' : 'var(--bg-elevated)',
                color: input.trim() ? '#fff' : 'var(--text-muted)',
                border: 'none', cursor: input.trim() ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s ease', flexShrink: 0
              }}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
