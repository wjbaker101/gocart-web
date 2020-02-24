import { LocationIQClient } from '../client/LocationIQClient'

export const LocationService = {

    async getPostcodeFromGeocode(latitude: number, longitude: number):
            Promise<string | Error> {

        const result =
                await LocationIQClient.reverseGeocode(latitude, longitude);

        if (result instanceof Error) {
            return result;
        }

        return result.address.postcode;
    },
}
