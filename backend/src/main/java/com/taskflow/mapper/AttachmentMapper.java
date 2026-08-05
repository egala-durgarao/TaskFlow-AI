package com.taskflow.mapper;

import com.taskflow.dto.attachment.AttachmentResponse;
import com.taskflow.entity.Attachment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AttachmentMapper {
    @Mapping(target = "taskId", source = "task.id")
    @Mapping(target = "uploaderId", source = "uploader.id")
    AttachmentResponse toDto(Attachment attachment);
}
