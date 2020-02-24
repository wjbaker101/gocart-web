import axios from 'axios';

import configSecret from '@common/config/config-secret.json';

const locationAPI = axios.create({
    baseURL: '/api',
    headers: {
        'API-Key': configSecret.backend.apiKey,
    },
});

export const LocationClient = {

    async getPostcode(latitude: number, longitude: number) {
        try {
            const response = await locationAPI.get(
                    `/location/postcode/${latitude}/${longitude}`);

            return await response.data;
        }
        catch (error) {
            return new Error(error);
        }
    },
}
