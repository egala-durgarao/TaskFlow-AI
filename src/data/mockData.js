// ============================================================================
// TASKFLOW AI — ENTERPRISE MOCK DATA
// ============================================================================

// ─── ORGANIZATIONS ──────────────────────────────────────────────────────────
export const MOCK_ORGANIZATIONS = [
  { id: 'org-1', name: 'Google', logo: '🔵', plan: 'Enterprise', memberCount: 128, color: '#4285F4' },
  { id: 'org-2', name: 'Microsoft', logo: '🟦', plan: 'Enterprise', memberCount: 95, color: '#00A4EF' },
  { id: 'org-3', name: 'Adobe', logo: '🔴', plan: 'Business', memberCount: 64, color: '#FF0000' },
  { id: 'org-4', name: 'Amazon', logo: '🟠', plan: 'Business', memberCount: 82, color: '#FF9900' },
  { id: 'org-5', name: 'My Startup', logo: '🚀', plan: 'Starter', memberCount: 12, color: '#8b5cf6' }
];

// ─── WORKSPACES ─────────────────────────────────────────────────────────────
export const MOCK_WORKSPACES = [
  { id: 'ws-1', orgId: 'org-1', name: 'Android', icon: '📱', taskCount: 48, color: '#3DDC84' },
  { id: 'ws-2', orgId: 'org-1', name: 'Chrome', icon: '🌐', taskCount: 36, color: '#4285F4' },
  { id: 'ws-3', orgId: 'org-1', name: 'Cloud', icon: '☁️', taskCount: 62, color: '#4285F4' },
  { id: 'ws-4', orgId: 'org-1', name: 'AI Research', icon: '🤖', taskCount: 28, color: '#FBBC04' },
  { id: 'ws-5', orgId: 'org-1', name: 'Maps', icon: '🗺️', taskCount: 22, color: '#34A853' },
  { id: 'ws-6', orgId: 'org-2', name: 'Azure', icon: '☁️', taskCount: 54, color: '#00A4EF' },
  { id: 'ws-7', orgId: 'org-2', name: 'Teams', icon: '💬', taskCount: 31, color: '#6264A7' },
  { id: 'ws-8', orgId: 'org-3', name: 'Creative Cloud', icon: '🎨', taskCount: 42, color: '#FF0000' },
  { id: 'ws-9', orgId: 'org-4', name: 'AWS', icon: '☁️', taskCount: 78, color: '#FF9900' },
  { id: 'ws-10', orgId: 'org-5', name: 'Product', icon: '🚀', taskCount: 12, color: '#8b5cf6' }
];

