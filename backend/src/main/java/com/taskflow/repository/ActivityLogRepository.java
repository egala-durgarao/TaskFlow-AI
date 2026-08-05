package com.taskflow.repository;

import com.taskflow.entity.ActivityLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, UUID> {

    Page<ActivityLog> findByWorkspaceIdOrderByCreatedAtDesc(UUID workspaceId, Pageable pageable);

    List<ActivityLog> findByTargetTypeAndTargetId(String targetType, UUID targetId);

    Page<ActivityLog> findByTargetTypeAndTargetId(String targetType, UUID targetId, Pageable pageable);
}
