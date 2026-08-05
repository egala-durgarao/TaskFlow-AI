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
