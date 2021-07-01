import { ref, watch } from 'vue';

import { Shop } from '@/model/Shop.model';
import { CacheService } from '@/service/Cache.service';

const cacheKey = 'SHOP';
const shop = ref<Shop | null>(null);

(async () => {
    const cachedShop = await CacheService.get<Shop>(cacheKey);
    if (cachedShop !== null)
        shop.value = cachedShop;
})();

watch(shop, async (shop) => {
    await CacheService.set(cacheKey, shop);
}, {
    deep: true,
});

export function useSelectedShop() {
    return {
        shop,
    }
}
