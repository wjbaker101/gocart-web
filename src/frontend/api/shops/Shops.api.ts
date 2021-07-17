import axios, { AxiosInstance } from 'axios';

import { responseHelper } from '@/api/ResponseHelper';

import { ApiResponse } from '@/api/type/ApiResponse';
import { GetNearbyShopsResponse } from '@/api/shops/model/GetNearbyShopsResponse';

class ShopsApi {

    private readonly api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: '/api/tesco/shop',
        });
    }

    async getNearbyShops(searchTerm: string): Promise<GetNearbyShopsResponse | Error> {
        try {
            const url = `/search/${searchTerm}`;

            const response = await this.api.get<ApiResponse<GetNearbyShopsResponse>>(url);

            return response.data.result;
        }
        catch (error) {
            return responseHelper.handleError(error);
        }
    }
}

export const shopsApi = new ShopsApi();
