package com.wjbaker.gocart_api.tesco.mapper;

import com.wjbaker.gocart_api.tesco.type.StoreLocationResponse;
import com.wjbaker.gocart_api.tesco.type.TescoShop;

import java.util.Optional;
import java.util.stream.Collectors;

public abstract class TescoShopMapper {

    private TescoShopMapper() {}

    public static TescoShop map(final StoreLocationResponse.Result result) {
        if (result == null)
            return null;

        return TescoShop.builder()
                .name(result.getLocation().getName())
                .facilities(Optional.ofNullable(result.getLocation())
                        .map(StoreLocationResponse.Result.Location::getFacilities)
                        .map(facilities -> facilities.stream()
                                .map(TescoShopMapper::mapFacility)
                                .collect(Collectors.toList()))
                        .orElse(null))
                .openingHour(mapOpeningHours(Optional.ofNullable(result.getLocation())
                        .map(StoreLocationResponse.Result.Location::getOpeningHours)
                        .map(openingHours -> openingHours.get(0))
                        .map(StoreLocationResponse.Result.Location.OpeningHour::getStandardOpeningHours)
                .orElse(null)))
                .distance(mapDistance(result.getDistanceFrom()))
                .location(mapLocation(result.getLocation().getGeo()))
                .build();
    }

    private static String mapFacility(final StoreLocationResponse.Result.Location.Facility facility) {
        if (facility == null)
            return null;

        return facility.getDescription();
    }

    private static TescoShop.OpeningHour mapOpeningHours(
            final StoreLocationResponse.Result.Location.OpeningHour.StandardOpeningHours openingHour) {

        if (openingHour == null)
            return null;

        return TescoShop.OpeningHour.builder()
                .mo(mapHours(openingHour.getMo()))
                .tu(mapHours(openingHour.getTu()))
                .we(mapHours(openingHour.getWe()))
                .th(mapHours(openingHour.getTh()))
                .fr(mapHours(openingHour.getFr()))
                .sa(mapHours(openingHour.getSa()))
                .su(mapHours(openingHour.getSu()))
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
        return TescoShop.Location.builder()
                .longitude(geo.getCoordinates().getLongitude())
                .latitude(geo.getCoordinates().getLatitude())
                .build();
    }
}
