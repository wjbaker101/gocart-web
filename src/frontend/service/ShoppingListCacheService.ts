import CacheService from '@frontend/service/CacheService';

import { ITescoProduct } from '@frontend/interface/ITescoProduct';

const KEY_LIST_UNCHECKED = 'shopping-list-unchecked';
const KEY_LIST_CHECKED = 'shopping-list-checked';

export default {

    async storeUncheckedList(uncheckedList: Record<string, ITescoProduct>):
            Promise<void> {

        await CacheService.storeData(KEY_LIST_UNCHECKED, uncheckedList);
    },

    async storeCheckedList(checkedList: Record<string, ITescoProduct>):
            Promise<void> {

        await CacheService.storeData(KEY_LIST_CHECKED, checkedList);
    },

    async getUncheckedList(): Promise<Record<string, ITescoProduct>> {
        return await CacheService.getData(KEY_LIST_UNCHECKED);
    },

    async getCheckedList(): Promise<Record<string, ITescoProduct>> {
        return await CacheService.getData(KEY_LIST_CHECKED);
    },

    async storeLists(
            uncheckedList: Record<string, ITescoProduct>,
            checkedList: Record<string, ITescoProduct>): Promise<void> {

        await Promise.all([
            this.storeUncheckedList(uncheckedList),
            this.storeCheckedList(checkedList),
        ]);
    },
}