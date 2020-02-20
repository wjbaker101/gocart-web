import axios from 'axios';

import configSecret from '@common/config/config-secret.json';

const openFoodFactsAPI = axios.create({
    baseURL: '/api',
    headers: {
        'API-Key': configSecret.backend.apiKey,
    },
});

export const OFFClient = {

    async getProductData(barcodeID: string) {
        try {
            const response =
                    await openFoodFactsAPI.get(`/product-data/${barcodeID}`);

            return await response.data;
        }
        catch (error) {
            return new Error(error);
        }
    },
}
