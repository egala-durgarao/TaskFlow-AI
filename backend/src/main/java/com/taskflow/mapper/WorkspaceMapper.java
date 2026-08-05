package com.taskflow.mapper;

import com.taskflow.dto.org.WorkspaceRequest;
import com.taskflow.dto.org.WorkspaceResponse;
import com.taskflow.entity.Workspace;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface WorkspaceMapper {
    @Mapping(target = "organizationId", source = "organization.id")
    WorkspaceResponse toDto(Workspace workspace);

    Workspace toEntity(WorkspaceRequest request);
    void updateEntityFromDto(WorkspaceRequest request, @MappingTarget Workspace workspace);
}
