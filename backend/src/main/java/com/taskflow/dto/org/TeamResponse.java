package com.taskflow.dto.org;

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
public class TeamResponse {
    private UUID id;
    private String name;
    private String description;
    private UUID workspaceId;
    private int memberCount;
    private Instant createdAt;
}
