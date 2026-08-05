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
