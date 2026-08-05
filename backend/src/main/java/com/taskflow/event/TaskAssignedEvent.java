package com.taskflow.event;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class TaskAssignedEvent {
    private final UUID taskId;
    private final String taskTitle;
    private final UUID assigneeId;
    private final UUID assignerId;
}
