package com.taskflow.service;

import com.taskflow.dto.auth.JwtResponse;
import com.taskflow.dto.auth.LoginRequest;
import com.taskflow.dto.auth.RegisterRequest;
import com.taskflow.dto.auth.TokenRefreshRequest;
import com.taskflow.dto.auth.TokenRefreshResponse;

public interface AuthService {
    JwtResponse authenticateUser(LoginRequest loginRequest);
    JwtResponse registerUser(RegisterRequest registerRequest);
    TokenRefreshResponse refreshToken(TokenRefreshRequest request);
}
