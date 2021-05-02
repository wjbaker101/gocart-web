package com.wjbaker.gocart_api.data.repository;

import com.wjbaker.gocart_api.data.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    Optional<ProductEntity> findByTpnb(final String tpnb);
}
