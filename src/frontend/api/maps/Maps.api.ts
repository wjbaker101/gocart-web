import axios from 'axios';

import { ApiResponse } from '@/api/type/ApiResponse';
import { AxiosErrorMapper } from '@/api/mapper/AxiosErrorMapper';

const mapsApi = axios.create({
    baseURL: '/api/maps',
});

export const MapsApi = {

    async getStaticMapLocation(
        longitude: number,
        latitude: number): Promise<string | Error> {

        try {
            const url = `/static/${longitude}/${latitude}`;

            const response =
                await mapsApi.get<ApiResponse<string>>(url);

            return response.data.result;
        }
        catch (exception) {
            return AxiosErrorMapper.map(exception);
        }
    },
}
