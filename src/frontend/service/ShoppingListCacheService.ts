import CacheService from '@frontend/service/CacheService';

import { ITescoProduct } from '@frontend/interface/ITescoProduct';

const KEY_LIST_UNCHECKED = 'shopping-list-unchecked';
const KEY_LIST_CHECKED = 'shopping-list-checked';
const KEY_TOTAL_PRICE_IS_LOCKED = 'total-price-is-locked';

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

    async setIsTotalPriceLocked(isLocked: { locked: boolean, totalValue: string, }): Promise<void> {
        await CacheService.storeData(KEY_TOTAL_PRICE_IS_LOCKED, isLocked);
    },

    async getIsTotalPriceLocked(): Promise<{ locked: boolean, totalValue: string, }> {
        const cache = await CacheService.getData(KEY_TOTAL_PRICE_IS_LOCKED);

        if (cache === null) {
            return {
                locked: false,
                totalValue: '0',
            };
        }

        return cache;
    },
}