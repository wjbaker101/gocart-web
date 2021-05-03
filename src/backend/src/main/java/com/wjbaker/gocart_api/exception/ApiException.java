package com.wjbaker.gocart_api.exception;

import lombok.Getter;

public abstract class ApiException extends Exception {

    @Getter
    private final String error;

    public ApiException(final String error) {
        this.error = error;
    }
}
