package com.wjbaker.gocart_api.exception;

public final class ApiNotAuthorisedException extends ApiException {

    public ApiNotAuthorisedException() {
        super("You are not authorised for the given request.");
    }
}
