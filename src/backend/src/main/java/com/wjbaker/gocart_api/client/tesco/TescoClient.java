package com.wjbaker.gocart_api.client.tesco;

import com.wjbaker.gocart_api.client.tesco.types.GetProductDataResponse;
import com.wjbaker.gocart_api.client.tesco.types.GrocerySearchResponse;
import com.wjbaker.gocart_api.client.tesco.types.ShopSearchResponse;
import com.wjbaker.gocart_api.type.Client;
import com.wjbaker.gocart_api.type.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Client
public final class TescoClient {

    private final RestTemplate restTemplate;

    public TescoClient(
        final RestTemplateBuilder restTemplateBuilder,
        @Value("${tesco-api.base-url}") final String baseUrl,
        @Value("${tesco-api.auth.key}") final String authKey,
        @Value("${tesco-api.auth.value}") final String authValue) {

        this.restTemplate = restTemplateBuilder
            .rootUri(baseUrl)
            .defaultHeader(authKey, authValue)
            .build();
    }

    public Result<GrocerySearchResponse> grocerySearch(final String searchTerm, final int offset) {
        final var limit = 10;

        var response = this.restTemplate.getForEntity(
            "/grocery/products?query={}&limit={}&offset={}",
            GrocerySearchResponse.class,
            searchTerm,
            limit,
            offset);

        if (response.getStatusCode() != HttpStatus.OK)
            return Result.error("Received a non-OK response from the Tesco Api during grocerySearch.");

        return Result.from(response.getBody());
    }

    public Result<ShopSearchResponse> shopSearch(final String searchTerm) {
        final var limit = 10;

        var response = this.restTemplate.getForEntity(
            "/locations/search?sort=near:\"{}, UK\"&limit={}&offset={}",
            ShopSearchResponse.class,
            searchTerm,
            limit,
            0);

        if (response.getStatusCode() != HttpStatus.OK)
            return Result.error("Received a non-OK response from the Tesco Api during shopSearch.");

        return Result.from(response.getBody());
    }

    public Result<GetProductDataResponse> getProductData(final List<String> tpncList) {
        var joinedTpncList = tpncList.stream()
            .map(id -> "tpnc=" + id)
            .collect(Collectors.joining("&"));

        var response = this.restTemplate.getForEntity("/product/?{}", GetProductDataResponse.class, joinedTpncList);

        if (response.getStatusCode() != HttpStatus.OK)
            return Result.error("Received a non-OK response from the Tesco Api during getProductData.");

        return Result.from(response.getBody());
    }
}
