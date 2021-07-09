package com.wjbaker.gocart_api.tesco;

import com.wjbaker.gocart_api.tesco.mapper.SearchProductsMapper;
import com.wjbaker.gocart_api.tesco.type.SearchProduct;
import com.wjbaker.gocart_api.tesco.type.TescoProduct;
import com.wjbaker.gocart_api.tesco.type.TescoShop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TescoService {

    private final TescoApiClient tescoApiClient;
    private final MissingProductDataService missingProductDataService;

    @Autowired
    public TescoService(
        final TescoApiClient tescoApiClient,
        final MissingProductDataService missingProductDataService) {

        this.tescoApiClient = tescoApiClient;
        this.missingProductDataService = missingProductDataService;
    }

    public List<SearchProduct> searchProducts(final String searchTerm, final int page) {
        var response = Optional.ofNullable(this.tescoApiClient.grocerySearch(searchTerm, page - 1).getBody());

        if (response.isEmpty())
            return null;

        var productData = this.productDataList(response.get()
                .stream()
                .map(SearchProduct::getId)
                .collect(Collectors.toList()));

        return response.map(res -> res
                .stream()
                .map(product -> SearchProductsMapper.mapWithProduct(product, productData
                        .stream()
                        .filter(p -> product.getId().equals(p.getId()))
                        .findFirst()
                        .orElse(null)))
                .collect(Collectors.toList()))
                .orElse(Collections.emptyList());
    }

    public List<TescoShop> nearbyShops(final String searchTerm) {
        var response = Optional.ofNullable(this.tescoApiClient.storeLocation(searchTerm).getBody());

        return response.orElse(null);
    }

    public TescoProduct productData(final String productId) {
        var productData = this.productDataList(Collections.singletonList(productId));
        if (productData == null)
            return null;

        return productData.get(0);
    }

    public List<TescoProduct> productDataList(final List<String> productIds) {
        var response = this.tescoApiClient.productData(productIds).getBody();
        if (response == null)
            return null;

        for (var product : response) {
            if (product.getIngredients() != null && product.getGuidelineDailyAmounts() != null)
                continue;

            this.missingProductDataService.populate(product);
        }

        return response;
    }
}
