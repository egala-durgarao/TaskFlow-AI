package com.taskflow.service;

import com.taskflow.dto.report.ReportRequest;
import com.taskflow.dto.report.ReportResponse;

public interface ReportService {
    ReportResponse generateTaskReport(ReportRequest request);
}
