package com.wjbaker.gocart_api.api.map;

import com.wjbaker.gocart_api.client.mapbox.MapboxClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MapService {

    private final MapboxClient mapboxClient;

    @Autowired
    public MapService(final MapboxClient mapboxClient) {
        this.mapboxClient = mapboxClient;
    }

    public String getStaticMapAsBase64(final double longitude, final double latitude) {
        return this.mapboxClient.staticMap(longitude, latitude, 14, 350, 350);
    }
}
