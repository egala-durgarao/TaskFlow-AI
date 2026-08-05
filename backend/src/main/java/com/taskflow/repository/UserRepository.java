package com.taskflow.repository;

import com.taskflow.common.enums.UserRole;
import com.taskflow.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    List<User> findByRole(UserRole role);

    @Query("SELECT DISTINCT u FROM User u JOIN u.teams t WHERE t.workspace.id = :workspaceId")
    List<User> findByWorkspaceId(@Param("workspaceId") UUID workspaceId);

    @Query("SELECT u FROM User u WHERE LOWER(u.firstName) LIKE LOWER(CONCAT('%', :name, '%')) OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :name, '%'))")
    Page<User> searchUsersByName(@Param("name") String name, Pageable pageable);

    Page<User> findByEmailContainingIgnoreCase(String email, Pageable pageable);
}
