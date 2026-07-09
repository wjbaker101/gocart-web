<template>
    <div :key="result.tpnc" @click="open" class="items-center gap-4 grid grid-cols-[auto_1fr_auto_auto_auto] bg-slate-50 shadow-inner/7 p-2 pr-4 rounded-xl cursor-pointer">
        <img :src="result.imageUrl" width="60" height="60" class="shadow-[0_0_3px_4px_white]">
        <h3>{{ result.name }}</h3>
        <div>
            <ItemQuantityComponent v-if="item !== null && !item.isChecked" :item />
        </div>
        <div class="font-bold">£{{ result.price.toFixed(2) }}</div>
        <BaseButtonComponent
            @click.stop="check"
            :class="{
                'bg-primary': item !== null,
            }"
            class="justify-self-end place-items-center grid border border-primary rounded-md! size-7 text-text-light"
        >
            <ArrowBigUpIcon v-if="item !== null && item.isChecked" class="size-4" />
            <CheckIcon v-else-if="item !== null" class="size-4" />
        </BaseButtonComponent>
    </div>
</template>

<script setup lang="ts">
import { ArrowBigUpIcon, CheckIcon } from '@lucide/vue';

import SearchResultModalComponent from '~/pages/search/_components/SearchResultModalComponent.vue';

import type { ISearchResult } from '~/pages/search/_logic/ISearchResult';

import { addShoppingListItem } from '~~/shared/schemas/AddShoppingListItem';
import { updateShoppingListItem } from '~~/shared/schemas/UpdateShoppingListItem';

const { result } = defineProps<{
    result: ISearchResult;
}>();

const modal = useModal();
const shoppingList = useShoppingList();

const item = computed(() => shoppingList.value.items.find(x => x.data.tpnc === result.tpnc) ?? null);

function open() {
    modal.show({
        component: SearchResultModalComponent,
        props: {
            result,
        },
    });
}

async function check() {
    if (item.value === null) {
        const response = await $fetch(`/api/shopping-list/items`, {
            method: 'post',
            body: validateRequest(addShoppingListItem, {
                tpnc: result.tpnc,
                quantity: 1,
            }),
        });
    
        shoppingList.value.items.push(response.item);

        return;
    }

    if (item.value.isChecked) {
        await $fetch(`/api/shopping-list/items/${item.value.reference}`, {
            method: 'put',
            body: validateRequest(updateShoppingListItem, {
                quantity: item.value.quantity,
                isChecked: false,
            }),
        });

        item.value.isChecked = false;
    }
    else {
        const itemReference = item.value.reference;

        await $fetch(`/api/shopping-list/items/${itemReference}`, {
            method: 'delete',
        });

        const index = shoppingList.value.items.findIndex(x => x.reference === itemReference);
        if (index !== -1) {
            shoppingList.value.items.splice(index, 1);
        }
    }
}
</script>