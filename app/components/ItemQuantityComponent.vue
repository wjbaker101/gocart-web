<template>
    <div @click.stop class="grid grid-flow-col rounded-xl">
        <div @click="increment(-1)" class="group place-items-center grid bg-primary p-2.5 rounded-l-xl text-text-light text-center cursor-pointer">
            <div class="group-active:scale-90">
                <MinusIcon class="size-4" />
            </div>
        </div>
        <input v-model="item.quantity" type="number" class="bg-slate-50 border-slate-200 border-y focus:outline-none w-16 h-full text-center _hide-buttons">
        <div @click="increment(1)" class="group place-items-center grid bg-primary p-2.5 rounded-r-xl text-text-light text-center cursor-pointer">
            <div class="group-active:scale-90">
                <PlusIcon class="size-4" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { MinusIcon, PlusIcon } from '@lucide/vue';

import { updateShoppingListItem } from '~~/shared/schemas/UpdateShoppingListItem';

const { item } = defineProps<{
    item: IShoppingListItem;
}>();

const shoppingList = useShoppingList();

async function increment(amount: number) {
    item.quantity += amount;

    if (item.quantity === 0) {
        const itemReference = item.reference;

        useLoading({
            request: async () => {
                await $fetch(`/api/shopping-list/items/${itemReference}`, {
                    method: 'delete',
                });

                const index = shoppingList.value.items.findIndex(x => x.reference === itemReference);
                if (index !== -1) {
                    shoppingList.value.items.splice(index, 1);
                }
            },
        });
    }
    else {
        useLoading({
            request: async () => {
                await $fetch(`/api/shopping-list/items/${item.reference}`, {
                    method: 'put',
                    body: validateRequest(updateShoppingListItem, {
                        quantity: item.quantity,
                        isChecked: item.isChecked,
                    }),
                });
            },
        });
    }
}
</script>