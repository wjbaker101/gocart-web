<template>
    <div v-if="uncheckedItems.length === 0 && checkedItems.length === 0" class="place-items-center grid h-full">
        <div>
            <ShoppingCartIcon class="mx-auto mb-4 size-16" />
            <h2 class="mb-4 font-bold text-2xl text-center">Empty Shopping List!</h2>
            <p class="text-center">
                <span class="align-middle">Search for your first item</span>
                <ArrowDownIcon class="inline-block ml-2 size-4 align-middle" />
            </p>
        </div>
    </div>
    <div v-else class="mx-auto py-4 w-[calc(100%-1rem)] max-w-4xl">
        <div class="items-center grid grid-cols-[1fr_auto] mb-4">
            <h2 class="font-bold">Shopping List</h2>
            <div class="text-sm">
                <UtensilsIcon class="inline-block mr-2 size-4 align-middle" />
                <span class="align-middle">{{ uncheckedItems.length }}</span>
            </div>
        </div>
        <div class="gap-2 grid mb-4">
            <ShoppingListItemComponent v-for="item in uncheckedItems" :key="item.data.tpnc" :item />
        </div>
        <div class="items-center gap-4 grid grid-cols-[1fr_auto_auto] mb-4">
            <h2 class="font-bold">Checked Items</h2>
            <div class="text-sm">
                <ListChecksIcon class="inline-block mr-2 size-4 align-middle" />
                <span class="align-middle">{{ checkedItems.length }}</span>
            </div>
            <BaseButtonComponent @click="collapseCheckedItems = !collapseCheckedItems">
                <EyeOffIcon v-if="collapseCheckedItems" class="size-4" />
                <EyeIcon v-else class="size-4" />
            </BaseButtonComponent>
        </div>
        <ExpandableComponent :is-open="!collapseCheckedItems">
            <div class="gap-2 grid">
                <ShoppingListItemComponent v-for="item in checkedItems" :key="item.data.tpnc" :item />
            </div>
        </ExpandableComponent>
    </div>
</template>

<script setup lang="ts">
import { ListChecksIcon, UtensilsIcon, EyeIcon, EyeOffIcon, ShoppingCartIcon, ArrowDownIcon } from '@lucide/vue';

import ShoppingListItemComponent from '~/pages/index/_components/ShoppingListItemComponent.vue';

definePageMeta({
    middleware: ['require-auth'],
});

const shoppingList = useShoppingList();

const uncheckedItems = computed(() => shoppingList.value.items.filter(x => !x.isChecked));
const checkedItems = computed(() => shoppingList.value.items.filter(x => x.isChecked));

const collapseCheckedItems = ref(false);
</script>