import axios from 'axios';

import configSecret from '@common/config/config-secret.json';

import { IResponseEntity } from '@common/interface/IResponseEntity';
import { IStoreLocationResponseResult } from '@common/interface/response/IStoreLocationResponse';
import { IGrocerySearchResponseResult } from '@common/interface/response/IGrocerySearchResponse';
import { IProductDataResponse } from '@common/interface/response/IProductDataResponse';

const tescoAPI = axios.create({
    baseURL: '/api',
    headers: {
        'API-Key': configSecret.backend.apiKey,
    },
});

class TescoClient {

    async getGrocerySearch(searchTerm: string):
            Promise<IResponseEntity<IGrocerySearchResponseResult[]> | Error> {

        try {
            const response =
                    await tescoAPI.get(`/product/search/${searchTerm}`);

            return await response.data;
        }
        catch (error) {
            return new Error(error);
        }
    }

    async getNearbyShops(searchTerm: string):
            Promise<IResponseEntity<IStoreLocationResponseResult[]> | Error> {

        try {
            const response = await tescoAPI.get(`/shop/search/${searchTerm}`);

            return await response.data;
        }
        catch (error) {
            return new Error(error);
        }
    }

    async getProductDataByTPNC(tpnc: number | string):
            Promise<IResponseEntity<IProductDataResponse> | Error> {

        try {
            const response = await tescoAPI.get(`/product/tpnc/${tpnc}`);

            return await response.data;
        }
        catch (error) {
            return new Error(error);
        }
    }

    async getProductDataByGTIN(gtin: number | string):
            Promise<IResponseEntity<IProductDataResponse> | Error> {

        try {
            const response = await tescoAPI.get(`/product/gtin/${gtin}`);

            return await response.data;
        }
        catch (error) {
            return new Error(error);
        }
    }
}

export default new TescoClient();
