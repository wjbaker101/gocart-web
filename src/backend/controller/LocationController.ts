import { Request, Response } from 'express';

import LoggingUtils from '../util/LoggingUtils';
import ResponseHelper from '../helper/ResponseHelper';

import { LocationService } from '../service/LocationService';

const MESSAGE_ERROR_REVERSE_GEOCODE = 'Unable to get postcode.';

export const LocationController = {

    async getPostcodeFromGeocode(request: Request, response: Response):
            Promise<void> {

        const { latitude, longitude } = request.params;

        LoggingUtils.log(`LocationController.getPostcodeFromGeocode`);

        const result = await LocationService.getPostcodeFromGeocode(
                Number(latitude),
                Number(longitude));

        if (result instanceof Error) {
            ResponseHelper(response)
                    .sendError(400, MESSAGE_ERROR_REVERSE_GEOCODE);
            return;
        }

        ResponseHelper(response).sendEntity(200, result);
    },
}
