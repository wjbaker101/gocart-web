package com.wjbaker.gocart_api.data.repository;

import com.wjbaker.gocart_api.data.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByUsernameIgnoreCase(final String username);

    Optional<UserEntity> findByReference(final UUID reference);
}
