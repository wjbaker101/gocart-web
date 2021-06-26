<template>
    <PageContainerComponent>
        <template #header-right v-if="!isShoppingListEmpty">
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
                    <h3 class="flex-1">Checked Items <small v-if="!shoppingListSettings.isCheckedItemsVisible"><em>(Hidden)</em></small></h3>
                    <p class="flex-auto">({{ displayChecked.length }})</p>
                    <div class="checked-items-visibility-container flex flex-auto align-center" @click="toggleCheckedItemsVisibility">
                        <ChevronUpIcon v-if="shoppingListSettings.isCheckedItemsVisible" />
                        <ChevronDownIcon v-else />
                    </div>
                </section>
                <div v-if="shoppingListSettings.isCheckedItemsVisible">
                    <section
                        class="search-checked-container flex flex-animate"
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
                        :key="`product-${product.id}`"
                        v-for="product in filteredDisplayChecked"
                        :product="product"
                    />
                </div>
            </div>
        </div>
    </PageContainerComponent>
    <SideModalComponent />
</template>

<script lang="ts">
import { computed, defineComponent, readonly, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { VueDraggableNext as VueDraggable } from 'vue-draggable-next';

import PageContainerComponent from '@/component/PageContainerComponent.vue';
import ProductComponent from '@/component/ProductComponent.vue';
import ButtonComponent from '@/component/item/ButtonComponent.vue';
import SearchComponent from '@/component/SearchComponent.vue';
import SideModalComponent from '@/component/modal/SideModalComponent.vue';
import AddFreeTextModalContentComponent from '@/component/modal/content/AddFreeTextModalContentComponent.vue';
import BasketIcon from '@/component/icon/BasketIcon.vue';
import ChevronDownIcon from '@/component/icon/ChevronDownIcon.vue';
import ChevronUpIcon from '@/component/icon/ChevronUpIcon.vue';
import AddIcon from '@/component/icon/PlusIcon.vue';

import { AppStateMapper } from '@/store/AppStore';
import { SortService } from '@/service/Sort.service';
import { UseScrollPosition } from '@/use/ScrollPosition.use';

import { AppState, ShoppingListSettingsState } from '@/store/type/AppState.model';
import { Product } from '@/model/Product.model';
import { StateKeys } from '@/store/type/StateKeys';
import { Event, eventService } from '@/service/Event.service';

export default defineComponent({
    name: 'ShoppingListView',

    components: {
        VueDraggable,
        PageContainerComponent,
        ProductComponent,
        ButtonComponent,
        SearchComponent,
        SideModalComponent,
        BasketIcon,
        ChevronDownIcon,
        ChevronUpIcon,
        AddIcon,
    },

    setup() {
        const store = useStore<AppState>();
        const router = useRouter();

        const searchTextbox = ref<HTMLInputElement | null>(null);
        const checkedSection = ref<HTMLElement | null>(null);

        const checkedSearchTerm = ref<string>('');

        const draggableOptions = readonly({
            delay: 300,
            animation: 0,
            disabled: false,
            ghostClass: 'is-dragged',
        });

        const shoppingListSettings = computed<ShoppingListSettingsState>(() => store.getters.shoppingListSettings);

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

        const firstProductSearchTerm = ref<string>('');
        const firstProductUserMessage = ref<string | null>(null);

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
            shoppingListSettings,
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
                store.dispatch(StateKeys.SHOPPING_LIST_SETTINGS_SET, {
                    ...shoppingListSettings.value,
                    isCheckedItemsVisible: !shoppingListSettings.value.isCheckedItemsVisible,
                });
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