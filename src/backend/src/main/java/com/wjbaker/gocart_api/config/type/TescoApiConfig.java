package com.wjbaker.gocart_api.config.type;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
public class TescoApiConfig {

    @Getter
    private final String baseUrl;

    @Getter
    private final String authKey;

    @Getter
    private final String authValue;
}
