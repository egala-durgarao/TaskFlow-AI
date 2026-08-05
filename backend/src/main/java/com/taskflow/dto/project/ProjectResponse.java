package com.taskflow.dto.project;

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
public class ProjectResponse {
    private UUID id;
    private String name;
    private String projectKey;
    private String description;
    private String status;
    private Instant targetDate;
    private Instant createdAt;
    private Instant updatedAt;

    // Aggregated metrics (stubbed for now, can be populated later)
    @Builder.Default
    private int progress = 0;
    @Builder.Default
    private int tasksCount = 0;
    @Builder.Default
    private int completedCount = 0;
}
