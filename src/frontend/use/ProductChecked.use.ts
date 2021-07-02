import { computed } from 'vue';

import { useShoppingList } from '@/use/state/ShoppingList.use';

import { Product } from '@/model/Product.model';

export const UseShoppingListChecked = function (product: Product) {
    const shoppingList = useShoppingList();

    const isShoppingListChecked = computed<boolean>({
        get() {
            return !shoppingList.isInUnchecked(product);
        },
        set(newIsChecked: boolean) {
            shoppingList.toggleChecked(product);

            if (!newIsChecked)
                product.addCount++;
        },
    });

    return {
        isChecked: isShoppingListChecked,
    }
}

export const UseForSeachChecked = function(product: Product) {
    const shoppingList = useShoppingList();

    const isForSearchChecked = computed<boolean>({
        get() {
            return shoppingList.isInShoppingList(product);
        },
        set(newIsInShoppingList: boolean) {
            if (newIsInShoppingList)
                shoppingList.add(product);
            else
                shoppingList.remove(product);
        },
    });

    return {
        isChecked: isForSearchChecked,
    }
}
