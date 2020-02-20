import { Request, Response } from 'express';

import { OFFService } from '../service/OFFService';

import ResponseHelper from '../helper/ResponseHelper';
import LoggingUtils from '../util/LoggingUtils';

const MESSAGE_ERROR_PRODUCT_DATA = 'Sorry, we were not able to get product data.';

export const OFFController = {

    async getProductData(request: Request, response: Response): Promise<void> {
        const { barcodeID } = request.params;

        LoggingUtils.log(`OFFController.getProductData barcodeID=${barcodeID}`);

        const result = await OFFService.getProductData(barcodeID);

        if (result instanceof Error) {
            ResponseHelper(response)
                    .sendError(400, MESSAGE_ERROR_PRODUCT_DATA);
            return;
        }

        ResponseHelper(response).sendEntity(200, result);
    },
}
