import Vue from 'vue';

import { ITescoProduct } from '@frontend/interface/ITescoProduct';
import { IStoreLocationResponseResult } from '@common/interface/response/IStoreLocationResponse';

import TescoShopCacheService from '@frontend/service/TescoShopCacheService';
import ShoppingListCacheService from '@frontend/service/ShoppingListCacheService';

class AppState {

    private debug = process.env.NODE_ENV !== 'production';

    private state = {
        uncheckedShoppingList: {} as Record<string, ITescoProduct>,
        checkedShoppingList: {} as Record<string, ITescoProduct>,

        search: null as (ITescoProduct[] | null),

        shop: null as (IStoreLocationResponseResult | null),

        currentProduct: null as (ITescoProduct | null),

        isTotalPriceLocked: {
            locked: false,
            totalValue: '0',
        },
    };

    log(message: any): void {
        if (this.debug) {
            console.log(message);
        }
    }

    getUncheckedShoppingList(): Record<string, ITescoProduct> {
        return this.state.uncheckedShoppingList;
    }

    setUncheckedShoppingList(list: Record<string, ITescoProduct>): void {
        this.log(`Setting unchecked shopping list.`);
        this.state.uncheckedShoppingList = list;

        this.updateUncheckedShoppingListInCache();
    }

    addToUncheckedShoppingList(product: ITescoProduct): void {
        this.log(`Adding a product to unchecked shopping list with tpnc=${product.id}.`);

        Vue.set(this.state.uncheckedShoppingList, `id-${product.id}`, product);

        this.updateUncheckedShoppingListInCache();
    }

    removeFromUncheckedShoppingList(tpnc: string): void {
        this.log(`Removing a product from unchecked shopping list with tpnc=${tpnc}.`);

        Vue.delete(this.state.uncheckedShoppingList, `id-${tpnc}`);

        this.updateUncheckedShoppingListInCache();
    }

    updateUncheckedShoppingListInCache(): void {
        (async () => {
            await ShoppingListCacheService.storeUncheckedList(this.state.uncheckedShoppingList);
        })();
    }

    getCheckedShoppingList(): Record<string, ITescoProduct> {
        return this.state.checkedShoppingList;
    }

    setCheckedShoppingList(list: Record<string, ITescoProduct>): void {
        this.state.checkedShoppingList = list;

        this.updateCheckedShoppingListInCache();
    }

    addToCheckedShoppingList(product: ITescoProduct): void {
        this.log(`Adding a product to checked shopping list with tpnc=${product.id}.`);

        Vue.set(this.state.checkedShoppingList, `id-${product.id}`, product);

        this.updateCheckedShoppingListInCache();
    }

    removeFromCheckedShoppingList(tpnc: string): void {
        this.log(`Removing a product from checked shopping list with tpnc=${tpnc}.`);

        Vue.delete(this.state.checkedShoppingList, `id-${tpnc}`);

        this.updateCheckedShoppingListInCache();
    }

    updateCheckedShoppingListInCache(): void {
        (async () => {
            await ShoppingListCacheService.storeCheckedList(this.state.checkedShoppingList);
        })();
    }

    setSearchResult(searchResult: ITescoProduct[]): void {
        this.state.search = searchResult;
    }

    getSearchResult() {
        return this.state.search;
    }

    setSelectedShop(shop: IStoreLocationResponseResult): void {
        this.log(`Setting selected shop:`);
        this.log(shop);

        this.state.shop = shop;

        (async () => {
            await TescoShopCacheService.storeSelectedShop(this.state.shop as IStoreLocationResponseResult);
        })();
    }

    async getSelectedShop() {
        return this.state.shop;
    }

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

        const initIsTotalPriceLocked = async () => {
            const isLocked =
                    await ShoppingListCacheService.getIsTotalPriceLocked();

            this.state.isTotalPriceLocked = isLocked;
        };

        await Promise.all([
            initUncheckedShoppingList(),
            initCheckedShoppingList(),

            initShop(),

            initIsTotalPriceLocked(),
        ]);
    }

    getCurrentProduct(): ITescoProduct | null {
        return this.state.currentProduct;
    }

    setCurrentProduct(product: ITescoProduct): void {
        this.state.currentProduct = product;
    }

    isTotalPriceLocked(): { locked: boolean, totalValue: string, } {
        return this.state.isTotalPriceLocked;
    }

    setTotalPriceLocked(isLocked: boolean, totalValue: string): void {
        this.state.isTotalPriceLocked = {
            totalValue,
            locked: isLocked,
        };

        (async () => {
            await ShoppingListCacheService.setIsTotalPriceLocked(this.state.isTotalPriceLocked);
        })();
    }
}

export default new AppState();
