package com.wjbaker.gocart_api.tesco;

import com.wjbaker.gocart_api.tesco.mapper.SearchProductsMapper;
import com.wjbaker.gocart_api.tesco.type.GrocerySearchResponse;
import com.wjbaker.gocart_api.tesco.type.SearchProduct;
import com.wjbaker.gocart_api.tesco.type.TescoProduct;
import com.wjbaker.gocart_api.tesco.type.TescoShop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TescoService {

    private final TescoApiClient tescoApiClient;

    @Autowired
    public TescoService(final TescoApiClient tescoApiClient) {
        this.tescoApiClient = tescoApiClient;
    }

    public List<SearchProduct> searchProducts(final String searchTerm) {
        Optional<GrocerySearchResponse> response =
                Optional.ofNullable(this.tescoApiClient.grocerySearch(searchTerm).getBody());

        if (response.isEmpty())
            return null;

        List<TescoProduct> productData = this.productDataList(response.get()
                .getUk()
                .getGhs()
                .getProducts()
                .getResults()
                .stream()
                .map(GrocerySearchResponse.UK.GHS.Products.Result::getId)
                .collect(Collectors.toList()));

        return response.map(res -> res.getUk().getGhs().getProducts().getResults()
                .stream()
                .map(r -> SearchProductsMapper.map(
                        r,
                        productData.stream()
                                .filter(p -> p.getId().equals(r.getId()))
                                .findFirst()
                                .orElse(null)))
                .collect(Collectors.toList()))
                .orElse(new ArrayList<>());
    }

    public List<TescoShop> nearbyShops(final String searchTerm) {
        var response = Optional.ofNullable(this.tescoApiClient.storeLocation(searchTerm).getBody());

        return response.orElse(null);
    }

    public TescoProduct productData(final String productId) {
        var productIdAsList = Collections.singletonList(productId);

        var response = Optional.ofNullable(this.tescoApiClient.productData(productIdAsList).getBody());

        return response
                .map(products -> products.get(0))
                .orElse(null);
    }

    public List<TescoProduct> productDataList(final List<String> productIds) {
        var response = Optional.ofNullable(this.tescoApiClient.productData(productIds).getBody());

        return response.orElse(null);
    }
}