// ─── USERS ──────────────────────────────────────────────────────────────────
export const MOCK_USERS = [
  {
    id: 'usr-1',
    name: 'Victoria Vance',
    email: 'victoria.admin@taskflow.ai',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'ADMIN',
    roleLabel: 'System Administrator',
    department: 'Executive Management',
    status: 'online',
    skills: ['System Architecture', 'DevOps', 'Security', 'Leadership'],
    achievements: ['Platform Pioneer', 'Security Champion', '100 Tasks Closed'],
    completedTaskCount: 142,
    joinDate: '2024-01-15'
  },
  {
    id: 'usr-2',
    name: 'Alex Morgan',
    email: 'alex.morgan@taskflow.ai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'MANAGER',
    roleLabel: 'Engineering Manager',
    department: 'Engineering',
    status: 'online',
    skills: ['React', 'Node.js', 'Team Leadership', 'Agile', 'System Design'],
    achievements: ['Sprint Master', 'Team Builder', '500 Tasks Managed'],
    completedTaskCount: 287,
    joinDate: '2024-03-10'
  },
  {
    id: 'usr-3',
    name: 'Elena Rostova',
    email: 'elena.rostova@taskflow.ai',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    role: 'MEMBER',
    roleLabel: 'Full Stack Engineer',
    department: 'Engineering',
    status: 'online',
    skills: ['React', 'TypeScript', 'PostgreSQL', 'GraphQL', 'CSS'],
    achievements: ['Code Ninja', 'Bug Buster', 'First Pull Request'],
    completedTaskCount: 98,
    joinDate: '2024-06-22'
  },
  {
    id: 'usr-4',
    name: 'Sarah Chen',
    email: 'sarah.chen@taskflow.ai',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    role: 'MANAGER',
    roleLabel: 'Product Manager',
    department: 'Product',
    status: 'online',
    skills: ['Product Strategy', 'Data Analysis', 'Roadmapping', 'User Research'],
    achievements: ['Roadmap Architect', 'Data Driven', 'Customer Champion'],
    completedTaskCount: 203,
    joinDate: '2024-02-18'
  },
  {
    id: 'usr-5',
    name: 'David Miller',
    email: 'david.m@taskflow.ai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'MEMBER',
    roleLabel: 'UI/UX Designer',
    department: 'Design',
    status: 'offline',
    skills: ['Figma', 'Design Systems', 'Prototyping', 'User Testing', 'Motion Design'],
    achievements: ['Pixel Perfect', 'Design System Creator'],
    completedTaskCount: 64,
    joinDate: '2024-07-05'
  },
  {
    id: 'usr-6',
    name: 'James Wilson',
    email: 'james.viewer@taskflow.ai',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    role: 'VIEWER',
    roleLabel: 'Stakeholder',
    department: 'Business',
    status: 'online',
    skills: ['Business Analysis', 'Reporting', 'Strategy'],
    achievements: ['Keen Observer'],
    completedTaskCount: 0,
    joinDate: '2025-01-10'
  }
];

// ─── TEAMS ──────────────────────────────────────────────────────────────────
export const MOCK_TEAMS = [
  {
    id: 'team-1',
    name: 'Frontend Squad',
    description: 'UI/UX implementation, design systems, and frontend architecture',
    lead: MOCK_USERS[1],
    members: [MOCK_USERS[1], MOCK_USERS[2], MOCK_USERS[4]],
    color: '#6366f1',
    velocity: 34,
    capacity: { used: 75, total: 100 },
    currentSprint: 'Sprint 14',
    progress: 72,
    tasksCompleted: 18,
    tasksTotal: 25
  },
  {
    id: 'team-2',
    name: 'AI & Data',
    description: 'Machine learning models, data pipelines, and AI integrations',
    lead: MOCK_USERS[3],
    members: [MOCK_USERS[3], MOCK_USERS[2]],
    color: '#8b5cf6',
    velocity: 28,
    capacity: { used: 60, total: 80 },
    currentSprint: 'Sprint 8',
    progress: 58,
    tasksCompleted: 10,
    tasksTotal: 16
  },
  {
    id: 'team-3',
    name: 'Platform Engineering',
    description: 'Infrastructure, DevOps, CI/CD, and backend services',
    lead: MOCK_USERS[0],
    members: [MOCK_USERS[0], MOCK_USERS[2], MOCK_USERS[4]],
    color: '#06b6d4',
    velocity: 42,
    capacity: { used: 85, total: 100 },
    currentSprint: 'Sprint 22',
    progress: 81,
    tasksCompleted: 32,
    tasksTotal: 40
  },
  {
    id: 'team-4',
    name: 'Product & Design',
    description: 'Product strategy, user research, and visual design',
    lead: MOCK_USERS[3],
    members: [MOCK_USERS[3], MOCK_USERS[4], MOCK_USERS[5]],
    color: '#f59e0b',
    velocity: 22,
    capacity: { used: 50, total: 70 },
    currentSprint: 'Sprint 11',
    progress: 65,
    tasksCompleted: 14,
    tasksTotal: 22
  }
];

