package com.taskflow.repository;

import com.taskflow.common.enums.TaskPriority;
import com.taskflow.common.enums.TaskStatus;
import com.taskflow.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {

    @EntityGraph(attributePaths = {"assignee", "project", "tags"})
    Page<Task> findByProjectId(UUID projectId, Pageable pageable);

    List<Task> findByAssigneeId(UUID assigneeId);
    Page<Task> findByAssigneeId(UUID assigneeId, Pageable pageable);

    List<Task> findByReporterId(UUID reporterId);

    Page<Task> findByStatus(TaskStatus status, Pageable pageable);
    Page<Task> findByPriority(TaskPriority priority, Pageable pageable);

    @Query("SELECT t FROM Task t WHERE t.project.workspace.id = :workspaceId")
    Page<Task> findByWorkspaceId(@Param("workspaceId") UUID workspaceId, Pageable pageable);

    List<Task> findByDueDate(Instant dueDate);

    @Query("SELECT t FROM Task t WHERE t.dueDate < :now AND t.status != 'COMPLETED'")
    List<Task> findOverdueTasks(@Param("now") Instant now);

    List<Task> findByDueDateBetween(Instant startOfDay, Instant endOfDay);

    List<Task> findByStatus(TaskStatus status);

    Page<Task> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    Page<Task> findByDescriptionContainingIgnoreCase(String description, Pageable pageable);

    // Dashboard metrics
    @Query("SELECT COUNT(t) FROM Task t WHERE t.project.workspace.id = :workspaceId")
    long countByWorkspaceId(@Param("workspaceId") UUID workspaceId);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.project.workspace.id = :workspaceId AND t.status != 'COMPLETED'")
    long countPendingByWorkspaceId(@Param("workspaceId") UUID workspaceId);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.project.workspace.id = :workspaceId AND t.status = 'COMPLETED'")
    long countCompletedByWorkspaceId(@Param("workspaceId") UUID workspaceId);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.project.workspace.id = :workspaceId AND t.dueDate < :now AND t.status != 'COMPLETED'")
    long countOverdueByWorkspaceId(@Param("workspaceId") UUID workspaceId, @Param("now") Instant now);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.project.workspace.id = :workspaceId AND t.priority = 'HIGH'")
    long countHighPriorityByWorkspaceId(@Param("workspaceId") UUID workspaceId);
}
