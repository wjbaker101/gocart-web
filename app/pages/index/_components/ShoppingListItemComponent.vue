<template>
    <div class="items-center gap-4 grid grid-cols-[auto_1fr_auto_auto_auto] max-md:grid-cols-[auto_1fr_1fr] bg-slate-50 shadow-inner/7 p-2 pr-4 rounded-xl text-left">
        <img :src="item.imageUrl" width="60" height="60" class="place-self-center shadow-[0_0_3px_4px_white]">
        <h3 class="max-md:col-span-2">{{ item.name }}</h3>
        <div class="grid grid-flow-col border border-slate-200 rounded-xl">
            <template v-if="!isChecked">
                <div @click="increment(-1)" class="group place-items-center grid bg-primary p-3 rounded-l-xl text-text-light text-center cursor-pointer">
                    <div class="group-active:scale-90">
                        <MinusIcon class="size-4" />
                    </div>
                </div>
                <input v-model="item.quantity" type="number" class="focus:outline-none w-16 h-full text-center _hide-buttons">
                <div @click="increment(1)" class="group place-items-center grid bg-primary p-3 rounded-r-xl text-text-light text-center cursor-pointer">
                    <div class="group-active:scale-90">
                        <PlusIcon class="size-4" />
                    </div>
                </div>
            </template>
        </div>
        <div class="font-mono font-bold">£{{ item.price.toFixed(2) }}</div>
        <BaseButtonComponent
            @click="check"
            :class="{
                'bg-primary': isChecked,
            }"
            class="group justify-self-end place-items-center grid border border-primary rounded-md! size-7"
        >
            <ArrowBigUpIcon v-if="isChecked" class="size-4 text-text-light" />
            <CheckIcon v-else class="opacity-0 group-hover:opacity-20 size-4" />
        </BaseButtonComponent>
    </div>
</template>

<script setup lang="ts">
import { CheckIcon, ArrowBigUpIcon, PlusIcon, MinusIcon } from '@lucide/vue';

const { item } = defineProps<{
    item: IShoppingListItem;
}>();

const shoppingList = useShoppingList();

const isChecked = computed(() => shoppingList.isChecked(item.tpnc));

function check() {
    shoppingList.swapItem(item);
}

function increment(amount: number) {
    item.quantity += amount;

    if (item.quantity === 0) {
        shoppingList.removeItem(item.tpnc);
    }
}
</script>