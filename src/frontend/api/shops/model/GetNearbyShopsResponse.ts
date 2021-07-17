export interface GetNearbyShopsResponse extends Array<NearbyShop> {}

export interface NearbyShop {
    name: string,
    distance: NearbyShopDistance,
    facilities: string[],
    openingHour: NearbyShopOpeningHour,
    location: NearbyShopLocation,
}

export interface NearbyShopDistance {
    unit: string,
    value: number,
}

export interface NearbyShopOpeningHour {
    mo: NearbyShopOpeningHourHours,
    tu: NearbyShopOpeningHourHours,
    we: NearbyShopOpeningHourHours,
    th: NearbyShopOpeningHourHours,
    fr: NearbyShopOpeningHourHours,
    sa: NearbyShopOpeningHourHours,
    su: NearbyShopOpeningHourHours,
}

export interface NearbyShopOpeningHourHours {
    isOpen: boolean,
    open: string,
    close: string,
}

export interface NearbyShopLocation {
    longitude: number,
    latitude: number,
}
