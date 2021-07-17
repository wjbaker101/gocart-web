import { onBeforeMount, onBeforeUnmount, onMounted, reactive } from 'vue';

const scrollPositions = reactive(new Map<string, number>());

export function useScrollPosition(viewId: string) {

    const scrollEventListener = () => {
        scrollPositions.set(viewId, window.scrollY);
    };

    onBeforeMount(() => {
        window.addEventListener('scroll', scrollEventListener);
    });

    onMounted(() => {
        window.scrollTo(0, scrollPositions.get(viewId) || 0);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', scrollEventListener);
    });

    return {}
}
