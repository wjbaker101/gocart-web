package com.wjbaker.gocart_api.type;

import lombok.Getter;

import java.time.OffsetDateTime;

public abstract class ApiResponseType {

    @Getter
    private final OffsetDateTime responseAt;

    protected ApiResponseType() {
        this.responseAt = OffsetDateTime.now();
    }
}
