package com.wjbaker.gocart_api.client.open_food_facts.types;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public final class GetProductResponse {

    private Product product;

    @Getter
    @Setter
    public static final class Product {

        @JsonProperty("ingredients_text")
        private String ingredients;

        private Map<String, String> nutriments;

        @JsonProperty("nutrient_levels")
        private NutrientLevels nutrientLevels;

        @Getter
        @Setter
        public static final class NutrientLevels {

            private String fat;
            private String salt;

            @JsonProperty("saturated-fat")
            private String saturatedFat;

            private String sugars;
        }
    }
}
