import { CacheService } from '@/service/Cache.service';

import { StateKeys } from '@/store/type/StateKeys';
import { User } from '@/model/User.model';

export const StateCacheService = {

    async getUser(): Promise<User | null> {
        return await CacheService.get<User>(StateKeys.USER);
    },

    async setUser(user: User | null): Promise<void> {
        if (user === null)
            return await CacheService.delete(StateKeys.USER);

        return await CacheService.set(StateKeys.USER, user);
    },
}
