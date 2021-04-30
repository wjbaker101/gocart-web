package com.wjbaker.gocart_api.data.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(schema = "entity", name = "product_extended")
@Getter
@Setter
public final class ExtendedProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "product_id")
    private ProductEntity product;

    @Column(name = "barcode_id")
    private String barcodeId;

    @Column(name = "brand")
    private String brand;

    @Column(name = "health_score")
    private Integer healthScore;

    @OneToMany(mappedBy = "extendedProduct", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExtendedProductIngredientEntity> ingredients;
}
