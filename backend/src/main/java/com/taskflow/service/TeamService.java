package com.taskflow.service;

import com.taskflow.dto.org.TeamRequest;
import com.taskflow.dto.org.TeamResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.UUID;

public interface TeamService {
    Page<TeamResponse> getTeamsByWorkspace(UUID workspaceId, Pageable pageable);
    TeamResponse createTeam(UUID workspaceId, TeamRequest request);
    TeamResponse updateTeam(UUID teamId, TeamRequest request);
    void deleteTeam(UUID teamId);
    void addMemberToTeam(UUID teamId, UUID userId);
    void removeMemberFromTeam(UUID teamId, UUID userId);
}
