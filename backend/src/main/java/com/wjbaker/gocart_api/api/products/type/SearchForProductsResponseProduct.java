package com.wjbaker.gocart_api.api.products.type;

import lombok.Getter;
import lombok.Setter;

import java.util.Collections;
import java.util.List;

@Getter
@Setter
public final class SearchForProductsResponseProduct {

    public SearchForProductsResponseProduct() {
        this.ingredients = Collections.emptyList();
    }

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

    @Getter
    @Setter
    public static final class Nutrition {

        public Nutrition() {
            this.nutrients = Collections.emptyList();
        }

        private String per100gHeader;
        private String perServingHeader;
        private List<Nutrient> nutrients;

        @Getter
        @Setter
        public static final class Nutrient {

            private String name;
            private float valuePer100g;
            private float valuePerServing;
        }
    }

    @Getter
    @Setter
    public static final class GuidelineDailyAmounts {

        public GuidelineDailyAmounts() {
            this.headers = Collections.emptyList();
            this.footers = Collections.emptyList();
            this.amounts = Collections.emptyList();
        }

        private List<String> headers;
        private List<String> footers;
        private List<GdaAmount> amounts;

        @Getter
        @Setter
        public static final class GdaAmount {

            public GdaAmount() {
                this.values = Collections.emptyList();
            }

            private String name;
            private List<String> values;
            private String percent;
            private GdaRating rating;
        }
    }
}
