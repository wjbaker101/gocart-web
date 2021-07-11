package com.wjbaker.gocart_api.client.tesco.types;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public final class GetProductDataResponse {

    private List<Product> products;

    @Getter
    @Setter
    public static class Product {

        private String gtin;
        private String tpnb;
        private String tpnc;
        private String description;
        private String brand;
        private ProductCharacteristics productCharacteristics;
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
        public static class ProductCharacteristics {

            private boolean isFood;
            private boolean isDrink;
            private boolean isHazardous;
            private int totalAlcoholUnits;
            private Integer healthScore;
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
