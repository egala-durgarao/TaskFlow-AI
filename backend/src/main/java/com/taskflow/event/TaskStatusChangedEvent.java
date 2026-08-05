package com.taskflow.event;

import com.taskflow.common.enums.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class TaskStatusChangedEvent {
    private final UUID taskId;
    private final String taskTitle;
    private final TaskStatus newStatus;
    private final UUID projectId;
    private final UUID actorId;
}
