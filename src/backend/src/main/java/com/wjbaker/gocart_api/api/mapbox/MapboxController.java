package com.wjbaker.gocart_api.api.mapbox;

import com.wjbaker.gocart_api.type.ApiResultResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/maps")
public class MapboxController {

    private final MapboxService mapboxService;

    @Autowired
    public MapboxController(final MapboxService mapboxService) {
        this.mapboxService = mapboxService;
    }

    @GetMapping("/static/{longitude}/{latitude}")
    public ApiResultResponse<String> getStaticLocationMap(
            @PathVariable final double longitude,
            @PathVariable final double latitude) {

        var mapAsBase64 = this.mapboxService.getStaticMapAsBase64(longitude, latitude);

        return ApiResultResponse.of(mapAsBase64);
    }
}
