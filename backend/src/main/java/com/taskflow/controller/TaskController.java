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
