package com.taskflow.service.impl;

import com.taskflow.dto.activity.ActivityLogResponse;
import com.taskflow.mapper.ActivityLogMapper;
import com.taskflow.repository.ActivityLogRepository;
import com.taskflow.service.ActivityLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ActivityLogServiceImpl implements ActivityLogService {

    private final ActivityLogRepository activityLogRepository;
    private final ActivityLogMapper activityLogMapper;

    @Override
    @Transactional(readOnly = true)
    public Page<ActivityLogResponse> getWorkspaceActivity(UUID workspaceId, Pageable pageable) {
        // Simple mock query, ideally needs an explicitly mapped query in repository
        return activityLogRepository.findAll(pageable).map(activityLogMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ActivityLogResponse> getProjectActivity(UUID projectId, Pageable pageable) {
        return activityLogRepository.findAll(pageable).map(activityLogMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ActivityLogResponse> getTaskActivity(UUID taskId, Pageable pageable) {
        return activityLogRepository.findByTargetTypeAndTargetId("TASK", taskId, pageable).map(activityLogMapper::toDto);
    }
}
