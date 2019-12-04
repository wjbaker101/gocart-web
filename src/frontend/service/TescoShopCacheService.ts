import CacheService from '@frontend/service/CacheService';

import { IStoreLocationResponseResult } from '@common/interface/response/IStoreLocationResponse';

const KEY_SELECTED_SHOP = 'selected-shop';

export default {

    async storeSelectedShop(shop: IStoreLocationResponseResult): Promise<void> {
        await CacheService.storeData(KEY_SELECTED_SHOP, shop);
    },

    async getSelectedShop(): Promise<IStoreLocationResponseResult> {
        return await CacheService.getData(KEY_SELECTED_SHOP);
    },
}