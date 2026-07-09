<template>
    <div class="mx-auto py-4 w-[calc(100%-1rem)] max-w-4xl">
        <label class="grid grid-cols-[auto_1fr] shadow-md mb-4 rounded-xl">
            <div class="place-items-center grid bg-slate-100 px-4 py-2 border-slate-200 border-r rounded-l-xl">
                <Loader2Icon v-if="isLoading" class="size-4 animate-spin" />
                <SearchIcon v-else class="size-4" />
            </div>
            <input v-model="searchTerm" type="text" placeholder="Apple Strudel" class="bg-slate-50 px-4 py-3 rounded-r-xl outline-none w-full">
        </label>
        <div v-if="results.length > 0" class="gap-2 grid">
            <SearchResultComponent v-for="result in results" :key="result.tpnc" :result />
        </div>
        <div v-else class="mt-16">
            <TextSearchIcon class="mx-auto mb-4 size-16" />
            <h2 class="mb-4 font-bold text-2xl text-center">Search Products</h2>
            <p class="text-center">
                <span class="align-middle">Add to your list or tap a product to learn more.</span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { SearchIcon, TextSearchIcon, Loader2Icon } from '@lucide/vue';
import { watchDebounced } from '@vueuse/core';

import SearchResultComponent from '~/pages/search/_components/SearchResultComponent.vue';

import type { ISearchResult } from '~/pages/search/_logic/ISearchResult';

import { productSearchQuery } from '~~/shared/schemas/ProductSearch';

definePageMeta({
    middleware: ['require-auth'],
});

const searchTerm = ref('');
const isLoading = ref(false);

const results = ref<Array<ISearchResult>>([]);

async function search() {
    const query = productSearchQuery.safeParse({
        searchTerm: searchTerm.value,
    });
    if (query.error) {
        return;
    }

    isLoading.value = true;

    const response = await $fetch('/api/products/search', {
        query: query.data,
    });

    isLoading.value = false;

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