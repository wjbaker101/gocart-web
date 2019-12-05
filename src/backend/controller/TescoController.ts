import { Request, Response } from 'express';

import TescoService from '../service/TescoService';
import ResponseHelper from '../helper/ResponseHelper';
import LoggingUtils from '../util/LoggingUtils';

const MESSAGE_ERROR_GROCERY_SEARCH = 'Sorry, we were not able to search for groceries.';
const MESSAGE_ERROR_NEARBY_SHOPS = 'Sorry, we were not able to search for nearby shops.';
const MESSAGE_ERROR_PRODUCT_DATA = 'Sorry, we were not able to get product data.';

class TescoController {

    public getGrocerySearch = async (request: Request, response: Response):
            Promise<void> => {

        const { searchTerm } = request.params;

        LoggingUtils.log(`TescoController.getGrocerySearch with searchTerm=${searchTerm}`);

        const result = await TescoService.getGrocerySearch(searchTerm);

        if (result instanceof Error) {
            ResponseHelper(response)
                    .sendError(400, MESSAGE_ERROR_GROCERY_SEARCH);
            return;
        }

        ResponseHelper(response).sendEntity(200, result);
    }

    public getNearbyShops = async (request: Request, response: Response):
            Promise<void> => {

        const { searchTerm } = request.params;

        LoggingUtils.log(`TescoController.getNearbyShops with searchTerm=${searchTerm}`);

        const result = await TescoService.getNearbyShops(searchTerm);

        if (result instanceof Error) {
            ResponseHelper(response).sendError(400, MESSAGE_ERROR_NEARBY_SHOPS);
            return;
        }

        ResponseHelper(response).sendEntity(200, result);
    }

    public getProductDataByTPNC = async (request: Request, response: Response):
            Promise<void> => {

        const { tpnc } = request.params;

        LoggingUtils.log(`TescoController.getProductDataByTPNC with tpnc=${tpnc}`);

        const result = await TescoService.getProductDataByTPNC(tpnc);

        if (result instanceof Error) {
            ResponseHelper(response).sendError(400, MESSAGE_ERROR_PRODUCT_DATA);
            return;
        }

        ResponseHelper(response).sendEntity(200, result);
    }

    public getProductDataByGTIN = async (request: Request, response: Response):
            Promise<void> => {

        const { gtin } = request.params;

        LoggingUtils.log(`TescoController.getProductDataByGTIN with gtin=${gtin}`);

        const result = await TescoService.getProductDataByGTIN(gtin);

        if (result instanceof Error) {
            ResponseHelper(response).sendError(400, MESSAGE_ERROR_PRODUCT_DATA);
            return;
        }

        ResponseHelper(response).sendEntity(200, result);
    }
}

export default new TescoController();
