package com.taskflow.service;

import com.taskflow.dto.activity.ActivityLogResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface ActivityLogService {
    Page<ActivityLogResponse> getWorkspaceActivity(UUID workspaceId, Pageable pageable);
    Page<ActivityLogResponse> getProjectActivity(UUID projectId, Pageable pageable);
    Page<ActivityLogResponse> getTaskActivity(UUID taskId, Pageable pageable);
}
