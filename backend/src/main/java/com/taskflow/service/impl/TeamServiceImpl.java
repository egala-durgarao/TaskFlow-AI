package com.taskflow.service.impl;

import com.taskflow.dto.org.TeamRequest;
import com.taskflow.dto.org.TeamResponse;
import com.taskflow.entity.Team;
import com.taskflow.entity.User;
import com.taskflow.entity.Workspace;
import com.taskflow.exception.ResourceNotFoundException;
import com.taskflow.mapper.TeamMapper;
import com.taskflow.repository.TeamRepository;
import com.taskflow.repository.UserRepository;
import com.taskflow.repository.WorkspaceRepository;
import com.taskflow.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final WorkspaceRepository workspaceRepository;
    private final UserRepository userRepository;
    private final TeamMapper teamMapper;

    @Override
    @Transactional(readOnly = true)
    public Page<TeamResponse> getTeamsByWorkspace(UUID workspaceId, Pageable pageable) {
        return teamRepository.findByWorkspaceId(workspaceId, pageable).map(teamMapper::toDto);
    }

    @Override
    @Transactional
    public TeamResponse createTeam(UUID workspaceId, TeamRequest request) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new ResourceNotFoundException("Workspace not found"));

        Team team = teamMapper.toEntity(request);
        team.setWorkspace(workspace);

        if (request.getMemberIds() != null && !request.getMemberIds().isEmpty()) {
            List<User> members = userRepository.findAllById(request.getMemberIds());
            team.setUsers(new HashSet<>(members));
        } else {
            team.setUsers(new HashSet<>());
        }

        return teamMapper.toDto(teamRepository.save(team));
    }

    @Override
    @Transactional
    public TeamResponse updateTeam(UUID teamId, TeamRequest request) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found"));
        teamMapper.updateEntityFromDto(request, team);
        return teamMapper.toDto(teamRepository.save(team));
    }

    @Override
    @Transactional
    public void deleteTeam(UUID teamId) {
        if (!teamRepository.existsById(teamId)) {
            throw new ResourceNotFoundException("Team not found");
        }
        teamRepository.deleteById(teamId);
    }

    @Override
    @Transactional
    public void addMemberToTeam(UUID teamId, UUID userId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        team.getUsers().add(user);
        teamRepository.save(team);
    }

    @Override
    @Transactional
    public void removeMemberFromTeam(UUID teamId, UUID userId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        team.getUsers().remove(user);
        teamRepository.save(team);
    }
}
