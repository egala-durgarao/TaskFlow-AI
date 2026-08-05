package com.taskflow.mapper;

import com.taskflow.dto.notification.NotificationResponse;
import com.taskflow.entity.Notification;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface NotificationMapper {
    NotificationResponse toDto(Notification notification);
}
