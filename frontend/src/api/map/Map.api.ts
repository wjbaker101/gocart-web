import axios, { AxiosInstance } from 'axios';

import { responseHelper } from '@/api/ResponseHelper';

import { ApiResponse } from '@/api/type/ApiResponse';

class MapApi {

    private readonly api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: '/api/maps',
        });
    }

    async getStaticMap(longitude: number, latitude: number): Promise<string | Error> {
        try {
            const url = `/static/${longitude}/${latitude}`;

            const response = await this.api.get<ApiResponse<string>>(url);

            return response.data.result;
        }
        catch (error) {
            return responseHelper.handleError(error);
        }
    }
}

export const mapApi = new MapApi();
