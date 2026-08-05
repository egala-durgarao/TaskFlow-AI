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
