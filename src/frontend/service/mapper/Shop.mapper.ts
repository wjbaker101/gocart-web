import {
    TescoShop,
    TescoShopDistance,
    TescoShopLocation,
    TescoShopOpeningHour,
    TescoShopOpeningHourHours
} from '@/api/tesco/type/TescoShop';

import {
    Shop,
    ShopDistance,
    ShopLocation,
    ShopOpeningHour,
    ShopOpeningHourHours
} from '@/model/Shop.model';

const mapDistance = (distance: TescoShopDistance): ShopDistance => {
    return {
        unit: distance.unit,
        value: distance.value,
    }
};

const mapOpeningHourHours = (openingHourHours: TescoShopOpeningHourHours): ShopOpeningHourHours => {
    return {
        isOpen: openingHourHours.isOpen,
        open: openingHourHours.open,
        close: openingHourHours.close,
    }
};

const mapOpeningHour = (openingHour: TescoShopOpeningHour | null): ShopOpeningHour | null => {
    if (openingHour === null)
        return null;

    return {
        mo: mapOpeningHourHours(openingHour.mo),
        tu: mapOpeningHourHours(openingHour.tu),
        we: mapOpeningHourHours(openingHour.we),
        th: mapOpeningHourHours(openingHour.th),
        fr: mapOpeningHourHours(openingHour.fr),
        sa: mapOpeningHourHours(openingHour.sa),
        su: mapOpeningHourHours(openingHour.su),
    }
};

const mapLocation = (location: TescoShopLocation): ShopLocation => {
    return {
        longitude: location.longitude,
        latitude: location.latitude,
    }
};

export const TescoShopMapper = {

    map(shop: TescoShop): Shop {
        return {
            name: shop.name,
            facilities: shop.facilities,
            distance: mapDistance(shop.distance),
            openingHour: mapOpeningHour(shop.openingHour),
            location: mapLocation(shop.location),
        }
    },
}