// ─── PROJECTS ───────────────────────────────────────────────────────────────
export const MOCK_PROJECTS = [
  {
    id: 'proj-1',
    name: 'SmartFlow v2.0 Redesign',
    key: 'SF2',
    description: 'Complete UI overhaul with dark glassmorphic styling, enhanced micro-interactions, and AI copilot integration.',
    category: 'Engineering',
    status: 'In Progress',
    priority: 'High',
    progress: 78,
    tasksCount: 24,
    completedCount: 18,
    dueDate: '2026-08-25',
    startDate: '2026-06-01',
    lead: MOCK_USERS[1],
    members: [MOCK_USERS[1], MOCK_USERS[2], MOCK_USERS[4]],
    team: MOCK_TEAMS[0],
    color: '#6366f1',
    health: 'On Track',
    riskLevel: 'Low'
  },
  {
    id: 'proj-2',
    name: 'AI Auto-Scheduler Engine',
    key: 'AASE',
    description: 'Machine learning model for task priority forecasting and workload balancing across multi-discipline teams.',
    category: 'AI & Data',
    status: 'In Progress',
    priority: 'Urgent',
    progress: 62,
    tasksCount: 16,
    completedCount: 10,
    dueDate: '2026-09-10',
    startDate: '2026-05-15',
    lead: MOCK_USERS[3],
    members: [MOCK_USERS[3], MOCK_USERS[2]],
    team: MOCK_TEAMS[1],
    color: '#8b5cf6',
    health: 'At Risk',
    riskLevel: 'Medium'
  },
  {
    id: 'proj-3',
    name: 'Mobile App React Native Port',
    key: 'MARN',
    description: 'Cross-platform iOS and Android companion application for real-time task alerts and speech-to-task creation.',
    category: 'Mobile',
    status: 'Planning',
    priority: 'Medium',
    progress: 25,
    tasksCount: 20,
    completedCount: 5,
    dueDate: '2026-10-15',
    startDate: '2026-07-01',
    lead: MOCK_USERS[1],
    members: [MOCK_USERS[1], MOCK_USERS[4]],
    team: MOCK_TEAMS[0],
    color: '#06b6d4',
    health: 'On Track',
    riskLevel: 'Low'
  }
];

