package com.wjbaker.gocart_api.exception;

import com.wjbaker.gocart_api.type.ApiErrorResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public final class ApiExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ApiErrorResponse handleApiException(final ApiException exception) {
        if (exception instanceof ApiBadRequestException)
            return ApiErrorResponse.ofBadRequest(exception.getError());

        if (exception instanceof ApiNotAuthorisedException)
            return ApiErrorResponse.ofNotAuthorised(exception.getError());

        return ApiErrorResponse.of(exception.getError());
    }

    @ExceptionHandler(Exception.class)
    public ApiErrorResponse handleException(final Exception exception) {
        return ApiErrorResponse.of("Sorry, an error occurred on our side. Please try again later or contact support.");
    }
}
