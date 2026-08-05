package com.taskflow.event;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class ProjectCreatedEvent {
    private final UUID projectId;
    private final String projectName;
    private final UUID creatorId;
    private final UUID workspaceId;
}
