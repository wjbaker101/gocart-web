<template>
    <div class="bg-slate-100 shadow-xl rounded-xl">
        <div class="items-center grid grid-cols-[1fr_auto] bg-slate-200 px-4 py-2 border-slate-300 border-b rounded-t-xl">
            <div>
                <slot name="header"></slot>
            </div>
            <BaseButtonComponent @click="hide" class="place-items-center grid hover:bg-slate-300 -mr-2 p-2">
                <XIcon />
            </BaseButtonComponent>
        </div>
        <div class="p-4">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { XIcon } from '@lucide/vue';

const modal = useModal();

function hide() {
    modal.hide();
}
</script>