import { Response } from 'express';

import ErrorResponse from '@backend/model/ErrorResponse';
import ResponseEntity from '@backend/model/ResponseEntity';

export default (response: Response) => ({

    sendError(status: number, message: string): Response {
        const error = ErrorResponse.create(message);

        return response.status(status).send(error);
    },

    sendEntity(status: number, data: any): Response {
        const entity = ResponseEntity.create(data);

        return response.status(status).send(entity);
    },
})
