package com.wjbaker.gocart_api.tesco.type;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
public class TescoProduct {

    private String id;
    private String barcodeId;
    private String description;
    private String brand;
    private List<String> ingredients;
    private Integer healthScore;
    private Nutrition nutrition;
    private GuidelineDailyAmounts guidelineDailyAmounts;

    @Builder
    @Getter
    @Setter
    public static class Nutrition {

        private String per100gHeader;
        private String perServingHeader;
        private List<Nutrient> nutrients;

        @Builder
        @Getter
        @Setter
        public static class Nutrient {

            private String name;
            private float valuePer100g;
            private float valuePerServing;
        }
    }

    @Getter
    @Setter
    public static class GuidelineDailyAmounts {

        public GuidelineDailyAmounts() {
            this.headers = new ArrayList<>();
            this.footers = new ArrayList<>();
            this.amounts = new ArrayList<>();
        }

        private List<String> headers;
        private List<String> footers;
        private List<GdaAmount> amounts;

        @Getter
        @Setter
        public static class GdaAmount {

            public GdaAmount() {
                this.values = new ArrayList<>();
            }

            private String name;
            private List<String> values;
            private String percent;
            private GdaRating rating;
        }
    }
}
