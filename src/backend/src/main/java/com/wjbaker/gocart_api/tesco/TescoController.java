package com.wjbaker.gocart_api.tesco;

import com.wjbaker.gocart_api.type.ApiResponse;
import com.wjbaker.gocart_api.tesco.type.GetNearbyShopsResponseShop;
import com.wjbaker.gocart_api.tesco.type.SearchForProductsResponseProduct;
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

    @GetMapping("/product/search/{searchTerm}/{page}")
    public ApiResponse<List<SearchForProductsResponseProduct>> searchForProducts(
        @PathVariable final String searchTerm,
        @PathVariable final int page) {

        var searchForProductsResult = this.tescoService.searchForProducts(searchTerm, page);
        if (searchForProductsResult.isError())
            return ApiResponse.error(searchForProductsResult.getError());

        return ApiResponse.result(searchForProductsResult.value());
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
