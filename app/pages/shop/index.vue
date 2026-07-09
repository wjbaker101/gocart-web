<template>
    <div class="mx-auto py-4 w-[calc(100%-1rem)] max-w-4xl">
        <LocationSearchComponent @choose="chooseLocation" />
        <div v-if="results.length > 0" class="gap-2 grid">
            <TescoShopComponent v-for="result in results" :key="result.branchName" :result />
        </div>
        <div v-else class="mt-16">
            <MapPinSearchIcon class="mx-auto mb-4 size-16" />
            <h2 class="mb-4 font-bold text-2xl text-center">Find Shop</h2>
            <p class="text-center">
                <span class="align-middle">Choose a primary shop or find a nearby one.</span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { MapPinSearchIcon } from '@lucide/vue';

import LocationSearchComponent from '~/pages/shop/_components/LocationSearchComponent.vue';
import TescoShopComponent from '~/pages/shop/_components/TescoShopComponent.vue';

import type { ITescoSearchShopResult } from '~~/server/api/tesco/search-shops.get';

definePageMeta({
    middleware: ['require-auth'],
});

const isLoading = ref(false);

const results = ref<Array<ITescoSearchShopResult>>([]);

async function chooseLocation(event: { latitude: number; longitude: number; }) {
    isLoading.value = true;

    const response = await $fetch('/api/tesco/search-shops', {
        query: {
            latitude: event.latitude,
            longitude: event.longitude,
        },
    });

    isLoading.value = false;

    results.value = response.results;
}
</script>