package com.taskflow.service.impl;

import com.taskflow.common.enums.TaskStatus;
import com.taskflow.dto.report.ReportRequest;
import com.taskflow.dto.report.ReportResponse;
import com.taskflow.repository.TaskRepository;
import com.taskflow.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final TaskRepository taskRepository;

    @Override
    @Transactional(readOnly = true)
    public ReportResponse generateTaskReport(ReportRequest request) {
        // In a real application, this would use JPA Criteria, QueryDSL, or custom @Query for dynamic aggregation
        // Mocking aggregation for simplicity based on provided repository methods in Phase 4
        long totalTasks = taskRepository.countByWorkspaceId(request.getWorkspaceId());
        long completedTasks = taskRepository.countCompletedByWorkspaceId(request.getWorkspaceId());
        long pendingTasks = taskRepository.countPendingByWorkspaceId(request.getWorkspaceId());

        Map<String, Long> tasksByStatus = new HashMap<>();
        tasksByStatus.put(TaskStatus.COMPLETED.name(), completedTasks);
        tasksByStatus.put(TaskStatus.TODO.name(), pendingTasks);

        Map<String, Long> tasksByPriority = new HashMap<>();
        tasksByPriority.put("HIGH", taskRepository.countHighPriorityByWorkspaceId(request.getWorkspaceId()));

        return ReportResponse.builder()
                .totalTasksCreated(totalTasks)
                .totalTasksCompleted(completedTasks)
                .totalTasksOverdue(0) // Requires date-based query
                .tasksByStatus(tasksByStatus)
                .tasksByPriority(tasksByPriority)
                .build();
    }
}
