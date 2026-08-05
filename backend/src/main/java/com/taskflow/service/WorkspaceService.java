package com.taskflow.service;

import com.taskflow.dto.org.WorkspaceRequest;
import com.taskflow.dto.org.WorkspaceResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.UUID;

public interface WorkspaceService {
    Page<WorkspaceResponse> getWorkspacesByOrganization(UUID orgId, Pageable pageable);
    WorkspaceResponse createWorkspace(UUID orgId, WorkspaceRequest request);
    WorkspaceResponse updateWorkspace(UUID workspaceId, WorkspaceRequest request);
}
