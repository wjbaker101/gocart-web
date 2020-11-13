import { API } from '@/api/API';
import { ProductMapper } from '@/service/mapper/Product.mapper';
import { TescoShopMapper } from '@/service/mapper/Shop.mapper';

import { Product } from '@/model/Product.model';
import { Shop } from '@/model/Shop.model';

export const TescoService = {

    async searchProducts(searchTerm: string): Promise<Product[] | Error> {
        const products = await API.grocerySearch(searchTerm);

        if (products instanceof Error) {
            return products;
        }

        return products.map(product => ProductMapper.map(product));
    },

    async getNearbyShops(searchTerm: string): Promise<Shop[] | Error> {
        const shops = await API.nearbyShops(searchTerm);

        if (shops instanceof Error) {
            return shops;
        }

        return shops.map(TescoShopMapper.map);
    },
}
