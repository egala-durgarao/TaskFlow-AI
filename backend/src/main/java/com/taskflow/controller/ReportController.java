package com.taskflow.controller;

import com.taskflow.dto.report.ReportRequest;
import com.taskflow.dto.report.ReportResponse;
import com.taskflow.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/reports")
@RequiredArgsConstructor
@Tag(name = "Reports", description = "Analytics and reporting endpoints")
public class ReportController {

    private final ReportService reportService;

    @PostMapping("/tasks")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Operation(summary = "Generate a task report based on criteria")
    public ResponseEntity<ReportResponse> generateTaskReport(@Valid @RequestBody ReportRequest request) {
        return ResponseEntity.ok(reportService.generateTaskReport(request));
    }
}
