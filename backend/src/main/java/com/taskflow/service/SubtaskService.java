package com.taskflow.service;

import com.taskflow.dto.task.SubtaskRequest;
import com.taskflow.dto.task.SubtaskResponse;
import java.util.List;
import java.util.UUID;

public interface SubtaskService {
    List<SubtaskResponse> getSubtasksByTaskId(UUID taskId);
    SubtaskResponse addSubtask(UUID taskId, SubtaskRequest request);
    SubtaskResponse updateSubtask(UUID subtaskId, SubtaskRequest request);
    void deleteSubtask(UUID subtaskId);
    SubtaskResponse toggleSubtask(UUID subtaskId);
}
