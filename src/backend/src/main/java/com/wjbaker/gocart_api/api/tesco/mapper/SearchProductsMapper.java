package com.wjbaker.gocart_api.api.tesco.mapper;

import com.wjbaker.gocart_api.api.tesco.type.GrocerySearchResponse;
import com.wjbaker.gocart_api.api.tesco.type.SearchProduct;
import com.wjbaker.gocart_api.api.tesco.type.TescoProduct;

import java.util.List;
import java.util.stream.Collectors;

public abstract class SearchProductsMapper {

    private SearchProductsMapper() {}

    public static List<SearchProduct> map(final GrocerySearchResponse response, final TescoProduct tescoProduct) {
        if (response == null)
            return null;

        if (response.getUk() == null)
            return null;

        if (response.getUk().getGhs() == null)
            return null;

        if (response.getUk().getGhs().getProducts() == null)
            return null;

        if (response.getUk().getGhs().getProducts().getResults() == null)
            return null;

        return response.getUk().getGhs().getProducts().getResults()
                .stream()
                .map(SearchProductsMapper::mapSearchProduct)
                .collect(Collectors.toList());
    }

    public static SearchProduct mapWithProduct(final SearchProduct product, final TescoProduct tescoProduct) {
        if (product == null)
            return null;

        if (tescoProduct == null)
            return product;

        product.setBarcodeId(tescoProduct.getBarcodeId());
        product.setBrand(tescoProduct.getBrand());
        product.setIngredients(tescoProduct.getIngredients());
        product.setHealthScore(tescoProduct.getHealthScore());
        product.setNutrition(mapNutrition(tescoProduct.getNutrition()));

        return product;
    }

    private static SearchProduct mapSearchProduct(final GrocerySearchResponse.UK.GHS.Products.Result result) {
        var searchProduct = new SearchProduct();
        searchProduct.setId(result.getId());
        searchProduct.setName(result.getName());
        searchProduct.setImageUrl(mapImageUrl(result.getImageUrl()));
        searchProduct.setPrice(result.getPrice());
        searchProduct.setDescription(mapDescription(result.getDescription()));
        searchProduct.setDepartment(result.getDepartment());
        searchProduct.setSuperDepartment(result.getSuperDepartment());

        return searchProduct;
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

        var productNutrition = new SearchProduct.Nutrition();
        productNutrition.setPer100gHeader(nutrition.getPer100gHeader());
        productNutrition.setPerServingHeader(nutrition.getPerServingHeader());
        productNutrition.setNutrients(mapNutrients(nutrition.getNutrients()));

        return productNutrition;
    }

    private static List<SearchProduct.Nutrition.Nutrient> mapNutrients(
            final List<TescoProduct.Nutrition.Nutrient> nutrients) {

        if (nutrients == null)
            return null;

        return nutrients.stream()
                .map(SearchProductsMapper::mapNutrient)
                .collect(Collectors.toList());
    }

    private static SearchProduct.Nutrition.Nutrient mapNutrient(final TescoProduct.Nutrition.Nutrient nutrient) {
        if (nutrient == null)
            return null;

        var productNutrient = new SearchProduct.Nutrition.Nutrient();
        productNutrient.setName(nutrient.getName());
        productNutrient.setValuePer100g(nutrient.getValuePer100g());
        productNutrient.setValuePerServing(nutrient.getValuePerServing());

        return productNutrient;
    }
}
