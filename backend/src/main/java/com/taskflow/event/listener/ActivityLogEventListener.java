package com.taskflow.event.listener;

import com.taskflow.entity.ActivityLog;
import com.taskflow.entity.User;
import com.taskflow.event.TaskAssignedEvent;
import com.taskflow.event.TaskStatusChangedEvent;
import com.taskflow.event.ProjectCreatedEvent;
import com.taskflow.repository.ActivityLogRepository;
import com.taskflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class ActivityLogEventListener {

    private final ActivityLogRepository activityLogRepository;
    private final UserRepository userRepository;

    @Async("notificationTaskExecutor")
    @EventListener
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void handleTaskAssignedEvent(TaskAssignedEvent event) {
        try {
            User actor = userRepository.findById(event.getAssignerId()).orElseThrow();
            ActivityLog logEntry = ActivityLog.builder()
                    .user(actor)
                    .action("TASK_ASSIGNED")
                    .entityType("TASK")
                    .entityId(event.getTaskId())
                    .details("Assigned task '" + event.getTaskTitle() + "' to user " + event.getAssigneeId())
                    .build();
            activityLogRepository.save(logEntry);
        } catch (Exception e) {
            log.error("Failed to save activity log for TaskAssignedEvent", e);
        }
    }

    @Async("notificationTaskExecutor")
    @EventListener
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void handleTaskStatusChangedEvent(TaskStatusChangedEvent event) {
        try {
            User actor = userRepository.findById(event.getActorId()).orElseThrow();
            ActivityLog logEntry = ActivityLog.builder()
                    .user(actor)
                    .action("TASK_STATUS_CHANGED")
                    .entityType("TASK")
                    .entityId(event.getTaskId())
                    .details("Changed status of task '" + event.getTaskTitle() + "' to " + event.getNewStatus())
                    .build();
            activityLogRepository.save(logEntry);
        } catch (Exception e) {
            log.error("Failed to save activity log for TaskStatusChangedEvent", e);
        }
    }
}
