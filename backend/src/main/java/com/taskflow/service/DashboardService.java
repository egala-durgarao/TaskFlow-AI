package com.taskflow.service;

import com.taskflow.dto.dashboard.DashboardSummaryResponse;
import java.util.UUID;

public interface DashboardService {
    DashboardSummaryResponse getDashboardSummary(UUID workspaceId, UUID userId);
}
