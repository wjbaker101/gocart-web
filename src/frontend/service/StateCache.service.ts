import { CacheService } from '@/service/Cache.service';

import { StateKeys } from '@/store/type/StateKeys';
import { SearchAppState } from '@/store/type/AppState.model';
import { Product } from '@/model/Product.model';
import { Shop } from '@/model/Shop.model';
import { User } from '@/model/User.model';

export const StateCacheService = {

    async getShoppingListProducts(): Promise<Record<string, Product> | null> {
        return await CacheService.get<Record<string, Product>>(
            StateKeys.SHOPPING_LIST_PRODUCTS);
    },

    async setShoppingListProducts(
        products: Record<string, Product>): Promise<void> {

        return await CacheService.set(
            StateKeys.SHOPPING_LIST_PRODUCTS, products);
    },

    async getSearchSettings(): Promise<SearchAppState | null> {
        return await CacheService.get<SearchAppState>(
            StateKeys.SEARCH_SETTINGS);
    },

    async setSearchSettings(search: SearchAppState): Promise<void> {
        return await CacheService.set(StateKeys.SEARCH_SETTINGS, search);
    },

    async getShoppingListUnchecked(): Promise<Set<string> | null> {
        const data = await CacheService.get<string[]>(
            StateKeys.SHOPPING_LIST_UNCHECKED);

        if (data === null)
            return null;

        return new Set([ ...data ]);
    },

    async setShoppingListUnchecked(products: Set<string>): Promise<void> {
        const data = Array.from(products.keys());

        return await CacheService.set(
            StateKeys.SHOPPING_LIST_UNCHECKED, data);
    },

    async getShoppingListChecked(): Promise<Set<string> | null> {
        const data = await CacheService.get<string[]>(
            StateKeys.SHOPPING_LIST_CHECKED);

        if (data === null)
            return null;

        return new Set([ ...data ]);
    },

    async setShoppingListChecked(products: Set<string>): Promise<void> {
        const data = Array.from(products.keys());

        return await CacheService.set(
            StateKeys.SHOPPING_LIST_CHECKED, data);
    },

    async getSelectedShop(): Promise<Shop | null> {
        return await CacheService.get<Shop>(StateKeys.SELECTED_SHOP);
    },

    async setSelectedShop(shop: Shop): Promise<void> {
        return await CacheService.set(StateKeys.SELECTED_SHOP, shop);
    },

    async getUser(): Promise<User | null> {
        return await CacheService.get<User>(StateKeys.USER);
    },

    async setUser(user: User | null): Promise<void> {
        if (user === null)
            return await CacheService.delete(StateKeys.USER);

        return await CacheService.set(StateKeys.USER, user);
    },
}
