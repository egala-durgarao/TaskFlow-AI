package com.taskflow.repository;

import com.taskflow.entity.Workspace;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface WorkspaceRepository extends JpaRepository<Workspace, UUID> {
    List<Workspace> findByOrganizationId(UUID organizationId);
    Page<Workspace> findByOrganizationId(UUID organizationId, Pageable pageable);
    boolean existsByNameAndOrganizationId(String name, UUID organizationId);
}
