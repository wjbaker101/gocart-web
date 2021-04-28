package com.wjbaker.gocart_api.api.auth;

import com.wjbaker.gocart_api.api.auth.type.*;
import com.wjbaker.gocart_api.data.entity.UserEntity;
import com.wjbaker.gocart_api.exception.ApiException;
import com.wjbaker.gocart_api.type.ApiResultResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public final class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(final AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ApiResultResponse<LoginResponse> login(@RequestBody final LoginRequest request) throws ApiException {
        var loginResponse = this.authService.login(request);

        return ApiResultResponse.of(loginResponse);
    }

    @RequireUser
    @PostMapping("/logout")
    public void logout() {
        this.authService.logout();
    }

    @PostMapping("/user")
    public ApiResultResponse<CreateUserResponse> createUser(
        @RequestBody final CreateUserRequest request) throws ApiException {

        var user = this.authService.createUser(request);

        return ApiResultResponse.ofCreated(user);
    }

    @RequireUser
    @PutMapping("/user")
    public ApiResultResponse<Boolean> updateUser(
        @AuthenticationPrincipal final UserEntity user,
        @RequestBody final UpdateUserRequest request) throws ApiException {

        this.authService.updateUser(user, request);

        return ApiResultResponse.of(true);
    }

    @RequireUser
    @DeleteMapping("/user")
    public ApiResultResponse<Boolean> deleteUser(@AuthenticationPrincipal final UserEntity user) throws ApiException {
        this.authService.deleteUser(user);

        return ApiResultResponse.of(true);
    }
}
