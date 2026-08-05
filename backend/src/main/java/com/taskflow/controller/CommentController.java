package com.taskflow.controller;

import com.taskflow.dto.task.CommentRequest;
import com.taskflow.dto.task.CommentResponse;
import com.taskflow.security.SecurityUtils;
import com.taskflow.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/tasks/{taskId}/comments")
@RequiredArgsConstructor
@Tag(name = "Comments", description = "Task comments discussion thread")
public class CommentController {

    private final CommentService commentService;

    @GetMapping
    @Operation(summary = "Get paginated comments for a task")
    public ResponseEntity<Page<CommentResponse>> getComments(
            @PathVariable UUID taskId,
            Pageable pageable) {
        return ResponseEntity.ok(commentService.getCommentsByTaskId(taskId, pageable));
    }

    @PostMapping
    @Operation(summary = "Add a comment to a task")
    public ResponseEntity<CommentResponse> addComment(
            @PathVariable UUID taskId,
            @Valid @RequestBody CommentRequest request) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        return new ResponseEntity<>(commentService.addComment(taskId, currentUserId, request), HttpStatus.CREATED);
    }

    @DeleteMapping("/{commentId}")
    @Operation(summary = "Delete a comment")
    public ResponseEntity<Void> deleteComment(
            @PathVariable UUID taskId,
            @PathVariable UUID commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}
