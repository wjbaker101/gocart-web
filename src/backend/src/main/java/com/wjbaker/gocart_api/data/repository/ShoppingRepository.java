package com.wjbaker.gocart_api.data.repository;

import com.wjbaker.gocart_api.data.entity.UserEntity;
import com.wjbaker.gocart_api.data.entity.UserProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShoppingRepository extends JpaRepository<UserProductEntity, Long> {

    List<UserProductEntity> findByUser(final UserEntity user);

    Optional<UserProductEntity> findByUserAndProductTpnb(final UserEntity user, final String tpnb);
}