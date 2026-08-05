package com.taskflow.controller;

import com.taskflow.dto.search.GlobalSearchResponse;
import com.taskflow.service.SearchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/workspaces/{workspaceId}/search")
@RequiredArgsConstructor
@Tag(name = "Search", description = "Global search and filtering")
public class SearchController {

    private final SearchService searchService;

    @GetMapping
    @Operation(summary = "Global search for tasks, projects, etc.")
    public ResponseEntity<GlobalSearchResponse> search(
            @PathVariable UUID workspaceId,
            @RequestParam String query) {
        return ResponseEntity.ok(searchService.search(workspaceId, query));
    }
}
