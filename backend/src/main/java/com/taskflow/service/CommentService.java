package com.taskflow.service;

import com.taskflow.dto.task.CommentRequest;
import com.taskflow.dto.task.CommentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.UUID;

public interface CommentService {
    Page<CommentResponse> getCommentsByTaskId(UUID taskId, Pageable pageable);
    CommentResponse addComment(UUID taskId, UUID userId, CommentRequest request);
    void deleteComment(UUID commentId);
}
