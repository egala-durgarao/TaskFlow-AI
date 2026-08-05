package com.taskflow.dto.org;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TeamRequest {
    @NotBlank(message = "Team name is required")
    private String name;

    private String description;

    private List<UUID> memberIds;
}
