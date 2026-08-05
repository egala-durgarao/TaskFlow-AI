package com.taskflow.service.impl;

import com.taskflow.dto.attachment.AttachmentResponse;
import com.taskflow.entity.Attachment;
import com.taskflow.entity.Task;
import com.taskflow.entity.User;
import com.taskflow.exception.ResourceNotFoundException;
import com.taskflow.mapper.AttachmentMapper;
import com.taskflow.repository.AttachmentRepository;
import com.taskflow.repository.TaskRepository;
import com.taskflow.repository.UserRepository;
import com.taskflow.service.AttachmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttachmentServiceImpl implements AttachmentService {

    private final AttachmentRepository attachmentRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final AttachmentMapper attachmentMapper;

    private final String UPLOAD_DIR = "uploads/";

    @Override
    @Transactional
    public AttachmentResponse uploadAttachment(UUID taskId, UUID uploaderId, MultipartFile file) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        User uploader = userRepository.findById(uploaderId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        try {
            // Ensure directory exists
            Files.createDirectories(Paths.get(UPLOAD_DIR));

            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR + fileName);
            Files.write(filePath, file.getBytes());

            Attachment attachment = Attachment.builder()
                    .fileName(file.getOriginalFilename())
                    .fileType(file.getContentType())
                    .fileSize(file.getSize())
                    .fileUrl("/api/v1/attachments/" + fileName)
                    .task(task)
                    .uploader(uploader)
                    .build();

            return attachmentMapper.toDto(attachmentRepository.save(attachment));
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<AttachmentResponse> getTaskAttachments(UUID taskId) {
        return attachmentRepository.findByTaskId(taskId).stream()
                .map(attachmentMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteAttachment(UUID attachmentId) {
        Attachment attachment = attachmentRepository.findById(attachmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Attachment not found"));

        try {
            // Delete file from system
            String[] urlParts = attachment.getFileUrl().split("/");
            String fileName = urlParts[urlParts.length - 1];
            Files.deleteIfExists(Paths.get(UPLOAD_DIR + fileName));
        } catch (IOException e) {
            // Log and ignore for now
        }

        attachmentRepository.deleteById(attachmentId);
    }

    @Override
    public byte[] downloadAttachment(UUID attachmentId) {
        Attachment attachment = attachmentRepository.findById(attachmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Attachment not found"));
        try {
            String[] urlParts = attachment.getFileUrl().split("/");
            String fileName = urlParts[urlParts.length - 1];
            return Files.readAllBytes(Paths.get(UPLOAD_DIR + fileName));
        } catch (IOException e) {
            throw new ResourceNotFoundException("File could not be read");
        }
    }
}
