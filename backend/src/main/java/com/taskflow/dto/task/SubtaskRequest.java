package com.taskflow.dto.task;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubtaskRequest {
    @NotBlank(message = "Subtask title is required")
    private String title;
    private boolean isCompleted;
}
