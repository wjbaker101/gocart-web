<template>
    <PageContainerComponent backButton>
        <template #header-right>
            <div
                class="product-search-view-sort-filter-button"
                @click="onSortAndFilterToggle"
            >
                <SortIcon />
                <span>Sort &amp; Filter</span>
            </div>
        </template>
        <template #header-bottom>
            <div
                class="product-search-view-sort-filter-container"
                v-if="isSortAndFilterShown"
            >
                <ul>
                    <li
                        :key="`sort-option-${index}`"
                        v-for="(sortOption, index) in displaySortOptions"
                        :class="{ 'is-selected': sortOption.type === currentSortOption }"
                        @click="onSortOption(sortOption.type)"
                    >
                        <component :is="sortOption.icon" />
                        <span>{{ sortOption.title }}</span>
                    </li>
                </ul>
            </div>
            <div class="flex">
                <input
                    ref="searchTextbox"
                    type="search"
                    placeholder="Apple Strudel"
                    class="product-search-view-search-textbox flex-1"
                    v-model="searchTerm"
                    @keyup.enter="onSearch"
                >
                <ButtonComponent
                    class="product-search-view-reset-search-button flex-auto"
                    v-if="searchTerm.length > 0"
                    @click="onClearSearch"
                    isSecondary
                >
                    &times;
                </ButtonComponent>
            </div>
        </template>
        <div class="product-search-view">
            <section v-if="isSearching">
                <LoadingComponent>
                    <p>Getting a list of products for you,<br> one second...</p>
                </LoadingComponent>
            </section>
            <section class="zero-state" v-else-if="displayProducts === null">
                <SearchIcon massive />
                <p><strong>Enter the name of a product,</strong>
                <br>I'll try and find it for you!</p>
            </section>
            <section class="zero-state" v-else-if="displayProducts.length === 0">
                <QuestionMarkCircleIcon massive />
                <p><strong>Sorry, I didn't find anything,</strong>
                <br>Try something different!</p>
            </section>
            <div class="product-list" v-else>
                <ProductComponent
                    :key="`product-${index}`"
                    v-for="(product, index) in displayProducts"
                    forSearch
                    :product="product"
                />
            </div>
        </div>
    </PageContainerComponent>
</template>

<script lang="ts">
import { computed, onBeforeMount, onMounted, readonly, ref, shallowReadonly } from 'vue';
import { useStore } from 'vuex';

import PageContainerComponent from '@/component/PageContainerComponent.vue';
import LoadingComponent from '@/component/LoadingComponent.vue';
import ProductComponent from '@/component/ProductComponent.vue';
import ButtonComponent from '@/component/item/ButtonComponent.vue';
import QuestionMarkCircleIcon from '@/component/icon/QuestionMarkCircleIcon.vue';
import SearchIcon from '@/component/icon/SearchIcon.vue';
import SortAlphaIcon from '@/component/icon/SortAlphaIcon.vue';
import SortIcon from '@/component/icon/SortIcon.vue';
import SortListIcon from '@/component/icon/SortListIcon.vue';
import SortNumericIcon from '@/component/icon/SortNumericIcon.vue';

import { TescoService } from '@/service/Tesco.service';
import { UseScrollPosition } from '@/use/ScrollPosition.use';

import { AppState } from '@/store/type/AppState.model';
import { StateKeys } from '@/store/type/StateKeys';
import { Product } from '@/model/Product.model';
import { SortOption, SortOptionType } from '@/model/SortOption.model';

