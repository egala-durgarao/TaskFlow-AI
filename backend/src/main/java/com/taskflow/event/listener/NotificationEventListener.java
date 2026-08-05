package com.taskflow.event.listener;

import com.taskflow.common.enums.NotificationType;
import com.taskflow.entity.Notification;
import com.taskflow.entity.User;
import com.taskflow.event.CommentAddedEvent;
import com.taskflow.event.ProjectCreatedEvent;
import com.taskflow.event.TaskAssignedEvent;
import com.taskflow.event.TaskStatusChangedEvent;
import com.taskflow.repository.NotificationRepository;
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
public class NotificationEventListener {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Async("notificationTaskExecutor")
    @EventListener
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void handleTaskAssignedEvent(TaskAssignedEvent event) {
        if (event.getAssigneeId().equals(event.getAssignerId())) return; // Don't notify self

        try {
            User assignee = userRepository.findById(event.getAssigneeId()).orElseThrow();
            Notification notification = Notification.builder()
                    .user(assignee)
                    .type(NotificationType.ASSIGNMENT)
                    .content("You have been assigned to task: " + event.getTaskTitle())
                    .isRead(false)
                    .build();
            notificationRepository.save(notification);
            log.info("Saved notification for user {}", assignee.getId());
        } catch (Exception e) {
            log.error("Failed to process TaskAssignedEvent for task {}", event.getTaskId(), e);
        }
    }

    @Async("notificationTaskExecutor")
    @EventListener
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void handleCommentAddedEvent(CommentAddedEvent event) {
        if (event.getTaskAssigneeId() == null || event.getTaskAssigneeId().equals(event.getCommentAuthorId())) return;

        try {
            User assignee = userRepository.findById(event.getTaskAssigneeId()).orElseThrow();
            Notification notification = Notification.builder()
                    .user(assignee)
                    .type(NotificationType.MENTION)
                    .content("New comment on your task: " + event.getTaskTitle())
                    .isRead(false)
                    .build();
            notificationRepository.save(notification);
        } catch (Exception e) {
            log.error("Failed to process CommentAddedEvent", e);
        }
    }
}