// ─── TASKS ──────────────────────────────────────────────────────────────────
export const MOCK_TASKS = [
  {
    id: 'task-101',
    title: 'Implement Dark Glassmorphic Design Tokens in CSS',
    description: 'Define semantic CSS custom variables for dark/light themes, background overlays, blur filters, and vibrant accent highlights.',
    projectId: 'proj-1',
    projectName: 'SmartFlow v2.0 Redesign',
    status: 'In Progress',
    priority: 'High',
    category: 'Frontend',
    assignee: MOCK_USERS[2],
    creator: MOCK_USERS[1],
    dueDate: '2026-08-06',
    estimatedHours: 12,
    loggedHours: 8,
    subtasks: [
      { id: 'st-1', title: 'Define HSL color palettes', completed: true },
      { id: 'st-2', title: 'Add backdrop-filter CSS utility classes', completed: true },
      { id: 'st-3', title: 'Test responsive theme toggle switch', completed: false }
    ],
    comments: [
      {
        id: 'c-1',
        user: MOCK_USERS[4],
        text: 'Make sure the contrast ratio complies with WCAG AA standards for accessibility!',
        createdAt: '2 hours ago'
      }
    ],
    tags: ['Design System', 'CSS', 'UI'],
    dependencies: ['task-102'],
    linkedTasks: ['task-105'],
    attachments: [
      { id: 'att-1', name: 'design-tokens-spec.pdf', size: '2.4 MB', type: 'pdf' },
      { id: 'att-2', name: 'color-palette.png', size: '340 KB', type: 'image' }
    ],
    history: [
      { action: 'created', user: MOCK_USERS[1], timestamp: '3 days ago' },
      { action: 'assigned to Elena Rostova', user: MOCK_USERS[1], timestamp: '3 days ago' },
      { action: 'status changed to In Progress', user: MOCK_USERS[2], timestamp: '2 days ago' },
      { action: 'subtask completed: Define HSL color palettes', user: MOCK_USERS[2], timestamp: '1 day ago' }
    ]
  },
  {
    id: 'task-102',
    title: 'Configure Recharts SVG Velocity & Status Charts',
    description: 'Integrate responsive charts with custom tooltips, glowing gradient area fills, and interactive legend toggles.',
    projectId: 'proj-1',
    projectName: 'SmartFlow v2.0 Redesign',
    status: 'In Progress',
    priority: 'Urgent',
    category: 'Frontend',
    assignee: MOCK_USERS[2],
    creator: MOCK_USERS[1],
    dueDate: '2026-08-08',
    estimatedHours: 16,
    loggedHours: 10,
    subtasks: [
      { id: 'st-4', title: 'Build TaskStatusPieChart component', completed: true },
      { id: 'st-5', title: 'Build ProductivityLineChart component', completed: true },
      { id: 'st-6', title: 'Add interactive legend toggles', completed: false }
    ],
    comments: [],
    tags: ['Analytics', 'Charts', 'React'],
    dependencies: [],
    linkedTasks: ['task-101'],
    attachments: [],
    history: [
      { action: 'created', user: MOCK_USERS[1], timestamp: '5 days ago' },
      { action: 'status changed to In Progress', user: MOCK_USERS[2], timestamp: '4 days ago' }
    ]
  },
  {
    id: 'task-103',
    title: 'Train Task Priority Prediction Transformer Model',
    description: 'Train the NLP core model on past project datasets to automatically estimate priority based on issue description and deadlines.',
    projectId: 'proj-2',
    projectName: 'AI Auto-Scheduler Engine',
    status: 'To Do',
    priority: 'Urgent',
    category: 'AI & Data',
    assignee: MOCK_USERS[4],
    creator: MOCK_USERS[3],
    dueDate: '2026-08-12',
    estimatedHours: 24,
    loggedHours: 0,
    subtasks: [],
    comments: [],
    tags: ['Machine Learning', 'AI'],
    dependencies: [],
    linkedTasks: [],
    attachments: [
      { id: 'att-3', name: 'model-architecture.md', size: '18 KB', type: 'doc' }
    ],
    history: [
      { action: 'created', user: MOCK_USERS[3], timestamp: '1 week ago' }
    ]
  },
  {
    id: 'task-104',
    title: 'Design Mobile Push Notification Badges',
    description: 'Create Figma mockups for native push notifications, interactive quick-action buttons, and rich widget icons.',
    projectId: 'proj-3',
    projectName: 'Mobile App React Native Port',
    status: 'Completed',
    priority: 'Medium',
    category: 'Design',
    assignee: MOCK_USERS[4],
    creator: MOCK_USERS[1],
    dueDate: '2026-08-01',
    estimatedHours: 10,
    loggedHours: 10,
    subtasks: [
      { id: 'st-7', title: 'Figma iOS HIG check', completed: true }
    ],
    comments: [],
    tags: ['Figma', 'Mobile'],
    dependencies: [],
    linkedTasks: [],
    attachments: [],
    history: [
      { action: 'created', user: MOCK_USERS[1], timestamp: '2 weeks ago' },
      { action: 'status changed to Completed', user: MOCK_USERS[4], timestamp: '4 days ago' }
    ]
  },
  {
    id: 'task-105',
    title: 'Optimize Database Query Indexes for Task Search',
    description: 'Add composite indexes on (project_id, status, due_date) to reduce search latency below 15ms.',
    projectId: 'proj-1',
    projectName: 'SmartFlow v2.0 Redesign',
    status: 'Overdue',
    priority: 'Urgent',
    category: 'Backend',
    assignee: MOCK_USERS[2],
    creator: MOCK_USERS[1],
    dueDate: '2026-08-01',
    estimatedHours: 8,
    loggedHours: 4,
    subtasks: [],
    comments: [
      { id: 'c-2', user: MOCK_USERS[1], text: 'This is blocking the release. Please prioritize.', createdAt: '1 day ago' }
    ],
    tags: ['Database', 'Performance'],
    dependencies: [],
    linkedTasks: ['task-101'],
    attachments: [],
    history: [
      { action: 'created', user: MOCK_USERS[1], timestamp: '10 days ago' },
      { action: 'marked as Overdue', user: MOCK_USERS[0], timestamp: '4 days ago' }
    ]
  },
  {
    id: 'task-106',
    title: 'Build Real-time WebSocket Notification Pipeline',
    description: 'Implement WebSocket server for push notifications, typing indicators, and live task status updates.',
    projectId: 'proj-1',
    projectName: 'SmartFlow v2.0 Redesign',
    status: 'In Review',
    priority: 'High',
    category: 'Backend',
    assignee: MOCK_USERS[2],
    creator: MOCK_USERS[1],
    dueDate: '2026-08-10',
    estimatedHours: 20,
    loggedHours: 18,
    subtasks: [
      { id: 'st-8', title: 'Setup WebSocket server', completed: true },
      { id: 'st-9', title: 'Implement notification events', completed: true },
      { id: 'st-10', title: 'Add reconnection logic', completed: false }
    ],
    comments: [
      { id: 'c-3', user: MOCK_USERS[2], text: 'WebSocket connection is stable. Need to add reconnection handling.', createdAt: '3 hours ago' }
    ],
    tags: ['WebSocket', 'Backend', 'Real-time'],
    dependencies: ['task-105'],
    linkedTasks: [],
    attachments: [],
    history: [
      { action: 'created', user: MOCK_USERS[1], timestamp: '1 week ago' },
      { action: 'status changed to In Review', user: MOCK_USERS[2], timestamp: '5 hours ago' }
    ]
  },
  {
    id: 'task-107',
    title: 'Implement OAuth 2.0 Google SSO Integration',
    description: 'Add Google Sign-In flow with PKCE, refresh token rotation, and secure session management.',
    projectId: 'proj-1',
    projectName: 'SmartFlow v2.0 Redesign',
    status: 'To Do',
    priority: 'Medium',
    category: 'Security',
    assignee: MOCK_USERS[1],
    creator: MOCK_USERS[0],
    dueDate: '2026-08-15',
    estimatedHours: 14,
    loggedHours: 0,
    subtasks: [],
    comments: [],
    tags: ['OAuth', 'Security', 'Authentication'],
    dependencies: [],
    linkedTasks: [],
    attachments: [],
    history: [
      { action: 'created', user: MOCK_USERS[0], timestamp: '2 days ago' }
    ]
  },
  {
    id: 'task-108',
    title: 'Create Onboarding Flow for New Team Members',
    description: 'Design and implement a step-by-step guided tour for first-time users including interactive tooltips and progress tracking.',
    projectId: 'proj-1',
    projectName: 'SmartFlow v2.0 Redesign',
    status: 'In Progress',
    priority: 'Medium',
    category: 'Frontend',
    assignee: MOCK_USERS[4],
    creator: MOCK_USERS[3],
    dueDate: '2026-08-18',
    estimatedHours: 16,
    loggedHours: 6,
    subtasks: [
      { id: 'st-11', title: 'Design onboarding screens in Figma', completed: true },
      { id: 'st-12', title: 'Implement spotlight tour component', completed: false },
      { id: 'st-13', title: 'Add progress persistence', completed: false }
    ],
    comments: [],
    tags: ['UX', 'Onboarding', 'Frontend'],
    dependencies: [],
    linkedTasks: [],
    attachments: [],
    history: [
      { action: 'created', user: MOCK_USERS[3], timestamp: '4 days ago' },
      { action: 'status changed to In Progress', user: MOCK_USERS[4], timestamp: '2 days ago' }
    ]
  },
  {
    id: 'task-109',
    title: 'Setup CI/CD Pipeline with GitHub Actions',
    description: 'Configure automated testing, linting, build, and deployment pipeline for staging and production environments.',
    projectId: 'proj-2',
    projectName: 'AI Auto-Scheduler Engine',
    status: 'Completed',
    priority: 'High',
    category: 'DevOps',
    assignee: MOCK_USERS[1],
    creator: MOCK_USERS[0],
    dueDate: '2026-07-28',
    estimatedHours: 12,
    loggedHours: 11,
    subtasks: [
      { id: 'st-14', title: 'Create GitHub Actions workflow', completed: true },
      { id: 'st-15', title: 'Add test coverage reporting', completed: true }
    ],
    comments: [],
    tags: ['CI/CD', 'DevOps', 'GitHub'],
    dependencies: [],
    linkedTasks: [],
    attachments: [],
    history: [
      { action: 'created', user: MOCK_USERS[0], timestamp: '3 weeks ago' },
      { action: 'status changed to Completed', user: MOCK_USERS[1], timestamp: '1 week ago' }
    ]
  },
  {
    id: 'task-110',
    title: 'Design Sprint Retrospective Dashboard Widget',
    description: 'Create a compact dashboard widget showing sprint health, velocity trends, and team morale indicators.',
    projectId: 'proj-3',
    projectName: 'Mobile App React Native Port',
    status: 'To Do',
    priority: 'Low',
    category: 'Design',
    assignee: MOCK_USERS[4],
    creator: MOCK_USERS[3],
    dueDate: '2026-08-20',
    estimatedHours: 8,
    loggedHours: 0,
    subtasks: [],
    comments: [],
    tags: ['Design', 'Dashboard', 'Sprint'],
    dependencies: [],
    linkedTasks: [],
    attachments: [],
    history: [
      { action: 'created', user: MOCK_USERS[3], timestamp: '1 day ago' }
    ]
  }
];

