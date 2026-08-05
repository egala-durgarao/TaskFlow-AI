package com.taskflow.event;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class CommentAddedEvent {
    private final UUID taskId;
    private final String taskTitle;
    private final UUID commentAuthorId;
    private final UUID taskAssigneeId;
}
