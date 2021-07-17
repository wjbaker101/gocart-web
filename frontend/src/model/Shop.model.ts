export interface ShopOpeningHourHours {
    isOpen: boolean;
    open: string;
    close: string;
}

export interface ShopOpeningHour {
    mo: ShopOpeningHourHours;
    tu: ShopOpeningHourHours;
    we: ShopOpeningHourHours;
    th: ShopOpeningHourHours;
    fr: ShopOpeningHourHours;
    sa: ShopOpeningHourHours;
    su: ShopOpeningHourHours;
}

export interface ShopDistance {
    unit: string;
    value: number;
}

export interface ShopLocation {
    longitude: number;
    latitude: number;
    mapImage?: string;
}

export interface Shop {
    name: string;
    distance: ShopDistance;
    facilities: string[];
    openingHour: ShopOpeningHour | null;
    location: ShopLocation;
}