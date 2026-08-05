package com.taskflow.repository;

import com.taskflow.entity.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TeamRepository extends JpaRepository<Team, UUID> {
    List<Team> findByWorkspaceId(UUID workspaceId);
    Page<Team> findByWorkspaceId(UUID workspaceId, Pageable pageable);

    @Query("SELECT t FROM Team t JOIN t.members m WHERE m.id = :managerId")
    List<Team> findByManagerId(@Param("managerId") UUID managerId);
}
