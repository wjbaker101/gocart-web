import axios from 'axios';

import configSecret from '../../common/config/config-secret.json';
import { IReverseGeocodeResponse } from '../interface/response/IReverseGeocodeResponse.js';

const accessToken = configSecret.locationIQAPI.accessToken;

const locationIQAPI = axios.create({
    baseURL: 'https://eu1.locationiq.com/v1',
});

export const LocationIQClient = {

    async reverseGeocode(latitude: number, longitude: number): Promise<IReverseGeocodeResponse | Error> {
        try {
            const response = await locationIQAPI.get(`/reverse.php?key=${accessToken}&lat=${latitude}&lon=${longitude}&format=json`);

            return response.data;
        }
        catch (error) {
            return new Error(error);
        }
    },
}
