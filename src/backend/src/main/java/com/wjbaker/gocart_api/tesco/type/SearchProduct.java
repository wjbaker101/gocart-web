package com.wjbaker.gocart_api.tesco.type;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class SearchProduct {

    private String id;
    private String name;
    private float price;
    private String imageUrl;
    private String description;
    private String department;
    private String superDepartment;
    private String barcodeId;
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

        private List<String> headers;
        private List<String> footers;
        private List<GdaAmount> amounts;

        @Getter
        @Setter
        public static class GdaAmount {

            private String name;
            private List<String> values;
            private String percent;
            private GdaRating rating;
        }
    }
}
