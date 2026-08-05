package com.taskflow.service;

import com.taskflow.dto.project.ProjectRequest;
import com.taskflow.dto.project.ProjectResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface ProjectService {
    ProjectResponse createProject(ProjectRequest request, UUID workspaceId);
    ProjectResponse getProjectById(UUID id);
    Page<ProjectResponse> getProjectsByWorkspace(UUID workspaceId, Pageable pageable);
    ProjectResponse updateProject(UUID id, ProjectRequest request);
    void deleteProject(UUID id);
}
