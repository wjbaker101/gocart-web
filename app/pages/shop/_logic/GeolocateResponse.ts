export interface IMapboxGeocodingResponse {
    readonly features: Array<IFeature>;
}

interface IFeature {
    readonly place_name: string;
    readonly center: [number, number];
}