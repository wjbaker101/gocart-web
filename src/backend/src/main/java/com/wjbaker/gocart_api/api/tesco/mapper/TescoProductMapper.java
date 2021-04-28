package com.wjbaker.gocart_api.api.tesco.mapper;

import com.wjbaker.gocart_api.api.tesco.type.ProductDataResponse;
import com.wjbaker.gocart_api.api.tesco.type.TescoProduct;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public abstract class TescoProductMapper {

    private static final List<String> INGREDIENTS_BLACKLIST = Arrays.asList(
            "INGREDIENTS:",
            "INGREDIENTS LIST:",
            "<p>",
            "</p>"
    );

    private TescoProductMapper() {}

    public static List<TescoProduct> map(final ProductDataResponse response) {
        if (response == null)
            return null;

        return response.getProducts()
                .stream()
                .map(TescoProductMapper::mapTescoProduct)
                .collect(Collectors.toList());
    }

    private static TescoProduct mapTescoProduct(final ProductDataResponse.Product product) {
        return TescoProduct.builder()
                .id(product.getTpnc())
                .barcodeId(product.getGtin())
                .description(product.getDescription())
                .brand(product.getBrand())
                .healthScore(mapHealthScore(product.getProductCharacteristics()))
                .ingredients(mapIngredients(product.getIngredients()))
                .nutrition(mapNutrition(product.getCalcNutrition()))
                .build();
    }

    private static Integer mapHealthScore(final ProductDataResponse.Product.ProductCharacteristics characteristics) {
        if (characteristics == null)
            return null;

        return characteristics.getHealthScore();
    }

    private static List<String> mapIngredients(List<String> ingredients) {
        if (ingredients == null)
            return null;

        return ingredients
                .stream()
                .map(TescoProductMapper::formatIngredient)
                .collect(Collectors.toList());
    }

    private static String formatIngredient(final String ingredientLine) {
        String line = ingredientLine;

        for (String text : INGREDIENTS_BLACKLIST) {
            line = line.replaceAll(text, "");
        }

        return line;
    }

    private static TescoProduct.Nutrition mapNutrition(final ProductDataResponse.Product.Nutrition nutrition) {
        if (nutrition == null)
            return null;

        return TescoProduct.Nutrition.builder()
                .per100gHeader(nutrition.getPer100Header())
                .perServingHeader(nutrition.getPerServingHeader())
                .nutrients(nutrition.getCalcNutrients()
                        .stream()
                        .map(TescoProductMapper::mapNutrient)
                        .collect(Collectors.toList()))
                .build();
    }

    private static TescoProduct.Nutrition.Nutrient mapNutrient(
            final ProductDataResponse.Product.Nutrition.Nutrient nutrient) {

        if (nutrient == null)
            return null;

        return TescoProduct.Nutrition.Nutrient.builder()
                .name(nutrient.getName())
                .valuePer100g(nutrient.getValuePer100())
                .valuePerServing(nutrient.getValuePerServing())
                .build();
    }
}
