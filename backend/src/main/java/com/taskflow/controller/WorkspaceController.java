package com.taskflow.controller;

import com.taskflow.dto.org.WorkspaceRequest;
import com.taskflow.dto.org.WorkspaceResponse;
import com.taskflow.service.WorkspaceService;
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
@RequestMapping("/api/v1/organizations/{orgId}/workspaces")
@RequiredArgsConstructor
@Tag(name = "Workspaces", description = "Workspace management")
public class WorkspaceController {

    private final WorkspaceService workspaceService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get workspaces in an organization")
    public ResponseEntity<Page<WorkspaceResponse>> getWorkspaces(
            @PathVariable UUID orgId, Pageable pageable) {
        return ResponseEntity.ok(workspaceService.getWorkspacesByOrganization(orgId, pageable));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new workspace")
    public ResponseEntity<WorkspaceResponse> createWorkspace(
            @PathVariable UUID orgId,
            @Valid @RequestBody WorkspaceRequest request) {
        return new ResponseEntity<>(workspaceService.createWorkspace(orgId, request), HttpStatus.CREATED);
    }

    @PutMapping("/{workspaceId}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update a workspace")
    public ResponseEntity<WorkspaceResponse> updateWorkspace(
            @PathVariable UUID orgId,
            @PathVariable UUID workspaceId,
            @Valid @RequestBody WorkspaceRequest request) {
        return ResponseEntity.ok(workspaceService.updateWorkspace(workspaceId, request));
    }
}
