package com.taskflow.service;

import com.taskflow.dto.user.UserProfileResponse;
import com.taskflow.dto.user.UpdateProfileRequest;

import java.util.UUID;

public interface UserService {
    UserProfileResponse getUserProfile(UUID userId);
    UserProfileResponse updateProfile(UUID userId, UpdateProfileRequest request);
}
