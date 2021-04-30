package com.wjbaker.gocart_api.data.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(schema = "entity", name = "product_extended_ingredient")
@Getter
@Setter
public final class ExtendedProductIngredientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "product_extended_id")
    private ExtendedProductEntity extendedProduct;

    @Column(name = "ingredient")
    private String ingredient;
}
