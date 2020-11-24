package com.wjbaker.gocart_api.tesco.type;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class ProductDataResponse {

    @Getter @Setter
    private List<Product> products;

    public static class Product {

        @Getter @Setter
        private String gtin;

        @Getter @Setter
        private String tpnb;

        @Getter @Setter
        private String tpnc;

        @Getter @Setter
        private String description;

        @Getter @Setter
        private String brand;

        @Getter @Setter
        private QuantityContents qtyContents;

        @Getter @Setter
        private ProductCharacteristics productCharacteristics;

        @Getter @Setter
        private List<PackageDimension> pkgDimensions;

        @Getter @Setter
        private List<String> ingredients;

        @Getter @Setter
        private Nutrition calcNutrition;

        public static class QuantityContents {

            @Getter @Setter
            private int quantity;

            @Getter @Setter
            private String quantityUom;

            @Getter @Setter
            private int totalNumber;

            @Getter @Setter
            private String unitQty;

            @Getter @Setter
            private String netContents;

            @Getter @Setter
            private String avgMeasure;
        }

        public static class ProductCharacteristics {

            @Getter @Setter
            private boolean isFood;

            @Getter @Setter
            private boolean isDrink;

            @Getter @Setter
            private boolean isHazardous;

            @Getter @Setter
            private String storageType;

            @Getter @Setter
            private boolean isAnalgesic;

            @Getter @Setter
            private boolean containsLoperamide;

            @Getter @Setter
            private int totalAlcoholUnits;

            @Getter @Setter
            private Integer healthScore;
        }

        public static class PackageDimension {

            @Getter @Setter
            private int no;

            @Getter @Setter
            private float width;

            @Getter @Setter
            private float height;

            @Getter @Setter
            private float depth;

            @Getter @Setter
            private String dimensionUom;

            @Getter @Setter
            private float weight;

            @Getter @Setter
            private String weightUom;

            @Getter @Setter
            private float volume;

            @Getter @Setter
            private String volumeUom;
        }

        public static class Nutrition {

            @Getter @Setter
            private String per100Header;

            @Getter @Setter
            private String perServingHeader;

            @Getter @Setter
            private List<Nutrient> calcNutrients;

            public static class Nutrient {

                @Getter @Setter
                private String name;

                @Getter @Setter
                private float valuePer100;

                @Getter @Setter
                private float valuePerServing;
            }
        }
    }
}
