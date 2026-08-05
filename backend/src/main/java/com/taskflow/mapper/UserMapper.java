package com.taskflow.mapper;

import com.taskflow.dto.user.UserProfileResponse;
import com.taskflow.dto.user.UpdateProfileRequest;
import com.taskflow.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    UserProfileResponse toDto(User user);
    void updateEntityFromDto(UpdateProfileRequest request, @MappingTarget User user);
}
