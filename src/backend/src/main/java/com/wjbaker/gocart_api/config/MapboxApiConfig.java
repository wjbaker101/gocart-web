package com.wjbaker.gocart_api.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource({"classpath:secret.properties"})
@Getter
@Setter
public class MapboxApiConfig {

    private final String baseUrl;
    private final String accessToken;

    @Autowired
    public MapboxApiConfig(
        @Value("${mapbox-api.base-url}") final String baseUrl,
        @Value("${mapbox-api.access-token}") final String accessToken) {

        this.baseUrl = baseUrl;
        this.accessToken = accessToken;
    }
}
