import TescoClient from '../client/TescoClient';

import { IGrocerySearchResponseResult } from '../../common/interface/response/IGrocerySearchResponse';
import { IStoreLocationResponseResult } from '../../common/interface/response/IStoreLocationResponse';
import { IProductDataResponseResult } from '../../common/interface/response/IProductDataResponse';

const defaults = {
    page: 0,
    limit: 20,
};

class TescoService {

    public getGrocerySearch =
            async (searchTerm: string, page: number = defaults.page):
            Promise<IGrocerySearchResponseResult[] | Error> => {

        const result = await TescoClient.grocerySearch({
            query: searchTerm,
            limit: defaults.limit,
            offset: page,
        });

        if (result instanceof Error) {
            return result;
        }

        return result.uk.ghs.products.results;
    }

    public getNearbyShops =
            async (searchTerm: string, page: number = defaults.page):
            Promise<IStoreLocationResponseResult[] | Error> => {

        const result = await TescoClient.storeLocation({
            near: searchTerm,
            limit: defaults.limit,
            offset: page,
        });

        if (result instanceof Error) {
            return result;
        }

        return result.results;
    }

    public getProductDataByGTIN = async (gtin: string[] | string):
            Promise<IProductDataResponseResult[] | Error> => {

        const result = await TescoClient.productData({ gtin });

        if (result instanceof Error) {
            return result;
        }

        return result.products;
    }

    public getProductDataByTPNB = async (tpnb: string[] | string):
            Promise<IProductDataResponseResult[] | Error> => {

        const result = await TescoClient.productData({ tpnb });

        if (result instanceof Error) {
            return result;
        }

        return result.products;
    }

    public getProductDataByTPNC = async (tpnc: string[] | string):
            Promise<IProductDataResponseResult[] | Error> => {

        const result = await TescoClient.productData({ tpnc });

        if (result instanceof Error) {
            return result;
        }

        return result.products;
    }

    public getProductDataByCATID = async (catid: string[] | string):
            Promise<IProductDataResponseResult[] | Error> => {

        const result = await TescoClient.productData({ catid });

        if (result instanceof Error) {
            return result;
        }

        return result.products;
    }
}

export default new TescoService();
