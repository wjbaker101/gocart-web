package com.wjbaker.gocart_api.tesco;

import com.wjbaker.gocart_api.config.type.TescoApiConfig;
import com.wjbaker.gocart_api.tesco.mapper.TescoProductMapper;
import com.wjbaker.gocart_api.tesco.mapper.TescoShopMapper;
import com.wjbaker.gocart_api.tesco.type.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TescoApiClient {

    private final RestTemplate restTemplate;

    private final int limit;
    private final int offset;

    @Autowired
    public TescoApiClient(final RestTemplateBuilder restTemplateBuilder, final TescoApiConfig apiConfig) {
        this.restTemplate = restTemplateBuilder
                .rootUri(apiConfig.getBaseUrl())
                .defaultHeader(apiConfig.getAuthKey(), apiConfig.getAuthValue())
                .build();

        this.limit = 10;
        this.offset = 0;
    }

    public ResponseEntity<GrocerySearchResponse> grocerySearch(final String searchTerm) {
        String url = String.format("/grocery/products?query=%s&limit=%d&offset=%d", searchTerm, this.limit, this.offset);

        return this.restTemplate.getForEntity(url, GrocerySearchResponse.class);
    }

    public ResponseEntity<List<TescoShop>> storeLocation(final String searchTerm) {
        var near = String.format("near:\"%s, UK\"", searchTerm);
        var url = String.format("/locations/search?sort=%s&limit=%d&offset=%d", near, this.limit, this.offset);

        var response = this.restTemplate.getForEntity(url, StoreLocationResponse.class);

        return ResponseEntity
                .status(response.getStatusCode())
                .body(TescoShopMapper.map(response.getBody()));
    }

    public ResponseEntity<List<TescoProduct>> productData(final List<String> productIds) {
        var joinedProductIds = productIds
                .stream()
                .map(id -> "tpnc=" + id)
                .collect(Collectors.joining("&"));

        var url = String.format("/product/?%s", joinedProductIds);

        var response = this.restTemplate.getForEntity(url, ProductDataResponse.class);

        return ResponseEntity.status(response.getStatusCode())
                .body(TescoProductMapper.map(response.getBody()));
    }
}
