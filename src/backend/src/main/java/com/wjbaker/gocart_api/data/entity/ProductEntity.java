package com.wjbaker.gocart_api.data.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(schema = "entity", name = "product")
@Getter
@Setter
public final class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tpnb")
    private String tpnb;

    @OneToOne(mappedBy = "product", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private ExtendedProductEntity extendedProduct;

    @Column(name = "name")
    private String name;

    @Column(name = "price", precision = 15, scale = 2)
    private Double price;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "description")
    private String description;

    @Column(name = "department")
    private String department;

    @Column(name = "super_department")
    private String superDepartment;
}
