package com.taskflow.service;

import com.taskflow.dto.attachment.AttachmentResponse;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.UUID;

public interface AttachmentService {
    AttachmentResponse uploadAttachment(UUID taskId, UUID uploaderId, MultipartFile file);
    List<AttachmentResponse> getTaskAttachments(UUID taskId);
    void deleteAttachment(UUID attachmentId);
    byte[] downloadAttachment(UUID attachmentId);
}
