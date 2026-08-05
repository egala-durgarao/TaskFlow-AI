package com.taskflow.service.impl;

import com.taskflow.dto.project.ProjectRequest;
import com.taskflow.dto.project.ProjectResponse;
import com.taskflow.entity.Project;
import com.taskflow.entity.Workspace;
import com.taskflow.exception.ResourceNotFoundException;
import com.taskflow.mapper.ProjectMapper;
import com.taskflow.repository.ProjectRepository;
import com.taskflow.repository.WorkspaceRepository;
import com.taskflow.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final WorkspaceRepository workspaceRepository;
    private final ProjectMapper projectMapper;

    @Override
    @Transactional
    public ProjectResponse createProject(ProjectRequest request, UUID workspaceId) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new ResourceNotFoundException("Workspace not found"));

        Project project = projectMapper.toEntity(request);
        project.setWorkspace(workspace);
        // Default status logic can be applied here

        project = projectRepository.save(project);
        return projectMapper.toDto(project);
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectResponse getProjectById(UUID id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        return projectMapper.toDto(project);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProjectResponse> getProjectsByWorkspace(UUID workspaceId, Pageable pageable) {
        return projectRepository.findByWorkspaceId(workspaceId, pageable)
                .map(projectMapper::toDto);
    }

    @Override
    @Transactional
    public ProjectResponse updateProject(UUID id, ProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));

        projectMapper.updateEntityFromDto(request, project);
        project = projectRepository.save(project);

        return projectMapper.toDto(project);
    }

    @Override
    @Transactional
    public void deleteProject(UUID id) {
        if (!projectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Project not found with id: " + id);
        }
        projectRepository.deleteById(id);
    }
}