// ─── NOTIFICATIONS ──────────────────────────────────────────────────────────
export const MOCK_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Task Overdue Alert',
    message: '"Optimize Database Query Indexes" passed its due date on Aug 1, 2026.',
    type: 'warning',
    category: 'deadline',
    read: false,
    time: '10 mins ago',
    group: 'Today',
    linkTaskId: 'task-105'
  },
  {
    id: 'notif-2',
    title: 'New Task Assignment',
    message: 'Alex Morgan assigned you "Implement Dark Glassmorphic Design Tokens".',
    type: 'info',
    category: 'assignment',
    read: false,
    time: '1 hour ago',
    group: 'Today',
    linkTaskId: 'task-101'
  },
  {
    id: 'notif-3',
    title: 'Project Milestone Reached',
    message: 'SmartFlow v2.0 Redesign reached 78% progress!',
    type: 'success',
    category: 'assignment',
    read: true,
    time: '4 hours ago',
    group: 'Today',
    linkProjectId: 'proj-1'
  },
  {
    id: 'notif-4',
    title: '@mention in Comment',
    message: 'David Miller mentioned you in "Design Tokens" task: "Can you review the color palette?"',
    type: 'comment',
    category: 'mention',
    read: false,
    time: '5 hours ago',
    group: 'Today',
    linkTaskId: 'task-101'
  },
  {
    id: 'notif-5',
    title: 'New Comment',
    message: 'Alex Morgan commented on "WebSocket Pipeline": "Looks great, just need reconnection logic."',
    type: 'comment',
    category: 'comment',
    read: true,
    time: 'Yesterday at 4:30 PM',
    group: 'Yesterday',
    linkTaskId: 'task-106'
  },
  {
    id: 'notif-6',
    title: 'Sprint 14 Started',
    message: 'Frontend Squad sprint started with 25 tasks and 100 story points.',
    type: 'info',
    category: 'assignment',
    read: true,
    time: 'Yesterday at 9:00 AM',
    group: 'Yesterday',
    linkProjectId: 'proj-1'
  },
  {
    id: 'notif-7',
    title: 'Task Completed',
    message: 'David Miller completed "Design Mobile Push Notification Badges".',
    type: 'success',
    category: 'assignment',
    read: true,
    time: '3 days ago',
    group: 'Earlier',
    linkTaskId: 'task-104'
  },
  {
    id: 'notif-8',
    title: 'Deadline Approaching',
    message: '"Train Task Priority Model" is due in 5 days. Current progress: 0%.',
    type: 'warning',
    category: 'deadline',
    read: false,
    time: '3 days ago',
    group: 'Earlier',
    linkTaskId: 'task-103'
  }
];

