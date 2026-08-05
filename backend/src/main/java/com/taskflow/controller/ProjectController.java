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
