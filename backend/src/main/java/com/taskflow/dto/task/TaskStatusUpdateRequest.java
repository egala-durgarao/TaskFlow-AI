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
