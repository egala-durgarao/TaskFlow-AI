import React, { useState } from 'react';
import {
  Zap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Shield,
  Layers,
  BarChart2,
  Users,
  ChevronDown,
  ChevronUp,
  Star
} from 'lucide-react';
import { useTask } from '../context/TaskContext';
import { Footer } from '../components/common/Footer';

export const LandingPage = () => {
  const { navigateTo } = useTask();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
  const [activeTab, setActiveTab] = useState('kanban'); // 'kanban' | 'analytics' | 'timeline'
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Navbar Hero */}
      <header style={{
        height: '72px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2.5rem',
        backgroundColor: 'var(--glass-bg)',
        backdropFilter: 'var(--backdrop-blur)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => navigateTo('landing')}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}>
            <Zap size={22} />
          </div>
          <span style={{ fontWeight: '800', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>TaskFlow AI</span>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem', fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
          <a href="#features" style={{ color: 'inherit', textDecoration: 'none' }}>Features</a>
          <a href="#demo" style={{ color: 'inherit', textDecoration: 'none' }}>Platform Demo</a>
          <a href="#pricing" style={{ color: 'inherit', textDecoration: 'none' }}>Pricing</a>
          <a href="#faq" style={{ color: 'inherit', textDecoration: 'none' }}>FAQ</a>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="btn-secondary" onClick={() => navigateTo('login')}>Log In</button>
          <button className="btn-primary" onClick={() => navigateTo('register')}>
            Get Started Free <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* 1. Hero Section */}
      <section style={{ padding: '6rem 2rem 4rem', textAlign: 'center', maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1rem',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(99, 102, 241, 0.12)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          color: 'var(--accent-primary)',
          fontSize: '0.85rem',
          fontWeight: '600',
          marginBottom: '1.5rem'
        }}>
          <Sparkles size={16} /> Next-Gen AI Task Engine v2.0 Released
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
          fontWeight: '800',
          letterSpacing: '-0.03em',
          lineHeight: '1.15',
          marginBottom: '1.5rem',
          background: 'linear-gradient(180deg, var(--text-primary) 0%, var(--text-secondary) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Smart Task Management Built for High-Performance Teams
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-secondary)',
          maxWidth: '780px',
          margin: '0 auto 2.5rem',
          lineHeight: '1.6'
        }}>
          Combine the speed of Linear, clarity of Notion, and analytical depth of Jira. TaskFlow AI predicts bottlenecks, prioritizes backlog items, and keeps everyone in sync.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }} onClick={() => navigateTo('dashboard')}>
            Explore Interactive Demo <ArrowRight size={18} />
          </button>
          <button className="btn-secondary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }} onClick={() => navigateTo('register')}>
            Sign Up - Free Forever
          </button>
        </div>

        {/* Hero Interactive App Mockup Preview */}
        <div id="demo" style={{ marginTop: '4rem' }}>
          <div className="card-glass" style={{
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-glow)',
            borderColor: 'rgba(99, 102, 241, 0.3)',
            backgroundColor: 'var(--bg-secondary)'
          }}>
            {/* Screenshot Switcher Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <button
                className={activeTab === 'kanban' ? 'btn-primary' : 'btn-secondary'}
                onClick={() => setActiveTab('kanban')}
                style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
              >
                Kanban Task Board
              </button>
              <button
                className={activeTab === 'analytics' ? 'btn-primary' : 'btn-secondary'}
                onClick={() => setActiveTab('analytics')}
                style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
              >
                Velocity Analytics
              </button>
              <button
                className={activeTab === 'timeline' ? 'btn-primary' : 'btn-secondary'}
                onClick={() => setActiveTab('timeline')}
                style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
              >
                Project Timeline
              </button>
            </div>

            {/* Mock Image Display */}
            <div style={{
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              minHeight: '380px',
              backgroundColor: 'var(--bg-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <img
                src={
                  activeTab === 'kanban'
                    ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80'
                    : activeTab === 'analytics'
                    ? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80'
                    : 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80'
                }
                alt="TaskFlow UI Preview"
                style={{ width: '100%', height: '420px', objectFit: 'cover', opacity: 0.85 }}
              />
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                right: '1.5rem',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(12px)',
                padding: '1rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid var(--border-color)'
              }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                  {activeTab === 'kanban' && '⚡ Real-time Kanban board with instant drag & drop status updates'}
                  {activeTab === 'analytics' && '📊 AI-assisted sprint velocity and burndown reports'}
                  {activeTab === 'timeline' && '🗓️ Cross-project dependencies and roadmap timeline view'}
                </span>
                <button className="btn-primary" onClick={() => navigateTo('dashboard')} style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}>
                  Try Live Platform
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Features Grid */}
      <section id="features" style={{ padding: '5rem 2rem', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
              Engineered for Modern Engineering & Product Teams
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
              Everything software companies, startups, and freelancers need to manage work without administrative overhead.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
            <div className="card-glass">
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Sparkles size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>AI Smart Scheduling</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Automatically predict task completion estimates, identify resource over-allocation, and receive intelligent priority adjustments.
              </p>
            </div>

            <div className="card-glass">
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Layers size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Multi-View Workspaces</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Switch effortlessly between Kanban board, high-speed data tables, calendar deadline schedules, and team workload views.
              </p>
            </div>

            <div className="card-glass">
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <BarChart2 size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Real-time Velocity Reports</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Visualize weekly throughput, status distribution pie charts, priority breakdowns, and export executive PDF summaries in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Testimonials */}
      <section style={{ padding: '5rem 2rem', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Trusted by 10,000+ Software Leaders</h2>
            <p style={{ color: 'var(--text-secondary)' }}>See how teams cut delivery time by 35% using TaskFlow AI</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                quote: "TaskFlow AI transformed our sprint planning. The automatic priority prediction saved us hours of back-and-forth every week.",
                author: "Marcus Vance",
                role: "VP of Engineering at CloudScale",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              },
              {
                quote: "The cleanest UI I've ever used. Linear-level speed with Jira-level reporting depth. Our engineers actually enjoy updating tasks now.",
                author: "Sarah Chen",
                role: "Lead PM at TechFlow Systems",
                avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
              },
              {
                quote: "As a freelance design architect, tracking multi-client deliverables was a nightmare until TaskFlow AI. Now everything is in order.",
                author: "David Miller",
                role: "Senior Product Designer",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
              }
            ].map((t, idx) => (
              <div key={idx} className="card-glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', gap: '0.2rem', color: '#f59e0b', marginBottom: '1rem' }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" />)}
                  </div>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '1.25rem' }}>
                    "{t.quote}"
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img src={t.avatar} alt={t.author} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.88rem' }}>{t.author}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Pricing Plans */}
      <section id="pricing" style={{ padding: '5rem 2rem', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.75rem' }}>Simple, Transparent Pricing</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Scale seamlessly from solo developer to enterprise team</p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--bg-card)', padding: '0.3rem 0.4rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
              <button
                className={billingCycle === 'monthly' ? 'btn-primary' : 'btn-secondary'}
                onClick={() => setBillingCycle('monthly')}
                style={{ padding: '0.35rem 1rem', fontSize: '0.82rem', borderRadius: 'var(--radius-full)' }}
              >
                Monthly
              </button>
              <button
                className={billingCycle === 'yearly' ? 'btn-primary' : 'btn-secondary'}
                onClick={() => setBillingCycle('yearly')}
                style={{ padding: '0.35rem 1rem', fontSize: '0.82rem', borderRadius: 'var(--radius-full)' }}
              >
                Yearly (Save 20%)
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
            {/* Free */}
            <div className="card-glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Free Tier</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>For students and solo freelancers</p>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>$0 <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '400' }}>/ month</span></div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: 'var(--status-success)' }} /> Up to 5 Team Members</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: 'var(--status-success)' }} /> Unlimited Tasks & Projects</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: 'var(--status-success)' }} /> Basic Kanban Board</li>
              </ul>
              <button className="btn-secondary" style={{ marginTop: 'auto', width: '100%' }} onClick={() => navigateTo('register')}>Get Started</button>
            </div>

            {/* Pro */}
            <div className="card-glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', borderColor: 'var(--accent-primary)', boxShadow: 'var(--shadow-glow)', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '-12px', right: '1.5rem', backgroundColor: 'var(--accent-primary)', color: '#ffffff', fontSize: '0.75rem', fontWeight: '700', padding: '0.2rem 0.75rem', borderRadius: 'var(--radius-full)' }}>Most Popular</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Pro Team</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>For growing startups & dev teams</p>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>
                {billingCycle === 'yearly' ? '$12' : '$15'} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '400' }}>/ user / mo</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: 'var(--status-success)' }} /> Everything in Free</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: 'var(--status-success)' }} /> AI Copilot Priority Engine</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: 'var(--status-success)' }} /> Advanced Velocity Analytics</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: 'var(--status-success)' }} /> Executive PDF Export</li>
              </ul>
              <button className="btn-primary" style={{ marginTop: 'auto', width: '100%' }} onClick={() => navigateTo('register')}>Start 14-Day Free Trial</button>
            </div>

            {/* Enterprise */}
            <div className="card-glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Enterprise</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>For large enterprise organizations</p>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>Custom</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: 'var(--status-success)' }} /> Unlimited Seats</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: 'var(--status-success)' }} /> SAML 2.0 SSO & Okta</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: 'var(--status-success)' }} /> Dedicated Success Manager</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: 'var(--status-success)' }} /> 99.99% Uptime SLA</li>
              </ul>
              <button className="btn-secondary" style={{ marginTop: 'auto', width: '100%' }} onClick={() => navigateTo('register')}>Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Accordion */}
      <section id="faq" style={{ padding: '5rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Frequently Asked Questions</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Got questions? We've got clear answers.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            {
              q: "How does TaskFlow AI differ from Jira or Trello?",
              a: "TaskFlow AI combines the lightning-fast keyboard-first speed of Linear with the analytical power of Jira and the user-friendly simplicity of Trello, plus built-in AI auto-scheduling."
            },
            {
              q: "Can I import my existing projects from Trello or Jira?",
              a: "Yes! TaskFlow AI provides one-click CSV and API import tools for Trello boards, Jira software projects, and Asana workspaces."
            },
            {
              q: "Is there a free trial for Pro features?",
              a: "Absolutely. All new team accounts get a 14-day full access trial of Pro Team features with no credit card required."
            },
            {
              q: "How secure is my company data?",
              a: "We enforce end-to-end TLS 1.3 encryption, SOC2 Type II compliance, automated daily snapshots, and optional SAML SSO authentication."
            }
          ].map((faq, idx) => (
            <div key={idx} className="card-glass" style={{ cursor: 'pointer', padding: '1.25rem 1.5rem' }} onClick={() => toggleFaq(idx)}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: '700', fontSize: '1rem' }}>
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              {openFaq === idx && (
                <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};
