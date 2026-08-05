package com.taskflow.service.impl;

import com.taskflow.dto.task.SubtaskRequest;
import com.taskflow.dto.task.SubtaskResponse;
import com.taskflow.entity.Subtask;
import com.taskflow.entity.Task;
import com.taskflow.exception.ResourceNotFoundException;
import com.taskflow.mapper.SubtaskMapper;
import com.taskflow.repository.SubtaskRepository;
import com.taskflow.repository.TaskRepository;
import com.taskflow.service.SubtaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubtaskServiceImpl implements SubtaskService {

    private final SubtaskRepository subtaskRepository;
    private final TaskRepository taskRepository;
    private final SubtaskMapper subtaskMapper;

    @Override
    @Transactional(readOnly = true)
    public List<SubtaskResponse> getSubtasksByTaskId(UUID taskId) {
        return subtaskRepository.findByTaskId(taskId).stream()
                .map(subtaskMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SubtaskResponse addSubtask(UUID taskId, SubtaskRequest request) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        Subtask subtask = subtaskMapper.toEntity(request);
        subtask.setTask(task);
        return subtaskMapper.toDto(subtaskRepository.save(subtask));
    }

    @Override
    @Transactional
    public SubtaskResponse updateSubtask(UUID subtaskId, SubtaskRequest request) {
        Subtask subtask = subtaskRepository.findById(subtaskId)
                .orElseThrow(() -> new ResourceNotFoundException("Subtask not found"));
        subtaskMapper.updateEntityFromDto(request, subtask);
        return subtaskMapper.toDto(subtaskRepository.save(subtask));
    }

    @Override
    @Transactional
    public void deleteSubtask(UUID subtaskId) {
        if (!subtaskRepository.existsById(subtaskId)) {
            throw new ResourceNotFoundException("Subtask not found");
        }
        subtaskRepository.deleteById(subtaskId);
    }

    @Override
    @Transactional
    public SubtaskResponse toggleSubtask(UUID subtaskId) {
        Subtask subtask = subtaskRepository.findById(subtaskId)
                .orElseThrow(() -> new ResourceNotFoundException("Subtask not found"));
        subtask.setIsCompleted(!subtask.getIsCompleted());
        return subtaskMapper.toDto(subtaskRepository.save(subtask));
    }
}
