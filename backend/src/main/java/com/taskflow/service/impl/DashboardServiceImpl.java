package com.taskflow.service.impl;

import com.taskflow.common.enums.TaskPriority;
import com.taskflow.dto.dashboard.AiInsightDto;
import com.taskflow.dto.dashboard.DashboardMetricsDto;
import com.taskflow.dto.dashboard.DashboardSummaryResponse;
import com.taskflow.mapper.TaskMapper;
import com.taskflow.repository.TaskRepository;
import com.taskflow.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    @Override
    @Transactional(readOnly = true)
    public DashboardSummaryResponse getDashboardSummary(UUID workspaceId, UUID userId) {
        Instant now = Instant.now();
        Instant startOfDay = now.truncatedTo(ChronoUnit.DAYS);
        Instant endOfDay = startOfDay.plus(1, ChronoUnit.DAYS);

        // 1. Compute Metrics
        DashboardMetricsDto metrics = DashboardMetricsDto.builder()
                .totalTasks(taskRepository.countByWorkspaceId(workspaceId))
                .pendingTasks(taskRepository.countPendingByWorkspaceId(workspaceId))
                .completedTasks(taskRepository.countCompletedByWorkspaceId(workspaceId))
                .overdueTasks(taskRepository.countOverdueByWorkspaceId(workspaceId, now))
                .dueTodayTasks(taskRepository.findByDueDateBetween(startOfDay, endOfDay).size()) // Can be optimized with a COUNT query
                .highPriorityTasks(taskRepository.countHighPriorityByWorkspaceId(workspaceId))
                .build();

        // 2. Fetch High Priority Focus Tasks (top 5)
        var highPriorityTasks = taskRepository.findByPriority(TaskPriority.HIGH, PageRequest.of(0, 5))
                .getContent()
                .stream()
                .map(taskMapper::toDto)
                .collect(Collectors.toList());

        // 3. AI Insights (Mocked for Phase 11, will be implemented in Phase 20 AI Copilot)
        List<AiInsightDto> insights = new ArrayList<>();
        if (metrics.getOverdueTasks() > 0) {
            insights.add(AiInsightDto.builder()
                    .id(UUID.randomUUID())
                    .severity("HIGH")
                    .title("Overdue Tasks Detected")
                    .message(metrics.getOverdueTasks() + " tasks are overdue and may block sprint delivery.")
                    .build());
        }

        if (metrics.getPendingTasks() > 20) {
            insights.add(AiInsightDto.builder()
                    .id(UUID.randomUUID())
                    .severity("MEDIUM")
                    .title("Workload Imbalance")
                    .message("There is a high volume of pending tasks in this workspace.")
                    .build());
        }

        return DashboardSummaryResponse.builder()
                .metrics(metrics)
                .highPriorityTasks(highPriorityTasks)
                .aiInsights(insights)
                .build();
    }
}
