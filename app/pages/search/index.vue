<template>
    <div class="mx-auto py-4 w-[calc(100%-1rem)] max-w-4xl">
        <div class="grid grid-cols-[1fr_auto] shadow-md mb-4 rounded-xl">
            <input v-model="searchTerm" type="text" placeholder="Apple Strudel" class="bg-slate-50 px-4 py-3 rounded-l-xl outline-none w-full">
            <div @click="search" class="group place-items-center grid bg-primary px-4 py-2 rounded-r-xl text-text-light cursor-pointer">
                <div class="group-active:scale-95">
                    <SearchIcon class="size-4" />
                </div>
            </div>
        </div>
        <div class="gap-2 grid">
            <SearchResultComponent v-for="result in results" :key="result.tpnc" :result />
        </div>
    </div>
</template>

<script setup lang="ts">
import { SearchIcon } from '@lucide/vue';
import { watchDebounced } from '@vueuse/core';

import SearchResultComponent from '~/pages/search/_components/SearchResultComponent.vue';

import type { ISearchResult } from '~/pages/search/_logic/ISearchResult';

import { productSearchQuery } from '~~/shared/schemas/ProductSearch';

definePageMeta({
    middleware: ['require-auth'],
});

const searchTerm = ref('');

const results = ref<Array<ISearchResult>>([]);

async function search() {
    const query = productSearchQuery.safeParse({
        searchTerm: searchTerm.value,
    });
    if (query.error) {
        return;
    }

    const response = await $fetch('/api/products/search', {
        query: query.data,
    });

    results.value = response.data.search.results.map(x => ({
        tpnc: x.node.tpnc,
        name: x.node.title,
        price: x.node.sellers.results[0]?.price.actual ?? 0,
        imageUrl: x.node.defaultImageUrl,
        pricePer: {
            amount: x.node.sellers.results[0]?.price.unitPrice ?? 0,
            unit: x.node.sellers.results[0]?.price.unitOfMeasure ?? '',
        },
    }));
}

watchDebounced(searchTerm, async () => {
    await search();
}, {
    debounce: 500,
});
</script>