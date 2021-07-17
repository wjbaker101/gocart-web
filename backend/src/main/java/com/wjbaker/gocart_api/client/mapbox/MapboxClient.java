package com.wjbaker.gocart_api.client.mapbox;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class MapboxClient {

    private final RestTemplate restTemplate;

    private final String accessToken;

    @Autowired
    public MapboxClient(
        final RestTemplateBuilder restTemplateBuilder,
        @Value("${mapbox-api.base-url}") final String baseUrl,
        @Value("${mapbox-api.access-token}") final String accessToken) {

        this.restTemplate = restTemplateBuilder
            .rootUri(baseUrl)
            .build();

        this.accessToken = accessToken;
    }

    public String staticMap(
            final double longitude,
            final double latitude,
            final float zoomLevel,
            final int width,
            final int height) {

        final var markerColour = "176bc0";
        var marker = String.format("pin-s+%s(%f,%f)", markerColour, longitude, latitude);

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
