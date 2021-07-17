import { API } from '@/api/API';
import { ProductMapper } from '@/service/mapper/Product.mapper';

import { Product } from '@/model/Product.model';

export const TescoService = {

    async searchProducts(searchTerm: string, page: number): Promise<Product[] | Error> {
        const products = await API.grocerySearch(searchTerm, page);

        if (products instanceof Error) {
            return products;
        }

        return products.map(product => ProductMapper.map(product));
    },
}
