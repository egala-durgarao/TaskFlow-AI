package com.taskflow.mapper;

import com.taskflow.dto.task.TaskRequest;
import com.taskflow.dto.task.TaskResponse;
import com.taskflow.dto.task.TaskDetailResponse;
import com.taskflow.entity.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface TaskMapper {

    @Mapping(target = "projectId", source = "project.id")
    @Mapping(target = "projectName", source = "project.name")
    @Mapping(target = "assigneeId", source = "assignee.id")
    @Mapping(target = "reporterId", source = "reporter.id")
    TaskResponse toDto(Task task);

    @Mapping(target = "projectId", source = "project.id")
    @Mapping(target = "projectName", source = "project.name")
    @Mapping(target = "assigneeId", source = "assignee.id")
    @Mapping(target = "reporterId", source = "reporter.id")
    TaskDetailResponse toDetailDto(Task task);

    Task toEntity(TaskRequest request);

    void updateEntityFromDto(TaskRequest request, @MappingTarget Task task);
}
