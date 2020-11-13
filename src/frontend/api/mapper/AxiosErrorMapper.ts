import { AxiosError } from 'axios';

import { ApiResponse } from '@/api/type/ApiResponse';

export const AxiosErrorMapper = {

    map(error: AxiosError<ApiResponse<any>>): Error {
        if (!error.response) {
            return new Error(error.message);
        }

        return new Error(error.response.data.error);
    },
}
