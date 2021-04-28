package com.wjbaker.gocart_api.type;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public final class ApiErrorResponse extends ResponseEntity<ApiErrorResponse.ApiError> {

    private ApiErrorResponse(final ApiError body, final HttpStatus status) {
        super(body, status);
    }

    protected static final class ApiError extends ApiResponseType {

        @Getter
        private final String error;

        public ApiError(final String error) {
            super();
            this.error = error;
        }
    }

    public static ApiErrorResponse of(final String error) {
        return new ApiErrorResponse(new ApiError(error), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public static ApiErrorResponse ofBadRequest(final String error) {
        return new ApiErrorResponse(new ApiError(error), HttpStatus.BAD_REQUEST);
    }

    public static ApiErrorResponse ofNotAuthorised(final String error) {
        return new ApiErrorResponse(new ApiError(error), HttpStatus.UNAUTHORIZED);
    }
}
