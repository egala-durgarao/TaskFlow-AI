import os
import textwrap

base_dir = "backend/src/main/java/com/taskflow"

def write_file(path, content):
    full_path = os.path.join(base_dir, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(textwrap.dedent(content).strip() + "\n")

# --- Phase 9: Subtasks & Comments ---
write_file("dto/task/SubtaskRequest.java", """
package com.taskflow.dto.task;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubtaskRequest {
    @NotBlank(message = "Subtask title is required")
    private String title;
    private boolean isCompleted;
}
""")

write_file("dto/task/SubtaskResponse.java", """
package com.taskflow.dto.task;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubtaskResponse {
    private UUID id;
    private UUID taskId;
    private String title;
    private boolean isCompleted;
    private Instant createdAt;
    private Instant updatedAt;
}
""")

write_file("dto/task/CommentRequest.java", """
package com.taskflow.dto.task;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequest {
    @NotBlank(message = "Comment content cannot be empty")
    private String content;
}
""")

write_file("dto/task/CommentResponse.java", """
package com.taskflow.dto.task;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponse {
    private UUID id;
    private UUID taskId;
    private UUID userId;
    private String userName;
    private String content;
    private Instant createdAt;
    private Instant updatedAt;
}
""")

write_file("mapper/SubtaskMapper.java", """
package com.taskflow.mapper;

import com.taskflow.dto.task.SubtaskRequest;
import com.taskflow.dto.task.SubtaskResponse;
import com.taskflow.entity.Subtask;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface SubtaskMapper {
    @Mapping(target = "taskId", source = "task.id")
    SubtaskResponse toDto(Subtask subtask);
    
    Subtask toEntity(SubtaskRequest request);
    void updateEntityFromDto(SubtaskRequest request, @MappingTarget Subtask subtask);
}
""")

write_file("mapper/CommentMapper.java", """
package com.taskflow.mapper;

import com.taskflow.dto.task.CommentRequest;
import com.taskflow.dto.task.CommentResponse;
import com.taskflow.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {
    @Mapping(target = "taskId", source = "task.id")
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "userName", expression = "java(comment.getUser().getFirstName() + ' ' + comment.getUser().getLastName())")
    CommentResponse toDto(Comment comment);
    
    Comment toEntity(CommentRequest request);
}
""")

write_file("service/SubtaskService.java", """
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
""")

write_file("service/impl/SubtaskServiceImpl.java", """
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
""")

write_file("service/CommentService.java", """
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
""")

write_file("service/impl/CommentServiceImpl.java", """
package com.taskflow.service.impl;

import com.taskflow.dto.task.CommentRequest;
import com.taskflow.dto.task.CommentResponse;
import com.taskflow.entity.Comment;
import com.taskflow.entity.Task;
import com.taskflow.entity.User;
import com.taskflow.exception.ResourceNotFoundException;
import com.taskflow.mapper.CommentMapper;
import com.taskflow.repository.CommentRepository;
import com.taskflow.repository.TaskRepository;
import com.taskflow.repository.UserRepository;
import com.taskflow.service.CommentService;
import lombok.RequiredArgsConstructor;
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
        
        return commentMapper.toDto(commentRepository.save(comment));
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
""")

write_file("controller/SubtaskController.java", """
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
""")

write_file("controller/CommentController.java", """
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
""")

print("Successfully generated all Phase 9 (Subtask & Comment APIs) files.")