// ─── ACTIVITIES ─────────────────────────────────────────────────────────────
export const MOCK_ACTIVITIES = [
  {
    id: 'act-1',
    user: MOCK_USERS[2],
    action: 'updated status of',
    target: 'Implement Dark Glassmorphic Design Tokens',
    detail: 'from To Do to In Progress',
    timestamp: '15 minutes ago',
    group: 'Today',
    icon: 'status'
  },
  {
    id: 'act-2',
    user: MOCK_USERS[1],
    action: 'created task',
    target: 'Configure Recharts SVG Velocity Charts',
    detail: 'Assigned to Elena Rostova',
    timestamp: '2 hours ago',
    group: 'Today',
    icon: 'create'
  },
  {
    id: 'act-3',
    user: MOCK_USERS[2],
    action: 'submitted for review',
    target: 'Build Real-time WebSocket Pipeline',
    detail: 'Status changed to In Review',
    timestamp: '5 hours ago',
    group: 'Today',
    icon: 'review'
  },
  {
    id: 'act-4',
    user: MOCK_USERS[4],
    action: 'completed',
    target: 'Design Mobile Push Notification Badges',
    detail: 'All subtasks finished',
    timestamp: '6 hours ago',
    group: 'Today',
    icon: 'complete'
  },
  {
    id: 'act-5',
    user: MOCK_USERS[4],
    action: 'commented on',
    target: 'Implement Dark Glassmorphic Design Tokens',
    detail: 'WCAG AA compliance reminder',
    timestamp: 'Yesterday at 4:30 PM',
    group: 'Yesterday',
    icon: 'comment'
  },
  {
    id: 'act-6',
    user: MOCK_USERS[0],
    action: 'invited user',
    target: 'Elena Rostova',
    detail: 'Assigned role: Member',
    timestamp: 'Yesterday at 2:15 PM',
    group: 'Yesterday',
    icon: 'user'
  },
  {
    id: 'act-7',
    user: MOCK_USERS[1],
    action: 'started sprint',
    target: 'Sprint 14 — Frontend Squad',
    detail: '25 tasks, 100 story points',
    timestamp: 'Yesterday at 9:00 AM',
    group: 'Yesterday',
    icon: 'sprint'
  },
  {
    id: 'act-8',
    user: MOCK_USERS[3],
    action: 'created project',
    target: 'AI Auto-Scheduler Engine',
    detail: 'Priority: Urgent',
    timestamp: '3 days ago',
    group: 'Earlier',
    icon: 'create'
  },
  {
    id: 'act-9',
    user: MOCK_USERS[1],
    action: 'closed milestone',
    target: 'SmartFlow v1.5 Release',
    detail: 'All 42 tasks completed',
    timestamp: '5 days ago',
    group: 'Earlier',
    icon: 'complete'
  },
  {
    id: 'act-10',
    user: MOCK_USERS[0],
    action: 'updated security settings',
    target: 'Workspace Security Policy',
    detail: 'Enabled 2FA requirement',
    timestamp: '1 week ago',
    group: 'Earlier',
    icon: 'settings'
  }
];

