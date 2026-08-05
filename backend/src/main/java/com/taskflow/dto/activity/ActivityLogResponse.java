package com.taskflow.dto.activity;

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
public class ActivityLogResponse {
    private UUID id;
    private UUID userId;
    private String userName;
    private String actionType;
    private String action;
    private String targetType;
    private UUID targetId;
    private Instant createdAt;
}
