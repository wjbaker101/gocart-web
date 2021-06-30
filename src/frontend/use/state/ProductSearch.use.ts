import { ref, watch } from 'vue';

import { SortOptionType } from '@/model/SortOption.model';
import { Product } from '@/model/Product.model';

import { CacheService } from '@/service/Cache.service';

export interface ProductSearchSettings {
    sortOption: SortOptionType;
}

const cacheKey = 'PRODUCT_SEARCH_SETTINGS';
const settings = ref<ProductSearchSettings>({
    sortOption: SortOptionType.PRICE,
});

(async () => {
    const cachedSettings = await CacheService.get<ProductSearchSettings>(cacheKey);
    if (cachedSettings !== null)
        settings.value = cachedSettings;
})();

watch(settings, async (settings) => {
    await CacheService.set(cacheKey, settings);
}, {
    deep: true,
});

const searchTerm = ref<string | null>(null);
const products = ref<Array<Product> | null>(null);

export function useProductSearch() {
    return {
        searchTerm,
        products,
        settings,
    }
}
