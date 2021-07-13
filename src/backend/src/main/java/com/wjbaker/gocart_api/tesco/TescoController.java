package com.wjbaker.gocart_api.tesco;

import com.wjbaker.gocart_api.api.type.ApiResponse;
import com.wjbaker.gocart_api.tesco.type.GetNearbyShopsResponseShop;
import com.wjbaker.gocart_api.tesco.type.SearchProduct;
import com.wjbaker.gocart_api.tesco.type.TescoProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tesco")
public class TescoController {

    private final TescoService tescoService;

    @Autowired
    public TescoController(final TescoService tescoService) {
        this.tescoService = tescoService;
    }

    @GetMapping("/product/{productId}")
    public ApiResponse<TescoProduct> productData(@PathVariable final String productId) {
        var product = this.tescoService.productData(productId);

        return ApiResponse.result(product);
    }

    @GetMapping("/product/search/{searchTerm}/{page}")
    public ApiResponse<List<SearchProduct>> searchProducts(
        @PathVariable final String searchTerm,
        @PathVariable final int page) {

        var products = this.tescoService.searchProducts(searchTerm, page);

        return ApiResponse.result(products);
    }

    @GetMapping("/shop/search/{searchTerm}")
    public ApiResponse<List<GetNearbyShopsResponseShop>> getNearbyShops(@PathVariable final String searchTerm) {
        var getNearbyShopsResult = this.tescoService.getNearbyShops(searchTerm);
        if (getNearbyShopsResult.isError())
            return ApiResponse.error(getNearbyShopsResult.getError());

        return ApiResponse.result(getNearbyShopsResult.value());
    }

    @ExceptionHandler
    public ApiResponse<String> handleErrors(final Exception exception) {
        exception.printStackTrace();

        return ApiResponse.error("Something went wrong.");
    }
}
