package com.taskflow.controller;

import com.taskflow.dto.task.SubtaskRequest;
import com.taskflow.dto.task.SubtaskResponse;
import com.taskflow.service.SubtaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/tasks/{taskId}/subtasks")
@RequiredArgsConstructor
@Tag(name = "Subtasks", description = "Task subtasks management")
public class SubtaskController {

    private final SubtaskService subtaskService;

    @GetMapping
    @Operation(summary = "Get all subtasks for a task")
    public ResponseEntity<List<SubtaskResponse>> getSubtasks(@PathVariable UUID taskId) {
        return ResponseEntity.ok(subtaskService.getSubtasksByTaskId(taskId));
    }

    @PostMapping
    @Operation(summary = "Add a subtask to a task")
    public ResponseEntity<SubtaskResponse> addSubtask(
            @PathVariable UUID taskId,
            @Valid @RequestBody SubtaskRequest request) {
        return new ResponseEntity<>(subtaskService.addSubtask(taskId, request), HttpStatus.CREATED);
    }

    @PutMapping("/{subtaskId}")
    @Operation(summary = "Update a subtask")
    public ResponseEntity<SubtaskResponse> updateSubtask(
            @PathVariable UUID taskId,
            @PathVariable UUID subtaskId,
            @Valid @RequestBody SubtaskRequest request) {
        return ResponseEntity.ok(subtaskService.updateSubtask(subtaskId, request));
    }

    @PatchMapping("/{subtaskId}/toggle")
    @Operation(summary = "Toggle subtask completion status")
    public ResponseEntity<SubtaskResponse> toggleSubtask(
            @PathVariable UUID taskId,
            @PathVariable UUID subtaskId) {
        return ResponseEntity.ok(subtaskService.toggleSubtask(subtaskId));
    }

    @DeleteMapping("/{subtaskId}")
    @Operation(summary = "Delete a subtask")
    public ResponseEntity<Void> deleteSubtask(
            @PathVariable UUID taskId,
            @PathVariable UUID subtaskId) {
        subtaskService.deleteSubtask(subtaskId);
        return ResponseEntity.noContent().build();
    }
}
