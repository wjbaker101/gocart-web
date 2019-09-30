import CacheService from '@/service/CacheService.js';

const KEY_SELECTED_SHOP = 'selected-shop';

export default {

    async storeSelectedShop(shop) {
        await CacheService.storeData(KEY_SELECTED_SHOP, shop);
    },

    async getSelectedShop() {
        return await CacheService.getData(KEY_SELECTED_SHOP);
    },
}