package com.taskflow.dto.dashboard;

import com.taskflow.dto.task.TaskResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DashboardSummaryResponse {
    private DashboardMetricsDto metrics;
    private List<AiInsightDto> aiInsights;
    private List<TaskResponse> highPriorityTasks;
}
