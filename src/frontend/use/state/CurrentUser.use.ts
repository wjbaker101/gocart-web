import { ref, watch } from 'vue';

import { User } from '@/model/User.model';
import { CacheService } from '@/service/Cache.service';

const cacheKey = 'USER';
const user = ref<User | null>(null);

watch(user, async (user) => {
    await CacheService.set(cacheKey, user);
}, {
    deep: true,
});

export function useCurrentUser() {
    return {
        user,
    }
}
