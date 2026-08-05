import React, { createContext, useContext, useState } from 'react';
import { MOCK_PROJECTS, MOCK_TASKS, MOCK_NOTIFICATIONS, MOCK_ACTIVITIES } from '../data/mockData';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [activities, setActivities] = useState(MOCK_ACTIVITIES);

  // Active view states
  const [activePage, setActivePage] = useState('dashboard'); // 'landing', 'login', 'register', 'dashboard', 'projects', 'tasks', 'createtask', 'taskdetail', 'reports', 'notifications', 'profile', 'settings'
  const [selectedTaskId, setSelectedTaskId] = useState('task-101');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Task Actions
  const addTask = (newTask) => {
    const createdTask = {
      id: `task-${Date.now()}`,
      subtasks: [],
      comments: [],
      tags: newTask.tags ? newTask.tags.split(',').map(t => t.trim()) : ['General'],
      loggedHours: 0,
      ...newTask
    };
    setTasks(prev => [createdTask, ...prev]);

    // Add activity log
    const newActivity = {
      id: `act-${Date.now()}`,
      user: newTask.assignee || { name: 'You' },
      action: 'created task',
      target: newTask.title,
      detail: `Priority: ${newTask.priority}`,
      timestamp: 'Just now'
    };
    setActivities(prev => [newActivity, ...prev]);

    return createdTask;
  };

  const updateTask = (id, updatedFields) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        return { ...task, ...updatedFields };
      }
      return task;
    }));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  // Project Actions
  const addProject = (newProject) => {
    const created = {
      id: `proj-${Date.now()}`,
      progress: 0,
      tasksCount: 0,
      completedCount: 0,
      members: [],
      color: '#6366f1',
      ...newProject
    };
    setProjects(prev => [created, ...prev]);
    return created;
  };

  // Notification Actions
  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const navigateTo = (page, paramId = null) => {
    if (page === 'taskdetail' && paramId) {
      setSelectedTaskId(paramId);
    }
    if (page === 'projects' && paramId) {
      setSelectedProjectId(paramId);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      projects,
      notifications,
      activities,
      activePage,
      selectedTaskId,
      selectedProjectId,
      addTask,
      updateTask,
      deleteTask,
      updateTaskStatus,
      addProject,
      markNotificationRead,
      markAllNotificationsRead,
      navigateTo,
      setActivePage,
      setSelectedTaskId
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
