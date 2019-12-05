import Vue from 'vue';

import { IStoreLocationResponseResult } from '@common/interface/response/IStoreLocationResponse';
import { ITescoProduct } from '@frontend/interface/ITescoProduct';
import { ISearchResult } from '@frontend/interface/ISearchResult';

import TescoShopCacheService from '@frontend/service/TescoShopCacheService';
import ShoppingListCacheService from '@frontend/service/ShoppingListCacheService';

const createID = (id: string | number) => {
    return `id-${id}`;
};

const log = (message: any) => {
    console.log(message);
};

export const state = {
    selectedShop: null as (IStoreLocationResponseResult | null),
    selectedProduct: null as (ITescoProduct | null),
    currentSearchResult: null as (ISearchResult | null),
    uncheckedShoppingList: {} as Record<string, ITescoProduct>,
    checkedShoppingList: {} as Record<string, ITescoProduct>,
};

export default {

    async init(): Promise<void> {
        const selectedShop = await TescoShopCacheService.getSelectedShop();
        const uncheckedShoppingList = await ShoppingListCacheService.getUncheckedList();
        const checkedShoppingList = await ShoppingListCacheService.getCheckedList();

        this.selectedShop.set(selectedShop);
        this.uncheckedShoppingList.set(uncheckedShoppingList);
        this.checkedShoppingList.set(checkedShoppingList);
    },

    selectedShop: {
        get(): IStoreLocationResponseResult | null {
            return state.selectedShop;
        },

        set (shop: IStoreLocationResponseResult): void {
            state.selectedShop = shop;

            (async () => await this.updateCache())();
        },

        async updateCache(): Promise<void> {
            if (!state.selectedShop) {
                return;
            }

            await TescoShopCacheService.storeSelectedShop(state.selectedShop);

            log('Updated cache for selected shop.');
        },
    },

    selectedProduct: {
        get(): ITescoProduct | null {
            return state.selectedProduct;
        },

        set(product: ITescoProduct): void {
            state.selectedProduct = product;
        },
    },

    currentSearchResult: {
        get(): ISearchResult | null {
            return state.currentSearchResult;
        },

        set(searchResult: ISearchResult): void {
            state.currentSearchResult = searchResult;
        },
    },

    uncheckedShoppingList: {
        get(): Record<string, ITescoProduct> {
            return state.uncheckedShoppingList;
        },

        set(list: Record<string, ITescoProduct>): void {
            state.uncheckedShoppingList = list;

            (async () => await this.updateCache())();
        },

        add(product: ITescoProduct): void {
            Vue.set(state.uncheckedShoppingList, createID(product.id), product);

            (async () => await this.updateCache())();
        },

        remove(id: string | number): void {
            Vue.delete(state.uncheckedShoppingList, createID(id));

            (async () => await this.updateCache())();
        },

        async updateCache(): Promise<void> {
            if (!state.uncheckedShoppingList) {
                return;
            }

            await ShoppingListCacheService.storeUncheckedList(state.uncheckedShoppingList);

            log('Updated cache for unchecked shopping list.');
        },
    },

    checkedShoppingList: {
        get(): Record<string, ITescoProduct> {
            return state.checkedShoppingList;
        },

        set(list: Record<string, ITescoProduct>): void {
            state.checkedShoppingList = list;

            (async () => await this.updateCache())();
        },

        add(product: ITescoProduct): void {
            Vue.set(state.checkedShoppingList, createID(product.id), product);

            (async () => await this.updateCache())();
        },

        remove(id: string | number): void {
            Vue.delete(state.checkedShoppingList, createID(id));

            (async () => await this.updateCache())();
        },

        async updateCache(): Promise<void> {
            if (!state.checkedShoppingList) {
                return;
            }

            await ShoppingListCacheService.storeCheckedList(state.checkedShoppingList);

            log('Updated cache for checked shopping list.');
        },
    },
}