// ─── CALENDAR EVENTS ────────────────────────────────────────────────────────
export const MOCK_CALENDAR_EVENTS = [
  { id: 'cal-1', title: 'Design Tokens Due', date: '2026-08-06', type: 'deadline', color: '#ef4444', taskId: 'task-101' },
  { id: 'cal-2', title: 'Charts PR Review', date: '2026-08-08', type: 'deadline', color: '#f59e0b', taskId: 'task-102' },
  { id: 'cal-3', title: 'Sprint 14 Retro', date: '2026-08-09', type: 'meeting', color: '#6366f1' },
  { id: 'cal-4', title: 'WebSocket Demo', date: '2026-08-10', type: 'deadline', color: '#10b981', taskId: 'task-106' },
  { id: 'cal-5', title: 'AI Model Training Start', date: '2026-08-12', type: 'milestone', color: '#8b5cf6', taskId: 'task-103' },
  { id: 'cal-6', title: 'OAuth Integration Due', date: '2026-08-15', type: 'deadline', color: '#06b6d4', taskId: 'task-107' },
  { id: 'cal-7', title: 'Onboarding Flow Due', date: '2026-08-18', type: 'deadline', color: '#f59e0b', taskId: 'task-108' },
  { id: 'cal-8', title: 'Sprint 15 Planning', date: '2026-08-20', type: 'meeting', color: '#6366f1' },
  { id: 'cal-9', title: 'v2.0 Release Target', date: '2026-08-25', type: 'milestone', color: '#ef4444' },
  { id: 'cal-10', title: 'Team Standup', date: '2026-08-05', type: 'meeting', color: '#10b981' },
  { id: 'cal-11', title: 'Design Review', date: '2026-08-05', type: 'meeting', color: '#8b5cf6' }
];

