package com.wjbaker.gocart_api.tesco.type;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
public class SearchProduct {

    @Getter @Setter
    private String id;

    @Getter @Setter
    private String name;

    @Getter @Setter
    private float price;

    @Getter @Setter
    private String imageUrl;

    @Getter @Setter
    private String description;

    @Getter @Setter
    private String department;

    @Getter @Setter
    private String superDepartment;

    @Getter @Setter
    private String barcodeId;

    @Getter @Setter
    private List<String> ingredients;

    @Getter @Setter
    private Integer healthScore;

    @Getter @Setter
    private Nutrition nutrition;

    @Builder
    public static class Nutrition {

        @Getter @Setter
        private String per100gHeader;

        @Getter @Setter
        private String perServingHeader;

        @Getter @Setter
        private List<Nutrient> nutrients;

        @Builder
        public static class Nutrient {

            @Getter @Setter
            private String name;

            @Getter @Setter
            private float valuePer100g;

            @Getter @Setter
            private float valuePerServing;
        }
    }
}
