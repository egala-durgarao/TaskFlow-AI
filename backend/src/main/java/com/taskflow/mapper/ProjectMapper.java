package com.taskflow.mapper;

import com.taskflow.dto.project.ProjectRequest;
import com.taskflow.dto.project.ProjectResponse;
import com.taskflow.entity.Project;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ProjectMapper {
    ProjectResponse toDto(Project project);

    Project toEntity(ProjectRequest request);

    void updateEntityFromDto(ProjectRequest request, @MappingTarget Project project);
}
