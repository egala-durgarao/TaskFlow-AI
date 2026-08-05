package com.taskflow.mapper;

import com.taskflow.dto.org.TeamRequest;
import com.taskflow.dto.org.TeamResponse;
import com.taskflow.entity.Team;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface TeamMapper {
    @Mapping(target = "workspaceId", source = "workspace.id")
    @Mapping(target = "memberCount", expression = "java(team.getUsers() != null ? team.getUsers().size() : 0)")
    TeamResponse toDto(Team team);

    Team toEntity(TeamRequest request);
    void updateEntityFromDto(TeamRequest request, @MappingTarget Team team);
}
