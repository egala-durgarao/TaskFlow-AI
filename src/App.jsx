import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider, useTask } from './context/TaskContext';
import { ToastProvider } from './context/ToastContext';
import { WorkspaceProvider } from './context/WorkspaceContext';

import { Sidebar } from './components/common/Sidebar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { OnboardingTour } from './components/common/OnboardingTour';
import { CommandPalette } from './components/common/CommandPalette';
import { AICopilot } from './components/common/AICopilot';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { TasksPage } from './pages/TasksPage';
import { CreateTaskPage } from './pages/CreateTaskPage';
import { TaskDetailPage } from './pages/TaskDetailPage';
import { ReportsPage } from './pages/ReportsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { TeamsPage } from './pages/TeamsPage';
import { CalendarPage } from './pages/CalendarPage';
import { ActivityPage } from './pages/ActivityPage';

// Role-based page access configuration
const PAGE_ACCESS = {
  ADMIN: ['dashboard', 'projects', 'tasks', 'createtask', 'taskdetail', 'reports', 'settings', 'notifications', 'profile', 'teams', 'calendar', 'activity'],
  MANAGER: ['dashboard', 'projects', 'tasks', 'createtask', 'taskdetail', 'reports', 'notifications', 'profile', 'settings', 'teams', 'calendar'],
  MEMBER: ['dashboard', 'tasks', 'taskdetail', 'notifications', 'profile', 'calendar'],
  VIEWER: ['dashboard', 'projects', 'reports', 'activity']
};

function AppContent() {
  const { activePage, navigateTo } = useTask();
  const { isAuthenticated, role, showOnboarding, completeOnboarding } = useAuth();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed(prev => !prev);
  const toggleMobileSidebar = () => setMobileSidebarOpen(prev => !prev);

  // Global Ctrl+K handler for Command Palette
  const handleGlobalKeyDown = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      setIsCmdOpen(prev => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleGlobalKeyDown]);

  // Standalone public pages
  if (activePage === 'landing') return <LandingPage />;
  if (activePage === 'login') return <LoginPage />;
  if (activePage === 'register') return <RegisterPage />;

  // Check role-based page access (fallback to dashboard if unauthorized)
  const allowedPages = PAGE_ACCESS[role] || PAGE_ACCESS.MEMBER;
  const currentPage = allowedPages.includes(activePage) ? activePage : 'dashboard';

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        mobileOpen={mobileSidebarOpen}
        closeMobileSidebar={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="main-content">
        <Navbar toggleMobileSidebar={toggleMobileSidebar} />

        <main style={{ flex: 1, minHeight: 'calc(100vh - var(--navbar-height))' }}>
          {currentPage === 'dashboard' && <DashboardPage />}
          {currentPage === 'projects' && <ProjectsPage />}
          {currentPage === 'tasks' && <TasksPage />}
          {currentPage === 'createtask' && <CreateTaskPage />}
          {currentPage === 'taskdetail' && <TaskDetailPage />}
          {currentPage === 'reports' && <ReportsPage />}
          {currentPage === 'notifications' && <NotificationsPage />}
          {currentPage === 'profile' && <ProfilePage />}
          {currentPage === 'settings' && <SettingsPage />}
          {currentPage === 'teams' && <TeamsPage />}
          {currentPage === 'calendar' && <CalendarPage />}
          {currentPage === 'activity' && <ActivityPage />}
        </main>

        <Footer />
      </div>

      {/* Global Overlays */}
      <CommandPalette isOpen={isCmdOpen} onClose={() => setIsCmdOpen(false)} />
      <AICopilot />

      {/* Onboarding Tour Overlay */}
      {showOnboarding && (
        <OnboardingTour onComplete={completeOnboarding} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WorkspaceProvider>
          <TaskProvider>
            <ToastProvider>
              <AppContent />
            </ToastProvider>
          </TaskProvider>
        </WorkspaceProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
