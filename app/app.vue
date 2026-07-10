<template>
    <NuxtPwaManifest />
    <NuxtLayout>
        <NuxtPage></NuxtPage>
    </NuxtLayout>
    <ModalComponent />
</template>

<script setup lang="ts">
import ModalComponent from '~/components/modals/ModalComponent.vue';

const shoppingList = useShoppingList();

await callOnce(async () => {
    const session = await authClient.useSession(useFetch);

    if (session.data.value) {
        const response = await useRequestFetch()('/api/shopping-list');
        
        shoppingList.value = {
            items: response.items.map(x => ({
                reference: x.reference,
                createdAt: x.createdAt,
                quantity: x.quantity,
                listOrder: x.listOrder,
                isChecked: x.isChecked,
                data: x.data,
            })),
        };
    }
});
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