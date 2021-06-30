import { reactive } from 'vue';

import { UserState } from '@/use/appStore/state/User.state';

import { CacheService } from '@/service/Cache.service';

const cacheStateKey = {
    USER: 'USER',
};

export interface AppState {
    user: UserState;
};

const state: AppState = reactive<AppState>({
    user: {
        user: null,
    },
});

(async () => {
    const user = await CacheService.get<UserState>(cacheStateKey.USER);
    if (user !== null)
        state.user = user;
})();

export function useAppStore() {
    return {
        state,
    }
}
