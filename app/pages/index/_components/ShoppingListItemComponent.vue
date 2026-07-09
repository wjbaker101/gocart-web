<template>
    <div class="items-center gap-4 grid grid-cols-[auto_1fr_auto_4rem_auto] max-md:grid-cols-[auto_1fr_1fr] bg-slate-50 shadow-inner/5 p-2 pr-4 rounded-xl text-left">
        <img :src="item.data.imageUrl" width="60" height="60" class="place-self-center shadow-[0_0_3px_4px_white]">
        <h3 class="max-md:col-span-2">{{ item.data.name }}</h3>
        <div>
            <ItemQuantityComponent v-if="!item.isChecked" :item />
        </div>
        <div class="font-bold text-right">£{{ totalPrice.toFixed(2) }}</div>
        <BaseButtonComponent
            @click="check"
            :class="{
                'bg-primary': item.isChecked,
            }"
            class="group justify-self-end place-items-center grid border border-primary rounded-md! size-7"
        >
            <ArrowBigUpIcon v-if="item.isChecked" class="size-4 text-text-light" />
            <CheckIcon v-else class="opacity-0 group-hover:opacity-20 size-4" />
        </BaseButtonComponent>
    </div>
</template>

<script setup lang="ts">
import { CheckIcon, ArrowBigUpIcon } from '@lucide/vue';

import { updateShoppingListItem } from '~~/shared/schemas/updateShoppingListItem';

const { item } = defineProps<{
    item: IShoppingListItem;
}>();

const totalPrice = computed(() => item.data.price * item.quantity);

async function check() {
    item.isChecked = !item.isChecked;

    await $fetch(`/api/shopping-list/items/${item.reference}`, {
        method: 'put',
        body: validateRequest(updateShoppingListItem, {
            quantity: item.quantity,
            isChecked: item.isChecked,
        }),
    });
}
</script>