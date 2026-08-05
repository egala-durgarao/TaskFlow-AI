package com.taskflow.service.impl;

import com.taskflow.dto.search.GlobalSearchResponse;
import com.taskflow.mapper.ProjectMapper;
import com.taskflow.mapper.TaskMapper;
import com.taskflow.repository.ProjectRepository;
import com.taskflow.repository.TaskRepository;
import com.taskflow.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final TaskMapper taskMapper;
    private final ProjectMapper projectMapper;

    @Override
    @Transactional(readOnly = true)
    public GlobalSearchResponse search(UUID workspaceId, String query) {
        // In a real application, Elasticsearch or Hibernate Search would be used here.
        // For MVP, we do basic ILIKE queries on titles.

        var tasks = taskRepository.findByTitleContainingIgnoreCase(query, PageRequest.of(0, 10))
                .getContent()
                .stream()
                .filter(t -> t.getProject() != null && t.getProject().getWorkspace().getId().equals(workspaceId))
                .map(taskMapper::toDto)
                .collect(Collectors.toList());

        var projects = projectRepository.findAll(PageRequest.of(0, 10))
                .getContent()
                .stream()
                .filter(p -> p.getWorkspace().getId().equals(workspaceId) && p.getName().toLowerCase().contains(query.toLowerCase()))
                .map(projectMapper::toDto)
                .collect(Collectors.toList());

        return GlobalSearchResponse.builder()
                .tasks(tasks)
                .projects(projects)
                .build();
    }
}
