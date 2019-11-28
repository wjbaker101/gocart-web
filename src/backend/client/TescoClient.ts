import axios from 'axios';

import config from '@common/config/config-secret.json';

import IStoreLocationRequest from '@backend/interface/request/IStoreLocationRequest';
import IGrocerySearchRequest from '@backend/interface/request/IGrocerySearchRequest';
import IProductDataRequest from '@backend/interface/request/IProductDataRequest';

import { IGrocerySearchResponse } from '@common/interface/response/IGrocerySearchResponse';
import { IStoreLocationResponse } from '@common/interface/response/IStoreLocationResponse';
import { IProductDataResponse } from '@common/interface/response/IProductDataResponse';

const tescoAPI = axios.create({
    baseURL: 'https://dev.tescolabs.com',
    headers: {
        'Ocp-Apim-Subscription-Key': config.tescoAPI.apiKey,
    }
});

class TescoClient {

    /**
     * https://devportal.tescolabs.com/docs/services/5731ed21611a4b2968547c5f/operations/5731edcc611a4b2968547c60
     */
    public grocerySearch = async (grocerySearchResponse: IGrocerySearchRequest):
            Promise<IGrocerySearchResponse | Error> => {

        const { query, offset, limit, } = grocerySearchResponse;

        try {
            const response = await tescoAPI.get('/grocery/products', {
                params: {
                    query,
                    offset,
                    limit,
                },
            });

            return await response.data;
        }
        catch (error) {
            return new Error(error);
        }
    }

    /**
     * https://devportal.tescolabs.com/docs/services/5731ed21611a4b2968547c5f/operations/5731edcc611a4b2968547c60
     */
    public storeLocation = async (storeLocationRequest: IStoreLocationRequest):
            Promise<IStoreLocationResponse | Error> => {

        const { near, filter, offset, like, limit, } = storeLocationRequest;

        try {
            const response = await tescoAPI.get('/locations/search', {
                params: {
                    sort: `near:"${near}, UK"`,
                    filter,
                    offset,
                    like,
                    limit,
                },
            });

            return await response.data;
        }
        catch (error) {
            return new Error(error);
        }
    }

    public productData = async (productDataRequest: IProductDataRequest):
            Promise<IProductDataResponse | Error> => {

        const { gtin, tpnb, tpnc, catid, } = productDataRequest;

        try {
            const response = await tescoAPI.get('/product', {
                params: {
                    gtin,
                    tpnb,
                    tpnc,
                    catid,
                },
            });

            return await response.data;
        }
        catch (error) {
            return new Error(error);
        }
    }
}

export default new TescoClient();
