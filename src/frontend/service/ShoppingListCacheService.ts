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
        const cache = await CacheService.getData(KEY_LIST_UNCHECKED);

        if (cache === null) {
            return {};
        }

        return cache;
    },

    async getCheckedList(): Promise<Record<string, ITescoProduct>> {
        const cache = await CacheService.getData(KEY_LIST_CHECKED);

        if (cache === null) {
            return {};
        }

        return cache;
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