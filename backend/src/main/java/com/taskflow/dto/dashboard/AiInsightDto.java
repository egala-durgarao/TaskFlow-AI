package com.taskflow.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AiInsightDto {
    private UUID id;
    private String severity;
    private String title;
    private String message;
}
