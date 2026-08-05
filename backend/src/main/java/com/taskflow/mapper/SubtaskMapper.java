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
