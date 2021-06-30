import { createStore } from 'vuex';

import { StateCacheService } from '@/service/StateCache.service';

import { AppState, SearchAppState, ShoppingListSettingsState } from '@/store/type/AppState.model';
import { StateKeys } from '@/store/type/StateKeys';
import { Product } from '@/model/Product.model';
import { SortOptionType } from '@/model/SortOption.model';
import { User } from '@/model/User.model';

export const AppStateMapper = {

    mapProductId(productId: string) {
        return `id-${productId}`;
    }
}

const AppStore = createStore<AppState>({

    state: {
        currentSearch: null,

        searchSettings: {
            sortOption: SortOptionType.ALPHABETICAL,
        },

        shoppingList: {
            products: {},
            unchecked: new Set<string>(),
            checked: new Set<string>(),
            settings: {
                isCheckedItemsVisible: true,
            },
        },

        user: null,
    },

    getters: {
        currentSearch: state => state.currentSearch,

        searchSortOption: state => state.searchSettings.sortOption,

        shoppingList: state => state.shoppingList.products,
        uncheckedProductList: state => state.shoppingList.unchecked,
        checkedProductList: state => state.shoppingList.checked,
        shoppingListSettings: state => state.shoppingList.settings,

        user: state => state.user,
    },

    mutations: {
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

        [StateKeys.SHOPPING_LIST_SETTINGS_SET](
            state: AppState, settings: ShoppingListSettingsState) {

            state.shoppingList.settings = settings;
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

            const shoppingListSettings = await StateCacheService.getShoppingListSettings();

            if (shoppingListSettings !== null) {
                commit(StateKeys.SHOPPING_LIST_SETTINGS_SET, shoppingListSettings);
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

        async [StateKeys.SHOPPING_LIST_SETTINGS_SET](
            { commit }, settings: ShoppingListSettingsState) {

            commit(StateKeys.SHOPPING_LIST_SETTINGS_SET, settings);

            await StateCacheService.setShoppingListSettings(settings);
        },

        async [StateKeys.USER_SET]({ commit }, user: User | null) {
            commit(StateKeys.USER_SET, user);

            await StateCacheService.setUser(user);
        },
    },
});

export default AppStore;
