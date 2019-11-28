import IErrorResponse from '@backend/interface/IErrorResponse';

class ErrorResponse {

    public create = (message: string): IErrorResponse => {
        return {
            message,
            timestamp: Date.now(),
        }
    }
}

export default new ErrorResponse();
