import { reactive, ref, watch } from 'vue';

import { Product } from '@/model/Product.model';

import { CacheService } from '@/service/Cache.service';

export interface ShoppingListSettings {
    isCheckedProductsVisible: boolean;
}

const mapId = (id: string) => `id-${id}`;

const productsCacheKey = 'SHOPPING_LIST_PRODUCTS';
const uncheckedCacheKey = 'SHOPPING_LIST_UNCHECKED';
const checkedCacheKey = 'SHOPPING_LIST_CHECKED';

const products = ref<Record<string, Product>>({});
const unchecked = ref<Array<string>>([]);
const checked = ref<Array<string>>([]);

(async () => {
    const cachedProducts = await CacheService.get<Record<string, Product>>(productsCacheKey);
    if (cachedProducts !== null)
        products.value = cachedProducts;

    const cachedUnchecked = await CacheService.get<Array<string>>(uncheckedCacheKey);
    if (cachedUnchecked !== null)
        unchecked.value = cachedUnchecked;

    const cachedChecked = await CacheService.get<Array<string>>(checkedCacheKey);
    if (cachedChecked !== null)
        checked.value = cachedChecked;
})();

watch(products, async (products) => {
    await CacheService.set(productsCacheKey, products);
}, {
    deep: true,
});

watch(unchecked, async (unchecked) => {
    await CacheService.set(uncheckedCacheKey, unchecked);
}, {
    deep: true,
});

watch(checked, async (checked) => {
    await CacheService.set(checkedCacheKey, checked);
}, {
    deep: true,
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
}, {
    deep: true,
});

export function useShoppingList() {
    return {
        products,
        unchecked,
        checked,
        settings,

        async add(product: Product) {
            const id = mapId(product.id);

            products.value[id] = product;
            unchecked.value.push(id);

            await CacheService.set(productsCacheKey, products.value);
            await CacheService.set(uncheckedCacheKey, unchecked.value);
        },

        async remove(product: Product) {
            const id = mapId(product.id);

            delete products.value[id];
            unchecked.value = unchecked.value.filter(x => x !== id);
            checked.value = checked.value.filter(x => x !== id);

            await CacheService.set(productsCacheKey, products.value);
            await CacheService.set(uncheckedCacheKey, unchecked.value);
            await CacheService.set(checkedCacheKey, checked.value);
        },

        async update(product: Product) {
            const id = mapId(product.id);

            products.value[id] = product;

            await CacheService.set(productsCacheKey, products.value);
        },

        isInShoppingList(product: Product) {
            const id = mapId(product.id);

            return id in products.value;
        },

        isInUnchecked(product: Product) {
            const id = mapId(product.id);

            return unchecked.value.indexOf(id) > -1;
        },

        async toggleChecked(product: Product) {
            const id = mapId(product.id);
            const productIndex = unchecked.value.indexOf(id);

            if (productIndex > -1) {
                unchecked.value = unchecked.value.filter(x => x !== id);
                checked.value.push(id);

                product.listPosition = productIndex;
                this.update(product);
            }
            else {
                checked.value = checked.value.filter(x => x !== id);
                unchecked.value.splice(product.listPosition, 0, id);
            }
        },
    }
}
