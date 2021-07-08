package com.wjbaker.gocart_api.tesco.type;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductDataResponse {

    private List<Product> products;

    @Getter
    @Setter
    public static class Product {

        private String gtin;
        private String tpnb;
        private String tpnc;
        private String description;
        private String brand;
        private QuantityContents qtyContents;
        private ProductCharacteristics productCharacteristics;
        private List<PackageDimension> pkgDimensions;
        private List<String> ingredients;
        private GuidelineDailyAmounts gda;
        private Nutrition calcNutrition;

        @Getter
        @Setter
        public static class GuidelineDailyAmounts {

            private List<GdaReferences> gdaRefs;

            @Getter
            @Setter
            public static class GdaReferences {

                private List<String> headers;
                private List<String> footers;
                private List<GdaValue> values;

                @Getter
                @Setter
                public static class GdaValue {

                    private String name;
                    private List<String> values;
                    private String percent;
                    private String rating;
                }
            }
        }

        @Getter
        @Setter
        public static class QuantityContents {

            private int quantity;
            private String quantityUom;
            private int totalNumber;
            private String unitQty;
            private String netContents;
            private String avgMeasure;
        }

        @Getter
        @Setter
        public static class ProductCharacteristics {

            private boolean isFood;
            private boolean isDrink;
            private boolean isHazardous;
            private String storageType;
            private boolean isAnalgesic;
            private boolean containsLoperamide;
            private int totalAlcoholUnits;
            private Integer healthScore;
        }

        @Getter
        @Setter
        public static class PackageDimension {

            private int no;
            private float width;
            private float height;
            private float depth;
            private String dimensionUom;
            private float weight;
            private String weightUom;
            private float volume;
            private String volumeUom;
        }

        @Getter
        @Setter
        public static class Nutrition {

            private String per100Header;
            private String perServingHeader;
            private List<Nutrient> calcNutrients;

            @Getter
            @Setter
            public static class Nutrient {

                private String name;
                private float valuePer100;
                private float valuePerServing;
            }
        }
    }
}
