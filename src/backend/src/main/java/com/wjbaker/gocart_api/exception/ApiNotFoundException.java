package com.wjbaker.gocart_api.exception;

public final class ApiNotFoundException extends ApiException {

    public ApiNotFoundException(final String resource) {
        super("The " + resource + " could not be found. Try refreshing the page and trying again.");
    }
}
