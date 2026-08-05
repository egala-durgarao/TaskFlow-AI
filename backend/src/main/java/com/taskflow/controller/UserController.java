package com.taskflow.controller;

import com.taskflow.dto.user.UserProfileResponse;
import com.taskflow.dto.user.UpdateProfileRequest;
import com.taskflow.security.SecurityUtils;
import com.taskflow.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "User profile and settings")
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    @Operation(summary = "Get current user profile")
    public ResponseEntity<UserProfileResponse> getCurrentUser() {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(userService.getUserProfile(currentUserId));
    }

    @PutMapping("/me")
    @Operation(summary = "Update current user profile")
    public ResponseEntity<UserProfileResponse> updateProfile(@Valid @RequestBody UpdateProfileRequest request) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(userService.updateProfile(currentUserId, request));
    }
}
