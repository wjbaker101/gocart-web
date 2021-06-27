package com.wjbaker.gocart_api.mapbox;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MapboxService {

    private final MapboxApiClient mapboxApiClient;

    @Autowired
    public MapboxService(final MapboxApiClient mapboxApiClient) {
        this.mapboxApiClient = mapboxApiClient;
    }

    public String getStaticMapAsBase64(final double longitude, final double latitude) {
        return this.mapboxApiClient.staticMap(longitude, latitude, 14, 350, 350);
    }
}
