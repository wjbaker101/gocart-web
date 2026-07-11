<template>
    <div
        :class="{
            'translate-y-0 pointer-events-auto opacity-100': isVisible,
            'translate-y-full pointer-events-none opacity-0': !isVisible,
        }"
        class="bottom-4 left-1/2 z-101 fixed items-center grid grid-cols-[auto_1fr] bg-slate-100 shadow-lg rounded-lg -translate-x-1/2"
    >

        <template v-if="type === 'success'">
            <div class="bg-green-600/30 p-4 border-green-300 border-r rounded-l-lg">
                <CircleCheckIcon class="size-6" />
            </div>
            <div class="bg-green-600/10 p-4 align-middle">
                {{ message }}
            </div>
        </template>

        <template v-else-if="type === 'error'">
            <div class="bg-red-600/30 p-4 border-red-300 border-r rounded-l-lg">
                <AlertTriangleIcon class="size-6" />
            </div>
            <div class="bg-red-600/10 p-4 align-middle">
                {{ message }}
            </div>
        </template>

        <template v-else-if="type === 'info'">
            <div class="bg-slate-200 p-4 border-slate-300 border-r rounded-l-lg">
                <CircleAlertIcon class="size-6" />
            </div>
            <div class="p-4 align-middle">
                {{ message }}
            </div>
        </template>

    </div>
</template>

<script setup lang="ts">
import { CircleAlertIcon, CircleCheckIcon, AlertTriangleIcon } from '@lucide/vue';

import type { IToastPopOptions } from '~~/modules';

type ToastType = IToastPopOptions['type'];

const toast = useToast();

const isVisible = ref(false);
const type = ref<ToastType>('error');
const message = ref('asdasd');

const timeout = ref<NodeJS.Timeout | null>(null);

toast.onPop((options) => {
    type.value = options.type;
    message.value = options.message;

    isVisible.value = true;

    if (timeout.value !== null) {
        clearTimeout(timeout.value);
    }

    timeout.value = setTimeout(() => {
        isVisible.value = false;
        timeout.value = null;
    }, 6000);
});
</script>