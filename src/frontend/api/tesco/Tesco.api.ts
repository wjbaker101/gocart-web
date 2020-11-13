import axios from 'axios';

import { ApiResponse } from '@/api/type/ApiResponse';
import { AxiosErrorMapper } from '@/api/mapper/AxiosErrorMapper';
import { SearchProduct } from '@/api/tesco/type/SearchProduct';
import { TescoProduct } from '@/api/tesco/type/TescoProduct';
import { TescoShop } from '@/api/tesco/type/TescoShop';

const tescoApi = axios.create({
    baseURL: '/api/tesco',
});

export const TescoApi = {

    async grocerySearch(searchTerm: string): Promise<SearchProduct[] | Error> {
        try {
            const url = `/product/search/${searchTerm}`;

            const response =
                await tescoApi.get<ApiResponse<SearchProduct[]>>(url);

            return response.data.result;
        }
        catch (exception) {
            return AxiosErrorMapper.map(exception);
        }
    },

    async productData(productId: string): Promise<TescoProduct | Error> {
        try {
            const url = `/product/${productId}`;

            const response =
                await tescoApi.get<ApiResponse<TescoProduct>>(url);

            return response.data.result;
        }
        catch (exception) {
            return AxiosErrorMapper.map(exception);
        }
    },

    async nearbyShops(searchTerm: string): Promise<TescoShop[] | Error> {
        try {
            const url = `/shop/search/${searchTerm}`;

            const response =
                await tescoApi.get<ApiResponse<TescoShop[]>>(url);

            return response.data.result;
        }
        catch (exception) {
            return AxiosErrorMapper.map(exception);
        }
    },
}
