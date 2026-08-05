package com.taskflow.dto.notification;

import com.taskflow.common.enums.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationResponse {
    private UUID id;
    private NotificationType type;
    private String content;
    private boolean isRead;
    private Instant createdAt;
}
