package com.wjbaker.gocart_api.api.shopping;

import com.wjbaker.gocart_api.api.auth.type.RequireUser;
import com.wjbaker.gocart_api.api.shopping.type.AddProductToUserRequest;
import com.wjbaker.gocart_api.api.shopping.type.GetUserProductsResponse;
import com.wjbaker.gocart_api.api.shopping.type.RemoveProductFromUserRequest;
import com.wjbaker.gocart_api.data.entity.UserEntity;
import com.wjbaker.gocart_api.type.ApiResultResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/shopping")
public final class UserShoppingController {

    private final UserShoppingService userShoppingService;

    @Autowired
    public UserShoppingController(final UserShoppingService userShoppingService) {
        this.userShoppingService = userShoppingService;
    }

    @RequireUser
    @GetMapping("/products")
    public ApiResultResponse<GetUserProductsResponse> getUserProducts(@AuthenticationPrincipal final UserEntity user) {
        var getUserProductsResponse = this.userShoppingService.getUserProducts(user);

        return ApiResultResponse.of(getUserProductsResponse);
    }

    @RequireUser
    @PutMapping("/product")
    public ApiResultResponse<Boolean> addProductToUser(
        @AuthenticationPrincipal final UserEntity user,
        @RequestBody final AddProductToUserRequest request) {

        this.userShoppingService.addProductToUser(user, request);

        return ApiResultResponse.of(true);
    }

    @RequireUser
    @DeleteMapping("/product")
    public ApiResultResponse<Boolean> removeProductFromUser(
        @AuthenticationPrincipal final UserEntity user,
        @RequestBody final RemoveProductFromUserRequest request) {

        this.userShoppingService.removeProductFromUser(user, request);

        return ApiResultResponse.of(true);
    }
}
