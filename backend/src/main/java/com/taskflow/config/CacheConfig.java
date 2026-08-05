package com.taskflow.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
public class CacheConfig {
    // Basic concurrent map cache enabled via Spring Boot autoconfiguration.
    // Can be easily swapped with RedisCacheManager when Redis is available.
}
