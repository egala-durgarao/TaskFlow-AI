package com.taskflow.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AiSuggestionResponse {
    private String responseText;
    private List<String> actionItems;
    private List<String> generatedTasks;
}
