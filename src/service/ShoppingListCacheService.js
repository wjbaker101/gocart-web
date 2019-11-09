import CacheService from '@/service/CacheService.js';

const KEY_LIST_UNCHECKED = 'shopping-list-unchecked';
const KEY_LIST_CHECKED = 'shopping-list-checked';

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
}