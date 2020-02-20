import axios from 'axios';

import { IOFFProductResponse } from '../../common/interface/response/IOFFProductResponse';

const openFoodFactsAPI = axios.create({
    baseURL: 'https://uk.openfoodfacts.org/api/v0',
    headers: {
        Source: 'https://gocart.wjbaker.com',
    },
});

export const OFFClient = {

    /**
     * https://documenter.getpostman.com/view/8470508/SVtN3Wzy?version=latest#10a107d2-1428-4d6c-b78b-fd2d6ce16395
     *
     * @param barcodeID Barcode ID of the product.
     */
    async getProductData(barcodeID: string):
            Promise<IOFFProductResponse | Error> {

        try {
            const response =
                await openFoodFactsAPI.get(`/product/${barcodeID}.json`, {});

            return await response.data;
        }
        catch (error) {
            return new Error(error);
        }
    },
}
