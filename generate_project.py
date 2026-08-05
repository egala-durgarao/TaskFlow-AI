import os
import textwrap

base_dir = "backend/src/main/java/com/taskflow"

def write_file(path, content):
    full_path = os.path.join(base_dir, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(textwrap.dedent(content).strip() + "\n")

# --- DTOs ---
write_file("dto/project/ProjectRequest.java", """
package com.taskflow.dto.project;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectRequest {
    @NotBlank(message = "Project name is required")
    @Size(min = 3, max = 150, message = "Project name must be between 3 and 150 characters")
    private String name;

    @NotBlank(message = "Project key is required")
    @Size(min = 2, max = 10, message = "Project key must be between 2 and 10 characters")
    private String projectKey;

    private String description;
    private String status;
    private Instant targetDate;
}
""")

write_file("dto/project/ProjectResponse.java", """
package com.taskflow.dto.project;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectResponse {
    private UUID id;
    private String name;
    private String projectKey;
    private String description;
    private String status;
    private Instant targetDate;
    private Instant createdAt;
    private Instant updatedAt;
    
    // Aggregated metrics (stubbed for now, can be populated later)
    @Builder.Default
    private int progress = 0;
    @Builder.Default
    private int tasksCount = 0;
    @Builder.Default
    private int completedCount = 0;
}
""")

# --- Mapper ---
write_file("mapper/ProjectMapper.java", """
package com.taskflow.mapper;

import com.taskflow.dto.project.ProjectRequest;
import com.taskflow.dto.project.ProjectResponse;
import com.taskflow.entity.Project;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ProjectMapper {
    ProjectResponse toDto(Project project);
    
    Project toEntity(ProjectRequest request);
    
    void updateEntityFromDto(ProjectRequest request, @MappingTarget Project project);
}
""")

# --- Service ---
write_file("service/ProjectService.java", """
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
""")

write_file("service/impl/ProjectServiceImpl.java", """
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
""")

# --- Controller ---
write_file("controller/ProjectController.java", """
package com.taskflow.controller;

import com.taskflow.dto.project.ProjectRequest;
import com.taskflow.dto.project.ProjectResponse;
import com.taskflow.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/workspaces/{workspaceId}/projects")
@RequiredArgsConstructor
@Tag(name = "Projects", description = "Project management endpoints")
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Operation(summary = "Create a new project in a workspace")
    public ResponseEntity<ProjectResponse> createProject(
            @PathVariable UUID workspaceId,
            @Valid @RequestBody ProjectRequest request) {
        return new ResponseEntity<>(projectService.createProject(request, workspaceId), HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get all projects for a workspace")
    public ResponseEntity<Page<ProjectResponse>> getProjects(
            @PathVariable UUID workspaceId,
            Pageable pageable) {
        return ResponseEntity.ok(projectService.getProjectsByWorkspace(workspaceId, pageable));
    }

    @GetMapping("/{projectId}")
    @Operation(summary = "Get a project by ID")
    public ResponseEntity<ProjectResponse> getProjectById(
            @PathVariable UUID workspaceId,
            @PathVariable UUID projectId) {
        return ResponseEntity.ok(projectService.getProjectById(projectId));
    }

    @PutMapping("/{projectId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Operation(summary = "Update a project")
    public ResponseEntity<ProjectResponse> updateProject(
            @PathVariable UUID workspaceId,
            @PathVariable UUID projectId,
            @Valid @RequestBody ProjectRequest request) {
        return ResponseEntity.ok(projectService.updateProject(projectId, request));
    }

    @DeleteMapping("/{projectId}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a project")
    public ResponseEntity<Void> deleteProject(
            @PathVariable UUID workspaceId,
            @PathVariable UUID projectId) {
        projectService.deleteProject(projectId);
        return ResponseEntity.noContent().build();
    }
}
""")

print("Successfully generated all Phase 7 (Project APIs) files.")
