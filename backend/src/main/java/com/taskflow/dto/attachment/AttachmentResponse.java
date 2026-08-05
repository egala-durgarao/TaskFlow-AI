package com.taskflow.dto.attachment;

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
public class AttachmentResponse {
    private UUID id;
    private String fileName;
    private String fileType;
    private long fileSize;
    private String fileUrl;
    private UUID taskId;
    private UUID uploaderId;
    private Instant uploadedAt;
}
