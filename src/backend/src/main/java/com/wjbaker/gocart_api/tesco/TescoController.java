package com.wjbaker.gocart_api.tesco;

import com.wjbaker.gocart_api.api.type.ApiResponse;
import com.wjbaker.gocart_api.tesco.type.SearchProduct;
import com.wjbaker.gocart_api.tesco.type.TescoProduct;
import com.wjbaker.gocart_api.tesco.type.TescoShop;
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
    public ApiResponse<TescoProduct> productData(@PathVariable final String productId) {
        var product = this.tescoService.productData(productId);

        return ApiResponse.result(product);
    }

    @GetMapping("/product/search/{searchTerm}")
    public ApiResponse<List<SearchProduct>> searchProducts(@PathVariable final String searchTerm) {
        List<SearchProduct> products = this.tescoService.searchProducts(searchTerm);

        return ApiResponse.result(products);
    }

    @GetMapping("/shop/search/{searchTerm}")
    public ApiResponse<List<TescoShop>> nearbyShops(@PathVariable final String searchTerm) {
        var nearbyShops = this.tescoService.nearbyShops(searchTerm);

        return ApiResponse.result(nearbyShops);
    }

    @ExceptionHandler
    public ApiResponse<String> handleErrors(final Exception exception) {
        exception.printStackTrace();

        return ApiResponse.error("Something went wrong.");
    }
}
