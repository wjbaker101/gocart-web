package com.wjbaker.gocart_api.api.products;

import com.wjbaker.gocart_api.api.products.type.GdaRating;
import com.wjbaker.gocart_api.api.products.type.SearchForProductsResponseProduct;
import com.wjbaker.gocart_api.client.tesco.TescoClient;
import com.wjbaker.gocart_api.client.tesco.types.GrocerySearchResponse;
import com.wjbaker.gocart_api.type.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductsService {

    private final TescoClient tescoClient;
    private final MissingProductDataService missingProductDataService;

    private final List<String> ingredientsBlacklist = Arrays.asList(
        "INGREDIENTS:",
        "INGREDIENTS LIST:",
        "<p>",
        "</p>"
    );

    @Autowired
    public ProductsService(
        final TescoClient tescoClient,
        final MissingProductDataService missingProductDataService) {

        this.tescoClient = tescoClient;
        this.missingProductDataService = missingProductDataService;
    }

    public Result<List<SearchForProductsResponseProduct>> searchForProducts(final String searchTerm, final int page) {
        final var limit = 10;
        final var offset = (page - 1) * limit;

        var productsResult = this.tescoClient.grocerySearch(searchTerm, limit, offset);
        if (productsResult.isError())
            return Result.from(null);

        var products = productsResult.value().getUk().getGhs().getProducts().getResults();

        var productData = this.tescoClient.getProductData(products
            .stream()
            .map(GrocerySearchResponse.Uk.Ghs.Products.Result::getId)
            .collect(Collectors.toList()));
        if (productData.isError())
            return null;

        var responseProducts = new ArrayList<SearchForProductsResponseProduct>();
        for (var product : products) {
            var responseProduct = new SearchForProductsResponseProduct();
            responseProduct.setId(product.getId());
            responseProduct.setName(product.getName());
            responseProduct.setPrice(product.getPrice());
            responseProduct.setImageUrl(product.getImageUrl());
            responseProduct.setDepartment(product.getDepartment());
            responseProduct.setSuperDepartment(product.getSuperDepartment());

            if (product.getDescription() != null)
                responseProduct.setDescription(String.join("<br>", product.getDescription()));

            var matchingProductData = productData.value().getProducts()
                .stream()
                .filter(x -> x.getTpnc().equals(product.getId()))
                .findFirst();
            if (matchingProductData.isEmpty())
                continue;

            responseProduct.setBarcodeId(matchingProductData.get().getGtin());

            if (matchingProductData.get().getIngredients() != null) {
                responseProduct.setIngredients(matchingProductData.get().getIngredients()
                    .stream()
                    .map(x -> {
                        for (var item : ingredientsBlacklist) {
                            x = x.replace(item, "");
                        }

                        return x;
                    })
                    .collect(Collectors.toList()));
            }
            if (matchingProductData.get().getProductCharacteristics() != null) {
                responseProduct.setHealthScore(matchingProductData.get().getProductCharacteristics().getHealthScore());
            }
            var matchingNutrition = matchingProductData.get().getCalcNutrition();
            if (matchingNutrition != null) {
                var nutrition = new SearchForProductsResponseProduct.Nutrition();
                nutrition.setPer100gHeader(matchingNutrition.getPer100Header());
                nutrition.setPerServingHeader(matchingNutrition.getPerServingHeader());
                nutrition.setNutrients(matchingNutrition.getCalcNutrients()
                    .stream()
                    .map(x -> {
                        var nutrient = new SearchForProductsResponseProduct.Nutrition.Nutrient();
                        nutrient.setValuePer100g(x.getValuePer100());
                        nutrient.setValuePerServing(x.getValuePerServing());
                        nutrient.setName(x.getName());
                        return nutrient;
                    })
                    .collect(Collectors.toList()));

                responseProduct.setNutrition(nutrition);
            }
            var matchingGda = matchingProductData.get().getGda();
            if (matchingGda != null && matchingGda.getGdaRefs() != null && matchingGda.getGdaRefs().size() > 0) {
                var matchingGdaRef = matchingGda.getGdaRefs().get(0);

                var gda = new SearchForProductsResponseProduct.GuidelineDailyAmounts();
                gda.setHeaders(matchingGdaRef.getHeaders());
                gda.setFooters(matchingGdaRef.getFooters());
                gda.setAmounts(matchingGdaRef.getValues()
                    .stream()
                    .map(x -> {
                        var amount = new SearchForProductsResponseProduct.GuidelineDailyAmounts.GdaAmount();
                        amount.setName(x.getName());
                        amount.setPercent(x.getPercent());
                        amount.setRating(mapGdaRating(x.getRating()));
                        amount.setValues(x.getValues());

                        return amount;
                    })
                    .collect(Collectors.toList()));

                responseProduct.setGuidelineDailyAmounts(gda);
            }
            if (responseProduct.getIngredients() == null || responseProduct.getGuidelineDailyAmounts() == null) {
                this.missingProductDataService.populate(responseProduct);
            }

            responseProducts.add(responseProduct);
        }

        return Result.from(responseProducts);
    }

    private GdaRating mapGdaRating(final String rating) {
        if ("low".equals(rating))
            return GdaRating.LOW;

        if ("medium".equals(rating))
            return GdaRating.MEDIUM;

        if ("high".equals(rating))
            return GdaRating.HIGH;

        return null;
    }
}
