package com.wjbaker.gocart_api.config.type;

import lombok.Builder;
import lombok.Getter;

@Builder
public class MapboxApiConfig {

    @Getter
    private final String baseUrl;

    @Getter
    private final String accessToken;
}
