import { createStore } from 'vuex';

import { API } from '@/api/API';
import { StateCacheService } from '@/service/StateCache.service';

import { AppState, CurrentSearchAppState, SearchAppState } from '@/store/type/AppState.model';
import { StateKeys } from '@/store/type/StateKeys';
import { Product } from '@/model/Product.model';
import { Shop } from '@/model/Shop.model';
import { SortOptionType } from '@/model/SortOption.model';
import { User } from '@/model/User.model';

export const AppStateMapper = {

    mapProductId(productId: string) {
        return `id-${productId}`;
    }
}

const AppStore = createStore<AppState>({

    state: {
        currentProduct: null,
        currentSearch: null,
        currentScrollPositions: new Map<string, number>(),

        searchSettings: {
            sortOption: SortOptionType.ALPHABETICAL,
        },

        shoppingList: {
            products: {},
            unchecked: new Set<string>(),
            checked: new Set<string>(),
        },

        selectedShop: null,

        user: null,
    },

    getters: {
        currentProduct: state => state.currentProduct,
        currentSearch: state => state.currentSearch,
        currentScrollPositions: state => state.currentScrollPositions,

        searchSortOption: state => state.searchSettings.sortOption,

        shoppingList: state => state.shoppingList.products,
        uncheckedProductList: state => state.shoppingList.unchecked,
        checkedProductList: state => state.shoppingList.checked,

        selectedShop: state => state.selectedShop,

        user: state => state.user,
    },

    mutations: {
        [StateKeys.CURRENT_SEARCH_SET](
            state: AppState, search: CurrentSearchAppState) {

            state.currentSearch = search;
        },

        [StateKeys.SEARCH_SETTINGS_SET](
            state: AppState, search: SearchAppState) {

            state.searchSettings = search;
        },

        [StateKeys.SHOPPING_LIST_PRODUCTS_ADD](
            state: AppState, product: Product) {

            const id = AppStateMapper.mapProductId(product.id);

            state.shoppingList.products[id] = product;
        },

        [StateKeys.SHOPPING_LIST_PRODUCTS_REMOVE](
            state: AppState, productId: string) {

            const id = AppStateMapper.mapProductId(productId);

            delete state.shoppingList.products[id];
        },

        [StateKeys.SHOPPING_LIST_UNCHECKED_SET](
            state: AppState, unchecked: Set<string>) {

            state.shoppingList.unchecked = unchecked;
        },

        [StateKeys.SHOPPING_LIST_CHECKED_SET](
            state: AppState, checked: Set<string>) {

            state.shoppingList.checked = checked;
        },

        [StateKeys.CURRENT_PRODUCT_SET](state: AppState, product: Product) {
            state.currentProduct = product;
        },

        [StateKeys.SELECTED_SHOP_SET](state: AppState, shop: Shop) {
            state.selectedShop = shop;
        },

        [StateKeys.USER_SET](state: AppState, user: User | null) {
            state.user = user;
        },
    },

    actions: {
        async INIT({ commit, state }) {
            const shoppingList =
                await StateCacheService.getShoppingListProducts();

            if (shoppingList !== null) {
                state.shoppingList.products = shoppingList;
            }

            const unchecked = await
                StateCacheService.getShoppingListUnchecked();

            if (unchecked !== null) {
                commit(StateKeys.SHOPPING_LIST_UNCHECKED_SET, unchecked);
            }

            const checked = await StateCacheService.getShoppingListChecked();

            if (checked !== null) {
                commit(StateKeys.SHOPPING_LIST_CHECKED_SET, checked);
            }

            const currentShop = await StateCacheService.getSelectedShop();

            if (currentShop !== null) {
                commit(StateKeys.SELECTED_SHOP_SET, currentShop);
            }

            const searchSettings = await StateCacheService.getSearchSettings();

            if (searchSettings !== null) {
                commit(StateKeys.SEARCH_SETTINGS_SET, searchSettings);
            }

            const user = await StateCacheService.getUser();

            if (user !== null) {
                commit(StateKeys.USER_SET, user);
            }
        },

        [StateKeys.CURRENT_SEARCH_SET](
            { commit }, search: CurrentSearchAppState) {

            commit(StateKeys.CURRENT_SEARCH_SET, search);
        },

        [StateKeys.CURRENT_PRODUCT_SET]({ commit }, product: Product) {
            commit(StateKeys.CURRENT_PRODUCT_SET, product);
        },

        async [StateKeys.SEARCH_SETTINGS_SET](
            { commit }, search: SearchAppState) {

            commit(StateKeys.SEARCH_SETTINGS_SET, search);

            await StateCacheService.setSearchSettings(search);
        },

        async [StateKeys.SHOPPING_LIST_PRODUCT_UPDATE](
            { commit, state }, product: Product) {

            commit(StateKeys.SHOPPING_LIST_PRODUCTS_ADD, product);

            const productIdKey = AppStateMapper.mapProductId(product.id);

            if (product.isChecked) {
                const checked = state.shoppingList.checked;
                checked.add(productIdKey);

                commit(StateKeys.SHOPPING_LIST_CHECKED_SET, checked);

                const unchecked = state.shoppingList.unchecked;
                unchecked.delete(productIdKey);

                commit(StateKeys.SHOPPING_LIST_UNCHECKED_SET, unchecked);
            }
            else {
                const unchecked = state.shoppingList.unchecked;
                unchecked.add(productIdKey);

                commit(StateKeys.SHOPPING_LIST_UNCHECKED_SET, unchecked);

                const checked = state.shoppingList.checked;
                checked.delete(productIdKey);

                commit(StateKeys.SHOPPING_LIST_CHECKED_SET, checked);
            }

            await StateCacheService
                .setShoppingListProducts(state.shoppingList.products);

            await StateCacheService
                .setShoppingListUnchecked(state.shoppingList.unchecked);

            await StateCacheService
                .setShoppingListChecked(state.shoppingList.checked);
        },

        async [StateKeys.SHOPPING_LIST_PRODUCTS_ADD](
            { commit, state }, product: Product) {

            commit(StateKeys.SHOPPING_LIST_PRODUCTS_ADD, product);

            const unchecked = state.shoppingList.unchecked;
            unchecked.add(AppStateMapper.mapProductId(product.id));

            commit(StateKeys.SHOPPING_LIST_UNCHECKED_SET, unchecked);

            await StateCacheService
                .setShoppingListProducts(state.shoppingList.products);

            await StateCacheService.setShoppingListUnchecked(unchecked);
        },

        async [StateKeys.SHOPPING_LIST_PRODUCTS_REMOVE](
            { commit, state }, productId: string) {

            commit(StateKeys.SHOPPING_LIST_PRODUCTS_REMOVE, productId);

            const productIdKey = AppStateMapper.mapProductId(productId);

            const unchecked = state.shoppingList.unchecked;
            unchecked.delete(productIdKey);

            commit(StateKeys.SHOPPING_LIST_UNCHECKED_SET, unchecked);

            const checked = state.shoppingList.checked;
            checked.delete(productIdKey);

            commit(StateKeys.SHOPPING_LIST_CHECKED_SET, checked);

            await StateCacheService
                .setShoppingListProducts(state.shoppingList.products);

            await StateCacheService.setShoppingListUnchecked(unchecked);
            await StateCacheService.setShoppingListChecked(checked);
        },

        async [StateKeys.SHOPPING_LIST_UNCHECKED_SET](
            { commit }, products: Set<string>) {

            commit(StateKeys.SHOPPING_LIST_UNCHECKED_SET, products);

            await StateCacheService.setShoppingListUnchecked(products);
        },

        async [StateKeys.SHOPPING_LIST_CHECKED_SET](
            { commit }, products: Set<string>) {

            commit(StateKeys.SHOPPING_LIST_CHECKED_SET, products);

            await StateCacheService.setShoppingListChecked(products);
        },

        async [StateKeys.SELECTED_SHOP_SET]({ commit }, shop: Shop) {
            commit(StateKeys.SELECTED_SHOP_SET, shop);

            const { longitude, latitude } = shop.location;

            const map = await API.getStaticMapLocation(longitude, latitude);

            if (!(map instanceof Error)) {
                shop.location.mapImage = map;
            }

            await StateCacheService.setSelectedShop(shop);
        },

        async [StateKeys.USER_SET]({ commit }, user: User | null) {
            commit(StateKeys.USER_SET, user);

            await StateCacheService.setUser(user);
        },
    },
});

export default AppStore;
