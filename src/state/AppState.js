import Vue from 'vue';

import TescoShopCacheService from '@/service/TescoShopCacheService.js';
import ShoppingListCacheService from '@/service/ShoppingListCacheService.js';

export default {

    debug: process.env.NODE_ENV !== 'production',

    state: {
        uncheckedShoppingList: {},
        checkedShoppingList: {},

        search: null,

        shopSearch: null,
        shop: null,
    },

    log(message) {
        if (this.debug) {
            console.log(message);
        }
    },

    getUncheckedShoppingList() {
        return this.state.uncheckedShoppingList;
    },

    setUncheckedShoppingList(list) {
        this.log(`Setting unchecked shopping list.`);
        this.state.uncheckedShoppingList = list;

        this.updateUncheckedShoppingListInCache();
    },

    addToUncheckedShoppingList(product) {
        this.log(`Adding a product to unchecked shopping list with tpnc=${product.tpnc}.`);

        Vue.set(this.state.uncheckedShoppingList, `id-${product.tpnc}`, product);

        this.updateUncheckedShoppingListInCache();
    },

    removeFromUncheckedShoppingList(tpnc) {
        this.log(`Removing a product from unchecked shopping list with tpnc=${tpnc}.`);

        Vue.delete(this.state.uncheckedShoppingList, `id-${tpnc}`);

        this.updateUncheckedShoppingListInCache();
    },

    updateUncheckedShoppingListInCache() {
        (async () => {
            await ShoppingListCacheService.storeUncheckedList(this.state.uncheckedShoppingList);
        })();
    },

    getCheckedShoppingList() {
        return this.state.checkedShoppingList;
    },

    setCheckedShoppingList(list) {
        this.state.checkedShoppingList = list;

        this.updateCheckedShoppingListInCache();
    },

    addToCheckedShoppingList(product) {
        this.log(`Adding a product to checked shopping list with tpnc=${product.tpnc}.`);

        Vue.set(this.state.checkedShoppingList, `id-${product.tpnc}`, product);

        this.updateCheckedShoppingListInCache();
    },

    removeFromCheckedShoppingList(tpnc) {
        this.log(`Removing a product from checked shopping list with tpnc=${tpnc}.`);

        Vue.delete(this.state.checkedShoppingList, `id-${tpnc}`);

        this.updateCheckedShoppingListInCache();
    },

    updateCheckedShoppingListInCache() {
        (async () => {
            await ShoppingListCacheService.storeCheckedList(this.state.checkedShoppingList);
        })();
    },

    setSearchResult(searchResult) {
        this.state.search = searchResult;
    },

    getSearchResult() {
        return this.state.search;
    },

    setShopSearchResult(shopSearchResult) {
        this.log(`Setting shop search result:`);
        this.log(shopSearchResult);

        this.state.shopSearch = shopSearchResult;
    },

    getShopSearchResult() {
        return this.state.shopSearch;
    },

    setSelectedShop(shop) {
        this.log(`Setting selected shop:`);
        this.log(shop);

        this.state.shop = shop;

        (async () => {
            await TescoShopCacheService.storeSelectedShop(this.state.shop);
        })();
    },

    async getSelectedShop() {
        return this.state.shop;
    },

    async init() {
        const initUncheckedShoppingList = async () => {
            const list = await ShoppingListCacheService.getUncheckedList();
            this.state.uncheckedShoppingList = list || {};
        };

        const initCheckedShoppingList = async () => {
            const list = await ShoppingListCacheService.getCheckedList();
            this.state.checkedShoppingList = list || {};
        };

        const initShop = async () => {
            const shop = await TescoShopCacheService.getSelectedShop();
            this.state.shop = shop;
        };

        await Promise.all([
            initUncheckedShoppingList(),
            initCheckedShoppingList(),

            initShop(),
        ]);
    },
}