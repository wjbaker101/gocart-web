import CacheService from '@/service/CacheService.js';

const KEY_LIST_UNCHECKED = 'shopping-list-unchecked';
const KEY_LIST_CHECKED = 'shopping-list-checked';

const KEY_SHOPPING_LIST = 'shopping-list';
const KEY_SHOPPING_LIST_ORDER = 'shopping-list-order';

export default {

    async storeUncheckedList(uncheckedList) {
        await CacheService.storeData(KEY_LIST_UNCHECKED, uncheckedList);
    },

    async storeCheckedList(checkedList) {
        await CacheService.storeData(KEY_LIST_CHECKED, checkedList);
    },

    async getUncheckedList() {
        return await CacheService.getData(KEY_LIST_UNCHECKED);
    },

    async getCheckedList() {
        return await CacheService.getData(KEY_LIST_CHECKED);
    },

    async storeLists(uncheckedList, checkedList) {
        await Promise.all([
            this.storeUncheckedList(uncheckedList),
            this.storeCheckedList(checkedList),
        ]);
    },

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