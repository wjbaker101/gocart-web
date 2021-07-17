import axios from 'axios';

class ResponseHelper {

    public handleError(error: any): Error {
        if (axios.isAxiosError(error))
            return new Error(error.response?.data?.error);

        return new Error('An error occured when trying to process your request. Please try again or contact an admin.');
    }
}

export const responseHelper = new ResponseHelper();
