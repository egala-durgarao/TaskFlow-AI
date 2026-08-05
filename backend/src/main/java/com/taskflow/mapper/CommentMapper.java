package com.taskflow.mapper;

import com.taskflow.dto.task.CommentRequest;
import com.taskflow.dto.task.CommentResponse;
import com.taskflow.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {
    @Mapping(target = "taskId", source = "task.id")
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "userName", expression = "java(comment.getUser().getFirstName() + ' ' + comment.getUser().getLastName())")
    CommentResponse toDto(Comment comment);

    Comment toEntity(CommentRequest request);
}
