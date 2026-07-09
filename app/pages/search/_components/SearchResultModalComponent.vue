<template>
    <CenteredModalComponent class="w-lg max-w-full">
        <template #header>
            <h1 class="font-bold text-xl">Product Information</h1>
        </template>
        <div class="mb-4">
            <img :src="result.imageUrl" width="225" height="225" class="shadow-sm mx-auto rounded-xl">
        </div>
        <h2 class="mx-auto mb-4 max-w-xs font-bold text-lg text-center">{{ result.name }}</h2>
        <p class="mb-1 text-2xl text-center">£{{ result.price.toFixed(2) }}</p>
        <p class="mb-4 text-slate-500 text-sm text-center italic">(£{{ result.pricePer.amount.toFixed(2) }} per {{ result.pricePer.unit }})</p>
        <div class="mx-auto mb-4 w-fit">
            <PrimaryButtonComponent @click="addToBasket">
                <ShoppingBasketIcon class="inline-block mr-2 size-4 align-middle" />
                <span class="align-middle">Add to Basket</span>
            </PrimaryButtonComponent>
        </div>
        <div class="items-center gap-4 grid grid-cols-[1fr_auto] bg-slate-50 px-4 py-2 border border-slate-200 rounded-xl">
            <div>More Information</div>
            <BaseButtonComponent :disabled="details === null" @click="isDetailsExpanded = !isDetailsExpanded" class="hover:bg-slate-200 -mr-2 p-2">
                <LoaderCircleIcon v-if="details === null" class="size-4 animate-spin" />
                <ChevronDownIcon
                    v-else
                    :class="{
                        'rotate-180': isDetailsExpanded,
                    }"
                    class="stroke-3 size-4"
                />
            </BaseButtonComponent>
        </div>
        <ExpandableComponent :is-open="isDetailsExpanded">
            <template v-if="details !== null && details.ingredients.length > 0">
                <p class="mt-4 mb-2 font-bold text-sm">Ingredients:</p>
                <div v-html="details.ingredients"></div>
            </template>
            <p class="mt-4 mb-2 font-bold text-sm">Nutrition:</p>
            <div class="bg-slate-50 border border-slate-200 rounded-xl">
                <table class="w-full">
                    <tbody>
                        <tr v-for="nutrition in details?.nutrition" class="first:font-bold first:text-sm">
                            <td class="p-2 border-slate-200 border-r font-bold text-sm">{{ nutrition.heading }}</td>
                            <td class="p-2 text-right">{{ nutrition.value1 }}</td>
                            <td class="p-2 text-right">{{ nutrition.value2 }}</td>
                            <td class="p-2 text-right">{{ nutrition.value3 }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </ExpandableComponent>
    </CenteredModalComponent>
</template>

<script setup lang="ts">
import { ShoppingBasketIcon, ChevronDownIcon, LoaderCircleIcon } from '@lucide/vue';

import CenteredModalComponent from '~/components/modals/CenteredModalComponent.vue';

import type { ISearchResult } from '~/pages/search/_logic/ISearchResult';
import { addShoppingListItem } from '~~/shared/schemas/addShoppingListItem';

const { result } = defineProps<{
    result: ISearchResult;
}>();

const modal = useModal();
const shoppingList = useShoppingList();

interface IDetails {
    readonly ingredients: string;
    readonly nutrition: Array<{
        readonly heading: string;
        readonly value1: string;
        readonly value2: string;
        readonly value3: string;
    }>;
}

const details = ref<IDetails | null>(null);
const isDetailsExpanded = ref(false);

async function getProduct() {
    const response = await $fetch(`/api/products/by-tpnc/${result.tpnc}`);

    details.value = {
        ingredients: response.data.product.details.ingredients.map(x => x.replace('INGREDIENTS:', '')).join(', '),
        nutrition: response.data.product.details.nutrition.map(x => ({
            heading: x.name,
            value1: x.value1,
            value2: x.value2,
            value3: x.value3,
        })),
    };
}

async function addToBasket() {
    const response = await $fetch('/api/shopping-list/items', {
        method: 'post',
        body: validateRequest(addShoppingListItem, {
            tpnc: result.tpnc,
            quantity: 1,
        }),
    });

    shoppingList.value.items.push(response.item);
}

modal.onShow(async () => {
    await getProduct();
});

modal.onHide(() => {
    details.value = null;
    isDetailsExpanded.value = false;
});

onMounted(async () => {
    await getProduct();
});
</script>