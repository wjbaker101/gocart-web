package com.wjbaker.gocart_api.type;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ApiResponse<T> extends ResponseEntity<ApiResult<T>> {

    private ApiResponse(final ApiResult<T> response, final HttpStatus status) {
        super(response, status);
    }

    public static <T> ApiResponse<T> result(final T result) {
        return result(result, HttpStatus.OK);
    }

    public static <T> ApiResponse<T> result(final T result, final HttpStatus httpStatus) {
        return new ApiResponse<>(ApiResult.result(result), httpStatus);
    }

    public static <T> ApiResponse<T> error(final String error) {
        return error(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public static <T> ApiResponse<T> error(final String error, final HttpStatus httpStatus) {
        return new ApiResponse<>(ApiResult.error(error), httpStatus);
    }
}
