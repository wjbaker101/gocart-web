import { ref, watch } from 'vue';

import { Product } from '@/model/Product.model';

import { CacheService } from '@/service/Cache.service';

export interface ShoppingListSettings {
    isCheckedProductsVisible: boolean;
}

const shoppingListCacheKey = 'SHOPPING_LIST';
const list = ref<Array<Product>>([]);

(async () => {
    const cachedList = await CacheService.get<Array<Product>>(shoppingListCacheKey);
    if (cachedList !== null)
        list.value = cachedList;
})();

watch(list, async (shoppingList) => {
    await CacheService.set(shoppingListCacheKey, shoppingList);
});

const settingsListCacheKey = 'SHOPPING_LIST_SETTINGS';
const settings = ref<ShoppingListSettings>({
    isCheckedProductsVisible: true,
});

(async () => {
    const cachedSettings = await CacheService.get<ShoppingListSettings>(settingsListCacheKey);
    if (cachedSettings !== null)
        settings.value = cachedSettings;
})();

watch(settings, async (settings) => {
    await CacheService.set(settingsListCacheKey, settings);
});

export function useShoppingList() {
    return {
        shoppingList: list,
        settings,

        async add(product: Product) {
            list.value.push(product);

            await CacheService.set(shoppingListCacheKey, list.value);
        },

        async remove(product: Product) {
            list.value = list.value.filter(x => x.id !== product.id);

            await CacheService.set(shoppingListCacheKey, list.value);
        },

        async update(product: Product) {
            const existingProduct = list.value.find(x => x.id === product.id);

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

            await CacheService.set(shoppingListCacheKey, list.value);
        },
    }
}
