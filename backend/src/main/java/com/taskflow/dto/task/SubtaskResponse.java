package com.taskflow.dto.task;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubtaskResponse {
    private UUID id;
    private UUID taskId;
    private String title;
    private boolean isCompleted;
    private Instant createdAt;
    private Instant updatedAt;
}
