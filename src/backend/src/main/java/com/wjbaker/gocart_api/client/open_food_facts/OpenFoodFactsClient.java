package com.wjbaker.gocart_api.client.open_food_facts;

import com.wjbaker.gocart_api.client.open_food_facts.types.GetProductResponse;
import com.wjbaker.gocart_api.type.Result;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public final class OpenFoodFactsClient {

    private final RestTemplate openFoodFactsApi;

    public OpenFoodFactsClient(final RestTemplateBuilder restTemplateBuilder) {
        this.openFoodFactsApi = restTemplateBuilder
            .rootUri("https://en.openfoodfacts.org/api/v0")
            .build();
    }

    public Result<GetProductResponse> getProduct(String barcodeId) {
        var response = this.openFoodFactsApi.getForEntity("/product/{barcodeId}", GetProductResponse.class, barcodeId);

        if (response.getStatusCode() != HttpStatus.OK)
            return Result.error("Received a non-OK response from the OpenFoodFacts Api during getProduct.");

        return Result.from(response.getBody());
    }
}
