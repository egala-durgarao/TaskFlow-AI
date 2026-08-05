import os
import textwrap

base_dir = "backend/src/main/java/com/taskflow"

def write_file(path, content):
    full_path = os.path.join(base_dir, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(textwrap.dedent(content).strip() + "\n")

# --- DTOs ---
write_file("dto/auth/LoginRequest.java", """
package com.taskflow.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;
}
""")

write_file("dto/auth/RegisterRequest.java", """
package com.taskflow.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

    @NotBlank(message = "Organization name is required")
    private String organizationName;
}
""")

write_file("dto/auth/JwtResponse.java", """
package com.taskflow.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private String accessToken;
    private String refreshToken;
    @Builder.Default
    private String tokenType = "Bearer";
    private UUID id;
    private String email;
    private String role;
    private UUID organizationId;
}
""")

write_file("dto/auth/TokenRefreshRequest.java", """
package com.taskflow.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenRefreshRequest {
    @NotBlank(message = "Refresh token is required")
    private String refreshToken;
}
""")

write_file("dto/auth/TokenRefreshResponse.java", """
package com.taskflow.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenRefreshResponse {
    private String accessToken;
    private String refreshToken;
    @Builder.Default
    private String tokenType = "Bearer";
}
""")

# --- Services ---
write_file("service/RefreshTokenService.java", """
package com.taskflow.service;

import com.taskflow.entity.RefreshToken;
import java.util.Optional;
import java.util.UUID;

public interface RefreshTokenService {
    RefreshToken createRefreshToken(UUID userId);
    RefreshToken verifyExpiration(RefreshToken token);
    Optional<RefreshToken> findByToken(String token);
    void deleteByUserId(UUID userId);
}
""")

write_file("service/impl/RefreshTokenServiceImpl.java", """
package com.taskflow.service.impl;

import com.taskflow.entity.RefreshToken;
import com.taskflow.exception.ResourceNotFoundException;
import com.taskflow.repository.RefreshTokenRepository;
import com.taskflow.repository.UserRepository;
import com.taskflow.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {

    @Value("${app.jwt.refresh-expiration-ms}")
    private Long refreshTokenDurationMs;

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public RefreshToken createRefreshToken(UUID userId) {
        RefreshToken refreshToken = new RefreshToken();

        refreshToken.setUser(userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId)));
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
        refreshToken.setToken(UUID.randomUUID().toString());

        return refreshTokenRepository.save(refreshToken);
    }

    @Override
    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new RuntimeException("Refresh token was expired. Please make a new signin request");
        }
        return token;
    }

    @Override
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    @Override
    @Transactional
    public void deleteByUserId(UUID userId) {
        refreshTokenRepository.deleteByUserId(userId);
    }
}
""")

write_file("service/AuthService.java", """
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
""")

write_file("service/impl/AuthServiceImpl.java", """
package com.taskflow.service.impl;

import com.taskflow.common.enums.UserRole;
import com.taskflow.dto.auth.JwtResponse;
import com.taskflow.dto.auth.LoginRequest;
import com.taskflow.dto.auth.RegisterRequest;
import com.taskflow.dto.auth.TokenRefreshRequest;
import com.taskflow.dto.auth.TokenRefreshResponse;
import com.taskflow.entity.Organization;
import com.taskflow.entity.RefreshToken;
import com.taskflow.entity.User;
import com.taskflow.entity.Workspace;
import com.taskflow.exception.ResourceNotFoundException;
import com.taskflow.repository.OrganizationRepository;
import com.taskflow.repository.UserRepository;
import com.taskflow.repository.WorkspaceRepository;
import com.taskflow.security.CustomUserDetails;
import com.taskflow.security.jwt.JwtUtils;
import com.taskflow.service.AuthService;
import com.taskflow.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final OrganizationRepository organizationRepository;
    private final WorkspaceRepository workspaceRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;

    @Override
    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String jwt = jwtUtils.generateJwtToken(authentication);

        // Delete old token and create new one
        refreshTokenService.deleteByUserId(userDetails.getId());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

        String role = userDetails.getAuthorities().iterator().next().getAuthority();

        return JwtResponse.builder()
                .accessToken(jwt)
                .refreshToken(refreshToken.getToken())
                .id(userDetails.getId())
                .email(userDetails.getUsername())
                .role(role)
                .organizationId(userDetails.getOrganizationId())
                .build();
    }

    @Override
    @Transactional
    public JwtResponse registerUser(RegisterRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new IllegalArgumentException("Error: Email is already in use!");
        }

        // 1. Create Organization
        Organization org = Organization.builder()
                .name(signUpRequest.getOrganizationName())
                .build();
        org = organizationRepository.save(org);

        // 2. Create Default Workspace
        Workspace workspace = Workspace.builder()
                .name("Default Workspace")
                .organization(org)
                .build();
        workspaceRepository.save(workspace);

        // 3. Create User
        User user = User.builder()
                .firstName(signUpRequest.getFirstName())
                .lastName(signUpRequest.getLastName())
                .email(signUpRequest.getEmail())
                .passwordHash(encoder.encode(signUpRequest.getPassword()))
                .role(UserRole.ADMIN) // First user is org admin
                .organization(org)
                .isActive(true)
                .build();

        userRepository.save(user);

        // Auto-login after registration
        return authenticateUser(new LoginRequest(signUpRequest.getEmail(), signUpRequest.getPassword()));
    }

    @Override
    public TokenRefreshResponse refreshToken(TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    Authentication auth = new UsernamePasswordAuthenticationToken(
                            CustomUserDetails.build(user), null, CustomUserDetails.build(user).getAuthorities());
                    String token = jwtUtils.generateJwtToken(auth);
                    return TokenRefreshResponse.builder()
                            .accessToken(token)
                            .refreshToken(requestRefreshToken)
                            .build();
                })
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Refresh token is not in database!"));
    }
}
""")

# --- Controllers ---
write_file("controller/AuthController.java", """
package com.taskflow.controller;

import com.taskflow.dto.auth.JwtResponse;
import com.taskflow.dto.auth.LoginRequest;
import com.taskflow.dto.auth.RegisterRequest;
import com.taskflow.dto.auth.TokenRefreshRequest;
import com.taskflow.dto.auth.TokenRefreshResponse;
import com.taskflow.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Endpoints for login, registration, and token refresh")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "Authenticate user and get tokens")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.authenticateUser(loginRequest));
    }

    @PostMapping("/register")
    @Operation(summary = "Register a new user and organization")
    public ResponseEntity<JwtResponse> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(authService.registerUser(registerRequest));
    }

    @PostMapping("/refresh")
    @Operation(summary = "Refresh an access token using a refresh token")
    public ResponseEntity<TokenRefreshResponse> refreshtoken(@Valid @RequestBody TokenRefreshRequest request) {
        return ResponseEntity.ok(authService.refreshToken(request));
    }
}
""")

print("Successfully generated all Phase 6 (Authentication) files.")
