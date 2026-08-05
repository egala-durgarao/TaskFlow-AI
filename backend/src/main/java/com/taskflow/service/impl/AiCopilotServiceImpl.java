package com.taskflow.service.impl;

import com.taskflow.dto.ai.AiPromptRequest;
import com.taskflow.dto.ai.AiSuggestionResponse;
import com.taskflow.service.AiCopilotService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AiCopilotServiceImpl implements AiCopilotService {

    @Override
    public AiSuggestionResponse generateSuggestions(UUID userId, AiPromptRequest request) {
        // MOCK AI Implementation for MVP
        // In a real scenario, this would call Gemini API or OpenAI API using RestTemplate or WebClient

        String mockResponse = "Based on your prompt: '" + request.getPrompt() + "', here are my suggestions.";

        return AiSuggestionResponse.builder()
                .responseText(mockResponse)
                .actionItems(List.of("Review the overdue tasks", "Schedule a team sync"))
                .generatedTasks(List.of("Update backend documentation", "Fix UI bugs on dashboard"))
                .build();
    }
}
