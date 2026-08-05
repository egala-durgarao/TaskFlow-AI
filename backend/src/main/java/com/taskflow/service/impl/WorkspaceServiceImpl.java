package com.taskflow.service.impl;

import com.taskflow.dto.org.WorkspaceRequest;
import com.taskflow.dto.org.WorkspaceResponse;
import com.taskflow.entity.Organization;
import com.taskflow.entity.Workspace;
import com.taskflow.exception.ResourceNotFoundException;
import com.taskflow.mapper.WorkspaceMapper;
import com.taskflow.repository.OrganizationRepository;
import com.taskflow.repository.WorkspaceRepository;
import com.taskflow.service.WorkspaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WorkspaceServiceImpl implements WorkspaceService {

    private final WorkspaceRepository workspaceRepository;
    private final OrganizationRepository organizationRepository;
    private final WorkspaceMapper workspaceMapper;

    @Override
    @Transactional(readOnly = true)
    public Page<WorkspaceResponse> getWorkspacesByOrganization(UUID orgId, Pageable pageable) {
        return workspaceRepository.findByOrganizationId(orgId, pageable).map(workspaceMapper::toDto);
    }

    @Override
    @Transactional
    public WorkspaceResponse createWorkspace(UUID orgId, WorkspaceRequest request) {
        Organization org = organizationRepository.findById(orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Organization not found"));
        Workspace workspace = workspaceMapper.toEntity(request);
        workspace.setOrganization(org);
        return workspaceMapper.toDto(workspaceRepository.save(workspace));
    }

    @Override
    @Transactional
    public WorkspaceResponse updateWorkspace(UUID workspaceId, WorkspaceRequest request) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new ResourceNotFoundException("Workspace not found"));
        workspaceMapper.updateEntityFromDto(request, workspace);
        return workspaceMapper.toDto(workspaceRepository.save(workspace));
    }
}
