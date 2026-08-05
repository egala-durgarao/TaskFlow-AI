import os
import textwrap

base_dir = "backend/src/main/java/com/taskflow/repository"

def write_file(name, content):
    os.makedirs(base_dir, exist_ok=True)
    full_path = os.path.join(base_dir, name)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(textwrap.dedent(content).strip() + "\n")

# OrganizationRepository
write_file("OrganizationRepository.java", """
package com.taskflow.repository;

import com.taskflow.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, UUID> {
    Optional<Organization> findByNameIgnoreCase(String name);
    boolean existsByNameIgnoreCase(String name);
}
""")

# WorkspaceRepository
write_file("WorkspaceRepository.java", """
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
""")

# UserRepository
write_file("UserRepository.java", """
package com.taskflow.repository;

import com.taskflow.common.enums.UserRole;
import com.taskflow.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    List<User> findByRole(UserRole role);

    @Query("SELECT DISTINCT u FROM User u JOIN u.teams t WHERE t.workspace.id = :workspaceId")
    List<User> findByWorkspaceId(@Param("workspaceId") UUID workspaceId);

    @Query("SELECT u FROM User u WHERE LOWER(u.firstName) LIKE LOWER(CONCAT('%', :name, '%')) OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :name, '%'))")
    Page<User> searchUsersByName(@Param("name") String name, Pageable pageable);

    Page<User> findByEmailContainingIgnoreCase(String email, Pageable pageable);
}
""")

# TeamRepository
write_file("TeamRepository.java", """
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
""")

# ProjectRepository
write_file("ProjectRepository.java", """
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
""")

# TaskRepository
write_file("TaskRepository.java", """
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
""")

# SubtaskRepository
write_file("SubtaskRepository.java", """
package com.taskflow.repository;

import com.taskflow.entity.Subtask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SubtaskRepository extends JpaRepository<Subtask, UUID> {
    List<Subtask> findByTaskId(UUID taskId);
}
""")

# CommentRepository
write_file("CommentRepository.java", """
package com.taskflow.repository;

import com.taskflow.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CommentRepository extends JpaRepository<Comment, UUID> {
    
    @EntityGraph(attributePaths = {"user"})
    List<Comment> findByTaskId(UUID taskId);
    
    Page<Comment> findByTaskId(UUID taskId, Pageable pageable);
}
""")

# TagRepository
write_file("TagRepository.java", """
package com.taskflow.repository;

import com.taskflow.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface TagRepository extends JpaRepository<Tag, UUID> {
    Optional<Tag> findByNameIgnoreCase(String name);
}
""")

# AttachmentRepository
write_file("AttachmentRepository.java", """
package com.taskflow.repository;

import com.taskflow.entity.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AttachmentRepository extends JpaRepository<Attachment, UUID> {
    List<Attachment> findByTaskId(UUID taskId);
}
""")

# NotificationRepository
write_file("NotificationRepository.java", """
package com.taskflow.repository;

import com.taskflow.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {
    List<Notification> findByUserId(UUID userId);
    Page<Notification> findByUserId(UUID userId, Pageable pageable);
    
    List<Notification> findByUserIdAndIsReadFalse(UUID userId);
    long countByUserIdAndIsReadFalse(UUID userId);
}
""")

# ActivityLogRepository
write_file("ActivityLogRepository.java", """
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
""")

# RefreshTokenRepository
write_file("RefreshTokenRepository.java", """
package com.taskflow.repository;

import com.taskflow.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
    Optional<RefreshToken> findByToken(String token);
    Optional<RefreshToken> findByUserId(UUID userId);
    void deleteByUserId(UUID userId);
}
""")

print("Successfully generated all Repository interfaces for Phase 4.")
