package com.taskflow.controller;

import com.taskflow.dto.attachment.AttachmentResponse;
import com.taskflow.security.SecurityUtils;
import com.taskflow.service.AttachmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name = "Attachments", description = "File attachments for tasks")
public class AttachmentController {

    private final AttachmentService attachmentService;

    @PostMapping(value = "/tasks/{taskId}/attachments", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload a file attachment for a task")
    public ResponseEntity<AttachmentResponse> uploadAttachment(
            @PathVariable UUID taskId,
            @RequestParam("file") MultipartFile file) {
        UUID uploaderId = SecurityUtils.getCurrentUserId();
        return new ResponseEntity<>(attachmentService.uploadAttachment(taskId, uploaderId, file), HttpStatus.CREATED);
    }

    @GetMapping("/tasks/{taskId}/attachments")
    @Operation(summary = "Get all attachments for a task")
    public ResponseEntity<List<AttachmentResponse>> getTaskAttachments(@PathVariable UUID taskId) {
        return ResponseEntity.ok(attachmentService.getTaskAttachments(taskId));
    }

    @DeleteMapping("/attachments/{attachmentId}")
    @Operation(summary = "Delete an attachment")
    public ResponseEntity<Void> deleteAttachment(@PathVariable UUID attachmentId) {
        attachmentService.deleteAttachment(attachmentId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/attachments/{fileName}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    @Operation(summary = "Download an attachment file")
    public ResponseEntity<byte[]> downloadFile(@PathVariable String fileName) {
        // Mocking the UUID lookup using a custom query or passing ID directly. 
        // In this simple MVP, we just expose the byte[] if they pass the ID
        try {
            UUID id = UUID.fromString(fileName);
            byte[] fileData = attachmentService.downloadAttachment(id);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;")
                    .body(fileData);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
