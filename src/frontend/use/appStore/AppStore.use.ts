import { reactive, watch } from 'vue';

import { Product } from '@/model/Product.model';

import { SortOptionType } from '@/model/SortOption.model';
import { ProductSearchState } from '@/use/appStore/state/ProductSearch.state';
import { ShopState } from '@/use/appStore/state/Shop.state';
import { ShoppingListState } from '@/use/appStore/state/ShoppingList.state';
import { UserState } from '@/use/appStore/state/User.state';

import { CacheService } from '@/service/Cache.service';

const cacheStateKey = {
    PRODUCT_SEARCH: 'PRODUCT_SEARCH',
    SHOPPING_LIST: 'SHOPPING_LIST',
    SHOP: 'SHOP',
    USER: 'USER',
};

export interface AppState {

    product: Product | null;
    productSearchTerm: string | null;

    productSearch: ProductSearchState;

    shoppingList: ShoppingListState;

    shop: ShopState;

    user: UserState;
};

const state: AppState = reactive<AppState>({

    product: null,
    productSearchTerm: null,

    productSearch: {
        sortOption: SortOptionType.PRICE,
    },

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

watch(state.productSearch, async (productSearch) => {
    console.log(productSearch);
    // await CacheService.set(cacheStateKey.PRODUCT_SEARCH, productSearch);
});

watch(state.shoppingList, async (shoppingList) => {
    console.log(shoppingList);
    // await CacheService.set(cacheStateKey.SHOPPING_LIST, shoppingList);
});

watch(state.shop, async (shop) => {
    console.log(shop);
    // await CacheService.set(cacheStateKey.SHOP, shop);
});

watch(state.user, async (user) => {
    console.log(user);
    // await CacheService.set(cacheStateKey.USER, user);
});

const shoppingList = {

    add(product: Product) {
        state.shoppingList.list.push(product);
    },

    remove(product: Product) {
        state.shoppingList.list = state.shoppingList.list.filter(x => x.id !== product.id);
    },

    update(product: Product) {
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
    },
};

export function useAppStore() {
    return {
        state,

        shoppingList,
    }
}
