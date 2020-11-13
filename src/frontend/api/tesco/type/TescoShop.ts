export interface TescoShopOpeningHourHours {
    isOpen: boolean,
    open: string,
    close: string,
}

export interface TescoShopOpeningHour {
    mo: TescoShopOpeningHourHours,
    tu: TescoShopOpeningHourHours,
    we: TescoShopOpeningHourHours,
    th: TescoShopOpeningHourHours,
    fr: TescoShopOpeningHourHours,
    sa: TescoShopOpeningHourHours,
    su: TescoShopOpeningHourHours,
}

export interface TescoShopDistance {
    unit: string,
    value: number,
}

export interface TescoShopLocation {
    longitude: number,
    latitude: number,
}

export interface TescoShop {
    name: string,
    distance: TescoShopDistance,
    facilities: string[],
    openingHour: TescoShopOpeningHour,
    location: TescoShopLocation,
}
