package com.wjbaker.gocart_api.api.shopping.type;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public final class GetUserProductsResponse {

    private List<Product> products;

    @Getter
    @Setter
    public static final class Product {

        private long tpnb;
        private String name;
        private double price;
        private String imageUrl;
        private String description;
        private String department;
        private String superDepartment;

        private String barcodeId;
        private String brand;
        private Integer healthScore;
        private List<String> ingredients;

        private int listQuantity;
        private boolean isChecked;
        private int addCount;
    }
}
