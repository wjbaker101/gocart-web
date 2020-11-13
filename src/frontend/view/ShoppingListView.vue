<template>
    <PageContainerComponent>
        <template #header-right v-if="!isShoppingListEmpty">
            <BasketIcon />
            <span>
                <strong>{{ displayTotalPrice }}</strong>
            </span>
        </template>
        <div class="shopping-list-view">
            <section class="zero-state" v-if="isShoppingListEmpty">
                <BasketIcon massive />
                <p><strong>Your shopping list is empty!</strong></p>
                <p>Press 'Search' below, add some items and<br> I'll put them on your shopping list!</p>
            </section>
            <div v-else>
                <section class="flex align-center">
                    <h3 class="flex-1">Shopping List</h3>
                    <p class="flex-auto">({{ displayUnchecked.length }})</p>
                </section>
                <div>
                    <VueDraggable
                        v-model="displayUnchecked"
                        v-bind="draggableOptions"
                    >
                        <ProductComponent
                            :key="`product-${product.id}`"
                            v-for="product in displayUnchecked"
                            :product="product"
                        />
                    </VueDraggable>
                </div>
                <section ref="checkedSection" class="flex align-center">
                    <h3 class="flex-1">Checked Items</h3>
                    <p class="flex-auto">({{ displayChecked.length }})</p>
                </section>
                <div>
                    <section
                        class="search-checked-container flex"
                        v-if="displayChecked.length > 5"
                    >
                        <input
                            ref="searchTextbox"
                            type="search"
                            placeholder="Spaghetti Bolognese"
                            class="search-checked-textbox"
                            v-model="checkedSearchTerm"
                            @focus="onCheckedTextBoxFocus"
                        >
                        <ButtonComponent
                            class="flex-auto"
                            v-if="checkedSearchTerm.length > 0"
                            @click="onClearCheckedSearch"
                            isSecondary
                        >
                            &times;
                        </ButtonComponent>
                    </section>
                    <ProductComponent
                        :key="`product-${product.id}`"
                        v-for="product in filteredDisplayChecked"
                        :product="product"
                    />
                </div>
            </div>
        </div>
    </PageContainerComponent>
</template>

<script lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, readonly, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { VueDraggableNext as VueDraggable } from 'vue-draggable-next';

import PageContainerComponent from '@/component/PageContainerComponent.vue';
import ProductComponent from '@/component/ProductComponent.vue';
import ButtonComponent from '@/component/item/ButtonComponent.vue';
import BasketIcon from '@/component/icon/BasketIcon.vue';

import { AppStateMapper } from '@/store/AppStore';
import { TescoService } from '@/service/Tesco.service';
import { SortService } from '@/service/Sort.service';
import { UseScrollPosition } from '@/use/ScrollPosition.use';

import { AppState } from '@/store/type/AppState.model';
import { Product } from '@/model/Product.model';
import { StateKeys } from '@/store/type/StateKeys';

export default {
    name: 'ShoppingListView',

    components: {
        VueDraggable,
        PageContainerComponent,
        ProductComponent,
        ButtonComponent,
        BasketIcon,
    },

    setup() {
        const store = useStore<AppState>();

        const searchTextbox = ref<HTMLInputElement | null>(null);
        const checkedSection = ref<HTMLElement | null>(null);

        const checkedSearchTerm = ref<string>('');

        const draggableOptions = readonly({
            delay: 300,
            animation: 0,
            disabled: false,
            ghostClass: 'is-dragged',
        });

        const displayUnchecked = computed<Product[]>({
            get: () => Array.from<string>(store.getters
                .uncheckedProductList
                .keys())
                .map(x => store.getters.shoppingList[x]),
            set: (value: Product[]) => {
                store.dispatch(
                    StateKeys.SHOPPING_LIST_UNCHECKED_SET,
                    new Set([ ...value
                        .map(x => AppStateMapper.mapProductId(x.id))
                    ])
                );
            },
        });

        const displayChecked = computed<Product[]>(
            () => Array.from<string>(store.getters
                .checkedProductList
                .keys())
                .map(x => store.getters.shoppingList[x])
                .sort((a: Product, b: Product) =>
                    SortService.alphabeticalAsc(a.name, b.name))
                .sort((a: Product, b: Product) =>
                    SortService.numericalDesc(a.addCount, b.addCount)));

        const filteredDisplayChecked = computed<Product[]>(
            () => displayChecked.value
                .filter((x: Product) => x.name
                .toLowerCase()
                .indexOf(checkedSearchTerm.value.toLowerCase()) > -1));

        const isShoppingListEmpty = computed<boolean>(
            () => displayUnchecked.value.length === 0 &&
                displayChecked.value.length === 0);

        const totalPrice = computed<number>(
            () => displayUnchecked.value
                .reduce((acc, product) =>
                    acc + (product.price * product.listQuantity), 0));

        const displayTotalPrice = computed<string>(() => {
            if (totalPrice.value === 0)
                return 'Empty!';

            return `£${totalPrice.value.toFixed(2)}`
        });

        UseScrollPosition('ShoppingListView');

        return {
            searchTextbox,
            checkedSection,
            checkedSearchTerm,
            draggableOptions,
            displayTotalPrice,
            displayUnchecked,
            displayChecked,
            filteredDisplayChecked,
            isShoppingListEmpty,

            onCheckedTextBoxFocus() {
                if (checkedSection.value === null)
                    return;

                window.scrollTo(0, checkedSection.value.offsetTop);
            },

            onClearCheckedSearch() {
                checkedSearchTerm.value = '';
                searchTextbox.value?.focus();
            },
        }
    },
}
</script>

<style lang="scss">
.shopping-list-view {
    .search-checked-container {
        margin-bottom: 0.5rem;
    }

    .search-checked-textbox {
        margin-right: 0.5rem;
        text-transform: capitalize;
    }
}
</style>