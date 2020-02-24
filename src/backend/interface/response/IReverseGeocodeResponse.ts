export interface IReverseGeocodeResponse {
    address: {
        building: string,
        city: string,
        country: string,
        country_code: string,
        house_number: string,
        neighbourhood: string,
        postcode: string,
        road: string,
        state: string,
        state_district: string,
        suburb: string,
    },
    boundingbox: number[],
    display_name: string,
    lat: number,
    lon: number,
}
