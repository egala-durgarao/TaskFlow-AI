package com.taskflow.entity;

import com.taskflow.common.audit.BaseEntity;
import com.taskflow.common.enums.ActivityType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "activity_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityLog extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(name = "action_type", nullable = false)
    private ActivityType actionType;

    @NotBlank
    @Column(nullable = false)
    private String action;

    @NotBlank
    @Column(name = "target_type", nullable = false)
    private String targetType;

    @Column(name = "target_id")
    private UUID targetId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id")
    private Workspace workspace;
}
