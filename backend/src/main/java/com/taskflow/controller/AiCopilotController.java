package com.taskflow.controller;

import com.taskflow.dto.ai.AiPromptRequest;
import com.taskflow.dto.ai.AiSuggestionResponse;
import com.taskflow.security.SecurityUtils;
import com.taskflow.service.AiCopilotService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/ai-copilot")
@RequiredArgsConstructor
@Tag(name = "AI Copilot", description = "AI assisted task generation and suggestions")
public class AiCopilotController {

    private final AiCopilotService aiCopilotService;

    @PostMapping("/suggest")
    @Operation(summary = "Generate AI suggestions based on a prompt")
    public ResponseEntity<AiSuggestionResponse> getSuggestions(@Valid @RequestBody AiPromptRequest request) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(aiCopilotService.generateSuggestions(currentUserId, request));
    }
}
