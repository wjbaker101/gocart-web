export interface IStoreLocationResponseContactAddressLine {
    lineNumber: number,
    text: string,
}

export interface IStoreLocationResponsePhoneNumber {
    alias: string,
    number: string,
}

export interface IStoreLocationResponseOpeningHour {
    isOpen: boolean,
    open?: string,
    close?: string,
}

export interface IStoreLocationResponseOpeningHourException {
    date: string,
    hours: IStoreLocationResponseOpeningHour,
}

export interface IStoreLocationResponseOpeningHours {
    type: string,
    standardOpeningHours: {
        mo: IStoreLocationResponseOpeningHour,
        tu: IStoreLocationResponseOpeningHour,
        we: IStoreLocationResponseOpeningHour,
        th: IStoreLocationResponseOpeningHour,
        fr: IStoreLocationResponseOpeningHour,
        sa: IStoreLocationResponseOpeningHour,
        su: IStoreLocationResponseOpeningHour,
    },
    exceptions: IStoreLocationResponseOpeningHourException[],
}

export interface IStoreLocationResponseFacility {
    name: string,
    tags: string[],
    description: string,
    openingHours?: IStoreLocationResponseOpeningHours,
}

export interface IStoreLocationResponseResult {
    id: string,
    name: string,
    altIds: {
        branchNumber: number,
    },
    region: {
        isoCountryCode: string,
        isoSubdivision: string,
    },
    contact: {
        address: {
            lines: IStoreLocationResponseContactAddressLine[],
            town: string,
            postcode: string,
        },
        phoneNumbers: IStoreLocationResponsePhoneNumber[],
        communityChampion: {
            emal: string,
        },
    },
    geo: {
        coordinates: {
            longitude: number,
            latitude:number,
        },
    },
    classification: {
        type: string,
        category: string,
    },
    status: {
        currentStatus: string,
    },
    openingHours: IStoreLocationResponseOpeningHours[],
    facilities: IStoreLocationResponseFacility[],
    distanceFrom: {
        unit: string,
        value: number,
    }
}

export interface IStoreLocationResponse {
    results: IStoreLocationResponseResult[],
}
