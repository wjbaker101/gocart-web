package com.wjbaker.gocart_api.api.shops;

import com.wjbaker.gocart_api.api.shops.type.GetNearbyShopsResponseShop;
import com.wjbaker.gocart_api.type.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tesco")
public class ShopsController {

    private final ShopsService shopsService;

    @Autowired
    public ShopsController(final ShopsService shopsService) {
        this.shopsService = shopsService;
    }

    @GetMapping("/shop/search/{searchTerm}")
    public ApiResponse<List<GetNearbyShopsResponseShop>> getNearbyShops(@PathVariable final String searchTerm) {
        var getNearbyShopsResult = this.shopsService.getNearbyShops(searchTerm);
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
