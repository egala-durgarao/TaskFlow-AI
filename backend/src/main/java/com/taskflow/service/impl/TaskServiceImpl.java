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
