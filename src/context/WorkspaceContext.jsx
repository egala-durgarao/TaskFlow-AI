import React, { createContext, useContext, useState, useMemo } from 'react';
import { MOCK_ORGANIZATIONS, MOCK_WORKSPACES } from '../data/mockData';

const WorkspaceContext = createContext();

export const WorkspaceProvider = ({ children }) => {
  const [currentOrg, setCurrentOrg] = useState(MOCK_ORGANIZATIONS[0]); // Google
  const [currentWorkspace, setCurrentWorkspace] = useState(MOCK_WORKSPACES[0]); // Android

  const organizations = MOCK_ORGANIZATIONS;

  // Filter workspaces by current org
  const workspaces = useMemo(() => {
    return MOCK_WORKSPACES.filter(ws => ws.orgId === currentOrg.id);
  }, [currentOrg]);

  const switchOrg = (orgId) => {
    const org = organizations.find(o => o.id === orgId);
    if (org) {
      setCurrentOrg(org);
      // Auto-select first workspace of new org
      const firstWs = MOCK_WORKSPACES.find(ws => ws.orgId === orgId);
      if (firstWs) setCurrentWorkspace(firstWs);
    }
  };

  const switchWorkspace = (wsId) => {
    const ws = MOCK_WORKSPACES.find(w => w.id === wsId);
    if (ws) setCurrentWorkspace(ws);
  };

  return (
    <WorkspaceContext.Provider value={{
      currentOrg,
      currentWorkspace,
      organizations,
      workspaces,
      switchOrg,
      switchWorkspace,
      setCurrentOrg,
      setCurrentWorkspace
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => useContext(WorkspaceContext);
