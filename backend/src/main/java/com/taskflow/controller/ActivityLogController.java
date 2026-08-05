package com.taskflow.controller;

import com.taskflow.dto.activity.ActivityLogResponse;
import com.taskflow.service.ActivityLogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/activities")
@RequiredArgsConstructor
@Tag(name = "Activity Logs", description = "System audit and activity logging")
public class ActivityLogController {

    private final ActivityLogService activityLogService;

    @GetMapping("/workspaces/{workspaceId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Operation(summary = "Get activity logs for a workspace")
    public ResponseEntity<Page<ActivityLogResponse>> getWorkspaceActivity(
            @PathVariable UUID workspaceId, Pageable pageable) {
        return ResponseEntity.ok(activityLogService.getWorkspaceActivity(workspaceId, pageable));
    }

    @GetMapping("/tasks/{taskId}")
    @Operation(summary = "Get activity logs for a specific task")
    public ResponseEntity<Page<ActivityLogResponse>> getTaskActivity(
            @PathVariable UUID taskId, Pageable pageable) {
        return ResponseEntity.ok(activityLogService.getTaskActivity(taskId, pageable));
    }
}
