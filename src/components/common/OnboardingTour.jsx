import React, { useState } from 'react';
import {
  Zap,
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Kanban,
  BarChart2,
  Bell,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const OnboardingTour = () => {
  const { showOnboarding, completeOnboarding, role, currentUser } = useAuth();
  const { addToast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);

  if (!showOnboarding) return null;

  const steps = [
    {
      title: 'Welcome to TaskFlow AI',
      subtitle: `Logged in as ${currentUser.name} (${role})`,
      description: 'TaskFlow AI is your enterprise task management platform. Plan projects, automate backlog prioritization, and track sprint velocity with modern clarity.',
      icon: Zap,
      color: '#6366f1'
    },
    {
      title: 'Role-Tailored Navigation Sidebar',
      subtitle: `Customized view for ${role} permissions`,
      description: `Your navigation menu automatically adapts to your role. As a ${role}, you get direct access to key tools without cluttered screens.`,
      icon: LayoutDashboard,
      color: '#8b5cf6'
    },
    {
      title: 'Interactive Dashboard Metrics',
      subtitle: 'Real-time KPI overview & AI forecasts',
      description: 'Track Total Tasks, Completed Items, Pending Workloads, and Overdue Alerts at a glance, backed by AI Priority Forecasting.',
      icon: Sparkles,
      color: '#06b6d4'
    },
    {
      title: 'Project Management & Roadmaps',
      subtitle: 'Create & monitor project progress',
      description: role === 'MEMBER' 
        ? 'View project milestones, team member assignments, and roadmap deadlines for all projects you belong to.'
        : 'Create new project workspaces, define project keys, set target due dates, and invite team members.',
      icon: FolderKanban,
      color: '#10b981'
    },
    {
      title: 'Task Creation & Backlog Detail',
      subtitle: 'Full metadata & rich descriptions',
      description: 'Specify title, description, priority, category tags, estimated hours, and target due dates for high-impact task creation.',
      icon: CheckSquare,
      color: '#f59e0b'
    },
    {
      title: 'Team Member Assignments',
      subtitle: 'Workload balancing & notifications',
      description: 'Assign tasks to specific engineers, designers, or managers. Assigned users receive instant in-app alerts.',
      icon: Users,
      color: '#6366f1'
    },
    {
      title: 'High-Speed Kanban Board',
      subtitle: 'Drag & drop status transitions',
      description: 'Easily transition tasks between To Do, In Progress, In Review, and Completed columns with instant progress calculation.',
      icon: Kanban,
      color: '#8b5cf6'
    },
    {
      title: 'Velocity & Performance Analytics',
      subtitle: 'SVG Charts & Executive PDF Reports',
      description: 'Visualize weekly sprint velocity line charts, status distribution pie charts, and export executive PDF summaries.',
      icon: BarChart2,
      color: '#06b6d4'
    },
    {
      title: 'Real-Time Notifications & Alerts',
      subtitle: 'Never miss a deadline or comment',
      description: 'Stay alerted on task mentions, overdue items, milestone completions, and peer comments with unread badges.',
      icon: Bell,
      color: '#ef4444'
    },
    {
      title: 'You\'re All Set!',
      subtitle: 'Ready to ship software faster',
      description: 'Congratulations! You have completed the tour. Explore your workspace and start managing work effortlessly.',
      icon: CheckCircle2,
      color: '#10b981'
    }
  ];

  const step = steps[currentStep];
  const Icon = step.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeOnboarding();
      addToast('Onboarding completed! Welcome to TaskFlow AI.', 'success');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    addToast('Onboarding tour skipped.', 'info');
  };

  return (
    <div className="modal-backdrop" style={{ zIndex: 10000 }}>
      <div
        className="modal-content"
        style={{
          maxWidth: '520px',
          padding: 0,
          border: `1px solid ${step.color}44`,
          boxShadow: `0 20px 40px -10px ${step.color}33`,
          background: 'var(--bg-secondary)',
          overflow: 'hidden'
        }}
      >
        {/* Progress Bar Header */}
        <div style={{ width: '100%', height: '5px', backgroundColor: 'var(--bg-elevated)' }}>
          <div style={{
            width: `${((currentStep + 1) / steps.length) * 100}%`,
            height: '100%',
            backgroundColor: step.color,
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Top Header Controls */}
        <div style={{ padding: '1.25rem 1.5rem 0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: '700', color: step.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Step {currentStep + 1} of {steps.length}
          </span>
          <button
            onClick={handleSkip}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
          >
            Skip Tour <X size={14} />
          </button>
        </div>

        {/* Body Icon & Text */}
        <div style={{ padding: '1rem 1.75rem 1.5rem', textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            backgroundColor: `${step.color}18`,
            color: step.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            border: `1px solid ${step.color}33`
          }}>
            <Icon size={32} />
          </div>

          <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            {step.title}
          </h2>
          <div style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--accent-primary)', marginBottom: '0.85rem' }}>
            {step.subtitle}
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '420px', margin: '0 auto' }}>
            {step.description}
          </p>
        </div>

        {/* Dots Indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginBottom: '1.25rem' }}>
          {steps.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurrentStep(idx)}
              style={{
                width: currentStep === idx ? '18px' : '6px',
                height: '6px',
                borderRadius: '3px',
                backgroundColor: currentStep === idx ? step.color : 'var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            />
          ))}
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="btn-secondary"
            style={{ opacity: currentStep === 0 ? 0.4 : 1, padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
          >
            <ArrowLeft size={16} /> Previous
          </button>

          <button
            onClick={handleNext}
            className="btn-primary"
            style={{ backgroundColor: step.color, backgroundImage: 'none', padding: '0.45rem 1.1rem', fontSize: '0.85rem' }}
          >
            {currentStep === steps.length - 1 ? 'Finish & Start' : 'Next'} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
