import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Default to Manager (Alex Morgan) or allow quick role switching
  const [currentUser, setCurrentUser] = useState(() => {
    const savedRole = localStorage.getItem('tf_selected_role');
    if (savedRole) {
      const user = MOCK_USERS.find(u => u.role === savedRole);
      if (user) return user;
    }
    return MOCK_USERS[1]; // Alex Morgan (MANAGER)
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Track if user completed onboarding tour
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem('tf_onboarding_completed') === 'true';
  });

  const [showOnboarding, setShowOnboarding] = useState(false);

  // User preferences
  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem('tf_preferences');
      return saved ? JSON.parse(saved) : {
        aiSuggestions: true,
        copilotAutoOpen: false,
        defaultView: 'kanban',
        compactMode: false,
        keyboardShortcuts: true
      };
    } catch {
      return {
        aiSuggestions: true,
        copilotAutoOpen: false,
        defaultView: 'kanban',
        compactMode: false,
        keyboardShortcuts: true
      };
    }
  });

  useEffect(() => {
    // Show onboarding tour automatically on first visit after login
    if (!hasCompletedOnboarding && isAuthenticated) {
      setShowOnboarding(true);
    }
  }, [hasCompletedOnboarding, isAuthenticated]);

  // Persist preferences
  useEffect(() => {
    localStorage.setItem('tf_preferences', JSON.stringify(preferences));
  }, [preferences]);

  const switchRole = (roleType) => {
    const user = MOCK_USERS.find(u => u.role === roleType) || MOCK_USERS[1];
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('tf_selected_role', roleType);
  };

  const login = (email, password) => {
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase()) || MOCK_USERS[1];
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('tf_selected_role', user.role);
    return user;
  };

  const register = (name, email, password) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      role: 'MEMBER',
      roleLabel: 'Software Engineer',
      department: 'Engineering',
      status: 'online',
      skills: [],
      achievements: [],
      completedTaskCount: 0,
      joinDate: new Date().toISOString().split('T')[0]
    };
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    return newUser;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
    setShowOnboarding(false);
    localStorage.setItem('tf_onboarding_completed', 'true');
  };

  const resetOnboarding = () => {
    setHasCompletedOnboarding(false);
    setShowOnboarding(true);
    localStorage.setItem('tf_onboarding_completed', 'false');
  };

  const updatePreference = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      role: currentUser?.role || 'MEMBER',
      switchRole,
      login,
      register,
      logout,
      setCurrentUser,
      showOnboarding,
      setShowOnboarding,
      completeOnboarding,
      resetOnboarding,
      preferences,
      updatePreference
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
