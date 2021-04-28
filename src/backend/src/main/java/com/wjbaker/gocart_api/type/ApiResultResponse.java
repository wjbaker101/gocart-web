package com.wjbaker.gocart_api.type;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public final class ApiResultResponse<T> extends ResponseEntity<ApiResultResponse.ApiResult<T>> {

    private ApiResultResponse(final ApiResult<T> body, final HttpStatus status) {
        super(body, status);
    }

    protected static final class ApiResult<T> extends ApiResponseType {

        @Getter
        private final T result;

        public ApiResult(final T result) {
            super();
            this.result = result;
        }
    }

    public static <T> ApiResultResponse<T> of(final T result) {
        return new ApiResultResponse<>(new ApiResult<>(result), HttpStatus.OK);
    }

    public static <T> ApiResultResponse<T> ofCreated(final T result) {
        return new ApiResultResponse<>(new ApiResult<>(result), HttpStatus.CREATED);
    }
}
