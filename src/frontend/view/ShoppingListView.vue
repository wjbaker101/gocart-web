<template>
    <PageContainerComponent>
        <template #header-right>
            <div class="flex align-center gap">
                <ButtonComponent @click="onAddFreetext">
                    <AddIcon />
                    <span>
                        <small>Freetext</small>
                    </span>
                </ButtonComponent>
                <div>
                    <BasketIcon />
                    <span>
                        <strong>{{ displayTotalPrice }}</strong>
                    </span>
                </div>
            </div>
        </template>
        <div class="shopping-list-view">
            <section class="zero-state" v-if="isShoppingListEmpty">
                <BasketIcon massive />
                <p><strong>Your shopping list is empty!</strong></p>
                <p>Let's get started, search your first item:</p>
                <SearchComponent
                    placeholder="Oreo Milkshake"
                    :hasUserMessage="true"
                    @search="onFirstProductSearch"
                />
            </section>
            <div v-else>
                <section class="flex align-center">
                    <h3 class="flex-1">Shopping List</h3>
                    <p class="flex-auto">({{ unchecked.length }})</p>
                </section>
                <div>
                    <VueDraggable
                        v-model="unchecked"
                        v-bind="draggableOptions"
                    >
                        <ProductComponent
                            :key="productId"
                            v-for="productId in unchecked"
                            :product="products[productId]"
                        />
                    </VueDraggable>
                </div>
                <section ref="checkedSection" class="flex align-center">
                    <h3 class="flex-1">Checked Items <small v-if="!isCheckedProductsVisible"><em>(Hidden)</em></small></h3>
                    <p class="flex-auto">({{ checked.length }})</p>
                    <div class="checked-items-visibility-container flex flex-auto align-center" @click="toggleCheckedItemsVisibility">
                        <ChevronUpIcon v-if="isCheckedProductsVisible" />
                        <ChevronDownIcon v-else />
                    </div>
                </section>
                <div v-if="isCheckedProductsVisible">
                    <section
                        class="search-checked-container flex flex-animate"
                        v-if="checked.length > 5"
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
                            class="flex-auto reset-checked-search-button"
                            :class="{
                                'is-visible': checkedSearchTerm.length > 0,
                            }"
                            @click="onClearCheckedSearch"
                            isSecondary
                        >
                            &times;
                        </ButtonComponent>
                    </section>
                    <ProductComponent
                        :key="productId"
                        v-for="productId in checked"
                        :product="products[productId]"
                    />
                </div>
            </div>
        </div>
    </PageContainerComponent>
</template>

<script lang="ts">
import { computed, defineComponent, readonly, ref } from 'vue';
import { useRouter } from 'vue-router';
import { VueDraggableNext as VueDraggable } from 'vue-draggable-next';

import PageContainerComponent from '@/component/PageContainerComponent.vue';
import ProductComponent from '@/component/ProductComponent.vue';
import ButtonComponent from '@/component/item/ButtonComponent.vue';
import SearchComponent from '@/component/SearchComponent.vue';
import AddFreeTextModalContentComponent from '@/component/modal/content/AddFreeTextModalContentComponent.vue';
import BasketIcon from '@/component/icon/BasketIcon.vue';
import ChevronDownIcon from '@/component/icon/ChevronDownIcon.vue';
import ChevronUpIcon from '@/component/icon/ChevronUpIcon.vue';
import AddIcon from '@/component/icon/PlusIcon.vue';

import { useShoppingList } from '@/use/state/ShoppingList.use';
import { useScrollPosition } from '@/use/ScrollPosition.use';

import { Product } from '@/model/Product.model';
import { Event, eventService } from '@/service/Event.service';

export default defineComponent({
    name: 'ShoppingListView',

    components: {
        VueDraggable,
        PageContainerComponent,
        ProductComponent,
        ButtonComponent,
        SearchComponent,
        BasketIcon,
        ChevronDownIcon,
        ChevronUpIcon,
        AddIcon,
    },

    setup() {
        useScrollPosition('ShoppingListView');
        const router = useRouter();
        const shoppingList = useShoppingList();

        const searchTextbox = ref<HTMLInputElement | null>(null);
        const checkedSection = ref<HTMLElement | null>(null);

        const checkedSearchTerm = ref<string>('');

        const draggableOptions = readonly({
            delay: 300,
            animation: 0,
            disabled: false,
            ghostClass: 'is-dragged',
        });

        const isCheckedProductsVisible = computed<boolean>(() => shoppingList.settings.value.isCheckedProductsVisible);

        const products = computed<Record<string, Product>>(() => shoppingList.products.value);

        const unchecked = computed<Array<string>>({
            get() {
                return shoppingList.unchecked.value;
            },
            set(ids: Array<string>) {
                shoppingList.unchecked.value = ids;
            },
        });
        const checked = computed<Array<string>>(() => {
            return shoppingList.checked.value;;
        });

        const isShoppingListEmpty = computed<boolean>(() => unchecked.value.length === 0 &&checked.value.length === 0);

        const totalPrice = computed<number>(() => unchecked.value
            .map(x => products.value[x])
            .reduce((total, product) => total + (product.price * product.listQuantity), 0.0));

        const displayTotalPrice = computed<string>(() => {
            if (isShoppingListEmpty.value)
                return 'Empty!';

            return `£${totalPrice.value.toFixed(2)}`
        });

        const firstProductSearchTerm = ref<string>('');
        const firstProductUserMessage = ref<string | null>(null);

        return {
            searchTextbox,
            checkedSection,
            checkedSearchTerm,
            draggableOptions,
            isCheckedProductsVisible,
            products,
            unchecked,
            checked,
            displayTotalPrice,
            isShoppingListEmpty,
            firstProductSearchTerm,
            firstProductUserMessage,

            onCheckedTextBoxFocus() {
                if (checkedSection.value === null)
                    return;

                window.scrollTo(0, checkedSection.value.offsetTop);
            },

            onClearCheckedSearch() {
                checkedSearchTerm.value = '';
                searchTextbox.value?.focus();
            },

            toggleCheckedItemsVisibility() {
                shoppingList.settings.value.isCheckedProductsVisible = !shoppingList.settings.value.isCheckedProductsVisible;
            },

            onFirstProductSearch(searchTerm: string) {
                router.push({
                    name: 'product_search',
                    params: {
                        prePopulatedSearchTerm: searchTerm,
                    },
                });
            },

            onAddFreetext() {
                eventService.publish(Event.OPEN_MODAL, {
                    content: AddFreeTextModalContentComponent,
                });
            },
        }
    },
})
</script>

<style lang="scss">
.shopping-list-view {
    .search-checked-container {
        margin-bottom: 0.5rem;
    }

    .search-checked-textbox {
        text-transform: capitalize;
    }

    .reset-checked-search-button {
        margin-left: 0.5rem;
        overflow: hidden;

        &:not(.is-visible) {
            flex: 0;
            padding: 0;
            margin: 0;
        }
    }

    .checked-items-visibility-container {
        margin-left: 0.5rem;
        cursor: pointer;
    }

    .first-search-button {
        margin-left: 0.5rem;

        .icon {
            vertical-align: middle;
        }
    }
}
</style>