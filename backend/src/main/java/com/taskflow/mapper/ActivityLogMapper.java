package com.taskflow.mapper;

import com.taskflow.dto.activity.ActivityLogResponse;
import com.taskflow.entity.ActivityLog;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ActivityLogMapper {
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "userName", expression = "java(activityLog.getUser().getFirstName() + ' ' + activityLog.getUser().getLastName())")
    ActivityLogResponse toDto(ActivityLog activityLog);
}
