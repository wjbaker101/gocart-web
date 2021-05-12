import axios from 'axios';

import { ApiResponse } from '@/api/type/ApiResponse';
import { AxiosErrorMapper } from '@/api/mapper/AxiosErrorMapper';
import { LoginResponse } from '@/api/auth/type/LoginResponse';

const api = axios.create({
    baseURL: '/api',
});

export const AuthApi = {

    async login(username: string, password: string): Promise<LoginResponse | Error> {
        try {
            const url = '/auth/login';

            const response = await api.post<ApiResponse<LoginResponse>>(url, {
                username,
                password,
            });

            return response.data.result;
        }
        catch (exception) {
            return AxiosErrorMapper.map(exception);
        }
    },
}
