import { createStore } from 'vuex';

import { StateCacheService } from '@/service/StateCache.service';

import { AppState } from '@/store/type/AppState.model';
import { StateKeys } from '@/store/type/StateKeys';
import { User } from '@/model/User.model';

export const AppStateMapper = {

    mapProductId(productId: string) {
        return `id-${productId}`;
    }
}

const AppStore = createStore<AppState>({

    state: {
        user: null,
    },

    getters: {
        user: state => state.user,
    },

    mutations: {
        [StateKeys.USER_SET](state: AppState, user: User | null) {
            state.user = user;
        },
    },

    actions: {
        async INIT({ commit }) {
            const user = await StateCacheService.getUser();

            if (user !== null) {
                commit(StateKeys.USER_SET, user);
            }
        },

        async [StateKeys.USER_SET]({ commit }, user: User | null) {
            commit(StateKeys.USER_SET, user);

            await StateCacheService.setUser(user);
        },
    },
});

export default AppStore;
