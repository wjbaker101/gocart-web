import CacheService from '@/service/CacheService.js';

const KEY_SHOPPING_LIST = 'shopping-list';
const KEY_SHOPPING_LIST_ORDER = 'shopping-list-order';

export default {

    async storeList(list) {
        await CacheService.storeData(KEY_SHOPPING_LIST, list);
    },

    async getList() {
        return await CacheService.getData(KEY_SHOPPING_LIST);
    },

    async storeOrder(order) {
        await CacheService.storeData(KEY_SHOPPING_LIST_ORDER, order);
    },

    async getOrder() {
        return await CacheService.getData(KEY_SHOPPING_LIST_ORDER);
    },

    async storeListAndOrder(list, order) {
        await Promise.all([
            this.storeList(list),
            this.storeOrder(order),
        ]);
    },
}