import { onBeforeMount, onBeforeUnmount, onMounted } from 'vue';
import { useStore } from 'vuex';

import { AppState } from '@/store/type/AppState.model';

export const UseScrollPosition = function (viewId: string) {
    const store = useStore<AppState>();

    const currentScrollPositions =
        store.getters.currentScrollPositions as Map<string, number>;

    const scrollEventListener = () => {
        currentScrollPositions.set(viewId, window.scrollY);
    };

    onBeforeMount(() => {
        window.addEventListener('scroll', scrollEventListener);
    });

    onMounted(() => {
        window.scrollTo(0, currentScrollPositions.get(viewId) || 0);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', scrollEventListener);
    });

    return {}
}