// ─── REPORT STATS ───────────────────────────────────────────────────────────
export const MOCK_REPORT_STATS = {
  weeklyVelocity: [
    { week: 'Week 1', completed: 12, planned: 15 },
    { week: 'Week 2', completed: 18, planned: 18 },
    { week: 'Week 3', completed: 22, planned: 20 },
    { week: 'Week 4', completed: 28, planned: 25 }
  ],
  statusBreakdown: [
    { name: 'Completed', value: 38, color: '#10b981' },
    { name: 'In Progress', value: 24, color: '#6366f1' },
    { name: 'In Review', value: 12, color: '#06b6d4' },
    { name: 'To Do', value: 18, color: '#8b5cf6' },
    { name: 'Overdue', value: 8, color: '#ef4444' }
  ],
  priorityWorkload: [
    { priority: 'Urgent', count: 14, color: '#ef4444' },
    { priority: 'High', count: 28, color: '#f59e0b' },
    { priority: 'Medium', count: 35, color: '#6366f1' },
    { priority: 'Low', count: 23, color: '#10b981' }
  ],
  burndownData: [
    { day: 'Day 1', remaining: 100, ideal: 100 },
    { day: 'Day 3', remaining: 88, ideal: 80 },
    { day: 'Day 5', remaining: 72, ideal: 60 },
    { day: 'Day 7', remaining: 58, ideal: 40 },
    { day: 'Day 9', remaining: 35, ideal: 20 },
    { day: 'Day 10', remaining: 22, ideal: 0 }
  ],
  completionTrends: [
    { month: 'Mar', completed: 45 },
    { month: 'Apr', completed: 62 },
    { month: 'May', completed: 78 },
    { month: 'Jun', completed: 85 },
    { month: 'Jul', completed: 92 },
    { month: 'Aug', completed: 68 }
  ],
  workloadByMember: [
    { name: 'Elena', tasks: 12, capacity: 15 },
    { name: 'Alex', tasks: 8, capacity: 10 },
    { name: 'David', tasks: 6, capacity: 8 },
    { name: 'Sarah', tasks: 9, capacity: 12 },
    { name: 'Victoria', tasks: 4, capacity: 5 }
  ],
  departmentPerformance: [
    { department: 'Engineering', completed: 42, total: 55 },
    { department: 'Design', completed: 18, total: 22 },
    { department: 'Product', completed: 15, total: 20 },
    { department: 'DevOps', completed: 12, total: 14 }
  ]
};
