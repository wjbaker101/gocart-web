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
public class TescoApiConfig {

    private final String baseUrl;
    private final String authKey;
    private final String authValue;

    @Autowired
    public TescoApiConfig(
        @Value("${tesco-api.base-url}") final String baseUrl,
        @Value("${tesco-api.auth.key}") final String authKey,
        @Value("${tesco-api.auth.value}") final String authValue) {

        this.baseUrl = baseUrl;
        this.authKey = authKey;
        this.authValue = authValue;
    }
}
