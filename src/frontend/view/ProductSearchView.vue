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
                :class="{ 'is-visible': isSortAndFilterShown }"
            >
                <ul>
                    <li
                        :key="`sort-option-${index}`"
                        v-for="(sortOption, index) in displaySortOptions"
                        :class="{ 'is-selected': sortOption.type === productSearchSettings.sortOption }"
                        @click="onSortOption(sortOption.type)"
                    >
                        <component :is="sortOption.icon" />
                        <span>{{ sortOption.title }}</span>
                    </li>
                </ul>
            </div>
            <SearchComponent
                ref="searchComponent"
                placeholder="Apple Strudel"
                :prePopulatedSearchTerm="searchComponentSearchTerm"
                @search="onSearch"
            />
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
import { computed, defineComponent, onBeforeMount, onMounted, readonly, ref, shallowReadonly } from 'vue';

import PageContainerComponent from '@/component/PageContainerComponent.vue';
import LoadingComponent from '@/component/LoadingComponent.vue';
import ProductComponent from '@/component/ProductComponent.vue';
import ButtonComponent from '@/component/item/ButtonComponent.vue';
import SearchComponent from '@/component/SearchComponent.vue';
import QuestionMarkCircleIcon from '@/component/icon/QuestionMarkCircleIcon.vue';
import SearchIcon from '@/component/icon/SearchIcon.vue';
import SortAlphaIcon from '@/component/icon/SortAlphaIcon.vue';
import SortIcon from '@/component/icon/SortIcon.vue';
import SortListIcon from '@/component/icon/SortListIcon.vue';
import SortNumericIcon from '@/component/icon/SortNumericIcon.vue';

import { TescoService } from '@/service/Tesco.service';
import { useScrollPosition } from '@/use/ScrollPosition.use';
import { ProductSearchSettings, useProductSearch } from '@/use/state/ProductSearch.use';

import { Product } from '@/model/Product.model';
import { SortOption, SortOptionType } from '@/model/SortOption.model';

export default defineComponent({
    name: 'ProductSearchView',

    components: {
        PageContainerComponent,
        ButtonComponent,
        SearchComponent,
        LoadingComponent,
        ProductComponent,
        QuestionMarkCircleIcon,
        SearchIcon,
        SortIcon,
    },

    props: {
        prePopulatedSearchTerm: {
            type: String,
            required: false,
            default: '',
        },
    },

    setup(props) {
        useScrollPosition('ProductSearchView');
        const productSearch = useProductSearch();

        const searchComponent = ref<typeof SearchComponent | null>(null);

        const isSearching = ref<boolean>(false);
        const products = ref<Product[] | null>(null);

        const isSortAndFilterShown = ref<boolean>(false);

        const productSearchSettings = computed<ProductSearchSettings>(() => productSearch.settings.value);

        const searchComponentSearchTerm = props.prePopulatedSearchTerm.length > 0
            ? props.prePopulatedSearchTerm
            : productSearch.searchTerm.value ?? '';

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
                .sort(sortFunctions[productSearchSettings.value.sortOption.toString()]);
        });

        const onSearch = async function (searchTerm: string) {
            if (searchTerm === null)
                return;

            if (searchTerm.trim().length < 3)
                return;

            searchComponent.value?.blur();

            isSearching.value = true;

            const searchProducts = await TescoService.searchProducts(searchTerm, 1);

            isSearching.value = false;

            if (searchProducts instanceof Error) {
                products.value = null;

                searchComponent.value?.focus();
            }
            else {
                products.value = searchProducts;

                if (products.value.length === 0) {
                    searchComponent.value?.focus();
                }

                productSearch.searchTerm.value = searchTerm;
                productSearch.products.value = products.value;
            }
        };

        onBeforeMount(() => {
            const existingProducts = productSearch.products.value;
            if (existingProducts !== null)
                products.value = existingProducts;
        });

        onMounted(() => {
            if (props.prePopulatedSearchTerm.length > 0)
                onSearch(props.prePopulatedSearchTerm);

            if (searchComponentSearchTerm.length === 0)
                searchComponent.value?.focus();
        });

        return {
            searchComponent,

            searchComponentSearchTerm,
            isSearching,
            displayProducts,

            isSortAndFilterShown,
            productSearchSettings,
            displaySortOptions,

            onSearch,

            onSortAndFilterToggle() {
                isSortAndFilterShown.value = !isSortAndFilterShown.value;
            },

            onSortOption(sortOption: SortOptionType) {
                productSearch.settings.value.sortOption = sortOption;
                isSortAndFilterShown.value = false;
            },
        }
    },
})
</script>

<style lang="scss">
.product-search-view {

    &-sort-filter-button {
        cursor: pointer;
    }

    &-sort-filter-container {
        overflow: hidden;

        &.is-visible {
            ul {
                display: block;
            }
        }

        ul {
            position: relative;
            padding: 0;
            list-style: none;
            display: none;

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

    .product-list {
        padding-top: 0.5rem;
    }
}
</style>
