package com.taskflow.service;

import com.taskflow.dto.ai.AiPromptRequest;
import com.taskflow.dto.ai.AiSuggestionResponse;
import java.util.UUID;

public interface AiCopilotService {
    AiSuggestionResponse generateSuggestions(UUID userId, AiPromptRequest request);
}
