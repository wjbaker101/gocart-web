package com.wjbaker.gocart_api.api.auth;

import com.wjbaker.gocart_api.api.auth.type.*;
import com.wjbaker.gocart_api.exception.ApiException;
import com.wjbaker.gocart_api.type.ApiResultResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

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

    @PutMapping("/user/{reference}")
    public ApiResultResponse<Boolean> updateUser(
        @PathVariable final UUID reference,
        @RequestBody final UpdateUserRequest request) throws ApiException {

        this.authService.updateUser(reference, request);

        return ApiResultResponse.of(true);
    }

    @DeleteMapping("/user/{reference}")
    public ApiResultResponse<Boolean> deleteUser(@PathVariable final UUID reference) throws ApiException {
        this.authService.deleteUser(reference);

        return ApiResultResponse.of(true);
    }
}
