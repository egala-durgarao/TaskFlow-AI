package com.taskflow.service;

import com.taskflow.dto.search.GlobalSearchResponse;
import java.util.UUID;

public interface SearchService {
    GlobalSearchResponse search(UUID workspaceId, String query);
}
