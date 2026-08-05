import os
import textwrap

base_dir = "backend/src/main/java/com/taskflow"

def write_file(path, content):
    full_path = os.path.join(base_dir, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(textwrap.dedent(content).strip() + "\n")

# --- DTOs ---
write_file("dto/task/TaskRequest.java", """
package com.taskflow.dto.task;

import com.taskflow.common.enums.TaskPriority;
import com.taskflow.common.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequest {
    @NotBlank(message = "Task title is required")
    private String title;

    private String description;

    @NotNull(message = "Project ID is required")
    private UUID projectId;

    private UUID assigneeId;

    private TaskStatus status;
    private TaskPriority priority;
    
    private BigDecimal estimateHours;
    private Instant dueDate;
}
""")

write_file("dto/task/TaskStatusUpdateRequest.java", """
package com.taskflow.dto.task;

import com.taskflow.common.enums.TaskStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskStatusUpdateRequest {
    @NotNull(message = "Status is required")
    private TaskStatus status;
}
""")

write_file("dto/task/TaskResponse.java", """
package com.taskflow.dto.task;

import com.taskflow.common.enums.TaskPriority;
import com.taskflow.common.enums.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskResponse {
    private UUID id;
    private String title;
    private String description;
    private UUID projectId;
    private String projectName;
    private UUID assigneeId;
    private UUID reporterId;
    private TaskStatus status;
    private TaskPriority priority;
    private BigDecimal estimateHours;
    private Instant dueDate;
    private Instant createdAt;
    private Instant updatedAt;
}
""")

write_file("dto/task/TaskDetailResponse.java", """
package com.taskflow.dto.task;

import com.taskflow.common.enums.TaskPriority;
import com.taskflow.common.enums.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskDetailResponse {
    private UUID id;
    private String title;
    private String description;
    private UUID projectId;
    private String projectName;
    private UUID assigneeId;
    private UUID reporterId;
    private TaskStatus status;
    private TaskPriority priority;
    private BigDecimal estimateHours;
    private Instant dueDate;
    private Instant createdAt;
    private Instant updatedAt;
    
    // Subtasks and comments can be represented as simplistic DTOs or Lists later
    // Placeholder for complex relationships
}
""")

# --- Mapper ---
write_file("mapper/TaskMapper.java", """
package com.taskflow.mapper;

import com.taskflow.dto.task.TaskRequest;
import com.taskflow.dto.task.TaskResponse;
import com.taskflow.dto.task.TaskDetailResponse;
import com.taskflow.entity.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface TaskMapper {
    
    @Mapping(target = "projectId", source = "project.id")
    @Mapping(target = "projectName", source = "project.name")
    @Mapping(target = "assigneeId", source = "assignee.id")
    @Mapping(target = "reporterId", source = "reporter.id")
    TaskResponse toDto(Task task);

    @Mapping(target = "projectId", source = "project.id")
    @Mapping(target = "projectName", source = "project.name")
    @Mapping(target = "assigneeId", source = "assignee.id")
    @Mapping(target = "reporterId", source = "reporter.id")
    TaskDetailResponse toDetailDto(Task task);
    
    Task toEntity(TaskRequest request);
    
    void updateEntityFromDto(TaskRequest request, @MappingTarget Task task);
}
""")

# --- Service ---
write_file("service/TaskService.java", """
package com.taskflow.service;

import com.taskflow.common.enums.TaskPriority;
import com.taskflow.common.enums.TaskStatus;
import com.taskflow.dto.task.TaskRequest;
import com.taskflow.dto.task.TaskResponse;
import com.taskflow.dto.task.TaskDetailResponse;
import com.taskflow.dto.task.TaskStatusUpdateRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface TaskService {
    TaskResponse createTask(TaskRequest request, UUID reporterId);
    TaskDetailResponse getTaskById(UUID taskId);
    Page<TaskResponse> getTasks(UUID projectId, TaskStatus status, TaskPriority priority, String search, Pageable pageable);
    TaskResponse updateTask(UUID taskId, TaskRequest request);
    TaskResponse updateTaskStatus(UUID taskId, TaskStatusUpdateRequest request);
    void deleteTask(UUID taskId);
}
""")

write_file("service/impl/TaskServiceImpl.java", """
package com.taskflow.service.impl;

import com.taskflow.common.enums.TaskPriority;
import com.taskflow.common.enums.TaskStatus;
import com.taskflow.dto.task.TaskRequest;
import com.taskflow.dto.task.TaskResponse;
import com.taskflow.dto.task.TaskDetailResponse;
import com.taskflow.dto.task.TaskStatusUpdateRequest;
import com.taskflow.entity.Project;
import com.taskflow.entity.Task;
import com.taskflow.entity.User;
import com.taskflow.exception.ResourceNotFoundException;
import com.taskflow.mapper.TaskMapper;
import com.taskflow.repository.ProjectRepository;
import com.taskflow.repository.TaskRepository;
import com.taskflow.repository.UserRepository;
import com.taskflow.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final TaskMapper taskMapper;

    @Override
    @Transactional
    public TaskResponse createTask(TaskRequest request, UUID reporterId) {
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        
        User reporter = userRepository.findById(reporterId)
                .orElseThrow(() -> new ResourceNotFoundException("Reporter not found"));
                
        User assignee = null;
        if (request.getAssigneeId() != null) {
            assignee = userRepository.findById(request.getAssigneeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Assignee not found"));
        }

        Task task = taskMapper.toEntity(request);
        task.setProject(project);
        task.setReporter(reporter);
        task.setAssignee(assignee);
        
        if (task.getStatus() == null) task.setStatus(TaskStatus.TODO);
        if (task.getPriority() == null) task.setPriority(TaskPriority.MEDIUM);

        task = taskRepository.save(task);
        return taskMapper.toDto(task);
    }

    @Override
    @Transactional(readOnly = true)
    public TaskDetailResponse getTaskById(UUID taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        return taskMapper.toDetailDto(task);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TaskResponse> getTasks(UUID projectId, TaskStatus status, TaskPriority priority, String search, Pageable pageable) {
        // Simplified query logic; normally requires QueryDSL or Criteria API for multiple optional filters
        if (projectId != null) {
            return taskRepository.findByProjectId(projectId, pageable).map(taskMapper::toDto);
        } else if (status != null) {
            return taskRepository.findByStatus(status, pageable).map(taskMapper::toDto);
        } else if (priority != null) {
            return taskRepository.findByPriority(priority, pageable).map(taskMapper::toDto);
        } else if (search != null && !search.isEmpty()) {
            return taskRepository.findByTitleContainingIgnoreCase(search, pageable).map(taskMapper::toDto);
        }
        return taskRepository.findAll(pageable).map(taskMapper::toDto);
    }

    @Override
    @Transactional
    public TaskResponse updateTask(UUID taskId, TaskRequest request) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        
        taskMapper.updateEntityFromDto(request, task);
        
        if (request.getAssigneeId() != null) {
            User assignee = userRepository.findById(request.getAssigneeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Assignee not found"));
            task.setAssignee(assignee);
        }

        task = taskRepository.save(task);
        return taskMapper.toDto(task);
    }

    @Override
    @Transactional
    public TaskResponse updateTaskStatus(UUID taskId, TaskStatusUpdateRequest request) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        
        task.setStatus(request.getStatus());
        task = taskRepository.save(task);
        
        return taskMapper.toDto(task);
    }

    @Override
    @Transactional
    public void deleteTask(UUID taskId) {
        if (!taskRepository.existsById(taskId)) {
            throw new ResourceNotFoundException("Task not found");
        }
        taskRepository.deleteById(taskId);
    }
}
""")

# --- Controller ---
write_file("controller/TaskController.java", """
package com.taskflow.controller;

import com.taskflow.common.enums.TaskPriority;
import com.taskflow.common.enums.TaskStatus;
import com.taskflow.dto.task.TaskRequest;
import com.taskflow.dto.task.TaskResponse;
import com.taskflow.dto.task.TaskDetailResponse;
import com.taskflow.dto.task.TaskStatusUpdateRequest;
import com.taskflow.security.SecurityUtils;
import com.taskflow.service.TaskService;
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
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
@Tag(name = "Tasks", description = "Task management and Kanban endpoints")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEMBER')")
    @Operation(summary = "Create a new task")
    public ResponseEntity<TaskResponse> createTask(@Valid @RequestBody TaskRequest request) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        return new ResponseEntity<>(taskService.createTask(request, currentUserId), HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get paginated tasks with optional filters")
    public ResponseEntity<Page<TaskResponse>> getTasks(
            @RequestParam(required = false) UUID projectId,
            @RequestParam(required = false) TaskStatus status,
            @RequestParam(required = false) TaskPriority priority,
            @RequestParam(required = false) String search,
            Pageable pageable) {
        return ResponseEntity.ok(taskService.getTasks(projectId, status, priority, search, pageable));
    }

    @GetMapping("/{taskId}")
    @Operation(summary = "Get task details including subtasks and comments")
    public ResponseEntity<TaskDetailResponse> getTaskById(@PathVariable UUID taskId) {
        return ResponseEntity.ok(taskService.getTaskById(taskId));
    }

    @PutMapping("/{taskId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEMBER')")
    @Operation(summary = "Update an existing task")
    public ResponseEntity<TaskResponse> updateTask(
            @PathVariable UUID taskId,
            @Valid @RequestBody TaskRequest request) {
        return ResponseEntity.ok(taskService.updateTask(taskId, request));
    }

    @PatchMapping("/{taskId}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEMBER')")
    @Operation(summary = "Update task status (Kanban drag-and-drop)")
    public ResponseEntity<TaskResponse> updateTaskStatus(
            @PathVariable UUID taskId,
            @Valid @RequestBody TaskStatusUpdateRequest request) {
        return ResponseEntity.ok(taskService.updateTaskStatus(taskId, request));
    }

    @DeleteMapping("/{taskId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Operation(summary = "Delete a task")
    public ResponseEntity<Void> deleteTask(@PathVariable UUID taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.noContent().build();
    }
}
""")

print("Successfully generated all Phase 8 (Task APIs) files.")
