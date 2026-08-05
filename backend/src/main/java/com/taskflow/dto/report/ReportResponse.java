package com.taskflow.dto.report;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReportResponse {
    private long totalTasksCreated;
    private long totalTasksCompleted;
    private long totalTasksOverdue;

    // Status breakdown (TODO: 10, IN_PROGRESS: 5, DONE: 20)
    private Map<String, Long> tasksByStatus;

    // Priority breakdown (HIGH: 5, MEDIUM: 15, LOW: 10)
    private Map<String, Long> tasksByPriority;
}
