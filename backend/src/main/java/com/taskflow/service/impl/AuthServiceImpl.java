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
