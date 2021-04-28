package com.wjbaker.gocart_api.exception;

import lombok.Getter;

public class ApiException extends Throwable {

    @Getter
    private final String error;

    public ApiException(final String error) {
        this.error = error;
    }
}
