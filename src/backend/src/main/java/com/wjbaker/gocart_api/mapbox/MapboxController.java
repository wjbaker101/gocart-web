package com.wjbaker.gocart_api.mapbox;

import com.wjbaker.gocart_api.type.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/maps")
public class MapboxController {

    private final MapboxService mapboxService;

    @Autowired
    public MapboxController(final MapboxService mapboxService) {
        this.mapboxService = mapboxService;
    }

    @GetMapping("/static/{longitude}/{latitude}")
    public ApiResponse<String> getStaticLocationMap(
            @PathVariable final double longitude,
            @PathVariable final double latitude) {

        var mapAsBase64 = this.mapboxService.getStaticMapAsBase64(longitude, latitude);

        return ApiResponse.result(mapAsBase64);
    }

    @ExceptionHandler
    public ApiResponse<String> handleErrors(final Exception exception) {
        return ApiResponse.error("Something went wrong.");
    }
}
