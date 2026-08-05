package com.taskflow.service.impl;

import com.taskflow.dto.task.CommentRequest;
import com.taskflow.dto.task.CommentResponse;
import com.taskflow.entity.Comment;
import com.taskflow.entity.Task;
import com.taskflow.entity.User;
import com.taskflow.event.CommentAddedEvent;
import com.taskflow.exception.ResourceNotFoundException;
import com.taskflow.mapper.CommentMapper;
import com.taskflow.repository.CommentRepository;
import com.taskflow.repository.TaskRepository;
import com.taskflow.repository.UserRepository;
import com.taskflow.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final CommentMapper commentMapper;
    private final ApplicationEventPublisher eventPublisher;

    @Override
    @Transactional(readOnly = true)
    public Page<CommentResponse> getCommentsByTaskId(UUID taskId, Pageable pageable) {
        return commentRepository.findByTaskId(taskId, pageable).map(commentMapper::toDto);
    }

    @Override
    @Transactional
    public CommentResponse addComment(UUID taskId, UUID userId, CommentRequest request) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Comment comment = commentMapper.toEntity(request);
        comment.setTask(task);
        comment.setUser(user);

        comment = commentRepository.save(comment);

        UUID assigneeId = task.getAssignee() != null ? task.getAssignee().getId() : null;
        eventPublisher.publishEvent(new CommentAddedEvent(
                task.getId(), task.getTitle(), userId, assigneeId));

        return commentMapper.toDto(comment);
    }

    @Override
    @Transactional
    public void deleteComment(UUID commentId) {
        if (!commentRepository.existsById(commentId)) {
            throw new ResourceNotFoundException("Comment not found");
        }
        commentRepository.deleteById(commentId);
    }
}
