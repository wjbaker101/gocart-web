package com.wjbaker.gocart_api.tesco.mapper;

import com.wjbaker.gocart_api.tesco.type.ProductDataResponse;
import com.wjbaker.gocart_api.tesco.type.TescoProduct;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public abstract class TescoProductMapper {

    private TescoProductMapper() {}

    public static TescoProduct map(final ProductDataResponse.Product product) {
        return TescoProduct.builder()
                .id(product.getTpnc())
                .barcodeId(product.getGtin())
                .description(product.getDescription())
                .brand(product.getBrand())
                .healthScore(Optional.ofNullable(product.getProductCharacteristics())
                        .map(ProductDataResponse.Product.ProductCharacteristics::getHealthScore)
                        .orElse(null))
                .ingredients(mapIngredients(product.getIngredients()))
                .nutrition(mapNutrition(product.getCalcNutrition()))
                .build();
    }

    private static List<String> mapIngredients(List<String> ingredients) {
        if (ingredients == null)
            return null;

        return ingredients
                .stream()
                .map(i -> i
                        .replaceAll("INGREDIENTS:", "")
                        .replaceAll("INGREDIENTS LIST:", ""))
                .collect(Collectors.toList());
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