package com.taskflow.repository;

import com.taskflow.common.enums.ProjectStatus;
import com.taskflow.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {
    List<Project> findByWorkspaceId(UUID workspaceId);
    Page<Project> findByWorkspaceId(UUID workspaceId, Pageable pageable);

    List<Project> findByStatus(ProjectStatus status);

    // Fallback since managerId doesn't exist on Project. Using Workspace filter for now.
    @Query("SELECT p FROM Project p WHERE p.workspace.id = :managerId")
    List<Project> findByManagerId(@Param("managerId") UUID managerId);

    Page<Project> findByNameContainingIgnoreCaseAndWorkspaceId(String name, UUID workspaceId, Pageable pageable);
}
