import { reactive } from 'vue';

import { Product } from '@/model/Product.model';
import { Shop } from '@/model/Shop.model';
import { SortOptionType } from '@/model/SortOption.model';

import { ProductSearchSettingsState, ProductSearchState } from '@/use/appStore/state/ProductSearch.state';
import { ShopState } from '@/use/appStore/state/Shop.state';
import { ShoppingListState } from '@/use/appStore/state/ShoppingList.state';
import { UserState } from '@/use/appStore/state/User.state';

import { CacheService } from '@/service/Cache.service';

const cacheStateKey = {
    PRODUCT_SEARCH_SETTINGS: 'PRODUCT_SEARCH_SETTINGS',
    SHOPPING_LIST: 'SHOPPING_LIST',
    SHOP: 'SHOP',
    USER: 'USER',
};

export interface AppState {

    shoppingList: ShoppingListState;

    shop: ShopState;

    user: UserState;
};

const state: AppState = reactive<AppState>({

    shoppingList: {
        list: [],
        settings: {
            isCheckedItemsVisible: true,
        },
    },

    shop: {
        shop: null,
    },

    user: {
        user: null,
    },
});

(async () => {
    const shoppingList = await CacheService.get<ShoppingListState>(cacheStateKey.SHOPPING_LIST);
    if (shoppingList !== null)
        state.shoppingList = shoppingList;

    const shop = await CacheService.get<ShopState>(cacheStateKey.SHOP);
    if (shop !== null)
        state.shop = shop;

    const user = await CacheService.get<UserState>(cacheStateKey.USER);
    if (user !== null)
        state.user = user;
})();

const shoppingList = {

    async add(product: Product) {
        state.shoppingList.list.push(product);

        await CacheService.set(cacheStateKey.SHOPPING_LIST, state.shoppingList);
    },

    async remove(product: Product) {
        state.shoppingList.list = state.shoppingList.list.filter(x => x.id !== product.id);

        await CacheService.set(cacheStateKey.SHOPPING_LIST, state.shoppingList);
    },

    async update(product: Product) {
        const existingProduct = state.shoppingList.list.find(x => x.id === product.id);

        if (existingProduct === undefined)
            return;

        existingProduct.name = product.name;
        existingProduct.price = product.price;
        existingProduct.imageUrl = product.imageUrl;
        existingProduct.description = product.description;
        existingProduct.department = product.department;
        existingProduct.superDepartment = product.superDepartment;

        existingProduct.barcodeId = product.barcodeId;
        existingProduct.brand = product.brand;
        existingProduct.ingredients = product.ingredients;
        existingProduct.healthScore = product.healthScore;
        existingProduct.nutrition = product.nutrition;

        existingProduct.isFreetext = product.isFreetext;
        existingProduct.listQuantity = product.listQuantity;
        existingProduct.isChecked = product.isChecked;
        existingProduct.addCount = product.addCount;

        await CacheService.set(cacheStateKey.SHOPPING_LIST, state.shoppingList);
    },
};

const shop = {

    async set(shop: Shop) {
        state.shop.shop = shop;

        await CacheService.set(cacheStateKey.SHOP, state.shop);
    },
};

export function useAppStore() {
    return {
        state,

        shoppingList,
        shop,
    }
}
