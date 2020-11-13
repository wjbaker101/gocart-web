package com.wjbaker.gocart_api.api.type;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;

public class ApiResult<T> {

    @Getter
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T result;

    @Getter
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String error;

    @Getter
    private long timestamp;

    public static <T> ApiResult<T> result(final T result) {
        ApiResult<T> apiResult = new ApiResult<>();
        apiResult.result = result;
        apiResult.timestamp = System.currentTimeMillis();

        return apiResult;
    }

    public static <T> ApiResult<T> error(final String error) {
        ApiResult<T> apiResult = new ApiResult<>();
        apiResult.error = error;
        apiResult.timestamp = System.currentTimeMillis();

        return apiResult;
    }
}
