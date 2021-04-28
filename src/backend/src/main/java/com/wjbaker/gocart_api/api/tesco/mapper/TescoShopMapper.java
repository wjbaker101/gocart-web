package com.wjbaker.gocart_api.api.tesco.mapper;

import com.wjbaker.gocart_api.api.tesco.type.StoreLocationResponse;
import com.wjbaker.gocart_api.api.tesco.type.TescoShop;

import java.util.List;
import java.util.stream.Collectors;

public abstract class TescoShopMapper {

    private TescoShopMapper() {}

    public static List<TescoShop> map(final StoreLocationResponse response) {
        if (response == null)
            return null;

        if (response.getResults() == null)
            return null;

        return response.getResults()
                .stream()
                .map(TescoShopMapper::mapTescoShop)
                .collect(Collectors.toList());
    }

    private static TescoShop mapTescoShop(final StoreLocationResponse.Result result) {
        return TescoShop.builder()
                .name(mapName(result.getLocation()))
                .facilities(mapFacilities(result.getLocation()))
                .openingHour(mapOpeningHours(result.getLocation()))
                .distance(mapDistance(result.getDistanceFrom()))
                .location(mapLocation(result.getLocation().getGeo()))
                .build();
    }

    private static String mapName(final StoreLocationResponse.Result.Location location) {
        if (location == null)
            return null;

        return location.getName();
    }

    private static List<String> mapFacilities(final StoreLocationResponse.Result.Location location) {
        if (location == null)
            return null;

        if (location.getFacilities() == null)
            return null;

        return location.getFacilities()
                .stream()
                .map(TescoShopMapper::mapFacility)
                .collect(Collectors.toList());
    }

    private static String mapFacility(final StoreLocationResponse.Result.Location.Facility facility) {
        if (facility == null)
            return null;

        return facility.getDescription();
    }

    private static TescoShop.OpeningHour mapOpeningHours(final StoreLocationResponse.Result.Location location) {
        if (location == null)
            return null;

        if (location.getOpeningHours() == null)
            return null;

        if (location.getOpeningHours().get(0) == null)
            return null;

        var openingHours = location.getOpeningHours().get(0).getStandardOpeningHours();

        if (openingHours == null)
            return null;

        return TescoShop.OpeningHour.builder()
                .mo(mapHours(openingHours.getMo()))
                .tu(mapHours(openingHours.getTu()))
                .we(mapHours(openingHours.getWe()))
                .th(mapHours(openingHours.getTh()))
                .fr(mapHours(openingHours.getFr()))
                .sa(mapHours(openingHours.getSa()))
                .su(mapHours(openingHours.getSu()))
                .build();
    }

    private static TescoShop.OpeningHour.Hours mapHours(
            final StoreLocationResponse.Result.Location.OpeningHour.Hours hours) {

        if (hours == null)
            return null;

        return TescoShop.OpeningHour.Hours.builder()
                .isOpen(hours.getIsOpen())
                .open(hours.getOpen())
                .close(hours.getClose())
                .build();
    }

    private static TescoShop.Distance mapDistance(final StoreLocationResponse.Result.DistanceFrom distanceFrom) {
        if (distanceFrom == null)
            return null;

        return TescoShop.Distance.builder()
                .value(distanceFrom.getValue())
                .unit(distanceFrom.getUnit())
                .build();
    }

    private static TescoShop.Location mapLocation(final StoreLocationResponse.Result.Location.Geo geo) {
        if (geo.getCoordinates() == null)
            return null;

        return TescoShop.Location.builder()
                .longitude(geo.getCoordinates().getLongitude())
                .latitude(geo.getCoordinates().getLatitude())
                .build();
    }
}
