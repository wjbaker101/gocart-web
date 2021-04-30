package com.wjbaker.gocart_api.data.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(schema = "shopping", name = "user_product")
@Getter
@Setter
public final class UserProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private ProductEntity product;

    @Column(name = "list_quantity", nullable = false)
    private int listQuantity;

    @Column(name = "is_checked", nullable = false)
    private boolean isChecked;

    @Column(name = "add_count", nullable = false)
    private int addCount;
}
