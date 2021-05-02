package com.wjbaker.gocart_api.api.tesco.type;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SearchProduct {

    private String id;
    private String name;
    private Double price;
    private String imageUrl;
    private String description;
    private String department;
    private String superDepartment;
    private String barcodeId;
    private List<String> ingredients;
    private Integer healthScore;
    private Nutrition nutrition;

    @Getter
    @Setter
    public static class Nutrition {

        private String per100gHeader;
        private String perServingHeader;
        private List<Nutrient> nutrients;

        @Getter
        @Setter
        public static class Nutrient {

            private String name;
            private float valuePer100g;
            private float valuePerServing;
        }
    }
}
