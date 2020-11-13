import { computed } from 'vue';
import { useStore } from 'vuex';

import { AppStateMapper } from '@/store/AppStore';

import { AppState } from '@/store/type/AppState.model';
import { StateKeys } from '@/store/type/StateKeys';
import { Product } from '@/model/Product.model';

export const UseShoppingListChecked = function (product: Product) {
    const store = useStore<AppState>();

    const isShoppingListChecked = computed<boolean>({
        get: () => product.isChecked,
        set(newIsChecked: boolean) {
            product.isChecked = newIsChecked;

            if (!newIsChecked) {
                product.addCount++;
            }

            store.dispatch(
                StateKeys.SHOPPING_LIST_PRODUCT_UPDATE,
                product);
        },
    });

    return {
        isChecked: isShoppingListChecked,
    }
}

export const UseForSeachChecked = function(product: Product) {
    const store = useStore<AppState>();

    const shoppingList = computed<Record<string, Product>>(
        () => store.getters.shoppingList);

    const isForSearchChecked = computed<boolean>({
        get: () => AppStateMapper.mapProductId(product.id) in shoppingList.value,
        set(newIsInShoppingList: boolean) {
            if (newIsInShoppingList) {
                store.dispatch(
                    StateKeys.SHOPPING_LIST_PRODUCTS_ADD,
                    product);
            }
            else {
                store.dispatch(
                    StateKeys.SHOPPING_LIST_PRODUCTS_REMOVE,
                    product.id);
            }
        },
    });

    return {
        isChecked: isForSearchChecked,
    }
}
