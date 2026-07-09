<template>
    <div class="items-center gap-4 grid grid-cols-[auto_1fr] bg-slate-50 shadow-inner/7 p-4 rounded-xl cursor-pointer">
        <div>
            <div class="relative">
                <StoreIcon class="size-6" />
                <div
                    :class="{
                        'bg-green-500': result.isOpenNow,
                        'bg-red-600': !result.isOpenNow,
                    }"
                    class="-right-1 -bottom-1 absolute border-3 border-slate-50 rounded-full size-3.5"
                ></div>
            </div>
        </div>
        <div>
            <p class="mb-2 font-bold text-sm">{{ result.type }}</p>
            <h2 class="text-xl">{{ result.branchName }}</h2>
        </div>
    </div>
</template>

<script setup lang="ts">
import { StoreIcon } from '@lucide/vue';

import type { ITescoSearchShopResult } from '~~/server/api/tesco/search-shops.get';

defineProps<{
    result: ITescoSearchShopResult;
}>();
</script>