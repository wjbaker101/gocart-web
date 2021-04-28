package com.wjbaker.gocart_api.api.tesco.type;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
public class TescoProduct {

    @Getter @Setter
    private String id;

    @Getter @Setter
    private String barcodeId;

    @Getter @Setter
    private String description;

    @Getter @Setter
    private String brand;

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