export default {
    name: 'ProductSearchView',

    components: {
        PageContainerComponent,
        ButtonComponent,
        LoadingComponent,
        ProductComponent,
        QuestionMarkCircleIcon,
        SearchIcon,
        SortIcon,
    },

    setup() {
        const store = useStore<AppState>();

        const searchTextbox = ref<HTMLInputElement | null>(null);

        const searchTerm = ref<string>('');
        const isSearching = ref<boolean>(false);
        const products = ref<Product[] | null>(null);

        const isSortAndFilterShown = ref<boolean>(false);

        const currentSortOption = ref<SortOptionType>(
            store.getters.searchSortOption);

        const displaySortOptions = shallowReadonly<SortOption[]>([
            {
                title: 'Alphabetical (A - Z)',
                type: SortOptionType.ALPHABETICAL,
                icon: SortAlphaIcon,
            },
            {
                title: 'Price (Lowest - Highest)',
                type: SortOptionType.PRICE,
                icon: SortNumericIcon,
            },
            {
                title: 'Health (Best - Worst)',
                type: SortOptionType.HEALTH_SCORE,
                icon: SortListIcon,
            },
        ]);

        const sortFunctions = readonly({
            [SortOptionType.ALPHABETICAL.toString()](a: Product, b: Product): number {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;

                return 0;
            },
            [SortOptionType.PRICE.toString()](a: Product, b: Product): number {
                if (a.price > b.price) return 1;
                if (a.price < b.price) return -1;

                return 0;
            },
            [SortOptionType.HEALTH_SCORE.toString()](a: Product, b: Product): number {
                if (!a.healthScore || !b.healthScore)
                    return 0;

                if (a.healthScore < b.healthScore) return 1;
                if (a.healthScore > b.healthScore) return -1;

                return 0;
            },
        });

        const displayProducts = computed<Product[] | null>(() => {
            if (products.value === null)
                return null;

            return products.value
                .sort(sortFunctions[currentSortOption.value.toString()]);
        });

        onBeforeMount(() => {
            const currentSearch = store.getters.currentSearch;

            if (currentSearch === null)
                return;

            products.value = currentSearch.products;
            searchTerm.value = currentSearch.searchTerm;
        });

        onMounted(() => {
            if (searchTerm.value.length === 0)
                searchTextbox.value?.focus();
        });

        UseScrollPosition('ProductSearchView');

        return {
            searchTextbox,

            searchTerm,
            isSearching,
            displayProducts,

            isSortAndFilterShown,
            currentSortOption,
            displaySortOptions,

            async onSearch() {
                if (searchTerm.value === null)
                    return;

                if (searchTerm.value.trim().length < 3)
                    return;

                searchTextbox.value?.blur();

                isSearching.value = true;

                const searchProducts =
                    await TescoService.searchProducts(searchTerm.value);

                isSearching.value = false;

                if (searchProducts instanceof Error) {
                    products.value = null;

                    searchTextbox.value?.focus();
                }
                else {
                    products.value = searchProducts;

                    if (products.value.length === 0) {
                        searchTextbox.value?.focus();
                    }

                    store.dispatch(StateKeys.CURRENT_SEARCH_SET, {
                        products: products.value,
                        searchTerm: searchTerm.value,
                    });
                }
            },

            onClearSearch() {
                searchTerm.value = '';
                searchTextbox.value?.focus();

                store.dispatch(StateKeys.CURRENT_SEARCH_SET, {
                    products: products.value,
                    searchTerm: searchTerm.value,
                });
            },

            onSortAndFilterToggle() {
                isSortAndFilterShown.value = !isSortAndFilterShown.value;
            },

            onSortOption(sortOption: SortOptionType) {
                currentSortOption.value = sortOption;

                isSortAndFilterShown.value = false;

                store.dispatch(StateKeys.SEARCH_SETTINGS_SET, {
                    sortOption,
                });
            },
        }
    },
}
</script>

<style lang="scss">
.product-search-view {

    &-sort-filter-button {
        cursor: pointer;
    }

    &-sort-filter-container {
        ul {
            margin: 0;
            padding: 0;
            list-style: none;

            li {
                display: table;
                padding: 0.125rem 0.5rem;
                border-radius: layout(border-radius);
                cursor: pointer;

                &.is-selected {
                    background-color: theme(primary-dark);

                    @include box-shadow-small;
                }
            }
        }

        .icon {
            margin-right: 0.5rem;
        }

        span,
        .icon {
            vertical-align: middle;
        }
    }

    &-search-textbox {
        text-transform: capitalize;
    }

    &-reset-search-button {
        margin-left: 0.5rem;
    }

    .product-list {
        padding-top: 0.5rem;
    }
}
</style>
