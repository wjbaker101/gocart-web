import axios from 'axios';

import { ApiResponse } from '@/api/type/ApiResponse';
import { AxiosErrorMapper } from '@/api/mapper/AxiosErrorMapper';
import { LoginResponse } from '@/api/auth/type/LoginResponse';
import { User } from '@/model/User.model';

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

    async logout(user: User | null): Promise<LoginResponse | Error> {
        if (user === null)
            return new Error('A user is required for this request.');

        try {
            const response = await api.post<ApiResponse<LoginResponse>>(
                '/auth/logout',
                null,
                {
                    headers: {
                        Authorization: `Bearer ${user.loginToken}`,
                    },
                });

            return response.data.result;
        }
        catch (exception) {
            return AxiosErrorMapper.map(exception);
        }
    },
}
