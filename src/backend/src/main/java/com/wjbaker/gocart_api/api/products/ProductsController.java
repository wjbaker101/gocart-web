package com.wjbaker.gocart_api.api.products;

import com.wjbaker.gocart_api.type.ApiResponse;
import com.wjbaker.gocart_api.api.products.type.GetNearbyShopsResponseShop;
import com.wjbaker.gocart_api.api.products.type.SearchForProductsResponseProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tesco")
public class ProductsController {

    private final ProductsService productsService;

    @Autowired
    public ProductsController(final ProductsService productsService) {
        this.productsService = productsService;
    }

    @GetMapping("/product/search/{searchTerm}/{page}")
    public ApiResponse<List<SearchForProductsResponseProduct>> searchForProducts(
        @PathVariable final String searchTerm,
        @PathVariable final int page) {

        var searchForProductsResult = this.productsService.searchForProducts(searchTerm, page);
        if (searchForProductsResult.isError())
            return ApiResponse.error(searchForProductsResult.getError());

        return ApiResponse.result(searchForProductsResult.value());
    }

    @ExceptionHandler
    public ApiResponse<String> handleErrors(final Exception exception) {
        exception.printStackTrace();

        return ApiResponse.error("Something went wrong.");
    }
}
