<template>
    <NuxtLayout>
        <NuxtPage></NuxtPage>
    </NuxtLayout>
    <ModalComponent />
</template>

<script setup lang="ts">
import ModalComponent from '~/components/modals/ModalComponent.vue';

if (import.meta.client) {
    init();
}

function init() {
    const cache = localStorage.getItem('useShoppingList');
    if (cache === null) {
        return;
    }

    useShoppingList().init(JSON.parse(cache));
}
</script>

<style lang="css">
@reference '~/styling/main.css';

html,
body,
#__nuxt {
    @apply h-full;
}

body {
    @apply bg-slate-100 text-slate-600 transition-none;

    font-family: 'Nunito', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    &.hide-scroll {
        @apply overflow-hidden;
    }
}

*,
*::before,
*::after {
    @apply transition-all;
}
</style>