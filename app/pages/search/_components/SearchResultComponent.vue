<template>
    <div :key="result.tpnc" @click="open" class="items-center gap-4 grid grid-cols-[auto_1fr_auto_auto] bg-slate-50 shadow-inner/7 p-2 pr-4 rounded-xl cursor-pointer">
        <img :src="result.imageUrl" width="60" height="60" class="shadow-[0_0_3px_4px_white]">
        <h3>{{ result.name }}</h3>
        <div class="font-mono font-bold">£{{ result.price.toFixed(2) }}</div>
        <input v-model="isChecked" type="checkbox">
    </div>
</template>

<script setup lang="ts">
import SearchResultModalComponent from '~/pages/search/_components/SearchResultModalComponent.vue';

import type { ISearchResult } from '~/pages/search/_logic/ISearchResult';

const { result } = defineProps<{
    result: ISearchResult;
}>();

const modal = useModal();

const isChecked = ref(false);

function open() {
    modal.show({
        component: SearchResultModalComponent,
        props: {
            result,
        },
    });
}

watch(isChecked, () => {
    // shoppingList.swapItem({
    //     tpnc: result.tpnc,
    //     name: result.name,
    //     price: result.price,
    //     imageUrl: result.imageUrl,
    //     quantity: 1,
    // });
});
</script>