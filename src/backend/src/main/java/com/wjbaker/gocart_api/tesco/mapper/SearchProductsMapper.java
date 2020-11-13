package com.wjbaker.gocart_api.tesco.mapper;

import com.wjbaker.gocart_api.tesco.type.SearchProduct;
import com.wjbaker.gocart_api.tesco.type.GrocerySearchResponse;
import com.wjbaker.gocart_api.tesco.type.TescoProduct;

import java.util.List;
import java.util.stream.Collectors;

public abstract class SearchProductsMapper {

    private SearchProductsMapper() {}

    public static SearchProduct map(final GrocerySearchResponse.UK.GHS.Products.Result result, final TescoProduct tescoProduct) {
        var builder = SearchProduct.builder()
                .id(result.getId())
                .name(result.getName())
                .imageUrl(mapImageUrl(result.getImageUrl()))
                .price(result.getPrice())
                .description(mapDescription(result.getDescription()))
                .department(result.getDepartment())
                .superDepartment(result.getSuperDepartment());

        if (tescoProduct == null)
            return builder.build();

        return builder
                .barcodeId(tescoProduct.getBarcodeId())
                .ingredients(tescoProduct.getIngredients())
                .healthScore(tescoProduct.getHealthScore())
                .nutrition(mapNutrition(tescoProduct.getNutrition()))
                .build();
    }

    private static String mapDescription(final List<String> description) {
        if (description == null)
            return null;

        return String.join("<br>", description);
    }

    private static String mapImageUrl(final String imageUrl) {
        if (imageUrl == null)
            return null;

        return imageUrl.replace("http://", "https://");
    }

    private static SearchProduct.Nutrition mapNutrition(final TescoProduct.Nutrition nutrition) {
        if (nutrition == null)
            return null;

        return SearchProduct.Nutrition.builder()
                .per100gHeader(nutrition.getPer100gHeader())
                .perServingHeader(nutrition.getPerServingHeader())
                .nutrients(mapNutrients(nutrition.getNutrients()))
                .build();
    }

    private static List<SearchProduct.Nutrition.Nutrient> mapNutrients(final List<TescoProduct.Nutrition.Nutrient> nutrients) {
        if (nutrients == null)
            return null;

        return nutrients.stream()
                .map(n -> SearchProduct.Nutrition.Nutrient.builder()
                        .name(n.getName())
                        .valuePer100g(n.getValuePer100g())
                        .valuePerServing(n.getValuePerServing())
                .build())
                .collect(Collectors.toList());
    }
}
