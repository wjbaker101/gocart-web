package com.wjbaker.gocart_api.api.products;

import com.wjbaker.gocart_api.client.open_food_facts.OpenFoodFactsClient;
import com.wjbaker.gocart_api.client.open_food_facts.types.GetProductResponse;
import com.wjbaker.gocart_api.api.products.type.GdaRating;
import com.wjbaker.gocart_api.api.products.type.SearchForProductsResponseProduct;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;

@Service
public final class MissingProductDataService {

    private final OpenFoodFactsClient openFoodFacts;

    public MissingProductDataService(final OpenFoodFactsClient openFoodFacts) {
        this.openFoodFacts = openFoodFacts;
    }

    public void populate(final SearchForProductsResponseProduct product) {
        var extraProductResult = this.openFoodFacts.getProduct(product.getBarcodeId());
        if (extraProductResult.isError())
            return;

        var extraProduct = extraProductResult.value();
        if (extraProduct.getProduct() == null)
            return;

        if (product.getIngredients() == null)
            this.populateIngredients(product, extraProduct);

        if (product.getGuidelineDailyAmounts() == null)
            this.populateGda(product, extraProduct);
    }

    private void populateIngredients(final SearchForProductsResponseProduct product, final GetProductResponse extraProduct) {
        product.setIngredients(Collections.singletonList(extraProduct.getProduct().getIngredients()));
    }

    private void populateGda(final SearchForProductsResponseProduct product, final GetProductResponse extraProduct) {
        var nutrientLevels = extraProduct.getProduct().getNutrientLevels();
        if (nutrientLevels == null)
            return;

        var allNotPresent = nutrientLevels.getFat() == null
            && nutrientLevels.getSaturatedFat() == null
            && nutrientLevels.getSugars() == null
            && nutrientLevels.getSalt() == null;
        if (allNotPresent)
            return;

        var amountEnergy = new SearchForProductsResponseProduct.GuidelineDailyAmounts.GdaAmount();
        amountEnergy.setName("Energy");
        amountEnergy.setRating(null);

        var amountFat = new SearchForProductsResponseProduct.GuidelineDailyAmounts.GdaAmount();
        amountFat.setName("Fat");
        amountFat.setRating(mapRating(nutrientLevels.getFat()));

        var amountSaturatedFat = new SearchForProductsResponseProduct.GuidelineDailyAmounts.GdaAmount();
        amountSaturatedFat.setName("Saturates");
        amountSaturatedFat.setRating(mapRating(nutrientLevels.getSaturatedFat()));

        var amountSugars = new SearchForProductsResponseProduct.GuidelineDailyAmounts.GdaAmount();
        amountSugars.setName("Sugars");
        amountSugars.setRating(mapRating(nutrientLevels.getSugars()));

        var amountSalt = new SearchForProductsResponseProduct.GuidelineDailyAmounts.GdaAmount();
        amountSalt.setName("Salt");
        amountSalt.setRating(mapRating(nutrientLevels.getSalt()));

        var gda = new SearchForProductsResponseProduct.GuidelineDailyAmounts();
        gda.setAmounts(Arrays.asList(amountEnergy, amountFat, amountSaturatedFat, amountSugars, amountSalt));

        product.setGuidelineDailyAmounts(gda);
    }

    private GdaRating mapRating(final String rating) {
        if ("high".equals(rating))
            return GdaRating.HIGH;

        if ("moderate".equals(rating))
            return GdaRating.MEDIUM;

        if ("low".equals(rating))
            return GdaRating.LOW;

        return null;
    }
}
