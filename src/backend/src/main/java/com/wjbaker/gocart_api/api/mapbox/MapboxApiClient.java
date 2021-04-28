package com.wjbaker.gocart_api.api.mapbox;

import com.wjbaker.gocart_api.config.type.MapboxApiConfig;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class MapboxApiClient {

    private final RestTemplate restTemplate;

    private final String accessToken;

    @Autowired
    public MapboxApiClient(final RestTemplateBuilder restTemplateBuilder, final MapboxApiConfig apiConfig) {
        this.restTemplate = restTemplateBuilder
                .rootUri(apiConfig.getBaseUrl())
                .build();

        this.accessToken = apiConfig.getAccessToken();
    }

    public String staticMap(
            final double longitude,
            final double latitude,
            final float zoomLevel,
            final int width,
            final int height) {

        var marker = String.format("pin-s+129490(%f,%f)", longitude, latitude);
        var url = String.format("/static/%s/%f,%f,%f,0/%dx%d?access_token=%s&logo=false&attribution=false",
                marker,
                longitude,
                latitude,
                zoomLevel,
                width,
                height,
                this.accessToken);

        var response = this.restTemplate.getForEntity(url, byte[].class);

        return Base64.encodeBase64String(response.getBody());
    }
}
