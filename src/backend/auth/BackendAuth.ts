import { Request, Response, NextFunction } from 'express';

import configSecret from '../../common/config/config-secret.json';
import LoggingUtils from '../util/LoggingUtils';
import ResponseHelper from '../helper/ResponseHelper';

const MESSAGE_ERROR_AUTH = 'Sorry, you are not authenticated to make this request.';

class BackendAuth {

    public isAuthenticated = (request: Request): boolean => {
        return request.header('API-Key') === configSecret.backend.apiKey;
    }

    public authenticate = (
        request: Request,
        response: Response,
        next: NextFunction): void => {

        if (this.isAuthenticated(request)) {
            next();
            return;
        }

        LoggingUtils.log('Authentication request failed');

        ResponseHelper(response).sendError(403, MESSAGE_ERROR_AUTH);
    }
}

export default new BackendAuth();
