<template>
    <div ref="containerEl" class="relative">
        <label class="grid grid-cols-[auto_1fr] shadow-md mb-4 rounded-xl rela">
            <div class="place-items-center grid bg-slate-100 px-4 py-2 border-slate-200 border-r rounded-l-xl">
                <Loader2Icon v-if="isLoading" class="size-4 animate-spin" />
                <SearchIcon v-else class="size-4" />
            </div>
            <input ref="searchTermEl" v-model="searchTerm" type="text" placeholder="Cheltenham" class="bg-slate-50 px-4 py-3 rounded-r-xl outline-none w-full">
        </label>
        <div v-if="showResults && results.length > 0" class="right-0 -bottom-2 left-0 z-1 absolute bg-slate-50 shadow-lg rounded-xl overflow-hidden translate-y-full">
            <BaseButtonComponent v-for="result in results" @click="choose(result)" class="hover:bg-slate-200 p-4 w-full text-left">{{ result.fullName }}</BaseButtonComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useEventListener, useFocus, watchDebounced, whenever } from '@vueuse/core';
import { Loader2Icon, SearchIcon } from '@lucide/vue';

import type { IMapboxGeocodingResponse } from '~/pages/shop/_logic/GeolocateResponse';

const emit = defineEmits(['choose']);

const searchTermEl = useTemplateRef('searchTermEl');
const { focused } = useFocus(searchTermEl);
const containerEl = useTemplateRef('containerEl');

interface IResult {
    readonly fullName: string;
    readonly latitude: number;
    readonly longitude: number;
}

const searchTerm = ref('');
const isLoading = ref(false);
const showResults = ref(false);
const preventSearch = ref(false);

const results = ref<Array<IResult>>([]);

async function search() {
    if (preventSearch.value) {
        preventSearch.value = false;
        return;
    }

    if (searchTerm.value.length < 3) {
        return;
    }

    isLoading.value = true;

    const response = await $fetch<IMapboxGeocodingResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchTerm.value)}.json`, {
        query: {
            access_token: 'pk.eyJ1Ijoid2piYWtlciIsImEiOiJjbXJkeGh1cTMwaGY3MnpxdndjejZyZGxuIn0.6pplaKZLwX9Oi5FLyQgLag',
            language: 'en',
            limit: 5,
            country: 'IE,GB',
            types: 'address,postcode,place,region,district,locality',
        },
    });

    isLoading.value = false;
    showResults.value = true;

    results.value = response.features.map(x => ({
        fullName: x.place_name,
        latitude: x.center[1],
        longitude: x.center[0],
    }));
}

function choose(result: IResult) {
    searchTerm.value = result.fullName;
    showResults.value = false;
    preventSearch.value = true;

    emit('choose', {
        latitude: result.latitude,
        longitude: result.longitude,
    });
}

useEventListener('click', (event) => {
    if (!showResults.value) {
        return;
    }

    if (containerEl.value?.contains(event.target as Node)) {
        return;
    }

    showResults.value = false;
});

watchDebounced(searchTerm, async () => {
    await search();
}, {
    debounce: 500,
});

whenever(focused, () => {
    showResults.value = true;
});
</script>