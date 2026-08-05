package com.taskflow.dto.ai;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AiPromptRequest {
    @NotBlank(message = "Prompt cannot be empty")
    private String prompt;
    private UUID contextWorkspaceId;
    private UUID contextTaskId;
}
