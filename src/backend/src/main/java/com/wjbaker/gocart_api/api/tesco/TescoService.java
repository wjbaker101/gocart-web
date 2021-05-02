package com.wjbaker.gocart_api.api.tesco;

import com.wjbaker.gocart_api.api.shopping.ProductService;
import com.wjbaker.gocart_api.api.tesco.mapper.SearchProductsMapper;
import com.wjbaker.gocart_api.api.tesco.type.SearchProduct;
import com.wjbaker.gocart_api.api.tesco.type.TescoProduct;
import com.wjbaker.gocart_api.api.tesco.type.TescoShop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TescoService {

    private final TescoApiClient tescoApiClient;
    private final ProductService productService;

    @Autowired
    public TescoService(final TescoApiClient tescoApiClient, final ProductService productService) {
        this.tescoApiClient = tescoApiClient;
        this.productService = productService;
    }

    public List<SearchProduct> searchProducts(final String searchTerm) {
        var response = Optional.ofNullable(this.tescoApiClient.grocerySearch(searchTerm).getBody());

        if (response.isEmpty())
            return null;

        List<TescoProduct> productData = this.productDataList(response.get()
            .stream()
            .map(SearchProduct::getId)
            .collect(Collectors.toList()));

        var products = response.map(res -> res
            .stream()
            .map(product -> SearchProductsMapper.mapWithProduct(product, productData
                .stream()
                .filter(p -> product.getId().equals(p.getId()))
                .findFirst()
                .orElse(null)))
            .collect(Collectors.toList()))
            .orElse(Collections.emptyList());

        for (var product : products) {
            this.productService.saveOrUpdateProduct(product);
        }

        return products;
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
