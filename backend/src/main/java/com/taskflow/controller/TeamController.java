package com.taskflow.controller;

import com.taskflow.dto.org.TeamRequest;
import com.taskflow.dto.org.TeamResponse;
import com.taskflow.service.TeamService;
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
@RequestMapping("/api/v1/workspaces/{workspaceId}/teams")
@RequiredArgsConstructor
@Tag(name = "Teams", description = "Team management within a workspace")
public class TeamController {

    private final TeamService teamService;

    @GetMapping
    @Operation(summary = "Get teams in a workspace")
    public ResponseEntity<Page<TeamResponse>> getTeams(
            @PathVariable UUID workspaceId, Pageable pageable) {
        return ResponseEntity.ok(teamService.getTeamsByWorkspace(workspaceId, pageable));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Operation(summary = "Create a team")
    public ResponseEntity<TeamResponse> createTeam(
            @PathVariable UUID workspaceId,
            @Valid @RequestBody TeamRequest request) {
        return new ResponseEntity<>(teamService.createTeam(workspaceId, request), HttpStatus.CREATED);
    }

    @PutMapping("/{teamId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Operation(summary = "Update a team")
    public ResponseEntity<TeamResponse> updateTeam(
            @PathVariable UUID workspaceId,
            @PathVariable UUID teamId,
            @Valid @RequestBody TeamRequest request) {
        return ResponseEntity.ok(teamService.updateTeam(teamId, request));
    }

    @DeleteMapping("/{teamId}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a team")
    public ResponseEntity<Void> deleteTeam(
            @PathVariable UUID workspaceId,
            @PathVariable UUID teamId) {
        teamService.deleteTeam(teamId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{teamId}/members/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Operation(summary = "Add member to team")
    public ResponseEntity<Void> addMember(
            @PathVariable UUID workspaceId,
            @PathVariable UUID teamId,
            @PathVariable UUID userId) {
        teamService.addMemberToTeam(teamId, userId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{teamId}/members/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Operation(summary = "Remove member from team")
    public ResponseEntity<Void> removeMember(
            @PathVariable UUID workspaceId,
            @PathVariable UUID teamId,
            @PathVariable UUID userId) {
        teamService.removeMemberFromTeam(teamId, userId);
        return ResponseEntity.noContent().build();
    }
}
