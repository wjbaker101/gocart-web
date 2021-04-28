package com.wjbaker.gocart_api.api.tesco;

import com.wjbaker.gocart_api.api.tesco.type.SearchProduct;
import com.wjbaker.gocart_api.api.tesco.type.TescoProduct;
import com.wjbaker.gocart_api.api.tesco.type.TescoShop;
import com.wjbaker.gocart_api.type.ApiErrorResponse;
import com.wjbaker.gocart_api.type.ApiResultResponse;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.apache.logging.log4j.LogManager.getLogger;

@RestController
@RequestMapping("/api/tesco")
public class TescoController {

    private final Logger logger = getLogger(TescoController.class);

    private final TescoService tescoService;

    @Autowired
    public TescoController(final TescoService tescoService) {
        this.tescoService = tescoService;
    }

    @GetMapping("/product/{productId}")
    public ApiResultResponse<TescoProduct> productData(@PathVariable final String productId) {
        var product = this.tescoService.productData(productId);

        return ApiResultResponse.of(product);
    }

    @GetMapping("/product/search/{searchTerm}")
    public ApiResultResponse<List<SearchProduct>> searchProducts(@PathVariable final String searchTerm) {
        var products = this.tescoService.searchProducts(searchTerm);

        return ApiResultResponse.of(products);
    }

    @GetMapping("/shop/search/{searchTerm}")
    public ApiResultResponse<List<TescoShop>> nearbyShops(@PathVariable final String searchTerm) {
        var nearbyShops = this.tescoService.nearbyShops(searchTerm);

        return ApiResultResponse.of(nearbyShops);
    }

    @ExceptionHandler
    public ApiErrorResponse handleErrors(final Exception exception) {
        exception.printStackTrace();

        return ApiErrorResponse.of("Something went wrong.");
    }
}
