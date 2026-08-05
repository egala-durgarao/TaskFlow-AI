package com.taskflow.dto.search;

import com.taskflow.dto.project.ProjectResponse;
import com.taskflow.dto.task.TaskResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GlobalSearchResponse {
    private List<TaskResponse> tasks;
    private List<ProjectResponse> projects;
}
