package com.taskflow.controller;

import com.taskflow.dto.dashboard.DashboardSummaryResponse;
import com.taskflow.security.SecurityUtils;
import com.taskflow.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/workspaces/{workspaceId}/dashboard")
@RequiredArgsConstructor
@Tag(name = "Dashboard", description = "Dashboard aggregation metrics and AI insights")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    @Operation(summary = "Get aggregated dashboard metrics for a workspace")
    public ResponseEntity<DashboardSummaryResponse> getDashboardSummary(@PathVariable UUID workspaceId) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(dashboardService.getDashboardSummary(workspaceId, currentUserId));
    }
}
