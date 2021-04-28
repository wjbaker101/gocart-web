package com.wjbaker.gocart_api.exception;

public final class ApiBadRequestException extends ApiException {

    public ApiBadRequestException(final String error) {
        super(error);
    }
}
