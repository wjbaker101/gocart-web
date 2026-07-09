export interface IMapboxGeocodingResponse {
    readonly features: Array<IFeature>;
}

interface IFeature {
    readonly place_name: string;
    readonly center: [number, number];
}

export default defineEventHandler(async (event) => {
    await expectSession(event);
    const { searchTerm } = getQuery(event);

    return await $fetch<IMapboxGeocodingResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchTerm?.toString() ?? '')}.json`, {
        query: {
            access_token: process.env.MAPBOX_KEY,
            language: 'en',
            limit: 5,
            country: 'IE,GB',
            types: 'address,postcode,place,region,district,locality',
        },
    });
});