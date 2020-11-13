package com.wjbaker.gocart_api.config;

import com.wjbaker.gocart_api.config.type.MapboxApiConfig;
import com.wjbaker.gocart_api.config.type.TescoApiConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource({"classpath:secret.properties"})
public class SecretConfig {

    private final TescoApiConfig tescoApiConfig;
    private final MapboxApiConfig mapboxApiConfig;

    @Autowired
    public SecretConfig(
            @Value("${tesco-api.base-url}") final String tescoApiBaseUrl,
            @Value("${tesco-api.auth.key}") final String tescoApiAuthKey,
            @Value("${tesco-api.auth.value}") final String tescoApiAuthValue,

            @Value("${mapbox-api.base-url}") final String mapboxApiBaseUrl,
            @Value("${mapbox-api.access-token}") final String mapboxApiAccessToken) {

        this.tescoApiConfig = TescoApiConfig.builder()
                .baseUrl(tescoApiBaseUrl)
                .authKey(tescoApiAuthKey)
                .authValue(tescoApiAuthValue)
                .build();

        this.mapboxApiConfig = MapboxApiConfig.builder()
                .baseUrl(mapboxApiBaseUrl)
                .accessToken(mapboxApiAccessToken)
                .build();
    }

    @Bean
    public TescoApiConfig getTescoApiConfig() {
        return this.tescoApiConfig;
    }

    @Bean
    public MapboxApiConfig getMapboxApiConfig() {
        return this.mapboxApiConfig;
    }
}
